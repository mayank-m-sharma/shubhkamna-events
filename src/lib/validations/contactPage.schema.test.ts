import { contactPageSchema } from "./contactPage.schema";

const validContact = {
  _type: "contactSection" as const,
  variant: "form" as const,
  heading: "Get In Touch",
  intro: undefined,
  successMessage: undefined,
};

describe("contactPageSchema", () => {
  it("parses a full contactPage with hero, contact, areas served, and faq", () => {
    const parsed = contactPageSchema.parse({
      heroHeading: "Let's Create Magic Together",
      heroSubhead: "Bespoke planning tailored to your vision.",
      contact: validContact,
      areasServed: ["Indore", "Ujjain"],
      faq: { heading: "FAQs", intro: undefined, items: [] },
    });

    expect(parsed.heroHeading).toBe("Let's Create Magic Together");
    expect(parsed.contact.variant).toBe("form");
    expect(parsed.areasServed).toEqual(["Indore", "Ujjain"]);
  });

  it("defaults areasServed to [] and faq to undefined when omitted", () => {
    const parsed = contactPageSchema.parse({
      heroHeading: "Let's Create Magic Together",
      contact: validContact,
    });

    expect(parsed.areasServed).toEqual([]);
    expect(parsed.faq).toBeUndefined();
  });

  it("rejects a missing heroHeading or contact", () => {
    expect(contactPageSchema.safeParse({ contact: validContact }).success).toBe(
      false,
    );
    expect(contactPageSchema.safeParse({ heroHeading: "Hi" }).success).toBe(
      false,
    );
  });
});
