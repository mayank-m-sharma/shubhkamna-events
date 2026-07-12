import type { SanityClient } from "@sanity/client";

import { upsertDocument } from "./upsertDocument";

function createMockClient(existingDocument: unknown): SanityClient {
  return {
    getDocument: jest.fn().mockResolvedValue(existingDocument),
    createOrReplace: jest.fn().mockResolvedValue(undefined),
  } as unknown as SanityClient;
}

describe("upsertDocument", () => {
  it("reports 'created' when no document existed before the write", async () => {
    const client = createMockClient(undefined);

    const result = await upsertDocument(client, {
      _id: "siteSettings",
      _type: "siteSettings",
      siteName: "Shubhkamna Events",
    });

    expect(result).toBe("created");
    expect(client.createOrReplace).toHaveBeenCalledWith({
      _id: "siteSettings",
      _type: "siteSettings",
      siteName: "Shubhkamna Events",
    });
  });

  it("reports 'updated' when a document already existed", async () => {
    const client = createMockClient({ _id: "siteSettings" });

    const result = await upsertDocument(client, {
      _id: "siteSettings",
      _type: "siteSettings",
      siteName: "Shubhkamna Events",
    });

    expect(result).toBe("updated");
  });

  it("always writes via createOrReplace, never a plain create (idempotent re-run)", async () => {
    const client = createMockClient({ _id: "siteSettings" });

    await upsertDocument(client, {
      _id: "siteSettings",
      _type: "siteSettings",
      siteName: "Shubhkamna Events",
    });

    expect(client.createOrReplace).toHaveBeenCalledTimes(1);
  });
});
