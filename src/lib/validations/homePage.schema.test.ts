import { homePageSchema } from "./homePage.schema";

describe("homePageSchema", () => {
  it("accepts a document with all five section types in order", () => {
    const result = homePageSchema.safeParse({
      sections: [
        { _type: "heroSection" },
        { _type: "servicesSection" },
        { _type: "gallerySection" },
        { _type: "testimonialsSection" },
        { _type: "contactSection" },
      ],
    });

    expect(result.success).toBe(true);
  });

  it("accepts a single section", () => {
    const result = homePageSchema.safeParse({
      sections: [{ _type: "heroSection" }],
    });

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

  it("accepts a section's heading text", () => {
    const parsed = homePageSchema.parse({
      sections: [{ _type: "heroSection", heading: "Your Vision, Our Magic." }],
    });

    expect(parsed.sections[0]?.heading).toBe("Your Vision, Our Magic.");
  });

  it("treats a section's heading as optional, normalizing GROQ's null to undefined", () => {
    const parsed = homePageSchema.parse({
      sections: [{ _type: "heroSection", heading: null }],
    });

    expect(parsed.sections[0]?.heading).toBeUndefined();
  });
});
