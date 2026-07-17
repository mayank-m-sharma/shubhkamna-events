# SHU-030 — WhatsApp Contact Pattern (Global CTA)

**Wave:** 2 (global layout) · **Depends on:** [[SHU-003]], [[SHU-006]], [[SHU-007]]

**Status:**

- [ ] Not started
- [x] Completed

## User story

As a prospective client, I want a one-tap way to message the business on
WhatsApp from anywhere on the site, so I can reach out the way I already
prefer to.

## Context

Not covered by any ticket prior to [[SHU-000]]'s audit. The reference site
treats WhatsApp as a first-class contact channel: a floating WhatsApp button
on every page, a header CTA, and footer/contact-page WhatsApp links — see
`docs/reference-site-audit.md` §2.1/§2.2/§4 item 4. **Explicit decision this
ticket makes:** WhatsApp is an additional contact channel alongside the real
enquiry form, not a replacement for it. The reference's Contact page
actually submits its "form" as a `wa.me` deep link with no backend, no
validation, and no success state at all — that is an anti-pattern flagged in
the audit (§5 item 4) and is explicitly NOT what [[SHU-014]]/[[SHU-029]]
should do. This ticket only covers the global, always-visible WhatsApp
click-to-chat affordances; the enquiry form itself keeps its real
Server-Action submission path.

## Technical tasks

- Extend [[SHU-003]]'s site settings with a `whatsappNumber` field (E.164 or
  local format with a documented convention), used to build `wa.me` links
  wherever needed instead of any component hardcoding a number.
- Global floating WhatsApp button (fixed position, all pages), rendered from
  root layout wiring ([[SHU-008]]), reads the number from site settings.
- Header CTA ([[SHU-006]]) and footer contact block ([[SHU-007]]) WhatsApp
  links read from the same site-settings field — no per-component hardcoded
  numbers.

## Notes / acceptance criteria

- Changing the WhatsApp number in Studio updates every WhatsApp link/button
  site-wide with no code change.
- The floating button and all WhatsApp links have an accessible name
  (`aria-label`, e.g. "Chat on WhatsApp") — the reference's icon-only button
  has none (audit §5 item 2).
- Does not replace or weaken [[SHU-014]]/[[SHU-029]]'s real form submission
  path; WhatsApp remains an additional channel, not the only one.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
