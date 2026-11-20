---
name: verify-slash-landing
description: Launch the real slash-landing marketing site (theslash.app, Next.js) with `npm run dev`, drive its pages (home with header and footer, /confirmed, /support, /privacy, /terms, /glba-privacy, /about) and the waitlist form with chrome-devtools-axi at desktop and phone widths, and capture screenshots plus the local database row as proof. Use when you need to show a site change works in the running app rather than only in a build, or when asked to verify, demo or screenshot the landing site. Static pages need no database; the waitlist journey runs only against a throwaway local Supabase, never the hosted project.
---

# Verify slash-landing

The site is one Next.js app (`npm run dev`). Every page is static except the waitlist form, whose server action (`app/actions/waitlist.ts`) inserts into a Supabase `waitlist` table.
Feature recipes live in [`features/`](features/README.md); read the matching one before driving.

Everything goes through one helper, `.claude/skills/verify-slash-landing/scripts/verify.sh` (run it from anywhere; it finds the repo).
Commands: `launch`, `doctor`, `shots`, `ref`, `sql`, `cleanup`. Run it with no argument for usage.

**Never touch the hosted database.** `launch` always sets `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the dev server's own environment, which beats any env file Next would load.
A static run points the URL at `http://127.0.0.1:9` (nothing listens; a submit fails fast and goes nowhere). A `--waitlist` run points it at the local stack `http://127.0.0.1:54721`.
`launch` and `doctor` refuse to continue when the URL is not loopback, and `doctor --waitlist` refuses the waitlist journey unless it is exactly the local stack.
Never read or copy an env file; `launch` refuses to start if the worktree has one.

## Launch

Prerequisites: `node_modules` present (`npm ci` once, in the repo). For `--waitlist` also:

- Docker: Colima (`colima status`, `colima start` if stopped; `colima stop` afterwards if nothing else needs it).
- The Supabase CLI. If it is not installed system-wide, install a throwaway copy outside the repo and point the helper at it: `npm install --prefix /path/outside/repo supabase@2` then `export SUPABASE_BIN_DIR=/path/outside/repo/node_modules/.bin`. Tested with 2.122.1.
- `psql` on `PATH`.

```bash
export VERIFY_STATE=/path/outside/repo/state                      # scratch; cleanup deletes it
export VERIFY_EVIDENCE=/path/outside/repo/evidence/run-$(date -u +%Y%m%dT%H%M%SZ)   # proof; cleanup never removes it
export CHROME_DEVTOOLS_AXI_SESSION=verify-sl                      # a browser of our own
V=.claude/skills/verify-slash-landing/scripts/verify.sh
$V launch              # static pages only: dev server on 127.0.0.1:3200 (VERIFY_PORT to change), about 10 s
$V launch --waitlist   # also a local Supabase (database, PostgREST, Kong) with scripts/001 and 002 applied, about 1-3 min cold
```

`--waitlist` creates a Supabase workdir under `$VERIFY_STATE`, with its own project id and ports 54720-54729, so it does not clash with another repo's default 543xx stack. It starts only Postgres, PostgREST and Kong, and applies `scripts/001-create-waitlist-table.sql` and `scripts/002-add-waitlist-rls-policies.sql` with `psql`.
The dev server starts in its own process group; the group id is saved to `$VERIFY_STATE/dev.pgid`.
**Ready** means `/` renders the home page (title text "The Spending Firewall"); with `--waitlist` the tables exist first. `launch` prints `✅ ready (mode=…)` only then.

## Doctor

```bash
$V doctor              # or: $V doctor --waitlist
```

