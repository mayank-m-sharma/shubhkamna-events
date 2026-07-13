import { z } from "zod";

import { navItemSchema } from "@/lib/validations/headerConfig.schema";
import { socialLinkSchema } from "@/lib/validations/siteSettings.schema";
import { optionalNullable } from "@/lib/validations/zodHelpers";

export const footerColumnSchema = z.object({
  title: z.string().min(1),
  links: z
    .array(navItemSchema)
    .nullish()
    .transform((value) => value ?? []),
});

export type FooterColumn = z.infer<typeof footerColumnSchema>;

export const footerConfigSchema = z.object({
  columns: z
    .array(footerColumnSchema)
    .nullish()
    .transform((value) => value ?? []),
  contactPhone: optionalNullable(z.string()),
  contactEmail: optionalNullable(z.string().email()),
  contactAddress: optionalNullable(z.string()),
  socialLinks: z
    .array(socialLinkSchema)
    .nullish()
    .transform((value) => value ?? []),
  // Rendered as `© {currentYear} {copyrightText}` — the year is computed at
  // render time (see Footer.tsx), never stored, so it never needs an
  // annual content edit.
  copyrightText: optionalNullable(z.string()),
});

export type FooterConfig = z.infer<typeof footerConfigSchema>;

// Matches the reference site's footer content (SHU-000's audit §2.2), used
// until the Sanity "Footer" document is published for the first time, and
// as the safety net if the CMS response ever fails validation.
export const fallbackFooterConfig: FooterConfig = {
  columns: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Gallery", href: "/gallery" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Wedding Planning", href: "/services" },
        { label: "Corporate Events", href: "/services" },
        { label: "Birthday Parties", href: "/services" },
        { label: "Destination Wedding", href: "/services" },
      ],
    },
  ],
  contactPhone: "+919754455007",
  contactEmail: "shubhkamnaevents02@gmail.com",
  contactAddress:
    "Pragati Chamber, 34/3, Murai Mohalla, Chhawni, Indore, Madhya Pradesh 452001",
  socialLinks: [
    {
      platform: "instagram",
      url: "https://www.instagram.com/shubhkamnaevents02/",
    },
  ],
  copyrightText: "Shubhkamna Events Indore. All rights reserved.",
};
