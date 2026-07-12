import type { SanityClient } from "@sanity/client";

import { uploadImageIfNeeded } from "./uploadImage";

describe("uploadImageIfNeeded", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("reuses an existing asset instead of re-downloading/re-uploading it", async () => {
    const fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
    const client = {
      fetch: jest
        .fn()
        .mockResolvedValue({ _id: "image-existing-800x600-webp" }),
      assets: { upload: jest.fn() },
    } as unknown as SanityClient;

    const result = await uploadImageIfNeeded(
      client,
      "https://cdn.jsdelivr.net/gh/example/v1.webp",
      "v1.webp",
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(client.assets.upload).not.toHaveBeenCalled();
    expect(result).toEqual({
      _type: "image",
      asset: { _type: "reference", _ref: "image-existing-800x600-webp" },
    });
  });

  it("downloads and uploads a new image when no matching asset exists", async () => {
    const fakeBuffer = new ArrayBuffer(4);
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: () => Promise.resolve(fakeBuffer),
    });
    global.fetch = fetchMock as unknown as typeof fetch;
    const client = {
      fetch: jest.fn().mockResolvedValue(null),
      assets: {
        upload: jest.fn().mockResolvedValue({ _id: "image-new-800x600-webp" }),
      },
    } as unknown as SanityClient;

    const result = await uploadImageIfNeeded(
      client,
      "https://cdn.jsdelivr.net/gh/example/v2.webp",
      "v2.webp",
    );

    expect(fetchMock).toHaveBeenCalledWith(
      "https://cdn.jsdelivr.net/gh/example/v2.webp",
    );
    expect(client.assets.upload).toHaveBeenCalledWith(
      "image",
      expect.any(Buffer),
      { filename: "v2.webp" },
    );
    expect(result).toEqual({
      _type: "image",
      asset: { _type: "reference", _ref: "image-new-800x600-webp" },
    });
  });

  it("throws a clear error when the download fails", async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: false, status: 404 });
    global.fetch = fetchMock as unknown as typeof fetch;
    const client = {
      fetch: jest.fn().mockResolvedValue(null),
      assets: { upload: jest.fn() },
    } as unknown as SanityClient;

    await expect(
      uploadImageIfNeeded(
        client,
        "https://example.com/missing.webp",
        "missing.webp",
      ),
    ).rejects.toThrow(/missing.webp/);
  });
});
