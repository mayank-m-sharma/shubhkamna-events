# React / Next.js Steering

Applies to every ticket that touches `src/`. This is _how_ to build with
React 19 + Next.js 16 App Router on this project — the specs say _what_ to
build; this says how to write it well.

## Server-first by default

- Every component is a Server Component unless it genuinely needs
  interactivity (state, effects, event handlers, browser APIs). Mark
  `"use client"` at the smallest possible leaf — never at a page or layout
  level "just in case."
- Data fetching (Sanity queries) happens in Server Components or Server
  Actions, never in a `useEffect` in a Client Component.
- If a subtree has one interactive island inside a lot of static content,
  extract the interactive part into its own small Client Component and keep
  the rest server-rendered — don't drag the whole subtree client-side.

## Atomic design boundaries

- **Atoms**: presentational only. No data fetching, no CMS client imports,
  no business logic. Pure props in, markup out.
- **Molecules**: compose atoms (+ other molecules). Still no data fetching.
- **Organisms**: may receive CMS-shaped data as props (fetched by the page/
  template above them) but should not import the Sanity client directly —
  keep the fetch boundary at the page/route level so organisms stay testable
  with plain props.
- Never let a lower layer import from a higher one (atom importing an
  organism, etc.).

## Props & data shape

- No hardcoded copy, colors, font names, or content anywhere in a component
  — everything CMS-configurable comes in as a prop or a CSS custom property.
- Every component has an explicit TypeScript prop interface — no `any`, no
  implicit `object` blobs. Prefer discriminated unions over boolean-flag
  explosions when a component has real variants (e.g. `Button`'s
  primary/secondary/ghost).
- Molecule/organism prop shapes should mirror their corresponding Sanity
  schema shape closely, so the page/template layer can pass CMS data through
  with minimal remapping.

## Hooks

- `react-hooks/exhaustive-deps` clean — never suppress it to silence a
  warning; fix the dependency or restructure the effect.
- Extract non-trivial `useEffect`/state logic into a named custom hook
  (`useXyz`) once it's more than a couple of lines — keeps the component
  reading as UI, not control flow.
- Zustand (`useUIStore` and friends) is for cross-component _client UI
  state_ only (mobile nav open/closed, lightbox open, etc.) — never a place
  to cache server/CMS data. CMS data flows through props from the fetch
  boundary, not through client state.

## Composition & structure

- Favor composition (children/slots) over prop-driven configuration when a
  component's variants start multiplying.
- Keep functional logic (hooks, helpers, utils) in dedicated files separate
  from the component's JSX — a component file should read as "layout +
  data," not contain inline business logic.
- Lists always have stable, meaningful `key`s — never array index when the
  list can reorder or filter (CMS-driven arrays can do both).

## Error handling

- Use route-level `not-found.tsx` / `error.tsx` / `global-error.tsx`
  boundaries (see [[SHU-018]]) rather than ad hoc try/catch-and-hide-it
  patterns inside organisms.
- An organism given incomplete/empty CMS data (0 items, missing optional
  field) degrades gracefully — it never throws for the "empty state" case.
