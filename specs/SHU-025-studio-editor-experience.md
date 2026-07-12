# SHU-025 — Studio Desk Structure & Editor Experience

**Wave:** 6 (CMS editor experience) · **Depends on:** all schema tickets ([[SHU-002]]–[[SHU-017]])

**Status:**

- [x] Not started
- [ ] Completed

## User story

As a non-technical site owner, I want the CMS editing screen to be simple
and hard to misuse, so I can confidently update my own site.

## Technical tasks

- Custom desk structure (`structureTool`) grouping documents sensibly
  (Site Settings, Theme, Pages, Services, rather than a flat generic list),
  hiding "create new" for singleton document types.
- Preview panes showing recognizable thumbnails/titles instead of raw
  document IDs.
- Field-level descriptions/help text audited across every schema for plain,
  non-technical language.

## Notes / acceptance criteria

- Opening Studio for the first time, an untrained editor can find "edit my
  homepage" or "change my logo" without guidance.
- No singleton type can accidentally be duplicated via the UI.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
