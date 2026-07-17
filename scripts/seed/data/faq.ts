import type { FaqItem } from "@/lib/validations/faqSection.schema";

// Reconciled from docs/reference-site-audit.md §2.4 (services.html) and
// §2.6 (contact.html) — the two pages had overlapping, differently-worded
// FAQ sets with 2 near-duplicate questions ("24/7?" and "destination
// weddings?"). Per SHU-027's acceptance criteria, this merges them into one
// canonical list rather than shipping both near-duplicates verbatim:
// pricing + booking-lead-time + support-hours + service-area +
// customization + destination weddings, picking the clearer/fuller wording
// per topic instead of keeping both near-identical phrasings.
export const faqItemsSeed: FaqItem[] = [
  {
    question: "What is the starting price for wedding planning?",
    answer:
      "Our luxury wedding and engagement planning packages are customized based on your requirements. We offer comprehensive design, coordination, and execution for a premier event experience. Contact us for a personalized quote.",
  },
  {
    question: "How early should we book for a wedding?",
    answer:
      "For grand weddings, we recommend booking at least 3-6 months in advance. This allows us to secure premium vendors and design customized luxury decor for your big day. We also offer complete wedding management services including emcee & DJ, professional lighting, and florist services.",
  },
  {
    question: "Do you provide 24/7 event support?",
    answer:
      "Yes, Shubhkamna Events is open 24 hours every day. Whether it's a religious ceremony, a corporate summit, a birthday party, or a baby shower, our team is always available to answer your questions and manage logistics.",
  },
  {
    question: "What locations do you serve?",
    answer:
      "We are based in Chhawni, Indore and serve all across Indore, Ujjain, Dewas, Khandwa, Mandsaur, Pithampur, Rau, and Sendhwa for all types of private and corporate event planning.",
  },
  {
    question: "Are your themes customizable?",
    answer:
      "Absolutely. Customization is our strength. From religious events to corporate conferences, destination weddings to kitty parties, we design every detail based on your color palette, aesthetic preferences, and budget. We also provide wedding florist services and hair & make-up coordination.",
  },
  {
    question: "Do you handle destination weddings?",
    answer:
      "Yes, we specialize in destination wedding planning. Our team manages everything from travel coordination to venue decor, religious wedding planning, and complete wedding management across India.",
  },
];
