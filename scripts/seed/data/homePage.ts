import type { SanityClient } from "@sanity/client";

import type {
  ContactSection,
  ServicesSection,
  StatsSection,
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
  headlineHighlight: string;
  subhead: string;
  backgroundImage: SanityImageRef;
  backgroundImageAlt: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  secondaryImage: SanityImageRef;
  secondaryImageAlt: string;
}

interface AboutSectionSeed {
  _type: "aboutSection";
  eyebrow: string;
  heading: string;
  bodyFirst: string;
  bodySecond: string;
  checklist: string[];
  ctaLabel: string;
  ctaHref: string;
  imageFirst: SanityImageRef;
  imageFirstAlt: string;
  imageSecond: SanityImageRef;
  imageSecondAlt: string;
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
    StatsSection,
    AboutSectionSeed,
    ServicesSection,
    GallerySectionSeed,
    TestimonialsSection,
    ContactSection,
  ];
}

function buildHeroSectionSeed(
  backgroundImage: SanityImageRef,
  secondaryImage: SanityImageRef,
): HeroSectionSeed {
  return {
    _type: "heroSection",
    headline: "Your Vision, Our Magic.",
    headlineHighlight: "Our Magic.",
    subhead:
      "Indore's 5-star premier event planner. From grand weddings to high-profile corporate conferences, we handle everything 24/7.",
    backgroundImage,
    backgroundImageAlt: "Shubhkamna Events luxury wedding planning Indore",
    primaryCtaLabel: "Plan Your Event",
    primaryCtaHref: "/contact",
    secondaryCtaLabel: "View Portfolio",
    secondaryCtaHref: "/gallery",
    secondaryImage,
    secondaryImageAlt: "Shubhkamna Events decor setup",
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
      href: "/services/weddings",
    },
    {
      icon: "briefcase",
      title: "Corporate",
      description:
        "Expert conference planning, product launch, concert management, and team building events.",
      href: "/services/corporate",
    },
    {
      icon: "cake",
      title: "Social Events",
      description:
        "Birthday parties, baby shower, kitty parties, house warming, and anniversary celebrations.",
      href: "/services/social-events",
    },
    {
      icon: "temple",
      title: "Destination & Religious",
      description:
        "Destination wedding planning, religious ceremonies, emcee & DJ, professional lighting services.",
      href: "/services/special-events",
    },
  ],
};

// Sourced from docs/reference-site-audit.md §2.3/§2.5/§4 item 2b — repeated
// on both the reference's homepage (between hero and about) and its
// Portfolio page. Generic value/label pairs, not literally bound to
// siteSettings' reviewRating/reviewCount at render time (those stay the
// single source of truth for the Hero badge and Testimonials link
// specifically; this section's content is editor-controlled separately).
const statsSectionSeed: StatsSection = {
  _type: "statsSection",
  heading: undefined,
  items: [
    { value: "50+", label: "Verified Reviews" },
    { value: "5.0★", label: "Google Rating" },
    { value: "24/7", label: "Open All Days" },
    { value: "1000+", label: "Happy Events" },
  ],
};

function buildAboutSectionSeed(
  imageFirst: SanityImageRef,
  imageSecond: SanityImageRef,
): AboutSectionSeed {
  return {
    _type: "aboutSection",
    eyebrow: "About Shubhkamna Events",
    heading: "Elite Event Planning Experts in Indore",
    bodyFirst:
      "Based in Chhawni, Indore, Shubhkamna Events is dedicated to creating seamless and visually stunning experiences. We manage everything from corporate conferences to grand weddings with unmatched precision.",
    bodySecond:
      "Our team believes in a helpful nature and clear communication. With 24/7 availability, we ensure your special day—be it an anniversary, baby shower, or religious event—is managed to perfection.",
    checklist: [
      "Corporate & Conference coordination",
      "Theme party & Decor design",
      "Destination Wedding planning",
    ],
    ctaLabel: "Contact Our Team",
    ctaHref: "/contact",
    imageFirst,
    imageFirstAlt: "Shubhkamna Events wedding decoration setup",
    imageSecond,
    imageSecondAlt: "Shubhkamna Events wedding planning Indore",
  };
}

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

// Sourced from docs/reference-site-audit.md §2.3 — no photos on the
// reference (initials-avatar fallback only), so no images needed here.
const testimonialsSectionSeed: TestimonialsSection = {
  _type: "testimonialsSection",
  heading: "What Our Clients Think",
  intro:
    "We take pride in our 5-star reputation. Here is what people are saying about Shubhkamna Events.",
  items: [
    {
      quote:
        "They made every event very creative and in pocket of budget. Beautiful wedding decor. Very helpful and clear communication.",
      author: "Jyoti Bansal",
      role: "Wedding Client",
      photo: undefined,
      rating: 5,
    },
    {
      quote:
        "Excellent service! Shubhkamna Events planned our daughter's wedding perfectly. The decor was stunning and everything was managed professionally. Highly recommended!",
      author: "Rajesh Khanna",
      role: "Wedding Planner",
      photo: undefined,
      rating: 5,
    },
    {
      quote:
        "Best event planners in Indore! They handled our corporate conference flawlessly. Professional team, amazing decor, and timely execution. Will definitely use their services again.",
      author: "Sneha Mehta",
      role: "Corporate Event",
      photo: undefined,
      rating: 5,
    },
    {
      quote:
        "Amazing experience with Shubhkamna Events for our baby shower. The decoration was beautiful and the team was very supportive throughout. 5 stars from us!",
      author: "Priyanka Verma",
      role: "Baby shower",
      photo: undefined,
      rating: 5,
    },
  ],
};

// Sourced from docs/reference-site-audit.md §2.3 — the homepage's
// CTA-teaser section (phone/WhatsApp banner), not the full enquiry form
// (that's the "form" variant, used only on the future dedicated Contact
// page, SHU-029).
const contactSectionSeed: ContactSection = {
  _type: "contactSection",
  variant: "banner",
  heading: "Ready to Create Magical Moments?",
  intro:
    "Contact the 5-star experts at Shubhkamna Events today. We are open 24/7 to help you plan your next big event in Indore.",
  successMessage: undefined,
};

// Section order and content match the reference site's homepage flow
// (SHU-000's audit §2.3: hero, stats, about, services, gallery,
// testimonials, contact).
export async function buildHomePageSeed(
  client: SanityClient,
): Promise<HomePageSeed> {
  const [v1, v2, v3, v4, v5, v6, v7] = await Promise.all(
    [
      "v1.webp",
      "v2.webp",
      "v3.webp",
      "v4.webp",
      "v5.webp",
      "v6.webp",
      "v7.webp",
    ].map((filename) =>
      uploadImageIfNeeded(client, `${IMAGE_BASE_URL}/${filename}`, filename),
    ),
  );

  return {
    sections: [
      buildHeroSectionSeed(v1!, v2!),
      statsSectionSeed,
      buildAboutSectionSeed(v3!, v4!),
      servicesSectionSeed,
      buildGallerySectionSeed({ v1: v1!, v3: v3!, v5: v5!, v6: v6!, v7: v7! }),
      testimonialsSectionSeed,
      contactSectionSeed,
    ],
  };
}
