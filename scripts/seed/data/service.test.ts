import type { SanityClient } from "@sanity/client";

import { buildServiceSeeds } from "./service";

function mockClient(existingAssetId: string | null): SanityClient {
  return {
    fetch: jest
      .fn()
      .mockResolvedValue(existingAssetId ? { _id: existingAssetId } : null),
    assets: {
      upload: jest
        .fn()
        .mockResolvedValue({ _id: "image-service-800x1000-webp" }),
    },
  } as unknown as SanityClient;
}

describe("buildServiceSeeds", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("carries all 6 categories from services.html in the SHU-000 audit, in catalog order", async () => {
    const seeds = await buildServiceSeeds(
      mockClient("image-service-800x1000-webp"),
    );

    expect(seeds.map((seed) => seed.title)).toEqual([
      "Weddings",
      "Corporate",
      "Social Events",
      "Decorations",
      "Entertainment",
      "Special Events",
    ]);
  });

  it("gives each service a unique kebab-case slug and a fixed, stable document _id", async () => {
    const seeds = await buildServiceSeeds(
      mockClient("image-service-800x1000-webp"),
    );

    expect(seeds.map((seed) => seed.slug.current)).toEqual([
      "weddings",
      "corporate",
      "social-events",
      "decorations",
      "entertainment",
      "special-events",
    ]);
    expect(seeds.map((seed) => seed._id)).toEqual([
      "service-weddings",
      "service-corporate",
      "service-social-events",
      "service-decorations",
      "service-entertainment",
      "service-special-events",
    ]);
  });

  it("carries the real per-service description, features, and CTA from the audit", async () => {
    const seeds = await buildServiceSeeds(
      mockClient("image-service-800x1000-webp"),
    );
    const weddings = seeds[0];

    expect(weddings.description).toBe(
      "Complete wedding planning and engagement coordination with customized themes. We create royal atmospheric experiences for your special day.",
    );
    expect(weddings.features).toEqual([
      "Wedding & Engagement planning",
      "Royal Theme Decor Design",
      "Destination Wedding planning",
      "Mandap & Aisle Styling",
      "Wedding florist services",
    ]);
    expect(weddings.ctaLabel).toBe("Enquire for Wedding");
    expect(weddings.ctaHref).toBe("/contact");
  });

  it("assigns every service a distinct icon matching its category", async () => {
    const seeds = await buildServiceSeeds(
      mockClient("image-service-800x1000-webp"),
    );

    expect(seeds.map((seed) => seed.icon)).toEqual([
      "heart",
      "briefcase",
      "cake",
      "palette",
      "music-note",
      "temple",
    ]);
  });

  it("uploads each service's image and references the resulting asset", async () => {
    const fakeBuffer = new ArrayBuffer(4);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: () => Promise.resolve(fakeBuffer),
    }) as unknown as typeof fetch;
    const client = mockClient(null);

    const seeds = await buildServiceSeeds(client);

    expect(client.assets.upload).toHaveBeenCalledWith(
      "image",
      expect.any(Buffer),
      { filename: "v1.webp" },
    );
    expect(seeds[0].image).toEqual({
      _type: "image",
      asset: { _type: "reference", _ref: "image-service-800x1000-webp" },
    });
  });

  it("assigns increasing display order matching the audit's catalog order", async () => {
    const seeds = await buildServiceSeeds(
      mockClient("image-service-800x1000-webp"),
    );

    expect(seeds.map((seed) => seed.order)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
