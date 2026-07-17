import { defineArrayMember, defineField, defineType } from "sanity";

export const galleryPage = defineType({
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  // Singleton: the desk structure (SHU-025) will hide "create new" for this
  // type so there is always exactly one document to edit.
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
      name: "headingHighlight",
      title: "Heading gradient highlight",
      description:
        "Must exactly match the trailing portion of the heading to highlight.",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "images",
      title: "Images",
      description: "Drag to reorder.",
      type: "array",
      of: [defineArrayMember({ type: "galleryImage" })],
      validation: (rule) => rule.min(1),
    }),
  ],
});
