import { defineField, defineType } from "sanity";

// Remaining content fields (service cards, "see all" link) are added by
// SHU-011 — `heading` is seeded now because every homepage section in
// SHU-000's audit has one, and Sanity requires an object type to have at
// least one field to be valid.
export const servicesSection = defineType({
  name: "servicesSection",
  title: "Services",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }: { title?: string }) => ({
      title: title || "Services",
    }),
  },
});
