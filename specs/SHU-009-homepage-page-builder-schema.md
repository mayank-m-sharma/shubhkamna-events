# SHU-009 — Sanity Schema: Homepage Page-Builder

**Wave:** 3 (homepage & content sections) · **Depends on:** [[SHU-008]]

## User story

As the site owner, I want to add, remove, and reorder sections on my
homepage (hero, services, gallery, testimonials, contact) myself, so the
page layout can evolve without a developer.

## Technical tasks

- `homePage` singleton schema with a `sections` array field, referencing a
  set of section document/object types (hero, services, gallery,
  testimonials, contact — defined in [[SHU-010]] through [[SHU-014]]).
- Studio array UI: drag-to-reorder, clear per-section-type previews so a
  non-technical editor can tell sections apart at a glance.

## Notes / acceptance criteria

- Adding/removing/reordering sections in Studio changes the live homepage
  with no code change.
- Schema validates that at least one section exists (empty homepage is
  disallowed).
