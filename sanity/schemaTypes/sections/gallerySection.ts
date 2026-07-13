import { defineField, defineType } from "sanity";

// Remaining content fields (image array, captions) are added by SHU-012 —
// `heading` is seeded now because every homepage section in SHU-000's audit
// has one, and Sanity requires an object type to have at least one field to
// be valid.
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
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }: { title?: string }) => ({
      title: title || "Gallery",
    }),
  },
});
