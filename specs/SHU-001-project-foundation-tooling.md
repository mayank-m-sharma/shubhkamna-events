# SHU-001 — Project Foundation & Tooling

**Wave:** 0 (foundation) · **Depends on:** none · **Branch:** `shu-001-project-setup`

## User story

As the site owner with no technical background, I want a live "coming soon"
page and a working content-editing tool from day one, so that I can see
progress immediately and start getting comfortable with the CMS before the
real pages exist.

As the developer, I want the full toolchain (framework, styling, state,
validation, CMS, linting, formatting, testing, git hooks) wired up correctly
once, so every subsequent ticket only adds features — never fixes plumbing.

## Technical tasks

- Next.js 16 (App Router, `src/` dir, TypeScript, `@/*` alias), React 19.
- TypeScript pinned to 6.0.3 (not the "latest" 7.x Go-native compiler —
  `typescript-eslint` and `ts-jest` don't support it yet).
- ESLint 9.39.5 (flat config) — not 10.x, because `eslint-plugin-react`
  (bundled by `eslint-config-next`) isn't compatible with ESLint 10's removed
  APIs yet. `eslint-config-next`, `eslint-plugin-import`, `eslint-plugin-jest`,
  `eslint-config-prettier`, Prettier, all wired per the project's required
  rule list (code quality, performance, react/next, a11y, security,
  maintainability, typescript, formatting).
- Jest 30 + `next/jest` (SWC transform, no `ts-jest`) + React Testing Library.
- Zustand store (`useUIStore`) seeding the client-state pattern.
- Zod schema for the Sanity `siteSettings` document, parsed at the fetch
  boundary (`getSiteSettings`), with a typed fallback.
- Sanity: embedded Studio at `/studio` (client-rendered only — Studio is a
  pure SPA and doesn't SSR safely alongside Next's React copy), one singleton
  schema (`siteSettings`) driving the coming-soon copy.
- module-scss + a fallback design-token layer (`_tokens.scss`, CSS custom
  properties) and a mobile-first breakpoint mixin.
- Atomic components: `Heading`, `Text`, `JsonLd` atoms; `ComingSoonHero`
  organism — all data-agnostic, receiving CMS-shaped props only.
- SEO baseline: `generateMetadata`, canonical via `metadataBase`, dynamic
  `robots.ts`/`sitemap.ts`, JSON-LD Organization block, single H1, `lang="en"`,
  skip-link, viewport meta.
- Husky pre-commit: `lint-staged` → `typecheck` → `test`, blocking the commit
  on any failure.
- `.nvmrc` (Node 24.18.0), `pnpm-workspace.yaml` (approved build scripts:
  sharp, esbuild, @parcel/watcher, unrs-resolver).

## Notes / acceptance criteria

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` all pass with zero
  errors.
- `/` renders CMS-sourced coming-soon copy (falls back to placeholder text
  until a Site Settings document is published) with correct title, meta
  description, canonical tag, and JSON-LD.
- `/studio` loads the Sanity Studio shell without server errors.
- No component contains hardcoded copy — everything comes from props.
- Font family and color values are consumed only via CSS custom properties,
  never as literals, so [[SHU-002]] can override them without touching
  component code.
- Manual, user-owned follow-ups: Sanity CORS origins, Vercel project +
  env vars, first Site Settings document publish.
