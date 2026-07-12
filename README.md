# Shubhkamna Events

Website for Shubhkamna Events, rebuilt in Next.js (App Router) with a Sanity CMS
backend so every piece of content — copy, colors, fonts, sections — is editable
without touching code.

Work is tracked as SDD+TDD tickets (`SHU-XXX`) under [`specs/`](./specs), one
branch per ticket. This repo currently ships **SHU-001**, the foundation
ticket: tooling, project structure, and a CMS-driven "coming soon" page.

## Stack

Next.js 16 · TypeScript · Zustand · Sanity (embedded Studio) · module-scss ·
Zod · ESLint + Prettier · Jest + React Testing Library · Husky + lint-staged

## Getting started

```bash
nvm use              # Node 24.18.0, pinned in .nvmrc
corepack enable pnpm  # first time only, if pnpm isn't already active
cp .env.local.example .env.local
pnpm install
pnpm dev
```

- App: http://localhost:3000
- CMS (Sanity Studio, embedded): http://localhost:3000/studio

## Scripts

| Script                         | Purpose                    |
| ------------------------------ | -------------------------- |
| `pnpm dev`                     | Start the dev server       |
| `pnpm build`                   | Production build           |
| `pnpm start`                   | Serve the production build |
| `pnpm lint` / `lint:fix`       | ESLint check / autofix     |
| `pnpm format` / `format:check` | Prettier write / check     |
| `pnpm typecheck`               | `tsc --noEmit`             |
| `pnpm test` / `test:watch`     | Jest                       |

A pre-commit hook (Husky + lint-staged) runs lint, typecheck, and the full
test suite on every commit; commits are rejected if any of those fail.

## Manual steps (can't be automated — need your Sanity/Vercel login)

1. **Sanity CORS**: in the [Sanity manage console](https://www.sanity.io/manage)
   for project `eygp4ux2`, add `http://localhost:3000` (and your production
   domain once you have one) under API → CORS Origins, with credentials
   allowed.
2. **Vercel**: create a new Vercel project linked to this GitHub repo, and add
   the same 4 variables from `.env.local.example` under Project Settings →
   Environment Variables (both Production and Preview).
3. Sign in to `/studio` with your Sanity account and publish one "Site
   Settings" document — the coming-soon page falls back to placeholder copy
   until you do.

## Project structure

```
src/
  app/            # routes (App Router): coming-soon page, robots/sitemap, embedded /studio
  components/     # atomic design: atoms, molecules (upcoming), organisms
  hooks/          # reserved for shared client-side hooks
  store/          # Zustand stores (client-only UI state)
  lib/
    sanity/       # client, env validation, GROQ queries, data fetchers
    seo/          # metadata + JSON-LD builders
    validations/  # Zod schemas mirroring Sanity document shapes
    utils/        # small framework-agnostic helpers
  styles/         # design-token CSS variables (fallbacks) + Sass mixins
sanity/           # Sanity schema types
sanity.config.ts  # Sanity Studio config (embedded at /studio)
specs/            # SHU-XXX ticket specs
```

Every component receives its content as props sourced from Sanity — no
hardcoded copy inside a component. Design tokens (colors, fonts, spacing) are
CSS custom properties with fallback defaults in `src/styles/_tokens.scss`;
[SHU-002](./specs/SHU-002-sanity-schema-design-tokens-theme.md) makes them
fully CMS-configurable.
