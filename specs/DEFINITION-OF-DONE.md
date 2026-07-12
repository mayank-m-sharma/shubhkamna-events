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

## How this is used

- Every implementation ticket's acceptance criteria includes: "Meets the
  project [Definition of Done](./DEFINITION-OF-DONE.md)."
- If a ticket's nature requires deviating from a rule here (e.g. an
  intentionally client-heavy interactive map), the ticket must say so
  explicitly and explain why — silence means the baseline applies.
