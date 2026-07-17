import { servicesPageSeed } from "./servicesPage";

describe("servicesPageSeed", () => {
  it("carries the reference site's real hero copy from the SHU-000 audit", () => {
    expect(servicesPageSeed.heroEyebrow).toBe("Indore's 5-Star Event Planner");
    expect(servicesPageSeed.heroHeading).toBe("Our Elite Services");
    expect(servicesPageSeed.heroHeadingHighlight).toBe("Services");
  });

  it("carries all 4 real process steps in order", () => {
    expect(servicesPageSeed.processSteps.map((step) => step.title)).toEqual([
      "Consultation",
      "Design",
      "Coordination",
      "Execution",
    ]);
    expect(servicesPageSeed.processSteps.map((step) => step.icon)).toEqual([
      "chat",
      "palette",
      "calendar",
      "check",
    ]);
  });

  it("reuses the same reconciled FAQ set as the Contact page", () => {
    expect(servicesPageSeed.faq.items).toHaveLength(6);
  });

  it("carries the real CTA banner copy from the SHU-000 audit", () => {
    expect(servicesPageSeed.ctaHeading).toBe(
      "Start Your Journey with Shubhkamna Events",
    );
    expect(servicesPageSeed.ctaSecondaryLabel).toBe("Our Past Work");
    expect(servicesPageSeed.ctaSecondaryHref).toBe("/gallery");
  });
});
