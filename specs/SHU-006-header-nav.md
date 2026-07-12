# SHU-006 — Sanity Schema: Header/Nav + Header Organism

**Wave:** 2 (global layout) · **Depends on:** [[SHU-005]]

**Status:**

- [ ] Not started
- [x] Completed

## User story

As the site owner, I want to add, reorder, or rename my navigation menu items
myself, so I don't need a developer every time my service list changes.

## Technical tasks

- `headerConfig` singleton schema: logo override, ordered nav items (label +
  internal page reference or external URL), optional CTA button.
- `Header` organism: responsive (mobile-first), hamburger menu on small
  screens, keyboard-navigable, uses `useUIStore` (seeded in [[SHU-001]]) for
  the mobile-nav open/close state.
- Focus trap + Escape-to-close for the mobile menu overlay.

## Notes / acceptance criteria

- Full keyboard operability (tab order, Enter/Space activation, Escape to
  close).
- `react-hooks/exhaustive-deps` clean; no hardcoded nav items.
- Unit tests: renders CMS-driven items, toggles mobile state, closes on
  Escape/outside click.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
