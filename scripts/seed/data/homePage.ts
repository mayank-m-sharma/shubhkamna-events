import type { SanityClient } from "@sanity/client";

import type {
  ContactSection,
  ServicesSection,
  TestimonialsSection,
} from "@/lib/validations/homePage.schema";

import type { SanityImageRef } from "../uploadImage";
import { uploadImageIfNeeded } from "../uploadImage";

const IMAGE_BASE_URL =
  "https://cdn.jsdelivr.net/gh/Dynamo-Studio/Shubhkamna-Events-Images@main";

// Hero/Gallery images are the raw Sanity write-reference shape
// (SanityImageRef) returned by uploadImageIfNeeded, not the dereferenced
// read shape `sanityImageSchema` models (that shape only exists once a
// GROQ query re-fetches the published document with its asset resolved).
interface HeroSectionSeed {
  _type: "heroSection";
  headline: string;
  subhead: string;
  backgroundImage: SanityImageRef;
  backgroundImageAlt: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

interface GalleryImageSeed {
  image: SanityImageRef;
  alt: string;
  caption: string;
  category: string;
}

interface GallerySectionSeed {
  _type: "gallerySection";
  heading: string;
  intro: string;
  viewAllLabel: string;
  viewAllHref: string;
  images: GalleryImageSeed[];
}

interface HomePageSeed {
  sections: [
    HeroSectionSeed,
    ServicesSection,
    GallerySectionSeed,
    TestimonialsSection,
    ContactSection,
  ];
}

function buildHeroSectionSeed(
  backgroundImage: SanityImageRef,
): HeroSectionSeed {
  return {
    _type: "heroSection",
    headline: "Your Vision, Our Magic.",
    subhead:
      "Indore's 5-star premier event planner. From grand weddings to high-profile corporate conferences, we handle everything 24/7.",
    backgroundImage,
    backgroundImageAlt: "Shubhkamna Events luxury wedding planning Indore",
    primaryCtaLabel: "Plan Your Event",
    primaryCtaHref: "/contact",
    secondaryCtaLabel: "View Portfolio",
    secondaryCtaHref: "/gallery",
  };
}

// Sourced from docs/reference-site-audit.md §2.3 — no images needed, so
// this section (unlike hero/gallery) has no async asset upload step.
const servicesSectionSeed: ServicesSection = {
  _type: "servicesSection",
  heading: "What We Do Best",
  intro:
    "From personal celebrations to large-scale professional events, we provide end-to-end management services.",
  viewAllLabel: "See All Services",
  viewAllHref: "/services",
  items: [
    {
      icon: "heart",
      title: "Weddings",
      description:
        "Royal wedding and engagement planning with customized themes, complete decor, and management.",
      href: "/services",
    },
    {
      icon: "briefcase",
      title: "Corporate",
      description:
        "Expert conference planning, product launch, concert management, and team building events.",
      href: "/services",
    },
    {
      icon: "cake",
      title: "Social Events",
      description:
        "Birthday parties, baby shower, kitty parties, house warming, and anniversary celebrations.",
      href: "/services",
    },
    {
      icon: "temple",
      title: "Destination & Religious",
      description:
        "Destination wedding planning, religious ceremonies, emcee & DJ, professional lighting services.",
      href: "/services",
    },
  ],
};

interface GalleryImages {
  v1: SanityImageRef;
  v3: SanityImageRef;
  v5: SanityImageRef;
  v6: SanityImageRef;
  v7: SanityImageRef;
}

function buildGallerySectionSeed(images: GalleryImages): GallerySectionSeed {
  return {
    _type: "gallerySection",
    heading: "Capturing Every Moment",
    intro:
      "Take a look at the stunning events we have brought to life across Indore.",
    viewAllLabel: "See More Projects",
    viewAllHref: "/gallery",
    images: [
      {
        image: images.v5,
        alt: "Shubhkamna Events wedding decor",
        caption: "Grand Wedding Decor",
        category: "Wedding & Engagement",
      },
      {
        image: images.v6,
        alt: "Shubhkamna Events corporate event",
        caption: "Corporate Gala",
        category: "Indore Business Center",
      },
      {
        image: images.v7,
        alt: "Shubhkamna Events birthday party",
        caption: "Themed Birthday",
        category: "Theme party design",
      },
      {
        image: images.v3,
        alt: "Shubhkamna Events event decor",
        caption: "Anniversary Setup",
        category: "Private event planning",
      },
      {
        image: images.v1,
        alt: "Shubhkamna Events luxury planning",
        caption: "Premium Wedding Reception",
        category: "Chhawni, Indore",
      },
    ],
  };
}

// Section order and content match the reference site's homepage flow
// (SHU-000's audit §2.3: hero, services, gallery, testimonials, contact).
// Sections after gallery carry only their `heading` for now — the rest of
// each one's content fields are seeded by its own ticket (SHU-013–SHU-014)
// once they exist on the schema.
export async function buildHomePageSeed(
  client: SanityClient,
): Promise<HomePageSeed> {
  const [v1, v3, v5, v6, v7] = await Promise.all(
    ["v1.webp", "v3.webp", "v5.webp", "v6.webp", "v7.webp"].map((filename) =>
      uploadImageIfNeeded(client, `${IMAGE_BASE_URL}/${filename}`, filename),
    ),
  );

  return {
    sections: [
      buildHeroSectionSeed(v1!),
      servicesSectionSeed,
      buildGallerySectionSeed({ v1: v1!, v3: v3!, v5: v5!, v6: v6!, v7: v7! }),
      { _type: "testimonialsSection", heading: "What Our Clients Think" },
      { _type: "contactSection", heading: "Ready to Create Magical Moments?" },
    ],
  };
}
