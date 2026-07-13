import { defineArrayMember, defineField, defineType } from "sanity";

export const gallerySection = defineType({
  name: "gallerySection",
  title: "Gallery",
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
      name: "viewAllLabel",
      title: '"View all" link label',
      description: "Leave both view-all fields empty to hide the link.",
      type: "string",
    }),
    defineField({
      name: "viewAllHref",
      title: '"View all" link URL',
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Images",
      description: "Drag to reorder.",
      type: "array",
      of: [
        defineArrayMember({
          name: "galleryImage",
          title: "Image",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
            defineField({
              name: "category",
              title: "Category label",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "caption", subtitle: "category", media: "image" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }: { title?: string }) => ({
      title: title || "Gallery",
    }),
  },
});
