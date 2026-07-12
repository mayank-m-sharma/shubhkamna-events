import { fallbackSiteTheme } from "@/lib/validations/theme.schema";

import { buildThemeStyle } from "./buildThemeStyle";

describe("buildThemeStyle", () => {
  it("sets every color custom property from the theme document", () => {
    const css = buildThemeStyle(fallbackSiteTheme);

    expect(css).toContain(`--color-primary:${fallbackSiteTheme.colorPrimary};`);
    expect(css).toContain(
      `--color-secondary:${fallbackSiteTheme.colorSecondary};`,
    );
    expect(css).toContain(`--color-accent:${fallbackSiteTheme.colorAccent};`);
    expect(css).toContain(
      `--color-background:${fallbackSiteTheme.colorBackground};`,
    );
    expect(css).toContain(`--color-surface:${fallbackSiteTheme.colorSurface};`);
    expect(css).toContain(`--color-text:${fallbackSiteTheme.colorText};`);
  });

  it("points the font-fallback custom properties at the system stack when headingFont/bodyFont is 'system'", () => {
    const css = buildThemeStyle(fallbackSiteTheme);

    expect(css).toContain('--font-heading-fallback:"Georgia", serif;');
    expect(css).toContain(
      '--font-body-fallback:"Helvetica Neue", Arial, sans-serif;',
    );
  });

  it("points the font-fallback custom properties at the matching curated font variable", () => {
    const css = buildThemeStyle({
      ...fallbackSiteTheme,
      headingFont: "montserrat",
      bodyFont: "inter",
    });

    expect(css).toContain("--font-heading-fallback:var(--font-montserrat);");
    expect(css).toContain("--font-body-fallback:var(--font-inter);");
  });

  it("sets every type-scale and spacing custom property from the theme document", () => {
    const css = buildThemeStyle(fallbackSiteTheme);

    expect(css).toContain(`--font-size-xs:${fallbackSiteTheme.fontSizeXs};`);
    expect(css).toContain(`--font-size-2xl:${fallbackSiteTheme.fontSize2xl};`);
    expect(css).toContain(`--space-xs:${fallbackSiteTheme.spaceXs};`);
    expect(css).toContain(`--space-2xl:${fallbackSiteTheme.space2xl};`);
  });

  it("wraps everything in a single :root rule", () => {
    const css = buildThemeStyle(fallbackSiteTheme);

    expect(css.startsWith(":root{")).toBe(true);
    expect(css.trim().endsWith("}")).toBe(true);
  });
});
