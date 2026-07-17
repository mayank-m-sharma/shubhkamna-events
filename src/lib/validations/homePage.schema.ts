import { z } from "zod";

import { sanityImageSchema } from "@/lib/validations/image.schema";
import { serviceIconSchema } from "@/lib/validations/serviceIcon.schema";
import { optionalNullable } from "@/lib/validations/zodHelpers";

// `heading` is the one field every stub homepage section shares (SHU-000's
// audit) and is required for the Sanity object type to be valid. Real
// content fields are added by each section's own ticket (SHU-010 through
// SHU-014) — `_type` discriminates which organism the renderer (SHU-015)
// will mount.
export const heroSectionSchema = z.object({
  _type: z.literal("heroSection"),
  headline: z.string().min(1),
  // Editor-controlled trailing substring of `headline` to render with a
  // gradient accent (e.g. "Our Magic." within "Your Vision, Our Magic.") —
  // matches the reference site's treatment (SHU-000's audit §2.3) without
  // the component guessing which word(s) to emphasize.
  headlineHighlight: optionalNullable(z.string()),
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
  // Optional smaller accent image overlapping the main hero image — matches
  // the reference site's richer hero treatment (SHU-000's audit §2.3/§4:
  // "a floating stat badge and secondary accent image, not just one
  // background image"). Purely decorative when present; omitted entirely
  // when unset rather than forcing every editor to supply one.
  secondaryImage: optionalNullable(sanityImageSchema),
  secondaryImageAlt: optionalNullable(z.string()),
});
export const serviceItemSchema = z.object({
  icon: serviceIconSchema,
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
export const galleryImageSchema = z.object({
  image: sanityImageSchema,
  // Required, not optional — every gallery image needs editor-supplied alt
  // text, enforced here rather than left to lint (SHU-012's acceptance
  // criteria).
  alt: z.string().min(1),
  caption: optionalNullable(z.string()),
  category: optionalNullable(z.string()),
});

export type GalleryImage = z.infer<typeof galleryImageSchema>;

export const gallerySectionSchema = z.object({
  _type: z.literal("gallerySection"),
  heading: optionalNullable(z.string()),
  intro: optionalNullable(z.string()),
  viewAllLabel: optionalNullable(z.string()),
  viewAllHref: optionalNullable(z.string()),
  images: z
    .array(galleryImageSchema)
    .nullish()
    .transform((value) => value ?? []),
});
export const testimonialItemSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  role: optionalNullable(z.string()),
  // Unused on the reference (initials-avatar fallback only) but modeled
  // per the ticket, for editors who do have a real client photo.
  photo: optionalNullable(sanityImageSchema),
  rating: optionalNullable(z.number().min(1).max(5)),
});

export type TestimonialItem = z.infer<typeof testimonialItemSchema>;

export const testimonialsSectionSchema = z.object({
  _type: z.literal("testimonialsSection"),
  heading: optionalNullable(z.string()),
  intro: optionalNullable(z.string()),
  items: z
    .array(testimonialItemSchema)
    .nullish()
    .transform((value) => value ?? []),
});
// On the reference site this section renders as a lighter phone/WhatsApp
// CTA banner when placed on the homepage, with the full enquiry form
// reserved for the dedicated Contact page (SHU-000's audit §2.3/§4) — one
// schema/organism pair supports both via `variant`, rather than two
// divergent object types.
export const contactSectionSchema = z.object({
  _type: z.literal("contactSection"),
  variant: z.enum(["banner", "form"]),
  heading: optionalNullable(z.string()),
  intro: optionalNullable(z.string()),
  // Shown after a successful form submission — only meaningful for the
  // "form" variant, irrelevant for "banner".
  successMessage: optionalNullable(z.string()),
});

export const statItemSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

export type StatItem = z.infer<typeof statItemSchema>;

export const statsSectionSchema = z.object({
  _type: z.literal("statsSection"),
  heading: optionalNullable(z.string()),
  items: z
    .array(statItemSchema)
    .nullish()
    .transform((value) => value ?? []),
});

// Sourced from docs/reference-site-audit.md §2.3/§4 — a homepage-only
// "About" block (eyebrow, heading, 2 paragraphs, checklist, CTA, 2 offset
// images) the audit flagged as a real gap ("no ticket currently covers
// this as a homepage section"), distinct from the rejected SHU-016
// standalone About *page*.
export const aboutSectionSchema = z.object({
  _type: z.literal("aboutSection"),
  eyebrow: optionalNullable(z.string()),
  heading: z.string().min(1),
  bodyFirst: z.string().min(1),
  bodySecond: optionalNullable(z.string()),
  checklist: z
    .array(z.string().min(1))
    .nullish()
    .transform((value) => value ?? []),
  ctaLabel: optionalNullable(z.string()),
  ctaHref: optionalNullable(z.string()),
  imageFirst: sanityImageSchema,
  imageFirstAlt: z.string().min(1),
  imageSecond: optionalNullable(sanityImageSchema),
  imageSecondAlt: optionalNullable(z.string()),
});

export const homePageSectionSchema = z.discriminatedUnion("_type", [
  heroSectionSchema,
  servicesSectionSchema,
  gallerySectionSchema,
  testimonialsSectionSchema,
  contactSectionSchema,
  statsSectionSchema,
  aboutSectionSchema,
]);

export type HeroSection = z.infer<typeof heroSectionSchema>;
export type ServicesSection = z.infer<typeof servicesSectionSchema>;
export type GallerySection = z.infer<typeof gallerySectionSchema>;
export type TestimonialsSection = z.infer<typeof testimonialsSectionSchema>;
export type ContactSection = z.infer<typeof contactSectionSchema>;
export type StatsSection = z.infer<typeof statsSectionSchema>;
export type AboutSection = z.infer<typeof aboutSectionSchema>;
export type HomePageSection = z.infer<typeof homePageSectionSchema>;

export const homePageSchema = z.object({
  sections: z.array(homePageSectionSchema).min(1),
});

export type HomePage = z.infer<typeof homePageSchema>;
