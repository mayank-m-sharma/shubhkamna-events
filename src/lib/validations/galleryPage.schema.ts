import { z } from "zod";

import { galleryImageSchema } from "@/lib/validations/homePage.schema";
import { optionalNullable } from "@/lib/validations/zodHelpers";

export const galleryPageSchema = z.object({
  eyebrow: optionalNullable(z.string()),
  heading: z.string().min(1),
  // Editor-controlled trailing substring of `heading` to render with a
  // gradient accent — same pattern as heroSection's headlineHighlight.
  headingHighlight: optionalNullable(z.string()),
  intro: optionalNullable(z.string()),
  images: z.array(galleryImageSchema).min(1),
});

export type GalleryPage = z.infer<typeof galleryPageSchema>;
