# SHU-010 — Hero Organism

**Wave:** 3 (homepage & content sections) · **Depends on:** [[SHU-009]]

## User story

As the site owner, I want to set my homepage's headline, subtext, background
image/video, and call-to-action button, so the first impression matches my
current promotions or season.

## Technical tasks

- `heroSection` object schema: headline, subhead, background image
  (with mobile-specific crop via hotspot) or video, CTA button (label + link).
- `Hero` organism: responsive background handling, `next/image` `priority`
  loading for LCP, respects `prefers-reduced-motion` if video is used.

## Notes / acceptance criteria

- LCP element is the hero heading/image, loaded with priority, no layout
  shift (explicit dimensions/aspect-ratio).
- Unit tests: renders CMS copy, CTA link present, falls back gracefully with
  no video/image set.
- Schema fields match the hero content shape identified in [[SHU-000]]'s
  audit.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
