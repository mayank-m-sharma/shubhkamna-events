import type { SanityClient } from "@sanity/client";

import type { SanityImageRef } from "../uploadImage";
import { uploadImageIfNeeded } from "../uploadImage";

const IMAGE_BASE_URL =
  "https://cdn.jsdelivr.net/gh/Dynamo-Studio/Shubhkamna-Events-Images@main";

interface ServiceSeed {
  _id: string;
  _type: "service";
  title: string;
  slug: { _type: "slug"; current: string };
  icon: string;
  description: string;
  image: SanityImageRef;
  imageAlt: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  order: number;
}

interface ServiceSeedInput {
  slug: string;
  title: string;
  icon: string;
  description: string;
  imageFilename: string;
  imageAlt: string;
  features: string[];
  ctaLabel: string;
}

// Sourced from docs/reference-site-audit.md §2.4 (services.html's 6-category
// grid) — all 6 CTAs point to contact.html on the reference (no per-service
// detail pages existed there), so ctaHref is uniformly "/contact" here too.
const SERVICE_SEED_INPUTS: ServiceSeedInput[] = [
  {
    slug: "weddings",
    title: "Weddings",
    icon: "heart",
    description:
      "Complete wedding planning and engagement coordination with customized themes. We create royal atmospheric experiences for your special day.",
    imageFilename: "v1.webp",
    imageAlt: "Wedding Planning by Shubhkamna Events",
    features: [
      "Wedding & Engagement planning",
      "Royal Theme Decor Design",
      "Destination Wedding planning",
      "Mandap & Aisle Styling",
      "Wedding florist services",
    ],
    ctaLabel: "Enquire for Wedding",
  },
  {
    slug: "corporate",
    title: "Corporate",
    icon: "briefcase",
    description:
      "Professional corporate event planning, conference coordination, product launches, and team building events.",
    imageFilename: "v6.webp",
    imageAlt: "Corporate Conference Planning by Shubhkamna Events",
    features: [
      "Conference planning & coordination",
      "Product launch & concert management",
      "Professional lighting & sound",
      "Stage & Tech Management",
    ],
    ctaLabel: "Corporate Solutions",
  },
  {
    slug: "social-events",
    title: "Social Events",
    icon: "cake",
    description:
      "From birthday parties to baby showers, kitty parties, and house warming ceremonies, we manage your personal celebrations with flair.",
    imageFilename: "v7.webp",
    imageAlt: "Birthday Party Planning by Shubhkamna Events",
    features: [
      "Birthday & Anniversary parties",
      "Baby shower & Kitty parties",
      "House warming ceremonies",
      "Theme parties (Custom Concepts)",
    ],
    ctaLabel: "Book a Party",
  },
  {
    slug: "decorations",
    title: "Decorations",
    icon: "palette",
    description:
      "Expert event decor design and styling. We transform venues into visually aesthetic and stunning magical environments.",
    imageFilename: "v10.webp",
    imageAlt: "Event Decor Design by Shubhkamna Events",
    features: [
      "Custom Event decor design",
      "Religious event planning & decor",
      "Wedding florist services",
      "Theme party specialized decor",
    ],
    ctaLabel: "Explore Decor",
  },
  {
    slug: "entertainment",
    title: "Entertainment",
    icon: "music-note",
    description:
      "Complete entertainment solutions including emcee & DJ, professional lighting, live concerts, and fashion shows.",
    imageFilename: "v14.webp",
    imageAlt: "Entertainment & DJ Services by Shubhkamna Events",
    features: [
      "Emcee & DJ services",
      "Professional lighting & sound",
      "Live concerts & fashion shows",
      "DJ night events",
    ],
    ctaLabel: "Book Entertainment",
  },
  {
    slug: "special-events",
    title: "Special Events",
    icon: "temple",
    description:
      "Specialized planning for religious ceremonies, cultural events, charity fundraisers, and wellness events.",
    imageFilename: "v5.webp",
    imageAlt: "Special Event Management by Shubhkamna Events",
    features: [
      "Religious ceremony planning",
      "Cultural & entertainment events",
      "Charity & fundraiser events",
      "Wellness & hybrid events",
    ],
    ctaLabel: "Book Special Event",
  },
];

export async function buildServiceSeeds(
  client: SanityClient,
): Promise<ServiceSeed[]> {
  const images = await Promise.all(
    SERVICE_SEED_INPUTS.map((input) =>
      uploadImageIfNeeded(
        client,
        `${IMAGE_BASE_URL}/${input.imageFilename}`,
        input.imageFilename,
      ),
    ),
  );

  return SERVICE_SEED_INPUTS.map((input, index) => ({
    _id: `service-${input.slug}`,
    _type: "service",
    title: input.title,
    slug: { _type: "slug", current: input.slug },
    icon: input.icon,
    description: input.description,
    image: images[index]!,
    imageAlt: input.imageAlt,
    features: input.features,
    ctaLabel: input.ctaLabel,
    ctaHref: "/contact",
    order: index + 1,
  }));
}
