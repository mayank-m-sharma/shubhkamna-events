import type { IconName } from "@/types/icon";
import type { SanityImage } from "@/types/image";

export interface ServiceCardProps {
  title: string;
  description: string;
  image: SanityImage;
  imageAlt: string;
  icon: IconName;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  // Links the image/title area to the service's own detail page — a real
  // value-add over the reference site (which has no per-service detail
  // pages at all, see docs/reference-site-audit.md §4) now that SHU-017
  // built one for every service.
  detailHref: string;
  // Only the first above-the-fold card is the genuine LCP candidate —
  // never applied blanket across the grid (DEFINITION-OF-DONE.md).
  priority?: boolean;
}
