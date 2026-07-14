# Slash Landing Page Redesign

Date: 2026-07-14
Status: Approved (visual mockup reviewed and signed off), implemented.

## Goal

Replace the vague "Spending Firewall" landing page with a product-first page that reflects what Slash actually is and does, while keeping the waitlist as the primary call to action (the product is pre-launch).

## Source of truth

The product facts come from the sibling repo `../slash`, primarily `docs/REQUIREMENTS.md` (v2.0) and `docs/app-review-notes.md`.
Slash is an iPhone app that blocks the user's chosen shopping apps when they exceed a self-set weekly spending limit.
It connects to a bank through Plaid, tracks shopping transactions, and enforces blocking through Apple Screen Time on the user's own device.
The escalation model is the distinctive mechanic: under 50 percent everything is open, at 50 percent a soft stage blocks apps but allows a one hour unlock after a one minute wait, and at 100 percent a hard stage locks apps until the weekly reset on Sunday at midnight Eastern.
The current period limit is locked once set.
It is self-monitoring, not parental controls, and it is privacy-first (no ads, no data selling, no tracking SDKs, encrypted bank tokens, on-device app selection, instant in-app account deletion).
Pricing is 2.99 dollars per month.

## Direction

Evolve the existing identity rather than reinventing it.
Keep the dark theme, the gradient italic "Slash" wordmark, Space Grotesk, and the glow and glass motifs.
Introduce the iOS app's teal-green money accent (`--color-money: #34d399`) for spend and savings figures so the site and app read as one brand.

## Page structure (single scrolling page)

1. Nav: wordmark plus a waitlist anchor link (link hidden on mobile since the hero form is immediately below).
2. Hero: concrete headline "Blocks your shopping apps when you overspend", supporting subhead, the waitlist form, a short trust line, and an iPhone mockup showing the spend-vs-limit ring.
3. Problem: one tight, evolved line about spending before thinking.
4. How it works: three steps (set your weekly limit, connect your bank, cross the line and apps lock), paired with a phone mockup showing the soft-block state.
5. The mechanic: the Under, Soft, Hard escalation shown on a progress track plus three state cards. This is the differentiator.
6. Trust and privacy: a six-item guarantee grid, with a link to the privacy policy.
7. Savings payoff: the lifetime-savings framing.
8. Final call to action: the waitlist again with honest specs (iPhone, iOS 17 plus, 2.99 dollars per month, launching soon).
9. Footer: Privacy, Terms, LinkedIn, Contact.

## Implementation notes

- `app/page.tsx` rebuilt as the client component, reusing `WaitlistForm` and `CursorTrail`, animated with framer-motion, icons from lucide-react.
- Phone mockups are built in code (no real App Store screenshots exist yet): a reusable `Phone` frame, a `SpendRing` using a conic gradient, a `StatusBar`, and `Transaction` rows.
- `WaitlistForm` restyled with a gradient button and a refined input to match the new look.
- `--color-money` token added to the Tailwind v4 `@theme` block in `app/globals.css`.
- `app/terms/page.tsx` added, mirroring the `app/privacy/page.tsx` styling, with the terms content from `../slash/docs/terms-of-use.md`. Legal entity, effective date, and jurisdiction remain visible placeholders.
- Page metadata in `app/layout.tsx` updated to the concrete positioning.

## Verification

- `next build` passes; all routes prerender as static (`/`, `/privacy`, `/terms`).
- Desktop and true mobile (390px, emulated) renders confirmed via screenshots; no horizontal overflow at mobile width.

## Open items (not blocking)

- Fill the legal placeholders on `/privacy` and `/terms` (legal entity, effective date, jurisdiction) when available.
- The savings figure and the phone mockup numbers are illustrative.
- The pre-existing `.eslintrc.json` circular-structure lint error is unrelated to this work and does not block the build.
