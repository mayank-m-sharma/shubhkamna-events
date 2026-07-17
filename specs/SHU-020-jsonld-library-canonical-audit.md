# SHU-020 — JSON-LD Library + Canonical Audit

**Wave:** 5 (SEO infra hardening) · **Depends on:** [[SHU-016]], [[SHU-017]]

**Status:**

- [x] Not started
- [ ] Completed

** Parent Epic:** [[SHU-034]] — SEO Hardening

## User story

As the site owner, I want rich search results (address, ratings-ready
markup, breadcrumbs) so my listing stands out and ranks better for local
searches.

## Technical tasks

- Expand `src/lib/seo/jsonLd.ts` beyond Organization: `LocalBusiness`,
  `BreadcrumbList`, `Service`/`Event` builders, composable per page.
- Full canonical-URL audit across every route (trailing slash consistency,
  no duplicate-content paths, `www` vs non-`www` decided once).

## Notes / acceptance criteria

- Each JSON-LD block validates against Google's Rich Results Test structure
  (manually spot-checked).
- No two distinct URLs serve identical primary content without one
  canonicalizing to the other.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
