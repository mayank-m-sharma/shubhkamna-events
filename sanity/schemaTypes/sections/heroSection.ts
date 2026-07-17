import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headlineHighlight",
      title: "Headline gradient highlight",
      description:
        'Must exactly match the trailing portion of the headline to highlight, e.g. "Our Magic." within "Your Vision, Our Magic." Leave empty for no highlight.',
      type: "string",
    }),
    defineField({
      name: "subhead",
      title: "Subhead",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      description: "Falls back to no background image/video if left empty.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "backgroundImageAlt",
      title: "Background image alt text",
      type: "string",
      hidden: ({ parent }) => !parent?.backgroundImage,
    }),
    defineField({
      name: "backgroundVideoUrl",
      title: "Background video URL",
      description:
        "An externally hosted video URL. Takes priority over the background image when set.",
      type: "url",
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary button label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary button link",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary button label",
      description: "Leave both secondary fields empty to hide the button.",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Secondary button link",
      type: "string",
    }),
    defineField({
      name: "secondaryImage",
      title: "Secondary accent image",
      description:
        "Optional smaller image that overlaps the main hero image for a richer, more layered look. Leave empty to hide it.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "secondaryImageAlt",
      title: "Secondary image alt text",
      type: "string",
      hidden: ({ parent }) => !parent?.secondaryImage,
    }),
  ],
  preview: {
    select: { title: "headline", media: "backgroundImage" },
  },
});
