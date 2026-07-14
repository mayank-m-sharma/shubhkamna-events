import { defineArrayMember, defineField, defineType } from "sanity";

// Same list servicesSection (SHU-011) draws from, extended with the two
// categories the homepage's 4-item summary doesn't need but the full
// 6-category services.html detail catalog does (SHU-000's audit §2.4).
const ICON_OPTIONS = [
  { title: "Heart (weddings)", value: "heart" },
  { title: "Briefcase (corporate)", value: "briefcase" },
  { title: "Cake (social events)", value: "cake" },
  { title: "Temple (destination & religious)", value: "temple" },
  { title: "Palette (decorations)", value: "palette" },
  { title: "Music note (entertainment)", value: "music-note" },
];

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: ICON_OPTIONS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageAlt",
      title: "Image alt text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "features",
      title: "Features",
      description: "Bullet list of what this service includes.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      description: "Optional extra images shown on the detail page.",
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
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaHref",
      title: "CTA link",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers sort first on the services index.",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "image" },
  },
});
