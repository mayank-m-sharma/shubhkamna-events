import { defineField, defineType } from "sanity";

// Remaining content fields (subhead, CTAs, background image) are added by
// SHU-010 — `heading` is seeded now because every homepage section in
// SHU-000's audit has one, and Sanity requires an object type to have at
// least one field to be valid.
export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      description: "The hero's main headline.",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }: { title?: string }) => ({ title: title || "Hero" }),
  },
});
