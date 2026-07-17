import { defineField, defineType } from "sanity";

// Shared by gallerySection (SHU-012, homepage teaser) and galleryPage
// (SHU-028, standalone page) so the two can't drift on the image item
// shape — extracted here rather than redefined per consumer.
export const galleryImage = defineType({
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
});
