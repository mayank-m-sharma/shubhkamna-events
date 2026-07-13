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
      "servicesSection",
      "gallerySection",
      "testimonialsSection",
      "contactSection",
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

  it("carries the reference site's real headings for the remaining sections", async () => {
    const seed = await buildHomePageSeed(
      mockClient("image-hero-800x1000-webp"),
    );
    const [, services, gallery, testimonials, contact] = seed.sections;

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
