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

## How this is used

- Every implementation ticket's acceptance criteria includes: "Meets the
  project [Definition of Done](./DEFINITION-OF-DONE.md)."
- If a ticket's nature requires deviating from a rule here (e.g. an
  intentionally client-heavy interactive map), the ticket must say so
  explicitly and explain why — silence means the baseline applies.
