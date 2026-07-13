import type { ReactNode } from "react";

import { ContactSection } from "@/components/organisms/ContactSection";
import { Gallery } from "@/components/organisms/Gallery";
import { Hero } from "@/components/organisms/Hero";
import { Services } from "@/components/organisms/Services";
import { Testimonials } from "@/components/organisms/Testimonials";
import type { HomePageSection } from "@/types/cms";

// siteSettings-derived fields no section's own CMS content includes but
// some organisms still need (Hero's trust badge, Testimonials' reviews
// link, ContactSection's banner CTAs) — sourced at the fetch boundary,
// never hardcoded, same pattern each of those tickets already established.
export interface PageBuilderExtras {
  reviewRating?: number;
  reviewCount?: number;
  reviewUrl?: string;
  organizationPhone?: string;
  whatsappNumber?: string;
}

type SectionRenderer<T extends HomePageSection> = (
  section: T,
  extras: PageBuilderExtras,
) => ReactNode;

// One entry per `homePage.sections[]._type` — adding a new section type in
// a future ticket means adding one line here, not touching the render loop
// below (SHU-015's core acceptance criterion).
export const sectionRegistry: {
  [K in HomePageSection["_type"]]: SectionRenderer<
    Extract<HomePageSection, { _type: K }>
  >;
} = {
  heroSection: (section, extras) => (
    <Hero
      {...section}
      reviewRating={extras.reviewRating}
      reviewCount={extras.reviewCount}
    />
  ),
  servicesSection: (section) => <Services {...section} />,
  gallerySection: (section) => <Gallery {...section} />,
  testimonialsSection: (section, extras) => (
    <Testimonials
      {...section}
      reviewUrl={extras.reviewUrl}
      reviewCount={extras.reviewCount}
    />
  ),
  contactSection: (section, extras) => (
    <ContactSection
      {...section}
      phone={extras.organizationPhone}
      whatsappNumber={extras.whatsappNumber}
    />
  ),
};
