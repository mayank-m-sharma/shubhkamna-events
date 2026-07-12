# SHU-016 — About Page

**Wave:** 4 (additional pages) · **Depends on:** [[SHU-015]]

## User story

As a prospective client, I want to learn about the business and the people
behind it, so I feel confident booking.

## Technical tasks

- `aboutPage` singleton schema (reuses the section-array pattern from
  [[SHU-009]] where it fits, plus any About-specific fields like founder
  bio/photo).
- Route + `generateMetadata`, breadcrumb JSON-LD.

## Notes / acceptance criteria

- Reuses existing atoms/molecules/organisms; no new one-off components
  unless the content genuinely requires it.
- Unique, keyword-relevant title/description distinct from the homepage.
