import { defineArrayMember, defineField, defineType } from "sanity";

const PROCESS_ICON_OPTIONS = [
  { title: "Chat (consultation)", value: "chat" },
  { title: "Palette (design)", value: "palette" },
  { title: "Calendar (coordination)", value: "calendar" },
  { title: "Check (execution)", value: "check" },
];

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  // Singleton: the desk structure (SHU-025) will hide "create new" for this
  // type so there is always exactly one document to edit.
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "process", title: "Our Process" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "CTA Banner" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow label",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeading",
      title: "Heading",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroHeadingHighlight",
      title: "Heading gradient highlight",
      description:
        "Must exactly match the trailing portion of the heading to highlight.",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubhead",
      title: "Subhead",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "processEyebrow",
      title: "Eyebrow label",
      type: "string",
      group: "process",
    }),
    defineField({
      name: "processHeading",
      title: "Heading",
      type: "string",
      group: "process",
    }),
    defineField({
      name: "processSteps",
      title: "Steps",
      description: "Drag to reorder.",
      type: "array",
      group: "process",
      of: [
        defineArrayMember({
          name: "processStep",
          title: "Step",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: PROCESS_ICON_OPTIONS },
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
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      description: "Optional — leave empty to hide the FAQ section.",
      type: "faqSection",
      group: "faq",
    }),
    defineField({
      name: "ctaHeading",
      title: "Heading",
      type: "string",
      group: "cta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaBody",
      title: "Body",
      type: "text",
      rows: 2,
      group: "cta",
    }),
    defineField({
      name: "ctaSecondaryLabel",
      title: "Secondary button label",
      description: "Leave both secondary fields empty to hide the button.",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaSecondaryHref",
      title: "Secondary button link",
      type: "string",
      group: "cta",
    }),
  ],
});
