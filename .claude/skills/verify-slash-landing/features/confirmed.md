# Email confirmation landing

## Sub-features
- Default: h1 "Email confirmed" and "Your Slash account is ready. Open the Slash app on your iPhone and log in."
- Expired link: when the URL fragment contains `error=`, h1 "This link has expired" and "Open the Slash app and log in…". The fragment is then removed from the address bar.

## How to get to it (user POV)
Supabase redirects here after a sign-up confirmation link is clicked; locally open `http://127.0.0.1:3200/confirmed`.

## Driving it with chrome-devtools-axi
```bash
$V shots /confirmed confirmed
grep 'heading "Email confirmed"' "$VERIFY_EVIDENCE/confirmed-desktop.aria.txt"
chrome-devtools-axi open about:blank      # a hash-only change on an already-loaded /confirmed does not re-run the component
chrome-devtools-axi open 'http://127.0.0.1:3200/confirmed#error=access_denied&error_code=otp_expired'
chrome-devtools-axi wait 1000 ; chrome-devtools-axi snapshot | grep -E 'heading|url='    # "This link has expired", url=/confirmed with no fragment
chrome-devtools-axi screenshot "$VERIFY_EVIDENCE/confirmed-expired.png"
```
Proof: both headings, and the page URL after the expired visit has no `#...`.

## Gotchas
- The fragment is fake test data; never put a real token in it.
- Open `about:blank` first. Going from `/confirmed` to `/confirmed#error=…` is a same-page hash change, so the page never re-reads the fragment and still says "Email confirmed" (a real redirect is a full load).
