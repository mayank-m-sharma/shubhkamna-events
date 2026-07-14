import { serviceSchema, serviceSlugsSchema } from "./service.schema";

const mockSanityImage = {
  asset: {
    _id: "image-abc-800x600-webp",
    url: "https://cdn.sanity.io/images/proj/ds/abc-800x600.webp",
    metadata: { dimensions: { width: 800, height: 600 } },
  },
};

const validService = {
  title: "Weddings",
  slug: "weddings",
  icon: "heart",
  description:
    "Complete wedding planning and engagement coordination with customized themes. We create royal atmospheric experiences for your special day.",
  image: mockSanityImage,
  imageAlt: "Wedding Planning by Shubhkamna Events",
  features: [
    "Wedding & Engagement planning",
    "Royal Theme Decor Design",
    "Destination Wedding planning",
    "Mandap & Aisle Styling",
    "Wedding florist services",
  ],
  ctaLabel: "Enquire for Wedding",
  ctaHref: "/contact",
};

describe("serviceSchema", () => {
  it("accepts a full service document matching the SHU-000 audit shape", () => {
    const parsed = serviceSchema.parse(validService);

    expect(parsed.title).toBe("Weddings");
    expect(parsed.slug).toBe("weddings");
    expect(parsed.features).toHaveLength(5);
  });

  it("accepts every icon in the extended service icon set", () => {
    for (const icon of [
      "heart",
      "briefcase",
      "cake",
      "temple",
      "palette",
      "music-note",
    ]) {
      const result = serviceSchema.safeParse({ ...validService, icon });
      expect(result.success).toBe(true);
    }
  });

  it("rejects an icon outside the supported set", () => {
    const result = serviceSchema.safeParse({
      ...validService,
      icon: "not-an-icon",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a document missing title, slug, description, or image", () => {
    for (const field of ["title", "slug", "description", "image"]) {
      const incomplete = { ...validService } as Record<string, unknown>;
      delete incomplete[field];
      const result = serviceSchema.safeParse(incomplete);
      expect(result.success).toBe(false);
    }
  });

  it("rejects an empty features array", () => {
    const result = serviceSchema.safeParse({ ...validService, features: [] });

    expect(result.success).toBe(false);
  });

  it("defaults gallery to [] when GROQ returns null", () => {
    const parsed = serviceSchema.parse({ ...validService, gallery: null });

    expect(parsed.gallery).toEqual([]);
  });

  it("accepts a populated gallery array", () => {
    const parsed = serviceSchema.parse({
      ...validService,
      gallery: [
        {
          image: mockSanityImage,
          alt: "Wedding decor close-up",
        },
      ],
    });

    expect(parsed.gallery).toHaveLength(1);
    expect(parsed.gallery[0]?.alt).toBe("Wedding decor close-up");
  });

  it("normalizes a null order to undefined", () => {
    const parsed = serviceSchema.parse({ ...validService, order: null });

    expect(parsed.order).toBeUndefined();
  });

  it("rejects a service missing its CTA label or href", () => {
    const result = serviceSchema.safeParse({
      ...validService,
      ctaLabel: undefined,
    });

    expect(result.success).toBe(false);
  });
});

describe("serviceSlugsSchema", () => {
  it("accepts an array of slug objects", () => {
    const result = serviceSlugsSchema.safeParse([
      { slug: "weddings" },
      { slug: "corporate" },
    ]);

    expect(result.success).toBe(true);
  });

  it("rejects an entry with a missing slug", () => {
    const result = serviceSlugsSchema.safeParse([{}]);

    expect(result.success).toBe(false);
  });
});
