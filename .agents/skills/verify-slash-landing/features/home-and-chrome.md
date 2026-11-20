# Home and site chrome

## Sub-features
- Hero: headline "Set a weekly cap. Slash enforces it.", three tenets, waitlist form, the phone mockup of the real home-screen capture.
- "What's inside" section: three cards (spend tracking, blocking, Plaid), then the privacy trust line linking `/privacy`.
- Closing CTA with a second waitlist form.
- Shared header (`components/slash/site-header.tsx`): Slash mark, "About us" tab, "Join the waitlist" pill. Shared footer (`site-frame.tsx`): About us, Privacy, Terms, Consumer privacy notice, LinkedIn, Contact.

## How to get to it (user POV)
Open `https://theslash.app/`; locally `http://127.0.0.1:3200/`.

## Driving it with chrome-devtools-axi
```bash
$V shots / home
grep -E 'heading|link "(About us|Privacy|Terms|Consumer privacy notice|LinkedIn|Contact)"' "$VERIFY_EVIDENCE/home-desktop.aria.txt"
chrome-devtools-axi click "$($V ref 'link "About us"')"     # header tab; snapshot should show the About page
```
Proof: the screenshot at both widths shows the hero phone with its screen filled in, three cards, the closing card and the footer; the snapshot holds the h1 "Set a weekly cap. Slash enforces it." and every footer link with the expected `url=`.

## Gotchas
- A blank hero phone in a capture is a capture artifact (lazy image), not a defect: re-run `shots`, which waits before capturing.
- The footer's Contact points at `/support`; Privacy and Terms point at `/privacy` and `/terms`.
