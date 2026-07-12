import type { SanityClient } from "@sanity/client";

interface SanityImageRef {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
}

// Idempotent: re-running the seed script recognizes an asset it already
// uploaded (matched by original filename) instead of duplicating it.
export async function uploadImageIfNeeded(
  client: SanityClient,
  imageUrl: string,
  filename: string,
): Promise<SanityImageRef> {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{ _id }`,
    { filename },
  );

  if (existing) {
    return {
      _type: "image",
      asset: { _type: "reference", _ref: existing._id },
    };
  }

  const response = await fetch(imageUrl);

  if (!response.ok) {
    throw new Error(
      `Failed to download seed image "${filename}" from ${imageUrl}: HTTP ${response.status}`,
    );
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename });

  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}
