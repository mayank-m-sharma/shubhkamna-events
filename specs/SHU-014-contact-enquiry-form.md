# SHU-014 — Contact / Enquiry Section

**Wave:** 3 (homepage & content sections) · **Depends on:** [[SHU-009]], [[SHU-005]]

**Status:**

- [ ] Not started
- [x] Completed

## User story

As a prospective client, I want a simple enquiry form, so I can reach out
about an event without hunting for an email address.

As the site owner, I want the form heading/fields/success-message text to be
editable, and I want protection from spam submissions.

## Technical tasks

- `contactSection` object schema: heading, intro text, success message. On
  the reference site this section renders as a phone/WhatsApp CTA banner
  when used on the homepage, with the full enquiry form only on the
  dedicated Contact page — see [[SHU-000]]'s audit §2.3/§4. Model the
  schema so a homepage placement can render the lighter CTA-banner variant
  while a Contact-page placement renders the full form (e.g. a `variant`
  field, or two distinct object types sharing the form schema).
- Zod schema for form input (name, email, phone, event type, event date,
  expected guests, message) shared between client-side validation and the
  server action — wider than name/email/event type/message alone; the
  reference's Contact-page form collects phone, event date, and expected
  guests too (see [[SHU-000]]'s audit §2.6). Only name, phone, event type,
  and event date are required; email and expected guests are optional.
- Server Action handling submission: honeypot field (bot trap), rate
  limiting consideration noted, email delivery (or a Sanity `enquiry`
  document as a lightweight inbox — decide at implementation time).
- `ContactForm` organism using `FormField` molecules; accessible error
  messaging (`aria-live`, associated `aria-describedby`).

## Notes / acceptance criteria

- Submitting with JS disabled still works (progressive enhancement via
  native form + Server Action).
- Client and server validate with the _same_ Zod schema (no drift).
- Honeypot field is visually hidden but not `display:none` (some spam bots
  skip hidden-via-CSS fields) — use an off-screen/clip technique instead.
- Schema fields match the enquiry-form content shape identified in
  [[SHU-000]]'s audit, including the homepage CTA-banner vs. full-form
  distinction.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
