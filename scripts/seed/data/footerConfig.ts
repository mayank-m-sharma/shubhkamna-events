import type { FooterConfig } from "@/types/footerConfig";

// Sourced from docs/reference-site-audit.md §2.2 — the home/portfolio/contact
// footer's Quick Links + Services columns (services.html's footer links to
// in-page anchors instead, which don't apply to this single global footer).
export const footerConfigSeed: FooterConfig = {
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
