import { defineArrayMember, defineField, defineType } from "sanity";

export const headerConfig = defineType({
  name: "headerConfig",
  title: "Header",
  type: "document",
  // Singleton: the desk structure (SHU-025) will hide "create new" for this
  // type so there is always exactly one document to edit.
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      description:
        "Overrides Site Settings' default logo for the header only. Leave empty to use the site name as text.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "navItems",
      title: "Navigation items",
      description: "Drag to reorder. Shown in this order on every page.",
      type: "array",
      of: [
        defineArrayMember({
          name: "navItem",
          title: "Nav item",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link",
              description:
                "An internal path (e.g. /services) or a full external URL.",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
      initialValue: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Gallery", href: "/gallery" },
        { label: "Contact", href: "/contact" },
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "ctaLabel",
      title: "Header button label",
      description: "Leave both button fields empty to hide the button.",
      type: "string",
      initialValue: "Call Now",
    }),
    defineField({
      name: "ctaHref",
      title: "Header button link",
      type: "string",
      initialValue: "tel:+919754455007",
    }),
  ],
});
