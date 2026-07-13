import { defineField, defineType } from "sanity";

// A lightweight inbox for ContactForm submissions (SHU-014) — created only
// by the submitEnquiry Server Action via a write-scoped client, never
// hand-authored in Studio. See README's "Manual steps" for why this
// document type's read access needs restricting at the dataset level.
export const enquiry = defineType({
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "eventType", title: "Event type", type: "string" }),
    defineField({ name: "eventDate", title: "Event date", type: "date" }),
    defineField({
      name: "expectedGuests",
      title: "Expected guests",
      type: "number",
    }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "eventType" },
  },
});
