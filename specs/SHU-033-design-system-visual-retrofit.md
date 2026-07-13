# SHU-033 — Design System Visual & Interaction Retrofit

**Wave:** 1 (design system foundation) · **Depends on:** [[SHU-002]], [[SHU-004]], [[SHU-006]], [[SHU-007]]

**Status:**

- [ ] Not started
- [x] Completed

**Should run before [[SHU-009]]** (or any further organism ticket) —
everything built after this ticket inherits its fixes for free; everything
built before it (Header, Footer, and the atoms/tokens under them) currently
doesn't have them and needs retrofitting.

## Why this ticket exists

[[SHU-006]] and [[SHU-007]] shipped structurally and content-correct, but
visually underbaked compared to the reference site: every link renders with
the browser's default underline, no interactive element has a hover or
focus-visible state, and the Footer can't use the reference's dark
background because that token was never added to the schema. None of this
was caught by any ticket's acceptance criteria or by
[Definition of Done](./DEFINITION-OF-DONE.md), because until now DoD had no
section covering visual/interaction craftsmanship — see this ticket's
companion change adding one. This ticket fixes what's already built; the
DoD change keeps it from recurring on every ticket after this one.

## User story

As the site owner, I want the components already built (Header, Footer,
buttons, links, cards) to look as polished as the reference design language
they were audited from, so the site doesn't look unfinished while later
sections are still being built.

## Technical tasks

- `Link` atom: remove the default browser underline (`text-decoration:
none`), add a deliberate hover affordance instead (not "no styling").
- Add visible hover + focus-visible states to `Button`, `Link`, `NavLink`,
  and `Card`, driven by new shared motion tokens (below) — not per-component
  ad hoc durations.
- Extend the `siteTheme` schema + `src/styles/_tokens.scss` with tokens
  [[SHU-000]]'s audit captured but [[SHU-002]] didn't translate into
  fields:
  - A dark background variant (`colorBackgroundDark`, ~`#121320` per the
    audit) for sections like the footer that use the reference's dark mode
    treatment.
  - A fuller border-radius scale including a pill/full radius
    (`--radius-full`), matching the audit's documented `rounded-full`
    button language.
  - A small motion category: `--transition-fast` / `--transition-base` +
    a standard easing curve.
- Extend the `Icon` atom's hand-authored SVG set with `phone`, `location`,
  and a `logo` mark, matching the icon usage the audit documented for
  header/footer contact info — same inline-SVG pattern already established,
  no new dependency.
- Apply the new dark-background token to `Footer`; use the new
  phone/location icons in its contact block instead of plain text.
- Re-verify Header/Footer in a live preview against the reference
  screenshots after these changes — not just against literal acceptance
  criteria — per the new DoD "Visual & Interaction Design" section.

## Notes / acceptance criteria

- No link anywhere on the site has a default browser underline.
- Every interactive element has a visible, non-jarring hover and
  focus-visible state, built from the new motion tokens.
- Footer renders with the dark background variant and real icons in its
  contact block.
- All new tokens are consumed via CSS custom properties — no hardcoded hex
  values or literal durations, consistent with the existing "no hardcoded
  colors" rule.
- Existing Header/Footer/atom tests still pass; new tests cover the added
  hover/focus states and the new tokens' fallback values.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md), including
  its new Visual & Interaction Design section.
