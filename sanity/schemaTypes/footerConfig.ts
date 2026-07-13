import { defineArrayMember, defineField, defineType } from "sanity";

import { socialLinksField } from "./fields/socialLinksField";

export const footerConfig = defineType({
  name: "footerConfig",
  title: "Footer",
  type: "document",
  // Singleton: the desk structure (SHU-025) will hide "create new" for this
  // type so there is always exactly one document to edit.
  groups: [
    { name: "columns", title: "Columns", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social" },
    { name: "legal", title: "Legal" },
  ],
  fields: [
    defineField({
      name: "columns",
      title: "Link columns",
      description: "Drag to reorder. Each column renders as its own group.",
      type: "array",
      group: "columns",
      of: [
        defineArrayMember({
          name: "footerColumn",
          title: "Column",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Column title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [
                defineArrayMember({
                  name: "footerLink",
                  title: "Link",
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
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        }),
      ],
      initialValue: [
        {
          title: "Quick Links",
          links: [
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Gallery", href: "/gallery" },
            { label: "Contact", href: "/contact" },
          ],
        },
        {
          title: "Services",
          links: [
            { label: "Wedding Planning", href: "/services" },
            { label: "Corporate Events", href: "/services" },
            { label: "Birthday Parties", href: "/services" },
            { label: "Destination Wedding", href: "/services" },
          ],
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "contactPhone",
      title: "Phone number",
      description: "E.164 format, e.g. +919754455007.",
      type: "string",
      group: "contact",
      initialValue: "+919754455007",
      validation: (rule) =>
        rule.regex(/^\+\d{6,15}$/, { name: "E.164 phone number" }),
    }),
    defineField({
      name: "contactEmail",
      title: "Email address",
      type: "email",
      group: "contact",
      initialValue: "shubhkamnaevents02@gmail.com",
    }),
    defineField({
      name: "contactAddress",
      title: "Address",
      type: "string",
      group: "contact",
      initialValue:
        "Pragati Chamber, 34/3, Murai Mohalla, Chhawni, Indore, Madhya Pradesh 452001",
    }),
    { ...socialLinksField("social") },
    defineField({
      name: "copyrightText",
      title: "Copyright text",
      description:
        'Rendered after the current year, e.g. "© 2026 <this text>". The year is computed automatically — never hand-typed.',
      type: "string",
      group: "legal",
      initialValue: "Shubhkamna Events Indore. All rights reserved.",
    }),
  ],
});
