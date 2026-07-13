import type { HomePage } from "@/lib/validations/homePage.schema";

// Section order and headings match the reference site's homepage flow
// (SHU-000's audit §2.3: hero, services, gallery, testimonials, contact).
// Each section carries only its `heading` for now — the rest of its
// content fields are seeded by its own ticket (SHU-010–SHU-014) once they
// exist on the schema.
export const homePageSeed: HomePage = {
  sections: [
    { _type: "heroSection", heading: "Your Vision, Our Magic." },
    { _type: "servicesSection", heading: "What We Do Best" },
    { _type: "gallerySection", heading: "Capturing Every Moment" },
    { _type: "testimonialsSection", heading: "What Our Clients Think" },
    { _type: "contactSection", heading: "Ready to Create Magical Moments?" },
  ],
};
