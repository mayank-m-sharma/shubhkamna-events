import { homePageSchema, servicesSectionSchema } from "./homePage.schema";

const validHero = {
  _type: "heroSection" as const,
  headline: "Your Vision, Our Magic.",
  primaryCtaLabel: "Plan Your Event",
  primaryCtaHref: "/contact",
};

describe("homePageSchema", () => {
  it("accepts a document with all five section types in order", () => {
    const result = homePageSchema.safeParse({
      sections: [
        validHero,
        { _type: "servicesSection" },
        { _type: "gallerySection" },
        { _type: "testimonialsSection" },
        { _type: "contactSection" },
      ],
    });

    expect(result.success).toBe(true);
  });

  it("accepts a single section", () => {
    const result = homePageSchema.safeParse({ sections: [validHero] });

    expect(result.success).toBe(true);
  });

  it("rejects an empty sections array", () => {
    const result = homePageSchema.safeParse({ sections: [] });

    expect(result.success).toBe(false);
  });

  it("rejects a document with no sections field", () => {
    const result = homePageSchema.safeParse({});

    expect(result.success).toBe(false);
  });

  it("rejects a section with an unrecognized _type", () => {
    const result = homePageSchema.safeParse({
      sections: [{ _type: "notASection" }],
    });

    expect(result.success).toBe(false);
  });

  it("allows the same section type to repeat", () => {
    const result = homePageSchema.safeParse({
      sections: [{ _type: "gallerySection" }, { _type: "gallerySection" }],
    });

    expect(result.success).toBe(true);
  });

  it("accepts a stub section's heading text", () => {
    const parsed = servicesSectionSchema.parse({
      _type: "servicesSection",
      heading: "What We Do Best",
    });

    expect(parsed.heading).toBe("What We Do Best");
  });

  it("treats a stub section's heading as optional, normalizing GROQ's null to undefined", () => {
    const parsed = servicesSectionSchema.parse({
      _type: "servicesSection",
      heading: null,
    });

    expect(parsed.heading).toBeUndefined();
  });
});

describe("heroSectionSchema (via homePageSchema)", () => {
  it("rejects a hero section with no headline", () => {
    const result = homePageSchema.safeParse({
      sections: [{ ...validHero, headline: undefined }],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a hero section missing its primary CTA", () => {
    const result = homePageSchema.safeParse({
      sections: [{ ...validHero, primaryCtaHref: undefined }],
    });

    expect(result.success).toBe(false);
  });

  it("accepts a hero section with subhead, background image, and a secondary CTA", () => {
    const parsed = homePageSchema.parse({
      sections: [
        {
          ...validHero,
          subhead: "Indore's 5-star premier event planner.",
          backgroundImage: {
            asset: {
              _id: "image-abc-800x1000-webp",
              url: "https://cdn.sanity.io/images/proj/ds/abc-800x1000.webp",
              metadata: { dimensions: { width: 800, height: 1000 } },
            },
          },
          backgroundImageAlt:
            "Shubhkamna Events luxury wedding planning Indore",
          secondaryCtaLabel: "View Portfolio",
          secondaryCtaHref: "/gallery",
        },
      ],
    });

    const hero = parsed.sections[0];
    expect(hero?._type === "heroSection" && hero.subhead).toBe(
      "Indore's 5-star premier event planner.",
    );
    expect(hero?._type === "heroSection" && hero.secondaryCtaLabel).toBe(
      "View Portfolio",
    );
  });

  it("treats subhead, background media, and secondary CTA as independently optional", () => {
    const result = homePageSchema.safeParse({ sections: [validHero] });

    expect(result.success).toBe(true);
  });

  it("rejects a malformed background video URL", () => {
    const result = homePageSchema.safeParse({
      sections: [{ ...validHero, backgroundVideoUrl: "not-a-url" }],
    });

    expect(result.success).toBe(false);
  });
});

describe("servicesSectionSchema", () => {
  it("defaults items to [] when GROQ returns null, so an empty section is valid", () => {
    const parsed = servicesSectionSchema.parse({
      _type: "servicesSection",
      items: null,
    });

    expect(parsed.items).toEqual([]);
  });

  it("accepts a full set of service items matching the SHU-000 audit shape", () => {
    const parsed = servicesSectionSchema.parse({
      _type: "servicesSection",
      heading: "What We Do Best",
      intro:
        "From personal celebrations to large-scale professional events, we provide end-to-end management services.",
      viewAllLabel: "See All Services",
      viewAllHref: "/services",
      items: [
        {
          icon: "heart",
          title: "Weddings",
          description:
            "Royal wedding and engagement planning with customized themes, complete decor, and management.",
          href: "/services",
        },
      ],
    });

    expect(parsed.items).toHaveLength(1);
    expect(parsed.items[0]?.icon).toBe("heart");
  });

  it("rejects an item with an icon outside the supported set", () => {
    const result = servicesSectionSchema.safeParse({
      _type: "servicesSection",
      items: [{ icon: "not-an-icon", title: "Weddings", description: "..." }],
    });

    expect(result.success).toBe(false);
  });

  it("rejects an item missing its title or description", () => {
    const result = servicesSectionSchema.safeParse({
      _type: "servicesSection",
      items: [{ icon: "heart", title: "Weddings" }],
    });

    expect(result.success).toBe(false);
  });

  it("treats an item's link as optional", () => {
    const parsed = servicesSectionSchema.parse({
      _type: "servicesSection",
      items: [{ icon: "heart", title: "Weddings", description: "..." }],
    });

    expect(parsed.items[0]?.href).toBeUndefined();
  });
});
