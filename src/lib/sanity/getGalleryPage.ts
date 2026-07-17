import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { galleryPageQuery } from "@/lib/sanity/queries";
import { galleryPageSchema } from "@/lib/validations/galleryPage.schema";
import type { GalleryPage } from "@/lib/validations/galleryPage.schema";

// No fallback constant — there's no sensible synthetic gallery to invent.
// `null` signals the route to 404 instead of rendering an empty page.
export const getGalleryPage = cache(async (): Promise<GalleryPage | null> => {
  const raw: unknown = await sanityClient.fetch(
    galleryPageQuery,
    {},
    { next: { tags: ["galleryPage"] } },
  );
  const parsed = galleryPageSchema.safeParse(raw);

  return parsed.success ? parsed.data : null;
});
