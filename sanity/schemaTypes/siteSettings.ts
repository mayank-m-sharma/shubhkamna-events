import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton: the desk structure (SHU-025) will hide "create new" for this
  // type so there is always exactly one document to edit.
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Short line shown above the main coming-soon headline.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "comingSoonHeadline",
      title: "Coming soon headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "comingSoonMessage",
      title: "Coming soon message",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      description: "Shown in browser tabs and search engine results.",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      description: "Shown in search engine results.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(160),
    }),
  ],
});
