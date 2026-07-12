# SHU-000 — Reference Site Audit, Design Tokens & Seed Content Plan

**Wave:** 0 (foundation) · **Depends on:** none · **Branch:** `shu-000-reference-audit`

**Status:**

- [x] Not started
- [ ] Completed

## User story

As the developer team, before any schema or component is designed, I want a
concrete, written inventory of the reference site's pages, sections, content,
images, and visual identity, so every later schema ticket ([[SHU-002]]
onward) is built from the real content this business needs — not guesses
that get reworked later — and so the first real publish has genuine seed
content on day one instead of lorem ipsum.

## Context

The reference is https://dynamo-studio.github.io/Shubhkamna-Events-Demo/ —
this is the client's own approved design/content reference for this exact
business, functioning like a Figma file: **its content, imagery, and
structure are the intended seed material**, not something to avoid touching.
The goal is a faithful, production-grade recreation of its look, feel, and
content — not a pixel-identical clone, and not a generic redesign
disconnected from it. What must change is everything _underneath_: markup,
accessibility, performance, SEO, and CMS-configurability all get rebuilt
correctly with this project's stack — the demo's implementation details
(markup patterns, inaccessible widgets, hardcoded values, unoptimized
images) are not carried over, only its content and design intent are.

## Technical tasks

- A dedicated research pass (agent with live web access) crawls every route
  of the reference site and produces a written plan at
  `docs/reference-site-audit.md`, covering:
  - **Page/route inventory** — every distinct page found (home, about,
    services, gallery, contact, etc.) and its URL pattern.
  - **Section-by-section seed content** — the actual copy, headings, and
    imagery used per section (hero headline/subhead/CTA, service
    names/descriptions/icons, testimonial quotes/authors, gallery images,
    about/founder content, footer/contact details, nav items) captured in a
    form that can be typed directly into Sanity once schemas exist — this
    becomes the real initial content for the first publish, not a
    throwaway reference.
  - **Concrete design tokens** — actual colors (hex), heading/body font
    pairing, approximate type scale, spacing rhythm, image aspect
    ratios/treatment — these become the literal default values in
    [[SHU-002]]'s theme schema, not vague inspiration.
  - **Explicit mapping table**: reference-site section → planned Sanity
    schema/ticket (e.g. "Hero banner → [[SHU-010]] `heroSection`"), flagging
    any content shape the current spec set ([[SHU-009]] through [[SHU-017]])
    doesn't yet account for.
  - **Implementation gap notes** — anti-patterns in the reference's actual
    build (non-semantic markup, missing alt text, inaccessible carousels,
    hardcoded copy, unoptimized images) called out explicitly so later
    tickets rebuild the _result_ faithfully without reproducing the _flaws_.
- A living progress tracker at `docs/reference-parity-checklist.md`: one row
  per reference-site section/page, the ticket(s) that rebuild it, and a
  Status column (`Not started` / `In progress` / `Done`) — every row starts
  `Not started`. Seed it with at least the mapping already implied by the
  existing spec set (add rows if the crawl finds more):

  | Reference section          | Ticket(s)   | Status      |
  | -------------------------- | ----------- | ----------- |
  | Header / nav               | [[SHU-006]] | Not started |
  | Footer                     | [[SHU-007]] | Not started |
  | Home — Hero                | [[SHU-010]] | Not started |
  | Home — Services/offerings  | [[SHU-011]] | Not started |
  | Home — Gallery             | [[SHU-012]] | Not started |
  | Home — Testimonials        | [[SHU-013]] | Not started |
  | Home — Contact/enquiry     | [[SHU-014]] | Not started |
  | About page                 | [[SHU-016]] | Not started |
  | Service/event detail pages | [[SHU-017]] | Not started |

  This checklist is what tickets update as they ship — see the
  [Definition of Done](./DEFINITION-OF-DONE.md)'s "Reference parity
  tracking" section for the update rule.

## Notes / acceptance criteria

- `docs/reference-site-audit.md` and `docs/reference-parity-checklist.md`
  both exist and are committed before any ticket in Wave 1+ that touches
  content schema begins implementation.
- The plan captures enough real seed content (copy + images) that
  [[SHU-002]]'s theme defaults and the first published homepage/about/service
  content can be populated from it directly, without waiting on new client
  material.
- Any content-shape gap the audit finds against [[SHU-009]]–[[SHU-017]] is
  raised back for a spec amendment, not silently implemented ad hoc.
- The result reads as a faithful recreation of the reference's content and
  design intent — not a pixel-perfect clone, and not a disconnected
  redesign.
