import { z } from "zod";

import { galleryImageSchema } from "@/lib/validations/homePage.schema";
import { sanityImageSchema } from "@/lib/validations/image.schema";
import { serviceIconSchema } from "@/lib/validations/serviceIcon.schema";
import { optionalNullable } from "@/lib/validations/zodHelpers";

export { serviceIconSchema };

// The per-service detail-page document (SHU-017) — distinct from
// servicesSection's `ServiceItem` (a lightweight homepage card); this is
// the full-detail counterpart a `ServiceItem.href` can link to once an
// editor points it at `/services/{slug}`.
export const serviceSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  icon: serviceIconSchema,
  description: z.string().min(1),
  image: sanityImageSchema,
  imageAlt: z.string().min(1),
  features: z.array(z.string().min(1)).min(1),
  gallery: z
    .array(galleryImageSchema)
    .nullish()
    .transform((value) => value ?? []),
  ctaLabel: z.string().min(1),
  ctaHref: z.string().min(1),
  order: optionalNullable(z.number()),
});

export type Service = z.infer<typeof serviceSchema>;

export const serviceSlugSchema = z.object({
  slug: z.string().min(1),
});

export const serviceSlugsSchema = z.array(serviceSlugSchema);
