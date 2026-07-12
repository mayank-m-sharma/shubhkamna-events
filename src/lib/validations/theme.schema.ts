import { z } from "zod";

const hexColor = z
  .string()
  .regex(
    /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
    "Must be a hex color, e.g. #1a227f",
  );

const cssLength = z
  .string()
  .regex(/^\d+(\.\d+)?(rem|em|px)$/, "Must be a CSS length, e.g. 1.5rem");

export const headingFontKeys = ["montserrat", "playfair", "system"] as const;
export const bodyFontKeys = ["inter", "lora", "system"] as const;

export const siteThemeSchema = z.object({
  colorPrimary: hexColor,
  colorSecondary: hexColor,
  colorAccent: hexColor,
  colorBackground: hexColor,
  colorSurface: hexColor,
  colorText: hexColor,
  headingFont: z.enum(headingFontKeys),
  bodyFont: z.enum(bodyFontKeys),
  fontSizeXs: cssLength,
  fontSizeSm: cssLength,
  fontSizeBase: cssLength,
  fontSizeMd: cssLength,
  fontSizeLg: cssLength,
  fontSizeXl: cssLength,
  fontSize2xl: cssLength,
  spaceXs: cssLength,
  spaceSm: cssLength,
  spaceMd: cssLength,
  spaceLg: cssLength,
  spaceXl: cssLength,
  space2xl: cssLength,
});

export type SiteTheme = z.infer<typeof siteThemeSchema>;
export type HeadingFontKey = (typeof headingFontKeys)[number];
export type BodyFontKey = (typeof bodyFontKeys)[number];

// Matches SHU-001's src/styles/_tokens.scss bootstrap defaults exactly, so the
// site looks identical to today until an editor publishes a real siteTheme
// document — used when that document is unpublished or fails validation.
export const fallbackSiteTheme: SiteTheme = {
  colorPrimary: "#b3273f",
  colorSecondary: "#1f2d3d",
  colorAccent: "#d8a24a",
  colorBackground: "#ffffff",
  colorSurface: "#f7f5f2",
  colorText: "#1a1a1a",
  headingFont: "system",
  bodyFont: "system",
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
