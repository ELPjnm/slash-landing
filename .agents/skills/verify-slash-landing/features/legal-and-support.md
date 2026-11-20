# Legal and support pages

## Sub-features
- `/privacy`: h1 "Slash Privacy Policy". `/terms`: "Slash Terms of Use". `/glba-privacy`: "Slash — U.S. Consumer Privacy Notice". `/support`: "Support", with the `mailto:support@theslash.app` link and links to `/privacy` and `/terms`.
- All four use the shared header and footer inside a `max-w-3xl` document column.

## How to get to it (user POV)
Footer links on every page (Privacy, Terms, Consumer privacy notice, Contact), plus the privacy trust line on the home page.

## Driving it with chrome-devtools-axi
```bash
for r in privacy:privacy terms:terms glba-privacy:glba support:support; do $V shots "/${r%%:*}" "${r#*:}"; done
grep 'heading' "$VERIFY_EVIDENCE/privacy-desktop.aria.txt" | head -3
grep 'mailto:support@theslash.app' "$VERIFY_EVIDENCE/support-desktop.aria.txt"
```
Proof: each page's h1 in its snapshot; the header and footer present; no horizontal scroll in the phone screenshot (width stays 390).

## Gotchas
- The legal pages are verbatim transcription from `/Users/jxschraut/Documents/Slash/app-store-submission/legal/`; verify they render, never judge or edit their wording here (see AGENTS.md).
- Long documents: the `shots` capture is a single very tall image; open it in slices if you need to read it.
