# SHU-013 — Testimonials Organism

**Wave:** 3 (homepage & content sections) · **Depends on:** [[SHU-009]], [[SHU-005]], [[SHU-003]]

**Status:**

- [x] Not started
- [ ] Completed

## User story

As the site owner, I want to add and update client testimonials myself, so
social proof stays current as new events wrap up.

## Technical tasks

- `testimonialsSection` object schema: heading + array of testimonials
  (quote, author name, optional role/event type, optional photo, optional
  star rating — the reference site shows a fixed 5/5 rating per testimonial,
  see [[SHU-000]]'s audit §2.3).
- `Testimonials` organism: carousel or static grid (decide based on item
  count), respects `prefers-reduced-motion` (no forced auto-advance
  animation for users who've opted out), keyboard-navigable controls if a
  carousel.
- Optional "read more reviews" link, sourced from [[SHU-003]]'s `reviewUrl`/
  `reviewCount` fields — not hardcoded — omitted when unset.

## Notes / acceptance criteria

- No autoplay that can't be paused; respects reduced-motion.
- Unit tests: renders CMS items, handles 0/1/many gracefully.
- Schema fields match the testimonials content shape identified in
  [[SHU-000]]'s audit.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
