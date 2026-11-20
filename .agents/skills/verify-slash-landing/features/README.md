# Feature map: slash-landing

One file per user-facing feature. Read the matching file before driving; the harness and helper are in [`../SKILL.md`](../SKILL.md).
Seeded from 60-day churn and the route list on 2026-11-20. `/maintain-verification-skill` keeps it honest.

| Feature | Entry point | Needs |
|---|---|---|
| [Home and site chrome](home-and-chrome.md) | `/` | static launch |
| [Waitlist form](waitlist.md) | `/` (hero and closing card) | `launch --waitlist` |
| [Email confirmation landing](confirmed.md) | `/confirmed` | static launch |
| [Legal and support pages](legal-and-support.md) | `/privacy`, `/terms`, `/glba-privacy`, `/support` | static launch |
| About page | `/about` | static launch; not seeded (mission-only copy, covered by `shots /about about`) |

Shared baseline for every file: `launch`, `doctor`, drive, `cleanup`, with `VERIFY_EVIDENCE` set. Every static page also goes through `$V shots <route> <slug>` for desktop and phone captures.
