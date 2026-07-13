import { z } from "zod";

import { sanityImageSchema } from "@/lib/validations/image.schema";
import { optionalNullable } from "@/lib/validations/zodHelpers";

// `heading` is the one field every stub homepage section shares (SHU-000's
// audit) and is required for the Sanity object type to be valid. Real
// content fields are added by each section's own ticket (SHU-010 through
// SHU-014) — `_type` discriminates which organism the renderer (SHU-015)
// will mount.
export const heroSectionSchema = z.object({
  _type: z.literal("heroSection"),
  headline: z.string().min(1),
  subhead: optionalNullable(z.string()),
  backgroundImage: optionalNullable(sanityImageSchema),
  backgroundImageAlt: optionalNullable(z.string()),
  // No Sanity file/video-asset pipeline exists in this project yet — an
  // external URL is enough to support the "or video" case the ticket asks
  // for without building one just for this optional field.
  backgroundVideoUrl: optionalNullable(z.string().url()),
  primaryCtaLabel: z.string().min(1),
  primaryCtaHref: z.string().min(1),
  secondaryCtaLabel: optionalNullable(z.string()),
  secondaryCtaHref: optionalNullable(z.string()),
});
export const serviceItemSchema = z.object({
  icon: z.enum(["heart", "briefcase", "cake", "temple"]),
  title: z.string().min(1),
  description: z.string().min(1),
  href: optionalNullable(z.string()),
});

export type ServiceItem = z.infer<typeof serviceItemSchema>;

export const servicesSectionSchema = z.object({
  _type: z.literal("servicesSection"),
  heading: optionalNullable(z.string()),
  intro: optionalNullable(z.string()),
  viewAllLabel: optionalNullable(z.string()),
  viewAllHref: optionalNullable(z.string()),
  items: z
    .array(serviceItemSchema)
    .nullish()
    .transform((value) => value ?? []),
});
export const gallerySectionSchema = z.object({
  _type: z.literal("gallerySection"),
  heading: optionalNullable(z.string()),
});
export const testimonialsSectionSchema = z.object({
  _type: z.literal("testimonialsSection"),
  heading: optionalNullable(z.string()),
});
export const contactSectionSchema = z.object({
  _type: z.literal("contactSection"),
  heading: optionalNullable(z.string()),
});

export const homePageSectionSchema = z.discriminatedUnion("_type", [
  heroSectionSchema,
  servicesSectionSchema,
  gallerySectionSchema,
  testimonialsSectionSchema,
  contactSectionSchema,
]);

export type HeroSection = z.infer<typeof heroSectionSchema>;
export type ServicesSection = z.infer<typeof servicesSectionSchema>;
export type GallerySection = z.infer<typeof gallerySectionSchema>;
export type TestimonialsSection = z.infer<typeof testimonialsSectionSchema>;
export type ContactSection = z.infer<typeof contactSectionSchema>;
export type HomePageSection = z.infer<typeof homePageSectionSchema>;

export const homePageSchema = z.object({
  sections: z.array(homePageSectionSchema).min(1),
});

export type HomePage = z.infer<typeof homePageSchema>;
