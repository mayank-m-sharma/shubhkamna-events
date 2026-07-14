import { z } from "zod";

// Single source of truth for the service-category icon set, shared by
// servicesSection's homepage `ServiceItem` (SHU-011) and the full-detail
// `service` document (SHU-017) — both pick from the same catalog, they just
// don't all appear on the homepage's 4-item summary.
export const serviceIconSchema = z.enum([
  "heart",
  "briefcase",
  "cake",
  "temple",
  "palette",
  "music-note",
]);
