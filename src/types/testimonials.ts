// Re-exported from the Zod schema (the source of truth) rather than
// hand-declared — see steering/typescript.md.
import type {
  TestimonialItem,
  TestimonialsSection,
} from "@/lib/validations/homePage.schema";

export type { TestimonialItem, TestimonialsSection };

export interface TestimonialsProps {
  heading?: string;
  intro?: string;
  items: TestimonialItem[];
  // Sourced from siteSettings (SHU-003), not testimonialsSection itself —
  // the "Read N+ Reviews" link is omitted entirely when either is unset.
  reviewUrl?: string;
  reviewCount?: number;
}
