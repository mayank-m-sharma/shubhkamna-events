import { servicesPageSchema } from "./servicesPage.schema";

const validStep = {
  icon: "chat" as const,
  title: "Consultation",
  description: "Discuss your vision.",
};

describe("servicesPageSchema", () => {
  it("parses a full servicesPage with hero, process, faq, and cta", () => {
    const parsed = servicesPageSchema.parse({
      heroEyebrow: "Indore's 5-Star Event Planner",
      heroHeading: "Our Elite Services",
      heroHeadingHighlight: "Services",
      heroSubhead: "We handle every detail.",
      processEyebrow: "Our Process",
      processHeading: "Shubhkamna Events Roadmap",
      processSteps: [validStep],
      faq: { heading: "FAQs", intro: undefined, items: [] },
      ctaHeading: "Start Your Journey with Shubhkamna Events",
      ctaBody: "Book your free consultation today.",
      ctaSecondaryLabel: "Our Past Work",
      ctaSecondaryHref: "/gallery",
    });

    expect(parsed.heroHeading).toBe("Our Elite Services");
    expect(parsed.processSteps).toHaveLength(1);
  });

  it("defaults processSteps to [] and faq to undefined when omitted", () => {
    const parsed = servicesPageSchema.parse({
      heroHeading: "Our Elite Services",
      ctaHeading: "Start Your Journey",
    });

    expect(parsed.processSteps).toEqual([]);
    expect(parsed.faq).toBeUndefined();
  });

  it("rejects a missing heroHeading or ctaHeading", () => {
    expect(
      servicesPageSchema.safeParse({ ctaHeading: "Start Your Journey" })
        .success,
    ).toBe(false);
    expect(
      servicesPageSchema.safeParse({ heroHeading: "Our Elite Services" })
        .success,
    ).toBe(false);
  });

  it("rejects a process step with an icon outside the supported set", () => {
    const result = servicesPageSchema.safeParse({
      heroHeading: "Our Elite Services",
      ctaHeading: "Start Your Journey",
      processSteps: [{ ...validStep, icon: "instagram" }],
    });

    expect(result.success).toBe(false);
  });
});
