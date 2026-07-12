# Accessibility Steering

Accessibility is part of the [Definition of Done](../specs/DEFINITION-OF-DONE.md)
for every ticket — it is not a dedicated audit ticket at the end of the
project. Build it in as you go.

## Semantic structure

- Use real HTML elements for their real purpose (`header`, `nav`, `main`,
  `article`, `footer`, `button`) — reach for ARIA only to fill a genuine gap
  semantic HTML can't cover.
- Exactly one `<h1>` per page; heading levels (`h1`–`h6`) never skip a level
  just for visual sizing — visual size is a CSS/theme-token concern, not a
  heading-level concern.
- Each landmark (`header`, `nav`, `main`, `footer`) appears once per page.

## Keyboard operability

- Every interactive element is reachable and operable by keyboard alone:
  logical tab order, visible focus state (never `outline: none` without a
  replacement focus style), Enter/Space activates buttons/links.
- Any overlay (mobile nav, lightbox, modal) traps focus while open, closes
  on Escape, and returns focus to the triggering element on close — never
  leaves a keyboard user stranded or drops them back at the top of the page.
- No keyboard traps outside of an intentionally-open overlay.

## Images & media

- Every image has meaningful `alt` text describing its content/purpose;
  purely decorative images use `alt=""` deliberately, not by omission.
  Where the schema allows it (e.g. [[SHU-012]]'s gallery), alt text is a
  required CMS field, not just a lint-enforced prop.
- Video/animation respects `prefers-reduced-motion`; nothing autoplays
  without a user-accessible pause control.

## Forms

- Every input has an associated, visible label (via `FormField` — see
  [[SHU-005]]).
- Errors are announced via `aria-live` and tied to their field with
  `aria-describedby` — a sighted-only red border is not sufficient error
  communication.
- A honeypot field (spam trap) is hidden via an off-screen/clip technique,
  never `display: none` — some bots skip CSS-hidden fields entirely, and
  `display:none` also risks confusing some assistive tech behavior.

## Color & contrast

- Text/background pairs meet WCAG AA against whatever theme is _currently
  configured_ in Sanity (see [[SHU-002]]) — this is re-checked whenever the
  owner changes colors, not just once at build time. [[SHU-002]]'s Studio
  contrast warning exists to catch this at the source.

## Verification

- `jest-axe` runs as part of each organism/page's own test file with zero
  violations — this is how a11y regressions get caught continuously, not
  discovered in a late sweep.
- [[SHU-022]] (the final Lighthouse/regression gate) re-verifies the whole
  site once every page exists — it's a safety net, not the first checkpoint.
