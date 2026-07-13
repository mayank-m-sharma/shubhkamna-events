import { z } from "zod";

// Matches the dropdown options on the reference site's contact-page
// enquiry form (SHU-000's audit §2.6) — fixed by the developer, not
// CMS-configurable, since the reference never lets the owner add/remove
// event types either.
export const EVENT_TYPE_OPTIONS = [
  "Wedding",
  "Corporate Event",
  "Birthday Party",
  "Anniversary",
  "Baby Shower",
  "Religious Event",
  "Theme Decoration",
  "Destination Wedding",
  "Kitty Party",
  "House Warming",
  "Concert",
] as const;

// Shared between the client-side form (ContactForm) and the Server Action
// (submitEnquiry) so the two can never validate against different rules —
// only name/phone/eventType/eventDate/message are required, matching the
// audit's field-by-field required/optional breakdown.
export const enquiryFormSchema = z.object({
  name: z
    .string({ error: "Please enter your name." })
    .min(1, "Please enter your name."),
  email: z
    .union([z.literal(""), z.string().email("Enter a valid email address.")])
    .optional(),
  phone: z
    .string({ error: "Please enter your phone number." })
    .min(1, "Please enter your phone number."),
  eventType: z.enum(EVENT_TYPE_OPTIONS, {
    error: "Please select an event type.",
  }),
  eventDate: z
    .string({ error: "Please select an event date." })
    .min(1, "Please select an event date."),
  expectedGuests: z
    .union([z.literal(""), z.string().regex(/^\d+$/, "Enter a number.")])
    .optional(),
  message: z
    .string({ error: "Please tell us a little about your event." })
    .min(1, "Please tell us a little about your event."),
});

export type EnquiryFormInput = z.infer<typeof enquiryFormSchema>;
