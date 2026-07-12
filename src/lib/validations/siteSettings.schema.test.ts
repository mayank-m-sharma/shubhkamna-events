import {
  fallbackSiteSettings,
  siteSettingsSchema,
} from "./siteSettings.schema";

const minimalRequiredFields = {
  siteName: "Shubhkamna Events",
  tagline: "Celebrations, planned with care.",
  comingSoonHeadline: "Something wonderful is on its way.",
  comingSoonMessage: "Check back soon.",
  seoTitle: "Shubhkamna Events — Coming Soon",
  seoDescription: "A new website is on its way.",
};

describe("siteSettingsSchema", () => {
  it("accepts a document with only the required fields, defaulting socialLinks to []", () => {
    const parsed = siteSettingsSchema.parse(minimalRequiredFields);

    expect(parsed.socialLinks).toEqual([]);
  });

  it("rejects a document missing required fields", () => {
    const result = siteSettingsSchema.safeParse({
      siteName: "Shubhkamna Events",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a document with empty-string fields", () => {
    const result = siteSettingsSchema.safeParse({
      ...minimalRequiredFields,
      siteName: "",
    });

    expect(result.success).toBe(false);
  });

  it("accepts organization/review/whatsapp fields when present", () => {
    const result = siteSettingsSchema.safeParse({
      ...minimalRequiredFields,
      organizationLegalName: "Shubhkamna Events",
      organizationAddress:
        "Pragati Chamber, 34/3, Murai Mohalla, Chhawni, Indore, Madhya Pradesh 452001",
      organizationPhone: "+919754455007",
      whatsappNumber: "+919754455007",
      reviewRating: 5,
      reviewCount: 50,
      reviewUrl: "https://www.google.com/search?q=shubhkamna+events+reviews",
      socialLinks: [
        { platform: "instagram", url: "https://www.instagram.com/example/" },
      ],
    });

    expect(result.success).toBe(true);
  });

  it("rejects a reviewRating outside the 0-5 range", () => {
    const result = siteSettingsSchema.safeParse({
      ...minimalRequiredFields,
      reviewRating: 6,
    });

    expect(result.success).toBe(false);
  });

  it("rejects a social link with an unrecognized platform", () => {
    const result = siteSettingsSchema.safeParse({
      ...minimalRequiredFields,
      socialLinks: [{ platform: "tiktok", url: "https://tiktok.com/@x" }],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a social link with a non-URL value", () => {
    const result = siteSettingsSchema.safeParse({
      ...minimalRequiredFields,
      socialLinks: [{ platform: "instagram", url: "not-a-url" }],
    });

    expect(result.success).toBe(false);
  });

  it("treats GROQ's `null` for an unset optional field the same as omitting it", () => {
    const parsed = siteSettingsSchema.parse({
      ...minimalRequiredFields,
      logo: null,
      organizationPhone: null,
      reviewRating: null,
      socialLinks: null,
    });

    expect(parsed.logo).toBeUndefined();
    expect(parsed.organizationPhone).toBeUndefined();
    expect(parsed.reviewRating).toBeUndefined();
    expect(parsed.socialLinks).toEqual([]);
  });
});

describe("fallbackSiteSettings", () => {
  it("is itself a valid site settings document", () => {
    const result = siteSettingsSchema.safeParse(fallbackSiteSettings);

    expect(result.success).toBe(true);
  });
});
