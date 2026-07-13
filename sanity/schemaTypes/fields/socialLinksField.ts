import { defineField, type FieldDefinition } from "sanity";

// Shared by siteSettings (SHU-003) and footerConfig (SHU-007) so the two
// documents can't drift on the platform list/validation.
export function socialLinksField(group?: string): FieldDefinition {
  return defineField({
    name: "socialLinks",
    title: "Social links",
    type: "array",
    group,
    of: [
      defineField({
        name: "socialLink",
        title: "Social link",
        type: "object",
        fields: [
          defineField({
            name: "platform",
            title: "Platform",
            type: "string",
            options: {
              list: [
                { title: "Instagram", value: "instagram" },
                { title: "Facebook", value: "facebook" },
                { title: "Twitter / X", value: "twitter" },
                { title: "LinkedIn", value: "linkedin" },
                { title: "YouTube", value: "youtube" },
              ],
            },
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "url",
            title: "URL",
            type: "url",
            validation: (rule) =>
              rule.required().uri({ scheme: ["http", "https"] }),
          }),
        ],
        preview: {
          select: { title: "platform", subtitle: "url" },
        },
      }),
    ],
  });
}
