# SHU-023 — Accessibility Audit Pass

**Wave:** 6 (performance & accessibility hardening) · **Depends on:** [[SHU-016]], [[SHU-017]]

## User story

As a visitor using a screen reader or keyboard-only navigation, I want the
entire site to be usable, not just individually-accessible components.

## Technical tasks

- Integrate `jest-axe` into the Jest suite for automated a11y regression
  checks on every organism/page.
- Full keyboard-only pass across every page (tab order, focus visibility,
  no keyboard traps).
- Color-contrast validation against whatever palette is currently configured
  in [[SHU-002]] — re-runnable, since the owner can change colors any time.

## Notes / acceptance criteria

- `jest-axe` runs in CI (via the existing test suite) with zero violations.
- Documented process for re-checking contrast after a theme change (since
  the owner controls colors independently of any deploy).
