# SHU-007 — Sanity Schema: Footer + Footer Organism

**Wave:** 2 (global layout) · **Depends on:** [[SHU-005]]

## User story

As the site owner, I want my footer contact details, social links, and legal
links to be editable, so they stay current without a code change.

## Technical tasks

- `footerConfig` singleton schema: column groups (title + links), contact
  block (phone/email/address), social links (reuses [[SHU-003]] shape),
  copyright text (supports a live year via a computed value, not a
  hand-typed one).
- `Footer` organism composed from `NavLink`/`SocialLinksList` molecules.

## Notes / acceptance criteria

- Copyright year updates automatically (no annual content edit needed).
- Unit tests: renders CMS-driven columns/links, contact block optional
  fields degrade gracefully when empty.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
