# SHU-019 — Dynamic Sitemap/Robots Hardening

**Wave:** 5 (SEO infra hardening) · **Depends on:** [[SHU-016]], [[SHU-017]]

## User story

As the site owner, I want search engines to discover every real page and
ignore admin/draft pages, so my SEO reflects only what visitors should see.

## Technical tasks

- Extend `sitemap.ts` to include all static routes plus every published
  `service`/other dynamic slug, with accurate `lastModified` from Sanity's
  `_updatedAt`.
- Extend `robots.ts` rules if any new non-public routes appear.
- Add `noindex` metadata to any preview/draft-mode rendering path (see
  [[SHU-026]]).

## Notes / acceptance criteria

- Every real page appears in `/sitemap.xml`; `/studio` and preview URLs
  never do.
- `lastModified` values are real, not hardcoded to build time.
