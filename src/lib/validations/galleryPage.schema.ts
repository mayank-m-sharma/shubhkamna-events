import { z } from "zod";

import { galleryImageSchema } from "@/lib/validations/homePage.schema";
import { optionalNullable } from "@/lib/validations/zodHelpers";

export const galleryPageSchema = z.object({
  heading: z.string().min(1),
  intro: optionalNullable(z.string()),
  images: z.array(galleryImageSchema).min(1),
});

export type GalleryPage = z.infer<typeof galleryPageSchema>;
