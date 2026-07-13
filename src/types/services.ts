// Re-exported from the Zod schema (the source of truth) rather than
// hand-declared — see steering/typescript.md.
import type {
  ServiceItem,
  ServicesSection,
} from "@/lib/validations/homePage.schema";

export type { ServiceItem, ServicesSection };

export interface ServicesProps {
  heading?: string;
  intro?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  items: ServiceItem[];
}
