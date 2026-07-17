import type { SanityClient } from "@sanity/client";

import type { SanityImageRef } from "../uploadImage";
import { uploadImageIfNeeded } from "../uploadImage";

const IMAGE_BASE_URL =
  "https://cdn.jsdelivr.net/gh/Dynamo-Studio/Shubhkamna-Events-Images@main";

interface GalleryPageImageSeed {
  image: SanityImageRef;
  alt: string;
  caption: string;
  category: string;
}

interface GalleryPageSeed {
  heading: string;
  intro: string;
  images: GalleryPageImageSeed[];
}

// Sourced from docs/reference-site-audit.md §2.5 (portfolio.html's full
// 20-image grid) — the standalone gallery page's complete portfolio,
// distinct from the 5-image homepage teaser ([[SHU-012]]).
const IMAGE_META: {
  filename: string;
  alt: string;
  caption: string;
  category: string;
}[] = [
  {
    filename: "v1.webp",
    alt: "Luxury Wedding Decor Indore by Shubhkamna Events",
    caption: "Luxury Reception Decor",
    category: "Indore | 500+ Guests",
  },
  {
    filename: "v2.webp",
    alt: "Corporate Event Planning by Shubhkamna Events",
    caption: "Corporate Gala",
    category: "Product Launch",
  },
  {
    filename: "v3.webp",
    alt: "Birthday Party Decoration Indore",
    caption: "Theme Birthday",
    category: "Cocomelon Theme",
  },
  {
    filename: "v4.webp",
    alt: "Stage Decoration by Shubhkamna Events",
    caption: "Elite Stage Setup",
    category: "Chhawni Premium Venue",
  },
  {
    filename: "v5.webp",
    alt: "Engagement Decor by Shubhkamna Events",
    caption: "Ring Ceremony Grandeur",
    category: "Royal Theme Setup",
  },
  {
    filename: "v6.webp",
    alt: "Anniversary Planning by Shubhkamna Events",
    caption: "Silver Jubilee",
    category: "25 Years Celebration",
  },
  {
    filename: "v7.webp",
    alt: "Baby Shower Decor by Shubhkamna Events",
    caption: "Baby Shower Theme",
    category: "Pastel Floral Setup",
  },
  {
    filename: "v8.webp",
    alt: "Destination Wedding Shubhkamna Events",
    caption: "Destination Wedding",
    category: "Ujjain Venue",
  },
  {
    filename: "v9.webp",
    alt: "House Warming Ceremony",
    caption: "House Warming",
    category: "Traditional Decor",
  },
  {
    filename: "v10.webp",
    alt: "Concert Event Management",
    caption: "Live Concert Setup",
    category: "DJ Night & Entertainment",
  },
  {
    filename: "v11.webp",
    alt: "Wedding Florist Services",
    caption: "Floral Wedding Decor",
    category: "Fresh Flower Setup",
  },
  {
    filename: "v12.webp",
    alt: "Kitty Party Decoration",
    caption: "Kitty Party",
    category: "Themed Gathering",
  },
  {
    filename: "v13.webp",
    alt: "Religious Wedding Planning",
    caption: "Religious Ceremony",
    category: "Traditional Rituals",
  },
  {
    filename: "v14.webp",
    alt: "Fashion Show Event",
    caption: "Fashion Show",
    category: "Runway Management",
  },
  {
    filename: "v15.webp",
    alt: "Wedding Makeup Services",
    caption: "Wedding Hair & Makeup",
    category: "Professional Styling",
  },
  {
    filename: "v16.webp",
    alt: "Corporate Conference Setup",
    caption: "Business Conference",
    category: "Professional Lighting & Sound",
  },
  {
    filename: "v17.webp",
    alt: "Charity Event Planning",
    caption: "Charity Gala",
    category: "Fundraiser Event",
  },
  {
    filename: "v18.webp",
    alt: "Cultural Event Management",
    caption: "Cultural Festival",
    category: "Entertainment Event",
  },
  {
    filename: "v19.webp",
    alt: "Wedding Decoration Complete Solution",
    caption: "Wedding Complete Solution",
    category: "End to End Management",
  },
  {
    filename: "v20.webp",
    alt: "Hybrid Event Planning",
    caption: "Hybrid Event",
    category: "Virtual + Physical Setup",
  },
];

export async function buildGalleryPageSeed(
  client: SanityClient,
): Promise<GalleryPageSeed> {
  const images = await Promise.all(
    IMAGE_META.map(async (meta) => ({
      image: await uploadImageIfNeeded(
        client,
        `${IMAGE_BASE_URL}/${meta.filename}`,
        meta.filename,
      ),
      alt: meta.alt,
      caption: meta.caption,
      category: meta.category,
    })),
  );

  return {
    heading: "Shubhkamna Events Masterpieces",
    intro:
      "A visual showcase of our elite event planning and luxury decor across Indore and beyond. Witness how we transform your special moments into unforgettable memories. 1000+ happy events delivered.",
    images,
  };
}
