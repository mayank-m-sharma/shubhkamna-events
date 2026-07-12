import { z } from "zod";

import { sanityImageSchema } from "@/lib/validations/image.schema";

// GROQ returns `null` (not `undefined`) for a field the editor hasn't set —
// normalize that to `undefined` so the inferred TS type stays a clean
// optional (`T | undefined`) instead of leaking `| null` into every consumer.
function optional<Schema extends z.ZodTypeAny>(
  schema: Schema,
): z.ZodType<z.infer<Schema> | undefined> {
  return schema.nullish().transform((value) => value ?? undefined);
}

export const socialLinkSchema = z.object({
  platform: z.enum(["instagram", "facebook", "twitter", "linkedin", "youtube"]),
  url: z.string().url(),
});

export type SocialLink = z.infer<typeof socialLinkSchema>;

export const siteSettingsSchema = z.object({
  siteName: z.string().min(1),
  tagline: z.string().min(1),
  comingSoonHeadline: z.string().min(1),
  comingSoonMessage: z.string().min(1),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
  logo: optional(sanityImageSchema),
  favicon: optional(sanityImageSchema),
  ogImage: optional(sanityImageSchema),
  socialLinks: z
    .array(socialLinkSchema)
    .nullish()
    .transform((value) => value ?? []),
  organizationLegalName: optional(z.string()),
  organizationAddress: optional(z.string()),
  organizationPhone: optional(z.string()),
  whatsappNumber: optional(z.string()),
  reviewRating: optional(z.number().min(0).max(5)),
  reviewCount: optional(z.number().int().min(0)),
  reviewUrl: optional(z.string().url()),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;

// Used until the Sanity "Site Settings" document is published for the first time,
// and as the safety net if the CMS response ever fails validation.
export const fallbackSiteSettings: SiteSettings = {
  siteName: "Shubhkamna Events",
  tagline: "Celebrations, planned with care.",
  comingSoonHeadline: "Something wonderful is on its way.",
  comingSoonMessage:
    "We're putting the finishing touches on our new home online. Check back soon.",
  seoTitle: "Shubhkamna Events — Coming Soon",
  seoDescription:
    "Shubhkamna Events is launching a new website soon. Get ready for a fresh look at our event planning services.",
  logo: undefined,
  favicon: undefined,
  ogImage: undefined,
  socialLinks: [],
  organizationLegalName: undefined,
  organizationAddress: undefined,
  organizationPhone: undefined,
  whatsappNumber: undefined,
  reviewRating: undefined,
  reviewCount: undefined,
  reviewUrl: undefined,
};
