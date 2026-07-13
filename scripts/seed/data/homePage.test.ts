import { homePageSchema } from "@/lib/validations/homePage.schema";

import { homePageSeed } from "./homePage";

describe("homePageSeed", () => {
  it("is a valid homePage document", () => {
    const result = homePageSchema.safeParse(homePageSeed);

    expect(result.success).toBe(true);
  });

  it("carries the reference site's homepage section order from the SHU-000 audit", () => {
    expect(homePageSeed.sections.map((section) => section._type)).toEqual([
      "heroSection",
      "servicesSection",
      "gallerySection",
      "testimonialsSection",
      "contactSection",
    ]);
  });

  it("carries the reference site's real section headings from the SHU-000 audit", () => {
    expect(homePageSeed.sections.map((section) => section.heading)).toEqual([
      "Your Vision, Our Magic.",
      "What We Do Best",
      "Capturing Every Moment",
      "What Our Clients Think",
      "Ready to Create Magical Moments?",
    ]);
  });
});
