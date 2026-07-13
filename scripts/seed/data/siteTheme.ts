import type { SiteTheme } from "@/types/theme";

// Sourced from docs/reference-site-audit.md §3 — the same real values
// already used as SHU-002's Studio initialValue defaults, now actually
// published as a document.
export const siteThemeSeed: SiteTheme = {
  colorPrimary: "#1a227f",
  colorSecondary: "#1f2d3d",
  colorAccent: "#d81b60",
  colorBackground: "#f6f6f8",
  colorSurface: "#ffffff",
  colorText: "#0f172a",
  colorBackgroundDark: "#121320",
  colorTextInverse: "#f1f5f9",
  headingFont: "montserrat",
  bodyFont: "inter",
  fontSizeXs: "0.75rem",
  fontSizeSm: "0.875rem",
  fontSizeBase: "1rem",
  fontSizeMd: "1.125rem",
  fontSizeLg: "1.5rem",
  fontSizeXl: "2rem",
  fontSize2xl: "2.75rem",
  spaceXs: "0.25rem",
  spaceSm: "0.5rem",
  spaceMd: "1rem",
  spaceLg: "1.5rem",
  spaceXl: "2.5rem",
  space2xl: "4rem",
};
