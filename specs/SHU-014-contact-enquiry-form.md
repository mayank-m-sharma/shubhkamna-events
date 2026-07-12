# SHU-014 — Contact / Enquiry Section

**Wave:** 3 (homepage & content sections) · **Depends on:** [[SHU-009]], [[SHU-005]]

**Status:**

- [x] Not started
- [ ] Completed

## User story

As a prospective client, I want a simple enquiry form, so I can reach out
about an event without hunting for an email address.

As the site owner, I want the form heading/fields/success-message text to be
editable, and I want protection from spam submissions.

## Technical tasks

- `contactSection` object schema: heading, intro text, success message.
- Zod schema for form input (name, email, event type, message) shared
  between client-side validation and the server action.
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
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
