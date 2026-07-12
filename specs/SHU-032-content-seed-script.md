# SHU-032 — One-Time Content Seed Script

**Wave:** 1 (design system foundation) · **Depends on:** [[SHU-000]], [[SHU-002]], [[SHU-003]]

**Status:**

- [ ] Not started
- [x] Completed

## User story

As the developer team, we want a repeatable script that publishes the
reference-site audit's real content into Sanity, so the site shows genuine
business content as soon as each schema/organism exists — instead of empty
states or code-level fallbacks — without anyone hand-typing it into Studio.

## Context

[[SHU-000]]'s audit (`docs/reference-site-audit.md`) is the literal seed
content, and [[SHU-002]]/[[SHU-003]] already use it as Studio `initialValue`
defaults — but an `initialValue` only pre-fills a **new, unsaved** document's
form in Studio; it does not publish an actual document to the dataset. As of
this ticket, the live Sanity project has zero published `siteSettings`/
`siteTheme` documents.

**This script can only seed schemas that already exist.** Right now that's
`siteSettings` and `siteTheme`. It is explicitly _not_ a one-shot seed of the
whole site — `homePage`/section types ([[SHU-009]]–[[SHU-014]]), `aboutPage`
([[SHU-016]]), `service` documents ([[SHU-017]]), and the gap tickets
([[SHU-027]]–[[SHU-031]]) don't have schemas yet. Every one of those tickets
is expected to extend this same script with its own seed data once its
schema lands — see the new "Content seeding" section this ticket adds to
[Definition of Done](./DEFINITION-OF-DONE.md).

## Technical tasks

- `scripts/seed/` directory: a runnable entry point (`scripts/seed/index.ts`,
  run via a `pnpm seed` script) using `@sanity/client` with a write-scoped
  token.
- Idempotent, upsert-based writes (`createOrReplace` with a deterministic,
  fixed `_id` per singleton, e.g. `_id: "siteSettings"`) — safe to re-run
  without creating duplicates or clobbering manual edits made after the
  first run (only overwrite fields the script actually manages; consider a
  `createIfNotExists` + selective `patch` approach if "don't stomp on
  Studio edits" needs finer control than a full replace).
- An image-upload helper: downloads each reference image (the
  `cdn.jsdelivr.net/gh/Dynamo-Studio/...` URLs recorded in the audit) and
  uploads it to Sanity's asset store via `client.assets.upload('image',
...)`, returning the asset reference to embed in seeded documents. Skips
  re-uploading an asset whose source filename was already uploaded in a
  prior run (idempotency for images, not just documents).
- One seed-data module per schema (`scripts/seed/data/siteSettings.ts`,
  `scripts/seed/data/siteTheme.ts`), each exporting the literal values
  sourced directly from `docs/reference-site-audit.md` — adding a future
  schema's seed data later is "add one data file + register it in the
  runner," not a rewrite of the script.
- Seeds, for this ticket: `siteSettings` (organization name/address/phone,
  WhatsApp number, social links, review rating/count/url — the same real
  values already used as [[SHU-003]]'s Studio initial values, now actually
  published) and `siteTheme` (the audit's real colors/fonts, same values as
  [[SHU-002]]'s Studio initial values, now actually published).
- Read/write credentials come from an env var (e.g.
  `SANITY_API_WRITE_TOKEN`), documented in `.env.local.example`, never
  committed.
- Clear console output: what was created, what was updated, what was
  skipped (already up to date).
- Adds a "Content seeding" section to
  [Definition of Done](./DEFINITION-OF-DONE.md): any ticket introducing a
  new content schema extends this script with that schema's real seed data
  (sourced from the audit) as part of finishing the ticket — matching the
  existing rule for updating `docs/reference-parity-checklist.md`. If the
  audit has no real content for a new field/shape, the ticket says so
  explicitly rather than inventing placeholder copy.

## Notes / acceptance criteria

- Running `pnpm seed` against a project with a write token configured
  publishes real `siteSettings`/`siteTheme` documents matching the audit —
  no manual Studio data entry needed for either.
- Re-running the script is a safe no-op/update, never a duplicate-document
  generator.
- No secret (write token) is ever committed; missing/invalid token fails
  loudly with a clear message rather than silently no-oping.
- This is a dev-tooling script, not a page/route — the accessibility/Core
  Web Vitals/SEO sections of the project [Definition of Done](./DEFINITION-OF-DONE.md)
  don't apply; the lint/typecheck/test baseline still does.
