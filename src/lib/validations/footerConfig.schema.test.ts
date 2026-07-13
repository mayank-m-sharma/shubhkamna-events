import {
  fallbackFooterConfig,
  footerConfigSchema,
} from "./footerConfig.schema";

describe("footerConfigSchema", () => {
  it("accepts a document with columns, contact info, social links, and copyright text", () => {
    const result = footerConfigSchema.safeParse({
      columns: [
        {
          title: "Quick Links",
          links: [{ label: "Home", href: "/" }],
        },
      ],
      contactPhone: "+919754455007",
      contactEmail: "shubhkamnaevents02@gmail.com",
      contactAddress: "Indore, Madhya Pradesh",
      socialLinks: [
        {
          platform: "instagram",
          url: "https://www.instagram.com/shubhkamnaevents02/",
        },
      ],
      copyrightText: "Shubhkamna Events Indore. All rights reserved.",
    });

    expect(result.success).toBe(true);
  });

  it("defaults columns and socialLinks to [] when GROQ returns null", () => {
    const parsed = footerConfigSchema.parse({
      columns: null,
      socialLinks: null,
    });

    expect(parsed.columns).toEqual([]);
    expect(parsed.socialLinks).toEqual([]);
  });

  it("defaults a column's links to [] when GROQ returns null", () => {
    const parsed = footerConfigSchema.parse({
      columns: [{ title: "Quick Links", links: null }],
    });

    expect(parsed.columns[0]?.links).toEqual([]);
  });

  it("rejects a column missing a title", () => {
    const result = footerConfigSchema.safeParse({
      columns: [{ links: [{ label: "Home", href: "/" }] }],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a malformed contact email", () => {
    const result = footerConfigSchema.safeParse({
      contactEmail: "not-an-email",
    });

    expect(result.success).toBe(false);
  });

  it("treats the contact block as fully optional (fields independently absent)", () => {
    const parsed = footerConfigSchema.parse({});

    expect(parsed.contactPhone).toBeUndefined();
    expect(parsed.contactEmail).toBeUndefined();
    expect(parsed.contactAddress).toBeUndefined();
  });
});

describe("fallbackFooterConfig", () => {
  it("is itself a valid footerConfig document", () => {
    const result = footerConfigSchema.safeParse(fallbackFooterConfig);

    expect(result.success).toBe(true);
  });

  it("has at least one column so the footer is never empty", () => {
    expect(fallbackFooterConfig.columns.length).toBeGreaterThan(0);
  });
});
