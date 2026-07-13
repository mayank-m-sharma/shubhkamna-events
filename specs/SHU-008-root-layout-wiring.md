# SHU-008 — Root Layout Wiring (Header + Footer)

**Wave:** 2 (global layout) · **Depends on:** [[SHU-006]], [[SHU-007]]

**Status:**

- [ ] Not started
- [x] Completed

## User story

As a site visitor, I want consistent navigation and footer information on
every page, so I can always find my way around and contact the business.

## Technical tasks

- Wire `Header`/`Footer` into `src/app/layout.tsx` (skip the `/studio`
  segment — Studio has its own chrome).
- Skip-to-content link targets the actual `<main>` now wrapped by real nav
  landmarks; verify landmark uniqueness (`header`, `nav`, `main`, `footer`
  each appear once).
- Focus management: route changes move focus to `<main>` for screen reader
  users (App Router doesn't do this by default).

## Notes / acceptance criteria

- Only one `<h1>` per page still holds (Header must not introduce a second
  one).
- Lighthouse/axe: no landmark or heading-order violations introduced.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
