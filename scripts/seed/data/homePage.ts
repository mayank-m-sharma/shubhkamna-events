import type { SanityClient } from "@sanity/client";

import type {
  ContactSection,
  GallerySection,
  ServicesSection,
  TestimonialsSection,
} from "@/lib/validations/homePage.schema";

import type { SanityImageRef } from "../uploadImage";
import { uploadImageIfNeeded } from "../uploadImage";

const HERO_IMAGE_URL =
  "https://cdn.jsdelivr.net/gh/Dynamo-Studio/Shubhkamna-Events-Images@main/v1.webp";
const HERO_IMAGE_FILENAME = "v1.webp";
const HERO_IMAGE_ALT = "Shubhkamna Events luxury wedding planning Indore";

// Hero's `backgroundImage` is the raw Sanity write-reference shape
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

interface HomePageSeed {
  sections: [
    HeroSectionSeed,
    ServicesSection,
    GallerySection,
    TestimonialsSection,
    ContactSection,
  ];
}

// Section order and content match the reference site's homepage flow
// (SHU-000's audit §2.3: hero, services, gallery, testimonials, contact).
// Sections after hero carry only their `heading` for now — the rest of
// each one's content fields are seeded by its own ticket (SHU-011–SHU-013)
// once they exist on the schema.
export async function buildHomePageSeed(
  client: SanityClient,
): Promise<HomePageSeed> {
  const backgroundImage = await uploadImageIfNeeded(
    client,
    HERO_IMAGE_URL,
    HERO_IMAGE_FILENAME,
  );

  return {
    sections: [
      {
        _type: "heroSection",
        headline: "Your Vision, Our Magic.",
        subhead:
          "Indore's 5-star premier event planner. From grand weddings to high-profile corporate conferences, we handle everything 24/7.",
        backgroundImage,
        backgroundImageAlt: HERO_IMAGE_ALT,
        primaryCtaLabel: "Plan Your Event",
        primaryCtaHref: "/contact",
        secondaryCtaLabel: "View Portfolio",
        secondaryCtaHref: "/gallery",
      },
      {
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
      },
      { _type: "gallerySection", heading: "Capturing Every Moment" },
      { _type: "testimonialsSection", heading: "What Our Clients Think" },
      { _type: "contactSection", heading: "Ready to Create Magical Moments?" },
    ],
  };
}
