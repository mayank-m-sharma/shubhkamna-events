# SHU-015 — Page-Builder Renderer + ISR

**Wave:** 3 (homepage & content sections) · **Depends on:** [[SHU-010]], [[SHU-011]], [[SHU-012]], [[SHU-013]], [[SHU-014]]

## User story

As the site owner, I want my published changes to appear on the live site
within moments, without a manual redeploy, so editing feels immediate.

## Technical tasks

- A renderer that maps each `homePage.sections[].{_type}` to its
  corresponding organism (a lookup table, not a chain of `if`/`switch`
  branches, so adding a new section type later is a one-line registration).
- Incremental Static Regeneration with a Sanity webhook calling a Next.js
  revalidation route (`revalidateTag` / `revalidatePath`) on publish.
- Unknown/unregistered section `_type` fails loudly in development, is
  skipped silently in production (never crashes the page for one bad
  section).

## Notes / acceptance criteria

- Publishing a change in Studio reflects on the live homepage within the
  webhook's round-trip time (no manual redeploy).
- Adding a new section type in a future ticket requires no changes to this
  renderer's core logic, only a new registry entry.
