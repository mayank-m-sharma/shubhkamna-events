import { createClient, type SanityClient } from "@sanity/client";

import { apiVersion, dataset, projectId } from "@/lib/sanity/env";

const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  throw new Error(
    "SANITY_API_WRITE_TOKEN is not set. Generate a write-scoped token in " +
      "manage.sanity.io and set it in .env.local.",
  );
}

// useCdn: false — writes must go straight to the live dataset, never a
// cached CDN response. Shared by the seed script and any Server Action
// that needs to write to Sanity (e.g. submitEnquiry, SHU-014).
export const sanityWriteClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});
