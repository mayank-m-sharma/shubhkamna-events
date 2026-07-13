import { defineField, defineType } from "sanity";

import { socialLinksField } from "./fields/socialLinksField";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton: the desk structure (SHU-025) will hide "create new" for this
  // type so there is always exactly one document to edit.
  groups: [
    { name: "general", title: "General", default: true },
    { name: "branding", title: "Branding" },
    { name: "seo", title: "SEO & Sharing" },
    { name: "organization", title: "Organization & Contact" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Short line shown above the main coming-soon headline.",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "comingSoonHeadline",
      title: "Coming soon headline",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "comingSoonMessage",
      title: "Coming soon message",
      type: "text",
      rows: 3,
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      description: "Shown in browser tabs and search engine results.",
      type: "string",
      group: "seo",
      initialValue: "Shubhkamna Events | Indore Event Planners",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      description: "Shown in search engine results.",
      type: "text",
      rows: 3,
      group: "seo",
      initialValue:
        "Indore's 5-star premier event planner. From grand weddings to corporate conferences, we handle every detail — open 24/7.",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description: "Site-wide default logo. The header can override this.",
      type: "image",
      group: "branding",
      options: { hotspot: true },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      description: "Shown in browser tabs. Use a square image.",
      type: "image",
      group: "branding",
    }),
    defineField({
      name: "ogImage",
      title: "Default share image",
      description:
        "Shown when a page is shared on social media, unless that page sets its own.",
      type: "image",
      group: "branding",
      options: { hotspot: true },
    }),
    {
      ...socialLinksField("branding"),
      initialValue: [
        {
          platform: "instagram",
          url: "https://www.instagram.com/shubhkamnaevents02/",
        },
      ],
    },
    defineField({
      name: "organizationLegalName",
      title: "Legal / registered name",
      description: "Used in Organization structured data (JSON-LD).",
      type: "string",
      group: "organization",
      initialValue: "Shubhkamna Events",
    }),
    defineField({
      name: "organizationAddress",
      title: "Registered address",
      type: "string",
      group: "organization",
      initialValue:
        "Pragati Chamber, 34/3, Murai Mohalla, Chhawni, Indore, Madhya Pradesh 452001",
    }),
    defineField({
      name: "organizationPhone",
      title: "Phone number",
      description: "E.164 format, e.g. +919754455007.",
      type: "string",
      group: "organization",
      initialValue: "+919754455007",
      validation: (rule) =>
        rule.regex(/^\+\d{6,15}$/, { name: "E.164 phone number" }),
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      description:
        "E.164 format, e.g. +919754455007. Used for every WhatsApp click-to-chat button site-wide.",
      type: "string",
      group: "organization",
      initialValue: "+919754455007",
      validation: (rule) =>
        rule.regex(/^\+\d{6,15}$/, { name: "E.164 phone number" }),
    }),
    defineField({
      name: "reviewRating",
      title: "Review rating",
      description: "e.g. 5 for a 5.0-star rating.",
      type: "number",
      group: "organization",
      initialValue: 5,
      validation: (rule) => rule.min(0).max(5),
    }),
    defineField({
      name: "reviewCount",
      title: "Review count",
      type: "number",
      group: "organization",
      initialValue: 50,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "reviewUrl",
      title: "Reviews link",
      description: 'Where "read our reviews" links should point.',
      type: "url",
      group: "organization",
      initialValue:
        "https://www.google.com/search?q=shubhkamna+events+indore+reviews",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
});
