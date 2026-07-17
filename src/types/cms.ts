// Re-exported from the Zod schema (the source of truth) rather than
// hand-declared — see steering/typescript.md.
//
// One canonical discriminated union for homePage.sections[], shared by the
// page-builder renderer's lookup table (SHU-015) and each section's
// organism (SHU-010–SHU-014) — not redefined per organism.
export type {
  HomePage,
  HomePageSection,
  HeroSection,
  ServicesSection,
  GallerySection,
  TestimonialsSection,
  ContactSection,
  StatsSection,
} from "@/lib/validations/homePage.schema";
