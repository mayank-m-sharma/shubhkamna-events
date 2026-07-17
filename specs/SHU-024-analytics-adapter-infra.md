# SHU-024 — Pluggable Analytics Adapter Infrastructure

**Wave:** 2 (global layout) · **Depends on:** [[SHU-008]]

**Status:**

- [ ] Not started
- [ ] Completed
- [x] deferred - **Not to be picked up**

**Explicitly deferred implementation** — this ticket builds the seam only;
actual GA4/Mixpanel wiring happens in a later, separate ticket once
credentials/requirements are provided.

## User story

As the site owner, I want to add Google Analytics or other tracking later
without a structural rewrite, so early decisions don't block future
measurement needs.

## Technical tasks

- A small provider-registry pattern: each analytics provider implements a
  common interface (`init`, `trackPageview`, `trackEvent`), loaded via
  `next/script` with an appropriate loading `strategy`.
- Env-var-gated: providers only load if their env var (e.g.
  `NEXT_PUBLIC_GA_ID`) is set, so the seam is inert until configured.
- A `useAnalytics` hook as the one call site components use — never import a
  vendor SDK directly from a component.

## Notes / acceptance criteria

- With no env vars set, zero analytics scripts load (verified in network
  tab) — the seam has no cost until used.
- Adding a real provider later is additive (new registry entry + env var),
  not a rewrite of call sites.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