Read-only; every line must be ✅ before you drive: the dev server group is alive, port 3200 is held by that group (ours, not someone else's), no env file in the worktree, the Supabase URL the dev server uses is local, `/` renders, and `/about /support /privacy /terms /glba-privacy /confirmed` answer 200.
With `--waitlist` it also requires the URL to be the local stack, PostgREST to be running, and the `waitlist` table to have its INSERT policy. Without it, the waitlist journey is refused.

## Drive

Harness: `chrome-devtools-axi` with `CHROME_DEVTOOLS_AXI_SESSION=verify-sl`.
One command per page and both widths (1280 wide desktop, 390 wide phone with mobile emulation):

```bash
$V shots /support support      # writes $VERIFY_EVIDENCE/support-desktop.png, support-phone.png and .aria.txt for each
```

Refs (`@g21:11_20`) go stale after every action; look each one up right before using it, by role and accessible name:

```bash
chrome-devtools-axi fill  "$($V ref 'textbox "Email address')" someone@example.com
chrome-devtools-axi click "$($V ref 'button "Join waitlist"')"
```

`ref` greps the current snapshot for the text and prints `@uid`. Routes: `/`, `/about`, `/support`, `/privacy`, `/terms`, `/glba-privacy`, `/confirmed`.

## Evidence

Proof standard:

- Drive the real user path in the browser; do not call the server action or REST API directly to make something happen.
- Capture the action and the resulting state: for the waitlist, a screenshot before, the form's message after, and the row from the local database.
- Read side effects back with `$V sql '<query>' <name>` (wrapped in `begin read only`; saved to `$VERIFY_EVIDENCE/<name>.txt`), before and after.
- Static pages: a screenshot and aria snapshot per page and width, plus the key text from the snapshot (headings, the footer links).

Where proof goes: `$VERIFY_EVIDENCE`, outside `$VERIFY_STATE` and outside the repo; the helper refuses otherwise. Record the feature file and entry point with each artifact. A journey that cannot run is reported as a failure with the command and the unmet precondition, never as verified through another path.

## Cleanup

```bash
$V cleanup
ls "$VERIFY_EVIDENCE"            # the proof must still be there
chrome-devtools-axi stop         # with CHROME_DEVTOOLS_AXI_SESSION still set: closes only our browser
```

`cleanup` kills the dev server's process group by the id `launch` recorded, never by process name; runs `supabase stop --no-backup` for this project's stack only (when `launch --waitlist` started one); deletes `$VERIFY_STATE`; keeps `$VERIFY_EVIDENCE`. It leaves Colima running; `colima stop` it yourself if you started it. Run `cleanup` after every failed attempt too.

## Gotchas

- **Full-page screenshots are unreliable** (`--full-page` can repeat or drop the top of the page, and lazy images can come back blank). `shots` instead emulates a viewport as tall as the document and takes a plain capture after a scroll-through; keep that method.
- **Reveals fire on scroll position** (`components/slash/reveal.tsx`), so `shots` scrolls through once before capturing.
- **The waitlist form clears its message after 5 s**: capture the screenshot or snapshot right after the click.
- **The home page has two waitlist forms** (hero and closing card). `ref 'textbox "Email address'` picks the first; the second has the placeholder name `you@email.com`.
- **No env file means a failed waitlist submit unless `--waitlist`**: a static run's submit shows "That didn't send. Try again." by design. That is the expected static result, not a defect.
- **`npm run build` while `npm run dev` runs breaks the dev server** (both write `.next`); do not build during a run.
- **`npm run lint` (`oxlint && eslint .`)** is not part of a run; the helper never calls it.
- **The Supabase anon key is derived, not read**: the local stack uses Supabase's published demo JWT secret, so the helper signs the well-known demo anon token. If a future CLI changes that secret, the REST insert answers 401 and the waitlist journey fails; fix `anon_key` in the helper.
- **`sed -i ''` and `lsof`** in the helper are macOS forms.

## Proved on

Mac Mini (Colima, Supabase CLI 2.122.1 from a throwaway npm install, Node 24, Next from `package-lock.json`): static launch, doctor, screenshots of every route at both widths, the waitlist journey on a local stack, cleanup, and the evidence still present afterwards. Not run on Linux or Docker Desktop.
