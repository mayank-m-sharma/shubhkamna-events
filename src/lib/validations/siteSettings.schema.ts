import { z } from "zod";

export const siteSettingsSchema = z.object({
  siteName: z.string().min(1),
  tagline: z.string().min(1),
  comingSoonHeadline: z.string().min(1),
  comingSoonMessage: z.string().min(1),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
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
};
