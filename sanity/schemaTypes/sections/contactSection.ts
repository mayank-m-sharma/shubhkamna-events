import { defineField, defineType } from "sanity";

export const contactSection = defineType({
  name: "contactSection",
  title: "Contact",
  type: "object",
  // On the reference site this section renders as a lighter phone/WhatsApp
  // CTA banner when placed on the homepage, with the full enquiry form
  // reserved for the dedicated Contact page — one schema/organism pair
  // supports both via `variant` (SHU-014).
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "CTA banner (phone/WhatsApp)", value: "banner" },
          { title: "Full enquiry form", value: "form" },
        ],
      },
      initialValue: "banner",
      validation: (rule) => rule.required(),
    }),
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
      name: "successMessage",
      title: "Success message",
      description:
        'Shown after a successful submission. Only used by the "Full enquiry form" variant.',
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "variant" },
    prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({
      title: title || "Contact",
      subtitle,
    }),
  },
});
