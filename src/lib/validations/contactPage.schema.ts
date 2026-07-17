import { z } from "zod";

import { faqSectionSchema } from "@/lib/validations/faqSection.schema";
import { contactSectionSchema } from "@/lib/validations/homePage.schema";
import { sanityImageSchema } from "@/lib/validations/image.schema";
import { optionalNullable } from "@/lib/validations/zodHelpers";

export const contactPageSchema = z.object({
  heroHeading: z.string().min(1),
  heroSubhead: optionalNullable(z.string()),
  heroBackgroundImage: optionalNullable(sanityImageSchema),
  // Reused, not redefined — the same schema SHU-014's homepage banner
  // uses, just with its "form" variant on this page.
  contact: contactSectionSchema,
  areasServed: z
    .array(z.string().min(1))
    .nullish()
    .transform((value) => value ?? []),
  // Reused from SHU-027 — optional, since not every deploy of this page
  // needs an FAQ block.
  faq: optionalNullable(faqSectionSchema),
});

export type ContactPage = z.infer<typeof contactPageSchema>;
