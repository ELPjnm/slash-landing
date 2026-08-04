# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

## What this repo is

The marketing site for **theslash.app**, an unreleased iPhone spending-firewall app.
Next.js App Router + Tailwind v4 + shadcn/Radix, deployed on Vercel.
The whole public surface is `app/page.tsx` plus `/privacy` and `/terms`.

Keep copy truthful to an unreleased product; do not invent claims the app and the design reference do not already make.

## Design source of truth

The site's look is derived from the iOS app, not authored independently.
The app ships its own design reference at `/Users/jxschraut/firstmate/projects/slash/ios/design-reference/Design/` — a **different clone, read-only, never modify it**:

- `slash-badge/c-base.jsx` — the dark "Badge" palette and type primitives the site actually mirrors (`CMark`, `CMicro`, `CSerif`, `CHead`, `CNum`, `CCTA`).
- `slash-badge/c-home.jsx` — the home screen the hero phone mockup reproduces.
- `BlockShield.jsx` / `components/BlockTiers.jsx` — the block-screen shield icons and overlay gradients.
- `flow-b/slash-tokens.css` — radius and type scales.

When the app's design moves, re-derive `app/globals.css` from these rather than hand-tuning hexes in components.

## Token conventions

`app/globals.css` is the only place colors, fonts, radii, and gradients are defined, via Tailwind v4 `@theme`.
Sections reference tokens (`text-ink-2`, `bg-surface`, `border-rule`, `bg-[image:var(--gradient-purple)]`) rather than raw hexes.

Four font families are wired in `app/layout.tsx` and each has a job, matching the app:
Inter (body), Space Grotesk (display + numerals), Instrument Serif (one italic moment per section), JetBrains Mono (numeric badges).

The app motifs live in `components/slash/` — the `/` mark, shield icons, the streak/progress ring, the phone frame and its screens. Reuse those rather than redrawing them.

## Sharp edges

- **Scroll reveals must never gate visibility on JS.** `components/slash/reveal.tsx` renders visible by default and only hides off-screen elements after hydration, and it reveals by scroll position rather than `IntersectionObserver`. An observer never fires for elements skipped by an instant jump (anchor links, restored scroll, scripted scrolling), which previously left whole mid-page sections stranded at `opacity: 0` in screenshots and for crawlers. Do not "simplify" this back to `whileInView`.
- **Full-page screenshots need a scroll-through first**, and at DPR 2 the capture tool can stitch a spurious repeat of the top of the page past the document end. Verify against `document.body.scrollHeight` before believing a duplicate is real.
- **`npm run lint` is broken** and predates the current work: ESLint 9 wants a flat `eslint.config.*` but the repo has `.eslintrc.json`. `npm run build` reports the same error and still succeeds. Typecheck with `npx tsc --noEmit`.
- The waitlist server action (`app/actions/waitlist.ts`) needs `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Without them locally the form still round-trips and renders its error state, so a failed submit locally is expected, not a regression.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
