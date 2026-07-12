# SHU-005 — Design System Molecules

**Wave:** 1 (design system foundation) · **Depends on:** [[SHU-004]]

## User story

As a developer, I want composed-but-still-generic UI pieces (nav link, social
icon list, form field, card), so header/footer/section tickets compose them
instead of hand-rolling markup each time.

## Technical tasks

- `NavLink` (active-state aware, wraps `Link` atom), `SocialLinksList`
  (renders from the `socialLinks` array shape introduced in [[SHU-003]]),
  `FormField` (label + input/textarea + error message, wraps native form
  controls, used by [[SHU-014]]), `Card` (image + heading + text + optional
  link, used by [[SHU-011]]/[[SHU-012]]).
- Unit tests per molecule.

## Notes / acceptance criteria

- Each molecule composes only atoms + other molecules — no direct DOM
  primitives beyond layout wrappers.
- Props shape mirrors the corresponding Sanity object type 1:1 so organisms
  can pass CMS data through with minimal mapping.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
