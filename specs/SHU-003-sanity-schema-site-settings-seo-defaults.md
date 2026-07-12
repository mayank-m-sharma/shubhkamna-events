# SHU-003 — Sanity Schema: Full Site Settings & Global SEO Defaults

**Wave:** 1 (design system foundation) · **Depends on:** [[SHU-001]]

**Status:**

- [ ] Not started
- [x] Completed

## User story

As the site owner, I want to set my logo, favicon, social links, and default
search-engine appearance once, so every page looks and shares consistently
without per-page setup.

## Technical tasks

- Extend SHU-001's minimal `siteSettings` singleton: logo (image, with
  hotspot), favicon, default OG/share image, social links (array of
  platform + URL), organization JSON-LD fields (legal name, address, phone),
  default meta title template and description.
- Add a `whatsappNumber` field (single source of truth for [[SHU-030]]'s
  global WhatsApp CTAs) and review-trust fields — `reviewRating` (number),
  `reviewCount` (number), `reviewUrl` (external link) — reused by
  [[SHU-010]]'s hero badge, [[SHU-013]]'s testimonials link, and
  [[SHU-031]]'s stats strip, per [[SHU-000]]'s audit findings on the
  reference site's repeated review-trust elements.
- Add `@sanity/image-url` and a `urlFor()` helper (first real image usage in
  the project).
- Extend the Zod schema and `buildMetadata`/`buildOrganizationJsonLd` helpers
  to consume the new fields, with per-page override capability.

## Notes / acceptance criteria

- Logo/favicon render from Sanity, responsive and optimized via
  `next/image`.
- Organization JSON-LD includes address/phone when present, omits cleanly
  when not.
- All new fields have Studio field descriptions written for a non-technical
  editor.
- Default meta title template/description reflect [[SHU-000]]'s findings
  where the reference site suggests a sensible starting point.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
