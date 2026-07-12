# SHU-004 — Design System Atoms

**Wave:** 1 (design system foundation) · **Depends on:** [[SHU-002]]

## User story

As a developer building future sections, I want a small set of consistent,
tested, CMS-data-only building blocks, so every organism looks consistent
without re-implementing buttons and text styles each time.

## Technical tasks

- `Button` (variants: primary/secondary/ghost; renders `<button>` or
  `<Link>` depending on `href`), `Icon` (wraps `@sanity/icons` or inline SVG
  set), `Image` (wraps `next/image` + Sanity `urlFor`, enforces `alt` prop),
  `Link` (wraps `next/link`, handles external links with
  `rel="noopener noreferrer"` and a visual external-link affordance).
- Extend existing `Heading`/`Text` with any missing variants surfaced by
  real usage in later tickets (don't speculatively expand now).
- Unit tests per atom: render, prop variants, a11y attributes present.

## Notes / acceptance criteria

- Zero hardcoded copy or literal color/font values in any atom.
- Every atom is presentational only — no data fetching, no CMS client
  imports.
- `Image` fails a prop-types/TS check if `alt` is omitted (enforces
  `jsx-a11y/alt-text` at the type level, not just lint level).
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
