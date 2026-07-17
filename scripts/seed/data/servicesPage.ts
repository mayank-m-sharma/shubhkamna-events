import type { ProcessStep } from "@/lib/validations/servicesPage.schema";

import { faqItemsSeed } from "./faq";

interface ServicesPageSeed {
  heroEyebrow: string;
  heroHeading: string;
  heroHeadingHighlight: string;
  heroSubhead: string;
  processEyebrow: string;
  processHeading: string;
  processSteps: ProcessStep[];
  faq: { heading: string; intro: string; items: typeof faqItemsSeed };
  ctaHeading: string;
  ctaBody: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
}

// Sourced from docs/reference-site-audit.md §2.4 (services.html): hero,
// "Our Process" roadmap, FAQ, and CTA banner — the sections the reference
// has that this page's original build (SHU-017) didn't yet cover.
export const servicesPageSeed: ServicesPageSeed = {
  heroEyebrow: "Indore's 5-Star Event Planner",
  heroHeading: "Our Elite Services",
  heroHeadingHighlight: "Services",
  heroSubhead:
    "We handle every detail from concept to completion. Whether it's a corporate summit in Indore or a luxury destination wedding, Shubhkamna Events delivers perfection 24/7 across Indore, Ujjain, Dewas, Khandwa, and beyond.",
  processEyebrow: "Our Process",
  processHeading: "Shubhkamna Events Roadmap",
  processSteps: [
    {
      icon: "chat",
      title: "Consultation",
      description: "24/7 availability to discuss your vision and requirements.",
    },
    {
      icon: "palette",
      title: "Design",
      description: "Bespoke theme decor design tailored to your event type.",
    },
    {
      icon: "calendar",
      title: "Coordination",
      description: "Full planning, staffing and vendor management by experts.",
    },
    {
      icon: "check",
      title: "Execution",
      description: "Flawless execution for a magical atmospheric reality.",
    },
  ],
  // Reuses the same reconciled 6-question set as the Contact page (faq.ts)
  // rather than forking a second, slightly-different FAQ list — the
  // reference itself had two overlapping, disagreeing FAQ sets across
  // these two pages, which SHU-027 already reconciled into one.
  faq: {
    heading: "Common Inquiries",
    intro: "Helping you understand our service excellence better.",
    items: faqItemsSeed,
  },
  ctaHeading: "Start Your Journey with Shubhkamna Events",
  ctaBody:
    "Indore's top-rated planners are just a click away. Book your free consultation today.",
  ctaSecondaryLabel: "Our Past Work",
  ctaSecondaryHref: "/gallery",
};
