import { defineField, defineType, type FieldDefinition } from "sanity";

import { getContrastRatio, meetsWcagAa } from "@/lib/theme/contrast";

const HEX_COLOR_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const CSS_LENGTH_PATTERN = /^\d+(\.\d+)?(rem|em|px)$/;

function hexColorField(
  name: string,
  title: string,
  initialValue: string,
): FieldDefinition {
  return defineField({
    name,
    title,
    type: "string",
    group: "colors",
    description: "Hex color, e.g. #1a227f.",
    initialValue,
    validation: (rule) =>
      rule.required().regex(HEX_COLOR_PATTERN, { name: "hex color" }),
  });
}

function cssLengthField(
  name: string,
  title: string,
  group: "typography" | "spacing",
  initialValue: string,
): FieldDefinition {
  return defineField({
    name,
    title,
    type: "string",
    group,
    description: "A CSS length, e.g. 1.5rem.",
    initialValue,
    validation: (rule) =>
      rule.required().regex(CSS_LENGTH_PATTERN, { name: "CSS length" }),
  });
}

export const siteTheme = defineType({
  name: "siteTheme",
  title: "Site Theme",
  type: "document",
  // Singleton: the desk structure (SHU-025) will hide "create new" for this
  // type so there is always exactly one document to edit.
  groups: [
    { name: "colors", title: "Colors" },
    { name: "typography", title: "Typography" },
    { name: "spacing", title: "Spacing" },
  ],
  fields: [
    hexColorField("colorPrimary", "Primary color", "#1a227f"),
    hexColorField("colorSecondary", "Secondary color", "#1f2d3d"),
    hexColorField("colorAccent", "Accent color", "#d81b60"),
    hexColorField("colorBackground", "Background color", "#f6f6f8"),
    hexColorField("colorSurface", "Surface color", "#ffffff"),
    hexColorField(
      "colorBackgroundDark",
      "Background color (dark sections, e.g. footer)",
      "#121320",
    ),
    hexColorField(
      "colorTextInverse",
      "Text color (on dark sections)",
      "#f1f5f9",
    ),
    defineField({
      name: "colorText",
      title: "Text color",
      type: "string",
      group: "colors",
      description: "Hex color, e.g. #1a227f.",
      initialValue: "#0f172a",
      validation: (rule) =>
        rule
          .required()
          .regex(HEX_COLOR_PATTERN, { name: "hex color" })
          .custom((value, context) => {
            if (!value) {
              return true;
            }

            const background = (
              context.document as { colorBackground?: string } | undefined
            )?.colorBackground;

            if (!background || !HEX_COLOR_PATTERN.test(background)) {
              return true;
            }

            const ratio = getContrastRatio(value, background);

            return meetsWcagAa(ratio)
              ? true
              : `Text/background contrast is ${ratio.toFixed(2)}:1 — WCAG AA needs at least 4.5:1 for normal text. Choose a darker text color or lighter background.`;
          })
          .warning(),
    }),
    defineField({
      name: "headingFont",
      title: "Heading font",
      type: "string",
      group: "typography",
      options: {
        list: [
          { title: "Montserrat", value: "montserrat" },
          { title: "Playfair Display", value: "playfair" },
          { title: "System (Georgia)", value: "system" },
        ],
      },
      initialValue: "montserrat",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bodyFont",
      title: "Body font",
      type: "string",
      group: "typography",
      options: {
        list: [
          { title: "Inter", value: "inter" },
          { title: "Lora", value: "lora" },
          { title: "System (Helvetica)", value: "system" },
        ],
      },
      initialValue: "inter",
      validation: (rule) => rule.required(),
    }),
    cssLengthField("fontSizeXs", "Font size — XS", "typography", "0.75rem"),
    cssLengthField("fontSizeSm", "Font size — SM", "typography", "0.875rem"),
    cssLengthField("fontSizeBase", "Font size — Base", "typography", "1rem"),
    cssLengthField("fontSizeMd", "Font size — MD", "typography", "1.125rem"),
    cssLengthField("fontSizeLg", "Font size — LG", "typography", "1.5rem"),
    cssLengthField("fontSizeXl", "Font size — XL", "typography", "2rem"),
    cssLengthField("fontSize2xl", "Font size — 2XL", "typography", "2.75rem"),
    cssLengthField("spaceXs", "Spacing — XS", "spacing", "0.25rem"),
    cssLengthField("spaceSm", "Spacing — SM", "spacing", "0.5rem"),
    cssLengthField("spaceMd", "Spacing — MD", "spacing", "1rem"),
    cssLengthField("spaceLg", "Spacing — LG", "spacing", "1.5rem"),
    cssLengthField("spaceXl", "Spacing — XL", "spacing", "2.5rem"),
    cssLengthField("space2xl", "Spacing — 2XL", "spacing", "4rem"),
  ],
});
