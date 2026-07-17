import type { SanityClient } from "@sanity/client";

import type { ContactSection } from "@/lib/validations/homePage.schema";

import type { SanityImageRef } from "../uploadImage";
import { uploadImageIfNeeded } from "../uploadImage";

import { faqItemsSeed } from "./faq";

const IMAGE_BASE_URL =
  "https://cdn.jsdelivr.net/gh/Dynamo-Studio/Shubhkamna-Events-Images@main";

interface ContactPageSeed {
  heroHeading: string;
  heroSubhead: string;
  heroBackgroundImage: SanityImageRef;
  contact: ContactSection;
  // Reconciled from docs/reference-site-audit.md §2.6's "Areas Served" tag
  // list — the same 8-place list already used in faq.ts's "What locations
  // do you serve?" answer, per SHU-029's acceptance criteria (don't
  // reproduce the reference's two slightly disagreeing lists).
  areasServed: string[];
  faq: { heading: string; intro: string; items: typeof faqItemsSeed };
}

// Sourced from docs/reference-site-audit.md §2.6 (contact.html).
export async function buildContactPageSeed(
  client: SanityClient,
): Promise<ContactPageSeed> {
  const heroBackgroundImage = await uploadImageIfNeeded(
    client,
    `${IMAGE_BASE_URL}/v5.webp`,
    "v5.webp",
  );

  return {
    heroHeading: "Let's Create Magic Together",
    heroSubhead:
      "Bespoke planning tailored to your unique vision. Our dedicated team in Chhawni, Indore is ready to bring your dream celebration to life.",
    heroBackgroundImage,
    contact: {
      _type: "contactSection",
      variant: "form",
      heading: "Event Inquiry",
      intro:
        "Share a few details about your event and our team will get back to you with a personalized quote.",
      successMessage:
        "Thanks for reaching out! Our team will contact you within 24 hours.",
    },
    areasServed: [
      "Indore",
      "Ujjain",
      "Dewas",
      "Khandwa",
      "Mandsaur",
      "Pithampur",
      "Rau",
      "Sendhwa",
    ],
    faq: {
      heading: "Common Inquiries",
      intro:
        "Everything you need to know about booking with Shubhkamna Events.",
      items: faqItemsSeed,
    },
  };
}
