import { bodyFontCssValue, headingFontCssValue } from "@/lib/theme/fonts";
import type { SiteTheme } from "@/types/theme";

// Renders the CMS-driven theme as a `:root` custom-property block, rendered
// inline by ThemeProvider so it overrides src/styles/_tokens.scss's bootstrap
// defaults at runtime with no rebuild.
export function buildThemeStyle(theme: SiteTheme): string {
  const declarations = [
    `--color-primary:${theme.colorPrimary};`,
    `--color-secondary:${theme.colorSecondary};`,
    `--color-accent:${theme.colorAccent};`,
    `--color-background:${theme.colorBackground};`,
    `--color-surface:${theme.colorSurface};`,
    `--color-text:${theme.colorText};`,
    `--font-heading-fallback:${headingFontCssValue[theme.headingFont]};`,
    `--font-body-fallback:${bodyFontCssValue[theme.bodyFont]};`,
    `--font-size-xs:${theme.fontSizeXs};`,
    `--font-size-sm:${theme.fontSizeSm};`,
    `--font-size-base:${theme.fontSizeBase};`,
    `--font-size-md:${theme.fontSizeMd};`,
    `--font-size-lg:${theme.fontSizeLg};`,
    `--font-size-xl:${theme.fontSizeXl};`,
    `--font-size-2xl:${theme.fontSize2xl};`,
    `--space-xs:${theme.spaceXs};`,
    `--space-sm:${theme.spaceSm};`,
    `--space-md:${theme.spaceMd};`,
    `--space-lg:${theme.spaceLg};`,
    `--space-xl:${theme.spaceXl};`,
    `--space-2xl:${theme.space2xl};`,
  ].join("");

  return `:root{${declarations}}`;
}
