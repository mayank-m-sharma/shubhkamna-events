import type { HeaderConfig } from "@/types/headerConfig";

// Sourced from docs/reference-site-audit.md §2.1 — logo is omitted (no
// real uploadable logo asset, see the note in data/siteSettings.ts).
export const headerConfigSeed: Omit<HeaderConfig, "logo"> = {
  navItems: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  ctaLabel: "Call Now",
  ctaHref: "tel:+919754455007",
};
