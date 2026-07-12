# SHU-002 — Sanity Schema: Design Tokens / Theme

**Wave:** 1 (design system foundation) · **Depends on:** [[SHU-001]]

**Status:**

- [x] Not started
- [ ] Completed

## User story

As the site owner, I want to change my brand colors, fonts, and font sizes
from the CMS — without asking a developer — so the site can evolve visually
as my brand does.

## Technical tasks

- `siteTheme` singleton schema: primary/secondary/accent/background/surface/
  text colors (color picker), heading font family, body font family (from a
  curated list of web-safe/Google Font options), a type scale (base size +
  ratio, or explicit per-step sizes), spacing scale.
- A `ThemeProvider` (server component reading the theme doc) that renders an
  inline `<style>` block setting the CSS custom properties defined in
  `src/styles/_tokens.scss`, overriding the fallback defaults.
- `useTheme` client hook for any component needing theme values in JS (rare —
  most consumption should stay CSS-only).
- Zod schema for the theme document; safe fallback to SHU-001's defaults on
  validation failure.
- Contrast validation: warn (in Studio, via a custom input component or
  validation rule) if a chosen text/background pair fails WCAG AA — a
  non-technical editor can otherwise easily ship illegible combinations.
- Default swatch/font-pairing options should reflect the palette/typography
  observed in [[SHU-000]]'s audit rather than arbitrary placeholders — the
  owner can still change any of it from the CMS.

## Notes / acceptance criteria

- Changing a color in Studio and republishing changes the live site with no
  deploy.
- No component ever hardcodes a hex value or font-family string.
- Falls back gracefully (SHU-001 defaults) if the theme document is
  unpublished or invalid.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
