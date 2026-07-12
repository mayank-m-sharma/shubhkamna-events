import type { SanityClient } from "@sanity/client";

interface SeedDocument {
  _id: string;
  _type: string;
  [key: string]: unknown;
}

// createOrReplace makes every run of the seed script idempotent: a document
// with the same fixed _id is overwritten in place rather than duplicated.
export async function upsertDocument(
  client: SanityClient,
  document: SeedDocument,
): Promise<"created" | "updated"> {
  const existing = await client.getDocument(document._id);

  await client.createOrReplace(document);

  return existing ? "updated" : "created";
}
