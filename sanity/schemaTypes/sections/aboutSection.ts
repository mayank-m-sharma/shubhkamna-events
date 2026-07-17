import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutSection = defineType({
  name: "aboutSection",
  title: "About",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow label",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bodyFirst",
      title: "Body paragraph 1",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bodySecond",
      title: "Body paragraph 2",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "checklist",
      title: "Checklist",
      description: "Short bullet points, each shown with a check icon.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      description: "Leave both CTA fields empty to hide the link.",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA link",
      type: "string",
    }),
    defineField({
      name: "imageFirst",
      title: "First image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageFirstAlt",
      title: "First image alt text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageSecond",
      title: "Second image",
      description: "Optional — shown alongside the first in an offset grid.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageSecondAlt",
      title: "Second image alt text",
      type: "string",
      hidden: ({ parent }) => !parent?.imageSecond,
    }),
  ],
  preview: {
    select: { title: "heading", media: "imageFirst" },
  },
});
