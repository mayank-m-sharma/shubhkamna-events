# SHU-017 — Dynamic Event/Service Detail Pages

**Wave:** 4 (additional pages) · **Depends on:** [[SHU-015]], [[SHU-011]]

**Status:**

- [ ] Not started
- [x] Completed

## User story

As a prospective client, I want a dedicated page per service (e.g.
"Wedding Planning") with more detail than the homepage card, so I can decide
if it fits my needs before enquiring.

## Technical tasks

- `service` document schema (title, slug, description, gallery, pricing
  notes if desired) — the detail-page counterpart to the summary card in
  [[SHU-011]].
- Dynamic route `[slug]`, `generateStaticParams`, per-page `generateMetadata`
  and `Event`/`Service`-appropriate JSON-LD.
- Readable slugs (kebab-case, editor-controlled with a sensible auto-slugify
  default).

## Notes / acceptance criteria

- 404s correctly (see [[SHU-018]]) for unknown slugs.
- Each detail page has a unique canonical URL and unique title/description.
- Detail-page fields match the service/detail content shape identified in
  [[SHU-000]]'s audit.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
