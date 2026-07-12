import { fallbackSiteTheme, siteThemeSchema } from "./theme.schema";

const validTheme = {
  colorPrimary: "#1a227f",
  colorSecondary: "#1f2d3d",
  colorAccent: "#d81b60",
  colorBackground: "#f6f6f8",
  colorSurface: "#ffffff",
  colorText: "#0f172a",
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

describe("siteThemeSchema", () => {
  it("accepts a fully-populated theme document", () => {
    const result = siteThemeSchema.safeParse(validTheme);

    expect(result.success).toBe(true);
  });

  it("rejects a document missing required fields", () => {
    const incomplete: Partial<typeof validTheme> = { ...validTheme };
    delete incomplete.colorPrimary;
    const result = siteThemeSchema.safeParse(incomplete);

    expect(result.success).toBe(false);
  });

  it("rejects a non-hex color value", () => {
    const result = siteThemeSchema.safeParse({
      ...validTheme,
      colorPrimary: "not-a-color",
    });

    expect(result.success).toBe(false);
  });

  it("accepts 3-digit hex shorthand colors", () => {
    const result = siteThemeSchema.safeParse({
      ...validTheme,
      colorAccent: "#fff",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an unrecognized heading font key", () => {
    const result = siteThemeSchema.safeParse({
      ...validTheme,
      headingFont: "comic-sans",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a spacing/type-scale value with no valid CSS length unit", () => {
    const result = siteThemeSchema.safeParse({
      ...validTheme,
      spaceMd: "1",
    });

    expect(result.success).toBe(false);
  });
});

describe("fallbackSiteTheme", () => {
  it("is itself a valid theme document", () => {
    const result = siteThemeSchema.safeParse(fallbackSiteTheme);

    expect(result.success).toBe(true);
  });

  it("uses the system font stack, matching SHU-001's bootstrap defaults", () => {
    expect(fallbackSiteTheme.headingFont).toBe("system");
    expect(fallbackSiteTheme.bodyFont).toBe("system");
  });
});
