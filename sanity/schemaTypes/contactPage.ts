import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  // Singleton: the desk structure (SHU-025) will hide "create new" for this
  // type so there is always exactly one document to edit.
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "form", title: "Enquiry Form" },
    { name: "details", title: "Reach Out Directly" },
    { name: "faq", title: "FAQ" },
  ],
  fields: [
    defineField({
      name: "heroHeading",
      title: "Heading",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubhead",
      title: "Subhead",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Background image",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "contact",
      title: "Enquiry form",
      description:
        "Reuses the same content type as the homepage's contact section.",
      type: "contactSection",
      group: "form",
      initialValue: { variant: "form" },
    }),
    defineField({
      name: "areasServed",
      title: "Areas served",
      description: "E.g. Indore, Ujjain, Dewas.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "details",
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      description: "Optional — leave empty to hide the FAQ section.",
      type: "faqSection",
      group: "faq",
    }),
  ],
});
