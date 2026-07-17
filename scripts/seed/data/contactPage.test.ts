import type { SanityClient } from "@sanity/client";

import { buildContactPageSeed } from "./contactPage";

function mockClient(existingAssetId: string | null): SanityClient {
  return {
    fetch: jest
      .fn()
      .mockResolvedValue(existingAssetId ? { _id: existingAssetId } : null),
    assets: {
      upload: jest
        .fn()
        .mockResolvedValue({ _id: "image-contact-800x1000-webp" }),
    },
  } as unknown as SanityClient;
}

describe("buildContactPageSeed", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("carries the reference site's real hero copy from the SHU-000 audit", async () => {
    const seed = await buildContactPageSeed(
      mockClient("image-contact-800x1000-webp"),
    );

    expect(seed.heroHeading).toBe("Let's Create Magic Together");
    expect(seed.heroSubhead).toContain("Bespoke planning");
  });

  it("uses the full enquiry form variant", async () => {
    const seed = await buildContactPageSeed(
      mockClient("image-contact-800x1000-webp"),
    );

    expect(seed.contact.variant).toBe("form");
  });

  it("carries the reconciled 8-place areas-served list", async () => {
    const seed = await buildContactPageSeed(
      mockClient("image-contact-800x1000-webp"),
    );

    expect(seed.areasServed).toEqual([
      "Indore",
      "Ujjain",
      "Dewas",
      "Khandwa",
      "Mandsaur",
      "Pithampur",
      "Rau",
      "Sendhwa",
    ]);
  });

  it("carries the reconciled 6-question FAQ set shared with faq.ts", async () => {
    const seed = await buildContactPageSeed(
      mockClient("image-contact-800x1000-webp"),
    );

    expect(seed.faq.items).toHaveLength(6);
  });

  it("uploads the hero background image and references the resulting asset", async () => {
    const fakeBuffer = new ArrayBuffer(4);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: () => Promise.resolve(fakeBuffer),
    }) as unknown as typeof fetch;
    const client = mockClient(null);

    const seed = await buildContactPageSeed(client);

    expect(client.assets.upload).toHaveBeenCalledWith(
      "image",
      expect.any(Buffer),
      { filename: "v5.webp" },
    );
    expect(seed.heroBackgroundImage).toEqual({
      _type: "image",
      asset: { _type: "reference", _ref: "image-contact-800x1000-webp" },
    });
  });
});
