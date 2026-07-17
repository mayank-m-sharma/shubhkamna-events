import { galleryPageSchema } from "./galleryPage.schema";

const validImage = {
  image: {
    asset: {
      _id: "image-abc-800x1000-jpg",
      url: "https://cdn.sanity.io/images/proj/ds/abc-800x1000.jpg",
      metadata: { dimensions: { width: 800, height: 1000 } },
    },
    hotspot: null,
  },
  alt: "Wedding decor",
  caption: null,
  category: null,
};

describe("galleryPageSchema", () => {
  it("parses a full galleryPage with heading, intro, and images", () => {
    const parsed = galleryPageSchema.parse({
      heading: "Our Portfolio",
      intro: "A showcase of our work.",
      images: [validImage],
    });

    expect(parsed.heading).toBe("Our Portfolio");
    expect(parsed.images).toHaveLength(1);
  });

  it("defaults intro to undefined when null", () => {
    const parsed = galleryPageSchema.parse({
      heading: "Our Portfolio",
      intro: null,
      images: [validImage],
    });

    expect(parsed.intro).toBeUndefined();
  });

  it("rejects a missing heading or empty images array", () => {
    expect(galleryPageSchema.safeParse({ images: [validImage] }).success).toBe(
      false,
    );
    expect(
      galleryPageSchema.safeParse({ heading: "Our Portfolio", images: [] })
        .success,
    ).toBe(false);
  });
});
