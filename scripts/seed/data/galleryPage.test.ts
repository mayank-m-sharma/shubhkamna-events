import type { SanityClient } from "@sanity/client";

import { buildGalleryPageSeed } from "./galleryPage";

function mockClient(existingAssetId: string | null): SanityClient {
  return {
    fetch: jest
      .fn()
      .mockResolvedValue(existingAssetId ? { _id: existingAssetId } : null),
    assets: {
      upload: jest
        .fn()
        .mockResolvedValue({ _id: "image-gallery-800x1000-webp" }),
    },
  } as unknown as SanityClient;
}

describe("buildGalleryPageSeed", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("carries all 20 images from portfolio.html in the SHU-000 audit", async () => {
    const seed = await buildGalleryPageSeed(
      mockClient("image-gallery-800x1000-webp"),
    );

    expect(seed.images).toHaveLength(20);
    expect(seed.images[0]?.caption).toBe("Luxury Reception Decor");
    expect(seed.images[0]?.alt).toBe(
      "Luxury Wedding Decor Indore by Shubhkamna Events",
    );
  });

  it("carries the reference site's real heading and intro", async () => {
    const seed = await buildGalleryPageSeed(
      mockClient("image-gallery-800x1000-webp"),
    );

    expect(seed.heading).toBe("Shubhkamna Events Masterpieces");
    expect(seed.intro).toContain("1000+ happy events delivered");
  });

  it("uploads every image and references the resulting asset", async () => {
    const fakeBuffer = new ArrayBuffer(4);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: () => Promise.resolve(fakeBuffer),
    }) as unknown as typeof fetch;
    const client = mockClient(null);

    const seed = await buildGalleryPageSeed(client);

    expect(client.assets.upload).toHaveBeenCalledTimes(20);
    expect(seed.images[0]?.image).toEqual({
      _type: "image",
      asset: { _type: "reference", _ref: "image-gallery-800x1000-webp" },
    });
  });
});
