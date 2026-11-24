# Waitlist form

## Sub-features
- Submit a new email: message "You're on the list." and a row in `waitlist`.
- Submit a duplicate: message "This email is already on the waitlist." (Postgres 23505, no new row).
- Failure path: message "That didn't send. Try again." (what a static run shows, and any unexpected server error).
- Two forms on `/`: hero and closing card, same action `joinWaitlist` in `app/actions/waitlist.ts`.

## How to get to it (user POV)
Type an email in the field on the home page and press "Join waitlist".

## Driving it with chrome-devtools-axi
Needs a **local** database: `$V launch --waitlist` then `$V doctor --waitlist` (it refuses unless the dev server's Supabase URL is `http://127.0.0.1:54721`). Never submit to the hosted project.
```bash
C=chrome-devtools-axi
$V sql 'select email, created_at from waitlist' wl-before        # 0 rows
$C open http://127.0.0.1:3200/ ; $C emulate --viewport 1280x800x1
$C fill  "$($V ref 'textbox "Email address')" verify-run@example.com
$C screenshot "$VERIFY_EVIDENCE/wl-filled.png"
$C click "$($V ref 'button "Join waitlist"')" ; $C wait 1500
$C screenshot "$VERIFY_EVIDENCE/wl-result.png" ; $C snapshot | grep -E "on the list|already|didn"   # "You're on the list."
$V sql 'select email, created_at from waitlist' wl-after         # 1 row: verify-run@example.com
# repeat the fill and click: "This email is already on the waitlist."; `select count(*)` still 1
```
Proof: the message in the snapshot, the screenshot, and the row in `wl-after.txt`.

## Gotchas
- The message clears after 5 s; capture right after the click.
- On a static run (`launch` without `--waitlist`) the Supabase URL is a dead local address, so this journey is refused by `doctor` and would report "That didn't send. Try again." Report that as a failed journey with the reason "no local Supabase", never as verified.
- If Docker or the Supabase CLI is missing, `launch --waitlist` dies before changing anything; the journey is then a failure with that reason.
- The two SQL files live in `scripts/` and are the only schema: the repo has no `supabase/` directory, so the helper builds a workdir under `$VERIFY_STATE`.
