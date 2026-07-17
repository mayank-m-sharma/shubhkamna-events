import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  // Singleton: the desk structure (SHU-025) will hide "create new" for this
  // type so there is always exactly one document to edit.
  fields: [
    defineField({
      name: "sections",
      title: "Sections",
      description:
        "Drag to reorder. The live homepage renders sections in this order.",
      type: "array",
      of: [
        defineArrayMember({ type: "heroSection" }),
        defineArrayMember({ type: "statsSection" }),
        defineArrayMember({ type: "servicesSection" }),
        defineArrayMember({ type: "gallerySection" }),
        defineArrayMember({ type: "testimonialsSection" }),
        defineArrayMember({ type: "contactSection" }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
});
