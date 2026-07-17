# SHU-022 — Final Quality Gate: Lighthouse CI + Whole-Site Regression

**Wave:** 7 (final gate) · **Depends on:** [[SHU-016]], [[SHU-017]], [[SHU-019]], [[SHU-020]], [[SHU-021]]

**Status:**

- [x] Not started
- [ ] Completed

** Parent Epic:** [[SHU-035]] — Performance & Accessibility Hardening

This is **not** where accessibility/performance/SEO get addressed for the
first time — every ticket since [[SHU-001]] is already required to meet the
[Definition of Done](./DEFINITION-OF-DONE.md) (a11y, CWV, SEO baseline) as
part of its own acceptance criteria. This ticket wires the automated
enforcement and does one final, whole-site pass now that every page/route
exists, to catch anything that only shows up at the full-site level
(cross-page bundle bloat, a regression introduced by a later ticket, a
contrast issue from a theme change made after an earlier ticket shipped).

## User story

As the site owner, I want an automated gate that keeps the site fast and
accessible on every future change, not just at initial launch, so quality
doesn't quietly erode as content and features get added later.

## Technical tasks

- Bundle analysis (`@next/bundle-analyzer` or similar) across the full
  route set — flag anything unexpectedly large, especially Sanity Studio
  dependencies bleeding into the public bundle.
- Lighthouse CI budget (LCP/CLS/INP, mobile profile) wired as an automated
  check — hard gate if feasible, informational at minimum, running on every
  future PR (not just once).
- One full-site regression pass: `jest-axe` across every organism/page (zero
  violations), full keyboard-only pass across every route, contrast check
  against whatever theme ([[SHU-002]]) is live at gate time.
- Document the re-check process for contrast/keyboard passes after a future
  theme change, since the owner can change colors independently of any
  deploy.

## Notes / acceptance criteria

- Lighthouse mobile scores: Performance ≥ 90 across every route, no
  CLS-causing images/fonts anywhere on the site.
- `jest-axe` runs in CI with zero violations across the full component/page
  set.
- Studio's dependencies are confirmed not to leak into the public-page
  client bundle (verified via bundle analysis, not assumption).
- The Lighthouse CI budget remains wired and enforced for all subsequent
  changes to the site, not just at this ticket's completion.
