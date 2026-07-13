import { defineField, defineType } from "sanity";

// Remaining content fields (testimonial array, reviews link) are added by
// SHU-013 — `heading` is seeded now because every homepage section in
// SHU-000's audit has one, and Sanity requires an object type to have at
// least one field to be valid.
export const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "Testimonials",
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
      title: title || "Testimonials",
    }),
  },
});
