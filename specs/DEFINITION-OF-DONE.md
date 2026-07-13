# Definition of Done — Every Ticket

Accessibility, Core Web Vitals, and baseline SEO are not separate tickets in
this project — they are a standing checklist every implementation ticket
must satisfy before it's considered complete, enforced by the coding agent
at build time, not discovered in a late audit. A ticket's own "Notes /
acceptance criteria" section may call out ticket-specific nuances (e.g. "no
autoplay" on a carousel); this document is the baseline that applies
regardless of whether the ticket mentions it explicitly.

[[SHU-022]] is the one exception: a final, whole-site regression gate that
wires CI enforcement and re-verifies nothing regressed — it is not where
these concerns get addressed for the first time.

For the _how_, not just the _what_, see the topic-specific guides in
[`/steering`](../steering): [react.md](../steering/react.md),
[typescript.md](../steering/typescript.md),
[performance-optimization.md](../steering/performance-optimization.md),
[unit-tests.md](../steering/unit-tests.md),
[accessibility.md](../steering/accessibility.md),
[code-quality.md](../steering/code-quality.md),
[git-workflow.md](../steering/git-workflow.md).

## Accessibility

- Semantic HTML first (`header`/`nav`/`main`/`article`/`footer`), ARIA only
  to fill real gaps.
- Full keyboard operability for any interactive component: logical tab
  order, visible focus state, Enter/Space activation, Escape to close
  overlays, no keyboard traps.
- Every image has meaningful alt text (empty `alt=""` only for genuinely
  decorative images) — enforced at the schema/type level where possible, not
  just lint.
- Color/contrast pairs meet WCAG AA against the _currently configured_
  theme ([[SHU-002]]), since the owner can change colors independently of
  any deploy.
- New organisms/pages ship with a `jest-axe` check (tooling set up in
  [[SHU-001]]) asserting zero violations.

## Visual & Interaction Design

Added after [[SHU-006]]/[[SHU-007]] shipped with default browser underlines
and no hover states — automated checks (lint/tests/axe) don't catch "looks
unfinished," so this section makes that an explicit, standing gate instead
of something caught ad hoc in review.

- Every interactive element (link, button, nav item, card, form control)
  has a deliberate hover **and** focus-visible state — never bare browser
  default, and never no state at all. If an element is meant to look
  designed, nothing about it should visibly read as unstyled.
- Use the full token set [[SHU-000]]'s audit captured
  (`docs/reference-site-audit.md` §3), not a narrower subset chosen for
  convenience during schema translation. If a ticket needs a token
  `siteTheme`/`_tokens.scss` doesn't have yet (a background variant, a
  radius step, a motion value), add it there — don't work around its
  absence or hardcode a literal value instead.
- Motion (transitions/animations) draws from a shared token vocabulary
  (`--transition-*`, easing), not ad hoc per-component durations, and
  always respects `prefers-reduced-motion`.
- Before marking a UI ticket done, do a live visual check against the
  reference site (or the audit's description of it) for that section, not
  just automated checks — axe/lint/tests catch correctness, not whether it
  looks finished.

## Performance / Core Web Vitals

- Images: explicit dimensions or `fill` with a sized parent, correct `sizes`,
  `priority`/`fetchPriority` only on genuine LCP candidates — never blanket.
- Fonts: loaded via `next/font` with `font-display: swap`, no
  layout-shift-causing swaps.
- No client component boundary (`"use client"`) wider than the interactive
  part actually requires.
- Nothing from Sanity Studio's dependency tree leaks into the public-page
  bundle.

## SEO baseline

- Unique `generateMetadata` (title, description) per route; canonical URL
  set.
- Correct HTTP status codes (no soft-404s, no 200 on error paths).
- New routes are reachable from `sitemap.ts` (or intentionally excluded with
  a noted reason, e.g. draft/preview paths).

## Reference-site parity tracking

[[SHU-000]] produces `docs/reference-parity-checklist.md` — a living table
mapping every section/page of the reference site
(https://dynamo-studio.github.io/Shubhkamna-Events-Demo/) to the ticket that
rebuilds it, with a Status column (`Not started` / `In progress` / `Done`).

- If a ticket implements a section/page listed in that checklist, updating
  its row to `Done` (with a one-line note — what was carried over, what was
  deliberately changed and why) is part of finishing the ticket, not an
  optional afterthought.
- This is what gives an at-a-glance answer to "how much of the reference
  site have we rebuilt so far" at any point in the project, without having
  to re-derive it from commit history.
- If implementation reveals a section the checklist doesn't list (something
  [[SHU-000]] missed), add a row rather than skipping the update.

## Content seeding

[[SHU-032]] establishes a one-time (repeatable, idempotent) seed script at
`scripts/seed/` that publishes [[SHU-000]]'s audit content into Sanity as
real documents — not just Studio `initialValue` defaults, which only
pre-fill a new document's form and never publish anything by themselves.

- If a ticket introduces a new content schema (a Sanity document/object
  type — a new section type, page singleton, or content document), adding
  that schema's real seed data (sourced from
  `docs/reference-site-audit.md`) to the seed script is part of finishing
  the ticket, not an optional follow-up.
- If the audit has no real content for a new field/shape (e.g. an About
  page founder bio the reference site never had), say so explicitly in the
  ticket rather than inventing placeholder copy to seed with.
- This is what keeps "real data flowing into the app as each ticket lands"
  true throughout the project, instead of the seed script going stale the
  first time a schema changes.

## How this is used

- Every implementation ticket's acceptance criteria includes: "Meets the
  project [Definition of Done](./DEFINITION-OF-DONE.md)."
- If a ticket's nature requires deviating from a rule here (e.g. an
  intentionally client-heavy interactive map), the ticket must say so
  explicitly and explain why — silence means the baseline applies.
