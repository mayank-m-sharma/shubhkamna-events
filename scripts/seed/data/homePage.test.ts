import type { SanityClient } from "@sanity/client";

import { buildHomePageSeed } from "./homePage";

function mockClient(existingAssetId: string | null): SanityClient {
  return {
    fetch: jest
      .fn()
      .mockResolvedValue(existingAssetId ? { _id: existingAssetId } : null),
    assets: {
      upload: jest.fn().mockResolvedValue({ _id: "image-hero-800x1000-webp" }),
    },
  } as unknown as SanityClient;
}

describe("buildHomePageSeed", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("carries the reference site's homepage section order from the SHU-000 audit", async () => {
    const seed = await buildHomePageSeed(
      mockClient("image-hero-800x1000-webp"),
    );

    expect(seed.sections.map((section) => section._type)).toEqual([
      "heroSection",
      "statsSection",
      "aboutSection",
      "servicesSection",
      "gallerySection",
      "testimonialsSection",
      "contactSection",
    ]);
  });

  it("carries the reference site's real stats/trust-badges from the SHU-000 audit", async () => {
    const seed = await buildHomePageSeed(
      mockClient("image-hero-800x1000-webp"),
    );
    const [, stats] = seed.sections;

    expect(stats.items.map((item) => `${item.value} ${item.label}`)).toEqual([
      "50+ Verified Reviews",
      "5.0★ Google Rating",
      "24/7 Open All Days",
      "1000+ Happy Events",
    ]);
  });

  it("carries the reference site's real hero copy and CTAs from the SHU-000 audit", async () => {
    const seed = await buildHomePageSeed(
      mockClient("image-hero-800x1000-webp"),
    );
    const [hero] = seed.sections;

    expect(hero.headline).toBe("Your Vision, Our Magic.");
    expect(hero.primaryCtaLabel).toBe("Plan Your Event");
    expect(hero.primaryCtaHref).toBe("/contact");
    expect(hero.secondaryCtaLabel).toBe("View Portfolio");
    expect(hero.secondaryCtaHref).toBe("/gallery");
    expect(hero.backgroundImageAlt).toBe(
      "Shubhkamna Events luxury wedding planning Indore",
    );
    expect(hero.headlineHighlight).toBe("Our Magic.");
    expect(hero.secondaryImageAlt).toBe("Shubhkamna Events decor setup");
  });

  it("uploads the hero background image and references the resulting asset", async () => {
    const fakeBuffer = new ArrayBuffer(4);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: () => Promise.resolve(fakeBuffer),
    }) as unknown as typeof fetch;
    const client = mockClient(null);

    const seed = await buildHomePageSeed(client);

    expect(client.assets.upload).toHaveBeenCalledWith(
      "image",
      expect.any(Buffer),
      { filename: "v1.webp" },
    );
    expect(seed.sections[0].backgroundImage).toEqual({
      _type: "image",
      asset: { _type: "reference", _ref: "image-hero-800x1000-webp" },
    });
  });

  it("carries the reference site's real about content from the SHU-000 audit", async () => {
    const seed = await buildHomePageSeed(
      mockClient("image-hero-800x1000-webp"),
    );
    const [, , about] = seed.sections;

    expect(about.eyebrow).toBe("About Shubhkamna Events");
    expect(about.heading).toBe("Elite Event Planning Experts in Indore");
    expect(about.checklist).toEqual([
      "Corporate & Conference coordination",
      "Theme party & Decor design",
      "Destination Wedding planning",
    ]);
    expect(about.ctaLabel).toBe("Contact Our Team");
    expect(about.ctaHref).toBe("/contact");
  });

  it("carries the reference site's real services catalog from the SHU-000 audit", async () => {
    const seed = await buildHomePageSeed(
      mockClient("image-hero-800x1000-webp"),
    );
    const [, , , services] = seed.sections;

    expect(services.intro).toBe(
      "From personal celebrations to large-scale professional events, we provide end-to-end management services.",
    );
    expect(services.viewAllLabel).toBe("See All Services");
    expect(services.viewAllHref).toBe("/services");
    expect(services.items.map((item) => item.title)).toEqual([
      "Weddings",
      "Corporate",
      "Social Events",
      "Destination & Religious",
    ]);
    expect(services.items.map((item) => item.icon)).toEqual([
      "heart",
      "briefcase",
      "cake",
      "temple",
    ]);
  });

  it("carries the reference site's real gallery images from the SHU-000 audit", async () => {
    const seed = await buildHomePageSeed(
      mockClient("image-hero-800x1000-webp"),
    );
    const [, , , , gallery] = seed.sections;

    expect(gallery.intro).toBe(
      "Take a look at the stunning events we have brought to life across Indore.",
    );
    expect(gallery.viewAllLabel).toBe("See More Projects");
    expect(gallery.images.map((image) => image.alt)).toEqual([
      "Shubhkamna Events wedding decor",
      "Shubhkamna Events corporate event",
      "Shubhkamna Events birthday party",
      "Shubhkamna Events event decor",
      "Shubhkamna Events luxury planning",
    ]);
    expect(gallery.images.every((image) => image.image.asset._ref)).toBe(true);
  });

  it("carries the reference site's real testimonials from the SHU-000 audit", async () => {
    const seed = await buildHomePageSeed(
      mockClient("image-hero-800x1000-webp"),
    );
    const [, , , , , testimonials] = seed.sections;

    expect(testimonials.intro).toBe(
      "We take pride in our 5-star reputation. Here is what people are saying about Shubhkamna Events.",
    );
    expect(testimonials.items.map((item) => item.author)).toEqual([
      "Jyoti Bansal",
      "Rajesh Khanna",
      "Sneha Mehta",
      "Priyanka Verma",
    ]);
    expect(testimonials.items.every((item) => item.rating === 5)).toBe(true);
  });

  it("carries the reference site's real contact banner content from the SHU-000 audit", async () => {
    const seed = await buildHomePageSeed(
      mockClient("image-hero-800x1000-webp"),
    );
    const [, , , , , , contact] = seed.sections;

    expect(contact.variant).toBe("banner");
    expect(contact.intro).toBe(
      "Contact the 5-star experts at Shubhkamna Events today. We are open 24/7 to help you plan your next big event in Indore.",
    );
  });

  it("carries the reference site's real headings for the remaining sections", async () => {
    const seed = await buildHomePageSeed(
      mockClient("image-hero-800x1000-webp"),
    );
    const [, , , services, gallery, testimonials, contact] = seed.sections;

    expect([
      services.heading,
      gallery.heading,
      testimonials.heading,
      contact.heading,
    ]).toEqual([
      "What We Do Best",
      "Capturing Every Moment",
      "What Our Clients Think",
      "Ready to Create Magical Moments?",
    ]);
  });
});
