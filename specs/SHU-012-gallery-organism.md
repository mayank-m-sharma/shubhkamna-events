# SHU-012 — Gallery / Portfolio Organism

**Wave:** 3 (homepage & content sections) · **Depends on:** [[SHU-009]], [[SHU-004]]

## User story

As the site owner, I want to upload and showcase photos from past events, so
new visitors can see the quality of my work.

## Technical tasks

- `gallerySection` object schema: heading + array of images (Sanity image
  with hotspot, alt text required per image).
- `Gallery` organism: responsive grid, lazy-loaded (`next/image`, below-fold),
  accessible lightbox (focus trap, Escape to close, arrow-key navigation,
  returns focus to the trigger on close).

## Notes / acceptance criteria

- Every image has editor-supplied alt text (schema-level required field, not
  just a lint rule).
- Lightbox fully keyboard-operable; doesn't trap focus when closed.
- No CLS from images (explicit width/height/aspect-ratio from Sanity's image
  metadata).
