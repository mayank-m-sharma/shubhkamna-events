// Re-exported from the Zod schema (the source of truth) rather than
// hand-declared — see steering/typescript.md.
import type { FaqItem, FaqSection } from "@/lib/validations/faqSection.schema";

export type { FaqItem, FaqSection };

export interface FAQProps {
  heading?: string;
  intro?: string;
  items: FaqItem[];
}
