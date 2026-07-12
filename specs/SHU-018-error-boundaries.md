# SHU-018 — 404 / Error Boundaries

**Wave:** 2 (global layout) · **Depends on:** [[SHU-008]]

**Status:**

- [x] Not started
- [ ] Completed

## User story

As a visitor who follows a broken or outdated link, I want a helpful, on-brand
"page not found" experience (not a raw error), so I can still find my way to
the real site.

## Technical tasks

- `not-found.tsx` (correct 404 status), `global-error.tsx` (correct 500
  handling), both using the design system (not raw HTML), with a link back
  to the homepage.
- Verify correct HTTP status codes are actually returned (not a 200 with
  "not found" text — a common accidental SEO foot-gun).

## Notes / acceptance criteria

- `curl -I` on a nonexistent path returns `404`.
- Error pages are on-brand (use theme tokens/atoms), not default Next.js
  boilerplate.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
