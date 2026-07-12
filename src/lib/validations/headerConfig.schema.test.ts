import {
  fallbackHeaderConfig,
  headerConfigSchema,
} from "./headerConfig.schema";

describe("headerConfigSchema", () => {
  it("accepts a document with nav items and a CTA", () => {
    const result = headerConfigSchema.safeParse({
      navItems: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
      ],
      ctaLabel: "Call Now",
      ctaHref: "tel:+919754455007",
    });

    expect(result.success).toBe(true);
  });

  it("defaults navItems to [] when GROQ returns null", () => {
    const parsed = headerConfigSchema.parse({ navItems: null });

    expect(parsed.navItems).toEqual([]);
  });

  it("rejects a nav item missing a label or href", () => {
    const result = headerConfigSchema.safeParse({
      navItems: [{ label: "Home" }],
    });

    expect(result.success).toBe(false);
  });

  it("treats a missing CTA as fully optional (label and href independently)", () => {
    const parsed = headerConfigSchema.parse({ navItems: [] });

    expect(parsed.ctaLabel).toBeUndefined();
    expect(parsed.ctaHref).toBeUndefined();
  });
});

describe("fallbackHeaderConfig", () => {
  it("is itself a valid headerConfig document", () => {
    const result = headerConfigSchema.safeParse(fallbackHeaderConfig);

    expect(result.success).toBe(true);
  });

  it("has at least one nav item so the header is never empty", () => {
    expect(fallbackHeaderConfig.navItems.length).toBeGreaterThan(0);
  });
});
