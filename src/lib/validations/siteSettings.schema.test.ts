import { siteSettingsSchema } from "./siteSettings.schema";

describe("siteSettingsSchema", () => {
  it("accepts a fully-populated site settings document", () => {
    const result = siteSettingsSchema.safeParse({
      siteName: "Shubhkamna Events",
      tagline: "Celebrations, planned with care.",
      comingSoonHeadline: "Something wonderful is on its way.",
      comingSoonMessage: "Check back soon.",
      seoTitle: "Shubhkamna Events — Coming Soon",
      seoDescription: "A new website is on its way.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a document missing required fields", () => {
    const result = siteSettingsSchema.safeParse({
      siteName: "Shubhkamna Events",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a document with empty-string fields", () => {
    const result = siteSettingsSchema.safeParse({
      siteName: "",
      tagline: "Tagline",
      comingSoonHeadline: "Headline",
      comingSoonMessage: "Message",
      seoTitle: "Title",
      seoDescription: "Description",
    });

    expect(result.success).toBe(false);
  });
});
