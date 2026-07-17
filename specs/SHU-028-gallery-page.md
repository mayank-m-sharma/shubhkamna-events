# SHU-028 — Standalone Gallery Page

**Wave:** 4 (additional pages) · **Depends on:** [[SHU-012]], [[SHU-015]]

**Status:**

- [ ] Not started
- [x] Completed

## User story

As a prospective client, I want to browse a full gallery of past events (not
just the homepage teaser), so I can judge the breadth and quality of work
before enquiring.

## Context

Not covered by any ticket prior to [[SHU-000]]'s audit. The reference site
has a dedicated Portfolio page (`portfolio.html`) with 20 images and a
category tag per image, distinct from the 5-image homepage gallery teaser
built in [[SHU-012]] — see `docs/reference-site-audit.md` §2.5/§4 item 3.
The reference page has no filter/tabs (all 20 shown at once) and, notably,
no lightbox or click affordance at all despite being a "showcase" — that's
one of the anti-patterns [[SHU-012]]'s accessible lightbox is meant to fix;
this page should reuse that same lightbox, not reinvent one.

## Technical tasks

- `galleryPage` singleton schema: heading, intro text, array of images
  (Sanity image with hotspot, required alt text, optional caption, optional
  category tag — same item shape as [[SHU-012]]'s `gallerySection`, reused
  rather than redefined).
- Route (e.g. `/gallery`), `generateMetadata`, breadcrumb JSON-LD.
- Reuses the `Gallery` organism and its accessible lightbox from [[SHU-012]]
  for the full grid; optional client-side category filter (progressive
  enhancement — grid remains fully usable/crawlable with JS disabled or
  before hydration).

## Notes / acceptance criteria

- Every image has editor-supplied alt text (schema-level required, not just
  lint).
- Reuses [[SHU-012]]'s lightbox/keyboard behavior; no separate one-off
  implementation.
- No CLS from images (explicit dimensions/aspect-ratio from Sanity's image
  metadata).
- Unique canonical URL and title/description distinct from the homepage
  gallery teaser.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
