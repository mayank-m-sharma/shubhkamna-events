import { defineArrayMember, defineField, defineType } from "sanity";

const ICON_OPTIONS = [
  { title: "Heart (weddings)", value: "heart" },
  { title: "Briefcase (corporate)", value: "briefcase" },
  { title: "Cake (social events)", value: "cake" },
  { title: "Temple (destination & religious)", value: "temple" },
  { title: "Palette (decorations)", value: "palette" },
  { title: "Music note (entertainment)", value: "music-note" },
];

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
      name: "items",
      title: "Service items",
      description: "Drag to reorder.",
      type: "array",
      of: [
        defineArrayMember({
          name: "serviceItem",
          title: "Service item",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: ICON_OPTIONS },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link",
              description: "Optional link to a detail page (see SHU-017).",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }: { title?: string }) => ({
      title: title || "Services",
    }),
  },
});
