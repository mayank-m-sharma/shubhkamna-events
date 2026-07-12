# SHU-021 — OG/Twitter Image Generation

**Wave:** 5 (SEO infra hardening) · **Depends on:** [[SHU-003]]

**Status:**

- [x] Not started
- [ ] Completed

## User story

As the site owner, I want an attractive preview image when my links are
shared on WhatsApp/Facebook/Twitter, so shared links look professional.

## Technical tasks

- Per-page OG image: use the CMS-supplied share image when set (from
  [[SHU-003]]/[[SHU-017]]), otherwise generate one dynamically via Next's
  `ImageResponse` (`opengraph-image.tsx`) using the page title + theme
  tokens.

## Notes / acceptance criteria

- Every page has a valid `og:image` and `twitter:image` at the recommended
  dimensions.
- Falls back sensibly with zero CMS images configured.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
