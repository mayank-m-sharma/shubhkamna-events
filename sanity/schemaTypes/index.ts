import type { SchemaTypeDefinition } from "sanity";

import { enquiry } from "./enquiry";
import { footerConfig } from "./footerConfig";
import { headerConfig } from "./headerConfig";
import { homePage } from "./homePage";
import { contactSection } from "./sections/contactSection";
import { faqSection } from "./sections/faqSection";
import { gallerySection } from "./sections/gallerySection";
import { heroSection } from "./sections/heroSection";
import { servicesSection } from "./sections/servicesSection";
import { statsSection } from "./sections/statsSection";
import { testimonialsSection } from "./sections/testimonialsSection";
import { service } from "./service";
import { siteSettings } from "./siteSettings";
import { siteTheme } from "./siteTheme";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    siteTheme,
    headerConfig,
    footerConfig,
    homePage,
    heroSection,
    servicesSection,
    gallerySection,
    testimonialsSection,
    contactSection,
    faqSection,
    statsSection,
    enquiry,
    service,
  ],
};
