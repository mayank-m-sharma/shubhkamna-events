# SHU-031 — Trust Badges / Stats Strip Section

**Wave:** 3 (homepage & content sections) · **Depends on:** [[SHU-009]], [[SHU-003]]

**Status:**

- [ ] Not started
- [ ] Completed

## User story

As the site owner, I want to show credibility stats (reviews, years of
experience, events delivered) near the top of my homepage, so new visitors
trust the business before reading further.

## Context

Not covered by any ticket prior to [[SHU-000]]'s audit. The reference site
repeats a 4-item stat strip ("50+ Verified Reviews", "5.0★ Google Rating",
"24/7 Open All Days", "1000+ Happy Events") on both the homepage (between
hero and about) and the Portfolio page — see
`docs/reference-site-audit.md` §2.3/§2.5/§4 item 2b. The review rating/count
also recurs elsewhere (hero badge, testimonials section) as the same
underlying data, so it belongs in site settings as a single source of
truth, not retyped per section.

## Technical tasks

- Extend [[SHU-003]]'s site settings with review fields: `reviewRating`
  (number), `reviewCount` (number), `reviewUrl` (external link to the
  reviews platform) — consumed by this section, [[SHU-010]]'s hero badge,
  and [[SHU-013]]'s testimonials "read more reviews" link, so all three stay
  in sync when the owner updates one place.
- `statsSection` object schema: optional heading + array of stat items
  (value string, e.g. "1000+", label string, e.g. "Happy Events") — generic,
  not limited to review data, so the owner can add/remove/reorder any stat.
- `Stats` organism: responsive row/grid of stat items; register as a
  page-builder section type alongside [[SHU-009]]'s existing section types.

## Notes / acceptance criteria

- Unit tests: renders N stat items, handles 0/1/many gracefully.
- Updating `reviewRating`/`reviewCount` in Studio updates every place that
  displays it (stats strip, hero badge, testimonials link) with no code
  change.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
