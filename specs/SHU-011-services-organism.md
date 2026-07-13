# SHU-011 — Services / Offerings Organism

**Wave:** 3 (homepage & content sections) · **Depends on:** [[SHU-009]], [[SHU-005]]

**Status:**

- [ ] Not started
- [x] Completed

## User story

As the site owner, I want to list and update the event types/services I
offer (weddings, corporate, birthdays, etc.), with icons and descriptions, so
prospective clients see my current offerings.

## Technical tasks

- `servicesSection` object schema: section heading + array of service items
  (icon, title, short description, optional link to a detail page —
  see [[SHU-017]]).
- `Services` organism rendering a responsive grid of `Card` molecules.

## Notes / acceptance criteria

- Grid reflows correctly from 1 column (mobile) up to desktop.
- Unit tests: renders N CMS items, handles 0/1/many gracefully.
- Schema fields match the services content shape identified in [[SHU-000]]'s
  audit.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
