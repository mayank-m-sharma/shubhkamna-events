import { z } from "zod";

import { sanityImageSchema } from "@/lib/validations/image.schema";
import { optionalNullable } from "@/lib/validations/zodHelpers";

export const navItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export type NavItem = z.infer<typeof navItemSchema>;

export const headerConfigSchema = z.object({
  logo: optionalNullable(sanityImageSchema),
  navItems: z
    .array(navItemSchema)
    .nullish()
    .transform((value) => value ?? []),
  ctaLabel: optionalNullable(z.string()),
  ctaHref: optionalNullable(z.string()),
});

export type HeaderConfig = z.infer<typeof headerConfigSchema>;

// Matches the reference site's nav order/labels (SHU-000's audit §2.1),
// used until the Sanity "Header Config" document is published for the
// first time, and as the safety net if the CMS response ever fails
// validation.
export const fallbackHeaderConfig: HeaderConfig = {
  logo: undefined,
  navItems: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  ctaLabel: "Call Now",
  ctaHref: "tel:+919754455007",
};
