# Unit Testing Steering (TDD)

This project follows **Test-Driven Development**: for every ticket, write
the failing test first, then the implementation that makes it pass — not
tests bolted on after the component already works.

## Stack

- Jest 30 + `next/jest` (SWC transform — no `ts-jest`) + React Testing
  Library for component tests.
- `jest-axe` wired into the Jest setup ([[SHU-001]]) — every organism and
  page-level component includes an axe assertion of zero violations as part
  of its test file, not as a separate audit pass later.

## What to test

- Test observable behavior and rendered output, not implementation details.
  Query by role/label/text (RTL's guiding principle), not by internal state,
  private methods, or CSS class names.
- Every component that receives CMS-shaped data must have tests for the
  realistic edge cases the specs call out: zero items, one item, many items,
  missing optional fields, and the documented fallback behavior when a
  singleton document is unpublished or fails Zod validation.
- Interactive components (mobile nav, lightbox, form, carousel) get
  behavioral tests: keyboard operability (Tab/Enter/Escape), focus
  management, and any stated "must not X" requirement (e.g. "no autoplay
  that can't be paused") as an explicit assertion, not an assumption.
- Server Actions / form submission logic (e.g. [[SHU-014]]'s contact form)
  are tested against the same Zod schema used at runtime — a test that
  hand-rolls a different validation shape than production code isn't
  testing the real contract.

## Structure & style

- Arrange–Act–Assert. Test names describe behavior: `renders N service cards
from CMS data`, not `test 1` or `works`.
- Co-locate test files next to the source file they cover
  (`Component.tsx` / `Component.test.tsx`).
- Mock only at the real boundary — the CMS fetch function/network layer.
  Don't mock a component's own internals or child components just to make a
  test pass; if that's necessary, the component's boundaries are probably
  wrong.
- Avoid snapshot tests as a primary strategy — they're brittle and don't
  express intent. Prefer explicit assertions on rendered content/attributes.
  A snapshot is acceptable only as a supplement, never the only assertion.

## Enforcement

- `pnpm lint`, `pnpm typecheck`, `pnpm test` must all pass before any commit
  — the Husky pre-commit hook blocks on any failure. Never bypass with
  `--no-verify`; if a hook fails, fix the root cause and recommit.
- A ticket is not "done" if its acceptance criteria describe behavior with
  no corresponding test asserting it.
