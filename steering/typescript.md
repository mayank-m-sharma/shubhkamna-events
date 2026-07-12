# TypeScript Steering

## Centralized types directory

All shared TypeScript types/interfaces — component prop types, CMS
document/section shapes, store state shapes — live in `src/types/`,
organized one file per domain (e.g. `src/types/theme.ts`,
`src/types/hero.ts`, `src/types/services.ts`, `src/types/cms.ts` for
cross-cutting Sanity document shapes). Components, hooks, and utils **import
their types from there** — they do not declare their own prop/data
interface inline.

- `import type { HeroSectionProps } from '@/types/hero';` — not a
  locally-declared `interface Props { ... }` duplicated in the component
  file.
- If a type is used by more than one file, or describes a public contract
  (a component's props, a Sanity schema's shape, a Zustand store's state),
  it belongs in `src/types/`, full stop.
- The only types that may stay local to a file are genuinely private,
  function-scoped shapes with no reuse and no external contract (e.g. a
  one-off generic parameter inside a helper). The moment a second file wants
  it, move it to `src/types/` — don't let a "just this once" local type
  quietly get imported elsewhere later.
- `@typescript-eslint/consistent-type-imports` is enforced — always
  `import type { X }` for type-only imports, never a value import used only
  for its type.

## Zod is the source of truth for CMS shapes

- Every Sanity document/section schema has a corresponding Zod schema
  (parsed at the fetch boundary — see [[SHU-001]], [[SHU-002]]). The
  TypeScript type is derived from it with `z.infer<typeof schema>` and
  re-exported from `src/types/` — never hand-written separately from the
  Zod schema it should match.
- This means the type and the runtime validation can never silently drift:
  if the Zod schema changes, the inferred type changes with it, and any
  component consuming the old shape fails to typecheck instead of failing
  silently at runtime.

## Section/union types

- CMS page-builder sections (the `homePage.sections[]` array — see
  [[SHU-009]], [[SHU-015]]) are modeled as a discriminated union on `_type`
  in `src/types/cms.ts`, shared by both the renderer's lookup table and each
  section's organism — one canonical union, not a redefinition per organism.

## General rules

- No `any`, anywhere (`@typescript-eslint/no-explicit-any`). If a shape is
  genuinely unknown at a boundary (e.g. raw external JSON), type it
  `unknown` and narrow it with the relevant Zod schema — that's what the
  schema is for.
- Exported functions have explicit return types
  (`@typescript-eslint/explicit-function-return-type`) — don't rely on
  inference for anything crossing a module boundary.
- Naming: `PascalCase` for types/interfaces, a `Props` suffix for component
  prop types (`HeroSectionProps`, not `IHeroSectionProps` — no Hungarian
  `I`-prefix).
- Prefer a precise union or the actual inferred CMS type over a loose
  `Record<string, unknown>`/`object` when the real shape is already known
  from a schema — vague types defeat the point of centralizing them.
