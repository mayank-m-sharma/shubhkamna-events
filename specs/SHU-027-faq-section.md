# SHU-027 — FAQ Section (Schema + Organism)

**Wave:** 4 (additional pages) · **Depends on:** [[SHU-000]], [[SHU-005]]

**Status:**

- [ ] Not started
- [ ] Completed

## User story

As the site owner, I want to answer common questions (pricing, service area,
availability, destination weddings) directly on the site, so prospective
clients get quick answers without messaging me first.

## Context

Not covered by any ticket prior to [[SHU-000]]'s audit. The reference site
has an FAQ section on both its Services page and its Contact page, each with
its own (partially overlapping, sometimes duplicated) question set — see
`docs/reference-site-audit.md` §2.4/§2.6/§4 item 1. This ticket introduces a
single reusable FAQ content type rather than one hardcoded per page, so the
owner maintains one canonical set of questions (or several named sets) and
places them wherever needed.

## Technical tasks

- `faqSection` object schema: heading, optional intro text, array of
  question/answer items (question string, rich-text or plain-text answer).
- Register `faqSection` as a page-builder section type wherever a
  section-array pattern is consumed (initially the [[SHU-029]] Contact page;
  extend to other pages as they adopt the section-array pattern).
- `FAQ` organism: accessible disclosure widget — native `<details>/<summary>`
  or `<button aria-expanded>` + `<div role="region">`, never a bare
  `<div onClick>` (the reference site's FAQ accordion has zero ARIA and no
  keyboard support — see the audit's §5 item 1 — do not reproduce this).
- Multiple items can be open simultaneously (not an exclusive accordion)
  unless product feedback says otherwise; each item is independently
  keyboard-operable (Enter/Space toggles, visible focus state).

## Notes / acceptance criteria

- Zero `jest-axe` violations; disclosure state is exposed to assistive tech
  (`aria-expanded` reflects actual open/closed state).
- Unit tests: renders N CMS items, toggles open/closed independently,
  handles 0/1/many gracefully.
- Reconciles the reference's two overlapping FAQ sets (Services vs. Contact)
  into a coherent question list when seeding content — don't ship both
  near-duplicate "do you handle destination weddings?" questions verbatim;
  pick the clearer wording per `docs/reference-site-audit.md` §2.6 note.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
