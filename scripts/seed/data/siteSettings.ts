import type { SiteSettings } from "@/types/siteSettings";

// Sourced from docs/reference-site-audit.md. logo/favicon/ogImage are
// deliberately omitted — the reference site has no real logo/favicon
// asset (its "logo" is a Material Symbols glyph + text wordmark, not an
// uploadable image), so there is nothing genuine to seed for those fields.
export const siteSettingsSeed: Omit<
  SiteSettings,
  "logo" | "favicon" | "ogImage"
> = {
  siteName: "Shubhkamna Events",
  tagline: "Celebrations, planned with care.",
  comingSoonHeadline: "Something wonderful is on its way.",
  comingSoonMessage:
    "We're putting the finishing touches on our new home online. Check back soon.",
  seoTitle: "Shubhkamna Events | Indore Event Planners",
  seoDescription:
    "Indore's 5-star premier event planner. From grand weddings to corporate conferences, we handle every detail — open 24/7.",
  socialLinks: [
    {
      platform: "instagram",
      url: "https://www.instagram.com/shubhkamnaevents02/",
    },
  ],
  organizationLegalName: "Shubhkamna Events",
  organizationAddress:
    "Pragati Chamber, 34/3, Murai Mohalla, Chhawni, Indore, Madhya Pradesh 452001",
  organizationPhone: "+919754455007",
  whatsappNumber: "+919754455007",
  reviewRating: 5,
  reviewCount: 50,
  reviewUrl: "https://www.google.com/search?q=shubhkamna+events+indore+reviews",
};
