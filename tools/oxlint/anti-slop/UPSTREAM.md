# anti-slop provenance

Vendored from https://github.com/dmmulroy/anti-slop at revision `13909c9e07590f5a85d93c62712259fe14a883f7` (2026-10-13).
`src/` was copied to this directory unchanged, with the upstream `LICENSE` (MIT).
The Effect rule group (`effect/`) was left out because this repo does not use Effect.
`oxlint` and `@oxlint/plugins` are pinned together at exactly `1.93.0`.

## Rule measurements

Measured on the repo as of this change, before any fixes.
Every generic rule is enabled as an error in `oxlint.config.ts`; none is deferred.

| Rule | Hits | Outcome |
| --- | --- | --- |
| `oxc/no-accumulating-spread` | 0 | enabled |
| `no-array-filter-map` | 0 | enabled |
| `no-reduce-accumulator-copy` | 0 | enabled |
| `no-chained-type-assertions` | 0 | enabled |
| `no-conditional-empty-object-spread` | 0 | enabled |
| `no-known-value-widening` | 0 | enabled |
| `no-module-mocking` | 0 | enabled |
| `no-object-parameters` | 0 | enabled |
| `no-reflect-apply` | 0 | enabled |
| `no-reflect-get` | 0 | enabled |
| `no-runtime-typeof` | 0 | enabled |
| `no-shape-in-symbol-names` | 0 | enabled |
| `no-unknown-parameters` | 0 | enabled |
| `no-unknown-returns` | 0 | enabled |
| `no-unknown-type-aliases` | 0 | enabled |
| `no-unsafe-dictionary-type` | 1 | fixed, enabled |
| `no-widen-then-assert` | 0 | enabled |
| `require-readable-spacing` | 20 | whitespace-only autofix, enabled |
| `require-safety-comment-for-type-assertion` | 1 | justified in place, enabled |

Fixes:

- `no-unsafe-dictionary-type`: `Reveal` in `components/slash/reveal.tsx` took `Record<string, unknown>` for pass-through props; it now takes `HTMLAttributes<HTMLElement>`.
- `require-safety-comment-for-type-assertion`: the `--reveal-delay` custom property cast in `Reveal` now carries a `SAFETY:` justification.
- `require-readable-spacing`: `oxlint --fix` added blank lines in 8 files, whitespace only.
- Oxlint's default-on `no-unused-vars` also found the unused `SubHeading` in `app/terms/page.tsx`; it was deleted (no rendered output changes).
