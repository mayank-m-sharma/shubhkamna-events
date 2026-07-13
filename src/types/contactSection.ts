// Re-exported from the Zod schema (the source of truth) rather than
// hand-declared — see steering/typescript.md.
import type { ContactSection as ContactSectionSchema } from "@/lib/validations/homePage.schema";

export type { ContactSectionSchema as ContactSectionData };

export interface ContactSectionProps {
  variant: "banner" | "form";
  heading?: string;
  intro?: string;
  successMessage?: string;
  // Sourced from siteSettings (SHU-003), not contactSection itself — the
  // banner variant's phone/WhatsApp CTAs, omitted independently when unset.
  phone?: string;
  whatsappNumber?: string;
}
