import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { contactPageQuery } from "@/lib/sanity/queries";
import { contactPageSchema } from "@/lib/validations/contactPage.schema";
import type { ContactPage } from "@/lib/validations/contactPage.schema";

// No fallback constant — there's no sensible synthetic contact page to
// invent. `null` signals the route to 404 instead of rendering an empty
// page, same pattern as getGalleryPage.
export const getContactPage = cache(async (): Promise<ContactPage | null> => {
  const raw: unknown = await sanityClient.fetch(
    contactPageQuery,
    {},
    { next: { tags: ["contactPage"] } },
  );
  const parsed = contactPageSchema.safeParse(raw);

  return parsed.success ? parsed.data : null;
});
