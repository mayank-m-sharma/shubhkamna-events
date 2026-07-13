import { defineArrayMember, defineField, defineType } from "sanity";

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
    defineField({
      name: "intro",
      title: "Intro text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "items",
      title: "Testimonials",
      description: "Drag to reorder.",
      type: "array",
      of: [
        defineArrayMember({
          name: "testimonialItem",
          title: "Testimonial",
          type: "object",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "author",
              title: "Author name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "role",
              title: "Role / event type",
              type: "string",
            }),
            defineField({
              name: "photo",
              title: "Photo",
              description:
                "Optional. Falls back to an initials avatar when left empty.",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "rating",
              title: "Star rating",
              type: "number",
              validation: (rule) => rule.min(1).max(5),
            }),
          ],
          preview: {
            select: { title: "author", subtitle: "role", media: "photo" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }: { title?: string }) => ({
      title: title || "Testimonials",
    }),
  },
});
