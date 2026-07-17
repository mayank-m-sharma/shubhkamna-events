import { faqSectionSchema } from "./faqSection.schema";

describe("faqSectionSchema", () => {
  it("parses a full faqSection with heading, intro, and items", () => {
    const parsed = faqSectionSchema.parse({
      heading: "Common Inquiries",
      intro: "Everything you need to know.",
      items: [{ question: "Q1?", answer: "A1." }],
    });

    expect(parsed.heading).toBe("Common Inquiries");
    expect(parsed.items).toHaveLength(1);
  });

  it("defaults heading/intro to undefined and items to [] when omitted", () => {
    const parsed = faqSectionSchema.parse({});

    expect(parsed.heading).toBeUndefined();
    expect(parsed.intro).toBeUndefined();
    expect(parsed.items).toEqual([]);
  });

  it("normalizes GROQ's null to undefined/[] rather than leaking null", () => {
    const parsed = faqSectionSchema.parse({
      heading: null,
      intro: null,
      items: null,
    });

    expect(parsed.heading).toBeUndefined();
    expect(parsed.items).toEqual([]);
  });

  it("rejects an item missing question or answer", () => {
    const result = faqSectionSchema.safeParse({
      items: [{ question: "Q1?" }],
    });

    expect(result.success).toBe(false);
  });
});
