import { sanityImageSchema } from "./image.schema";

const validImage = {
  asset: {
    _id: "image-abc123-800x600-jpg",
    url: "https://cdn.sanity.io/images/proj/ds/abc123-800x600.jpg",
    metadata: {
      dimensions: { width: 800, height: 600 },
    },
  },
};

describe("sanityImageSchema", () => {
  it("accepts a dereferenced image asset with no hotspot", () => {
    const result = sanityImageSchema.safeParse(validImage);

    expect(result.success).toBe(true);
  });

  it("accepts a hotspot when present", () => {
    const result = sanityImageSchema.safeParse({
      ...validImage,
      hotspot: { x: 0.5, y: 0.5, width: 1, height: 1 },
    });

    expect(result.success).toBe(true);
  });

  it("normalizes GROQ's null hotspot to undefined, not a validation error", () => {
    const parsed = sanityImageSchema.parse({ ...validImage, hotspot: null });

    expect(parsed.hotspot).toBeUndefined();
  });

  it("rejects an asset missing dimensions", () => {
    const result = sanityImageSchema.safeParse({
      asset: { _id: "image-abc123-jpg", url: "https://cdn.sanity.io/x.jpg" },
    });

    expect(result.success).toBe(false);
  });

  it("rejects a non-URL asset url", () => {
    const result = sanityImageSchema.safeParse({
      asset: { ...validImage.asset, url: "not-a-url" },
    });

    expect(result.success).toBe(false);
  });
});
