# SHU-010 — Hero Organism

**Wave:** 3 (homepage & content sections) · **Depends on:** [[SHU-009]], [[SHU-003]]

**Status:**

- [ ] Not started
- [x] Completed

## User story

As the site owner, I want to set my homepage's headline, subtext, background
image/video, and call-to-action button, so the first impression matches my
current promotions or season.

## Technical tasks

- `heroSection` object schema: headline, subhead, background image
  (with mobile-specific crop via hotspot) or video, a primary CTA button
  (label + link) and an optional secondary CTA button (label + link) — the
  reference site's hero uses a primary+secondary CTA pair, not a single
  button (see [[SHU-000]]'s audit §2.3/§4).
- `Hero` organism: responsive background handling, `next/image` `priority`
  loading for LCP, respects `prefers-reduced-motion` if video is used.
- Optional floating trust badge (e.g. "5.0★ Google Rating | 50+ Reviews"),
  sourced from [[SHU-003]]'s `reviewRating`/`reviewCount` fields — not
  hardcoded — and omitted entirely when those fields are unset.

## Notes / acceptance criteria

- LCP element is the hero heading/image, loaded with priority, no layout
  shift (explicit dimensions/aspect-ratio).
- Unit tests: renders CMS copy, primary CTA link present, secondary CTA
  renders only when set, falls back gracefully with no video/image set.
- Schema fields match the hero content shape identified in [[SHU-000]]'s
  audit.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
