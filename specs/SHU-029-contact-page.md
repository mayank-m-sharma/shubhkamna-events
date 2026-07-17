# SHU-029 — Standalone Contact Page

**Wave:** 4 (additional pages) · **Depends on:** [[SHU-014]], [[SHU-015]], [[SHU-027]], [[SHU-030]]

**Status:**

- [ ] Not started
- [x] Completed

## User story

As a prospective client, I want a dedicated Contact page with the full
enquiry form and every way to reach the business, so I don't have to hunt
across the site when I'm ready to book.

## Context

Not covered by any ticket prior to [[SHU-000]]'s audit. [[SHU-014]] only
defines `contactSection`, the lighter object used on the homepage (per its
amended scope: a CTA-banner variant there, the full form here). The
reference site's dedicated Contact page has: a hero, the full enquiry form
(wider field set than the homepage banner — name, email, phone, event type,
event date, expected guests, message), a "reach out directly" panel
(WhatsApp/call cards, registered office address, areas-served list), a
trust/excellence banner, and an FAQ section — see
`docs/reference-site-audit.md` §2.6/§4.

## Technical tasks

- `contactPage` singleton schema: hero copy (heading, subhead, optional
  background image), the full-form variant of [[SHU-014]]'s `contactSection`
  (reused, not redefined), a "reach out directly" panel (WhatsApp card, call
  card — sourced from [[SHU-030]]'s global WhatsApp/phone fields, not
  hardcoded; registered office address — sourced from [[SHU-003]]'s
  organization fields; areas-served list — array of place names), and an
  optional [[SHU-027]] `faqSection`.
- Route (e.g. `/contact`), `generateMetadata`, breadcrumb JSON-LD,
  `ContactPage`/`LocalBusiness`-appropriate JSON-LD reusing [[SHU-003]]'s
  organization data.

## Notes / acceptance criteria

- Client and server validate submissions with the same Zod schema as
  [[SHU-014]] — no drift between the homepage banner's underlying schema and
  this page's full form.
- Submitting with JS disabled still works (progressive enhancement via
  native form + Server Action), per [[SHU-014]]'s acceptance criteria.
- Areas-served list and registered address reconcile the reference site's
  two slightly different lists/spellings (see
  `docs/reference-site-audit.md` §4 item 5 and §2.2) rather than
  reproducing the inconsistency.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
