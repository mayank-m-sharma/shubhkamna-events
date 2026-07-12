# Code Quality & General Best Practices Steering

## Lint baseline (non-negotiable, enforced by ESLint + the pre-commit hook)

These are the project's required ESLint rules ([[SHU-001]] wires them all).
Do not disable a rule inline to make a diff pass — fix the code.

**Core code quality**: `no-unused-vars`, `no-undef`, `no-console` (warn/error
only in prod paths), `eqeqeq`, `no-duplicate-imports`, `consistent-return`.

**Performance**: `no-loop-func`, `no-new-func`, `prefer-const`, `no-var`,
`object-shorthand`, `prefer-template`.

**React / Next.js**: `react/jsx-key`, `react/no-danger`,
`react-hooks/rules-of-hooks`, `react-hooks/exhaustive-deps`,
`@next/next/no-img-element`, `@next/next/no-html-link-for-pages`.

**SEO & accessibility**: `jsx-a11y/alt-text`, `jsx-a11y/anchor-is-valid`,
`jsx-a11y/aria-role`, `jsx-a11y/heading-has-content`, `jsx-a11y/lang`.

**Security**: `no-eval`, `no-implied-eval`, `no-script-url`,
`react/jsx-no-target-blank`.

**Maintainability**: `max-lines` / `max-lines-per-function`, `complexity`,
`max-depth`, `import/order`, `no-restricted-imports`.

**TypeScript**: `@typescript-eslint/no-unused-vars`,
`@typescript-eslint/explicit-function-return-type`,
`@typescript-eslint/no-explicit-any`,
`@typescript-eslint/consistent-type-imports`.

**Formatting** (Prettier-owned): `semi`, `quotes`, `indent`,
`arrow-body-style`.

## General principles

- **No hardcoded content.** Every component is a logical data-rendering
  unit — copy, colors, fonts, images, section content all come from the
  CMS. If you're tempted to hardcode a string "just for now," that's a sign
  the schema or prop shape is incomplete, not a shortcut to take.
- **Separate logic from presentation.** Custom hooks, helper files, and
  utility functions hold logic; components hold markup. A component file
  that's mostly `if`/data-shaping logic before the `return` is a sign
  something belongs in a hook or util instead.
- **No premature abstraction.** Three similar lines of code beat a
  speculative shared abstraction built for a hypothetical future case. Don't
  generalize a pattern until a second or third real usage demands it.
- **No dead code or half-finished paths.** Don't leave commented-out code,
  unused exports, feature flags for things that don't need flags, or
  scaffolding for features not yet built.
- **Trust internal guarantees.** Don't add defensive validation/error
  handling for inputs that can't actually occur internally — validate at
  real boundaries (CMS fetch parsing via Zod, form input, external APIs),
  not everywhere reflexively.
- **TypeScript strictness.** No `any`. Explicit return types on exported
  functions. Prefer precise union/discriminated types over broad `object`/
  `Record<string, unknown>` shapes when the shape is actually known (e.g.
  from a Sanity schema).
- **Comments explain WHY, not WHAT.** Only comment a genuinely non-obvious
  constraint, workaround, or invariant. Well-named code and functions
  shouldn't need a comment restating what they do.
- **Keep files and functions small.** If a component or function is hard to
  summarize in one sentence, or is approaching the `max-lines`/`complexity`
  budget, it's doing too much — split it along a real seam, not an
  arbitrary one.
