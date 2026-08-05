# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

## What this repo is

The marketing site for **theslash.app**, an unreleased iPhone spending-firewall app.
Next.js App Router + Tailwind v4 + shadcn/Radix, deployed on Vercel.
The whole public surface is `app/page.tsx` plus `/about`, `/privacy`, and `/terms`.
The header and footer are shared: `components/slash/site-header.tsx` owns the nav (add a tab to its `tabs` array, not to a page) and `components/slash/site-frame.tsx` owns the ambient wash and the footer.
`/privacy` and `/terms` predate that chrome and still render their own "Back to home" link instead.

Keep copy truthful to an unreleased product; do not invent claims the shipping app does not already make.
The About page's words live in the `intro` and `team` constants at the top of `app/about/page.tsx` so the owner can edit copy without touching layout.

**The landing page is deliberately three sections**, and its shortness is the design rather than an unfinished state.
Hero carrying the three tenets above the fold, what's inside, closing CTA.
It once had nine and taught the product five different ways across five sections that all walked the same experience; that over-explanation was cut on purpose, and the one-hue/three-states mechanic section went with it in review.
Adding a section back is a product decision, not a way to fill space.
The "why it exists" mission now lives on `/about`, for someone who already wants in and went looking for it.

## Design source of truth

The site's look is derived from the shipping iOS app, not authored independently.
The only valid sources are the app's own Swift and real captures of it:

- `/Users/jxschraut/firstmate/projects/slash/ios/spending-control-iOS-app/Shared/SlashTheme.swift` — the palette and type scale, verbatim. A **different clone, read-only, never modify it**.
- `Features/Home/HomeView.swift:342-399` in that clone — the spending-meter ruleset that `Meter` in `components/slash/phone.tsx` reproduces.
- `/Users/jxschraut/firstmate/data/slash-current-screens-x5/` — 22 simulator captures of the shipping app plus a written design report. Seven are committed, downscaled, at `public/app/*.jpg`; the trimmed page renders only `home-healthy` in the hero, and `Shot` in `components/slash/phone.tsx` still accepts all seven.

**`ios/design-reference/Design/**` is dead and must not be used.**
Those React/HTML prototypes never shipped: they define a green/amber/coral traffic light (`--slash-green-300`, `--slash-orange-400`) and a `#0D0D0D` canvas, none of which exist in the app.
A landing page rebuilt from them shipped once and had to be reverted.

**One chromatic voice.** Signal Purple `#B388FF` at three intensities on the `#0E0B22` canvas, with the `#FBFAFE`→`#5A527F` ink ramp carrying all structure.
Under / halfway / over are tones of that one hue plus the breach-and-hatch furniture, never a hue swap.
Introducing a green, amber, teal, or coral for "good" or "bad" is off-brand.

## Token conventions

`app/globals.css` is the only place colors, fonts, radii, and gradients are defined, via Tailwind v4 `@theme`.
Sections reference tokens (`text-ink-2`, `bg-surface`, `border-rule`, `bg-[image:var(--gradient-accent)]`) rather than raw hexes.

Three font families are wired in `app/layout.tsx` and each has a job, matching the app:
Inter (body and UI), Space Grotesk SemiBold (display and money), JetBrains Mono (uppercase eyebrows and inline numbers).
The app renders **no serif and no italic**, and neither does the site.
Headlines are sentence case with a terminal period; that full stop is the app's voice tic.

The app motifs live in `components/slash/` — the `/` mark, the shield glyph, the meter, the Access ring, and the phone frame. Reuse those rather than redrawing them.

**`Mark` in `components/slash/marks.tsx` is the site's only logo primitive**, and every Slash mark on the site goes through it: header, hero tenets, closing CTA, footer.
The element is always 1:2, width half the height, because every call site sizes against that box.
The bar itself is thin, `0.10 × height`, and inset within the box rather than filling it; that is a deliberate divergence from the iOS captures, which draw it at `0.30 × height`, because the heavy bar read chunky on the web.
The geometry and the reason are documented on the component; do not restore the heavier bar by citing the app screenshots.
The header once rendered the square app icon from `public/slash-logo.png` instead, which put a 1:1 badge beside the bare 1:2 slash everywhere else; that raster and an off-ratio `public/logo.png` were deleted so there is nothing left to reach for.
Never introduce a logo `<img>` or hand-set SVG; the favicon is the separate iOS artwork at `app/icon.png` and is not the site's mark.

## Sharp edges

- **Scroll reveals must never gate visibility on JS.** `components/slash/reveal.tsx` renders visible by default and only hides off-screen elements after hydration, and it reveals by scroll position rather than `IntersectionObserver`. An observer never fires for elements skipped by an instant jump (anchor links, restored scroll, scripted scrolling), which previously left whole mid-page sections stranded at `opacity: 0` in screenshots and for crawlers. Do not "simplify" this back to `whileInView`.
- **The phone mockups frame real captures, and draw their own status bar.** `PhoneShot` hides the top 170px of each capture behind a redrawn iOS status bar, because the simulator shots were taken charging and carry a green battery glyph that is not in the palette. All its internal metrics are container-query units, so the frame stays in proportion while shrinking to fit narrow viewports. Do not swap in fabricated app UI, and do not give the frame a fixed pixel width.
- **Full-page screenshots need a scroll-through first**, and at DPR 2 the capture tool can stitch a spurious repeat of the top of the page past the document end. Verify against `document.body.scrollHeight` before believing a duplicate is real.
- **`npm run lint` is broken** and predates the current work: ESLint 9 wants a flat `eslint.config.*` but the repo has `.eslintrc.json`. `npm run build` reports the same error and still succeeds. Typecheck with `npx tsc --noEmit`.
- The waitlist server action (`app/actions/waitlist.ts`) needs `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Without them locally the form still round-trips and renders its error state, so a failed submit locally is expected, not a regression.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
