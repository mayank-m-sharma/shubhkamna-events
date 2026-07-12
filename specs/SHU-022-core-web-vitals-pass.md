# SHU-022 — Core Web Vitals Pass

**Wave:** 6 (performance & accessibility hardening) · **Depends on:** [[SHU-016]], [[SHU-017]]

## User story

As a visitor on a mobile connection, I want the site to load fast and not
jump around while loading, so I don't bounce before it's ready.

## Technical tasks

- Font loading audit: confirm CMS-selected fonts ([[SHU-002]]) load via
  `next/font` where possible, with `font-display: swap` and no CLS.
- Image audit: every image has explicit dimensions/`fill` with a sized
  parent, appropriate `sizes` attribute, `priority` only on true LCP
  candidates.
- Bundle analysis (`@next/bundle-analyzer` or similar) — flag anything
  unexpectedly large, especially from Sanity Studio bleeding into the public
  bundle.
- Establish a Lighthouse CI budget (informational at minimum; hard gate if
  feasible) for LCP/CLS/INP.

## Notes / acceptance criteria

- Lighthouse mobile scores: Performance ≥ 90, no CLS-causing images/fonts.
- Studio's dependencies are confirmed not to leak into the public-page
  client bundle (verify via bundle analysis, not assumption).
