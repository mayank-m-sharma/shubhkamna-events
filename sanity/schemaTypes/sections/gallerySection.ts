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
      of: [defineArrayMember({ type: "galleryImage" })],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }: { title?: string }) => ({
      title: title || "Gallery",
    }),
  },
});
