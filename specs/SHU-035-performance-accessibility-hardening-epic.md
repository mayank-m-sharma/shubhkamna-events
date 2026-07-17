# SHU-035 — Performance & Accessibility Hardening (Epic)

**Type:** Epic · **Bundles:** [[SHU-022]]

**Status:**

- [ ] Not started
- [ ] Completed
- [x] Deferred — not yet picked up

Groups the performance/accessibility/Core Web Vitals hardening ticket(s) so
they can be branched and worked as a single unit when picked up, per
steering/git-workflow.md's epic convention: one branch
(`shu-035-performance-accessibility-epic` or similar), one atomic commit
per real ticket inside. This file is not itself an implementable ticket —
no technical tasks or acceptance criteria of its own; each child ticket
keeps its own Status and Definition of Done.

Currently a single-ticket epic — [[SHU-022]] is the whole-site regression
gate (Lighthouse CI + re-verification) that wires enforcement for
accessibility/CWV/SEO baselines every ticket since [[SHU-001]] has already
been required to meet individually. Add rows here if a dedicated
performance/a11y ticket is created later.

## Child tickets

- [ ] [[SHU-022]] — Final Quality Gate: Lighthouse CI + Whole-Site Regression
