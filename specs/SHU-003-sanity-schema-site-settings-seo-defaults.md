# SHU-003 — Sanity Schema: Full Site Settings & Global SEO Defaults

**Wave:** 1 (design system foundation) · **Depends on:** [[SHU-001]]

## User story

As the site owner, I want to set my logo, favicon, social links, and default
search-engine appearance once, so every page looks and shares consistently
without per-page setup.

## Technical tasks

- Extend SHU-001's minimal `siteSettings` singleton: logo (image, with
  hotspot), favicon, default OG/share image, social links (array of
  platform + URL), organization JSON-LD fields (legal name, address, phone),
  default meta title template and description.
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
