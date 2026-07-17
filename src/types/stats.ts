// Re-exported from the Zod schema (the source of truth) rather than
// hand-declared — see steering/typescript.md.
import type { StatItem, StatsSection } from "@/lib/validations/homePage.schema";

export type { StatItem, StatsSection };

export interface StatsProps {
  heading?: string;
  items: StatItem[];
}
