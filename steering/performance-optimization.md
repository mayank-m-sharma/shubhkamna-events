# Performance / Core Web Vitals Steering

This is not a checklist for a single late-stage ticket ([[SHU-022]] is just
the final CI gate) — every ticket that ships UI is expected to already
satisfy this.

## Images

- `next/image` only — never a raw `<img>` (enforced by
  `@next/next/no-img-element`).
- Every image has explicit `width`/`height`, or `fill` with a properly sized
  parent — never let an image's real dimensions cause layout shift.
- Set an accurate `sizes` attribute for any image that isn't rendered at a
  fixed pixel size across breakpoints.
- `priority`/`fetchPriority="high"` only on the actual LCP candidate for that
  page (usually the hero image) — never applied blanket "to be safe," which
  just competes with the real LCP element for bandwidth.
- Below-the-fold images (gallery, testimonials) lazy-load by default (the
  `next/image` default) — don't override this.

## Fonts

- Load CMS-selected fonts (see [[SHU-002]]) via `next/font` wherever the
  provider supports it, with `font-display: swap`.
- No font swap should cause visible CLS — pair fallback fonts with similar
  metrics where possible.

## Bundle size

- Default to Server Components (see [[react.md]]) — the single biggest lever
  for public bundle size on this project.
- Sanity Studio's dependency tree must never leak into the public-page
  client bundle. If you're unsure whether an import pulls in Studio code,
  check with the bundle analyzer rather than assuming.
- Be deliberate about new dependencies — a heavy library for a small need is
  a regression, not a convenience. `no-restricted-imports` exists to catch
  known-heavy imports; don't route around it.
- Code-split genuinely large, rarely-used client bundles (e.g. a lightbox
  library) rather than including them in the initial page bundle.

## Rendering strategy

- Prefer SSG/ISR over client-side fetching for anything CMS-driven — pages
  should be statically generated and revalidated via the Sanity webhook →
  `revalidateTag`/`revalidatePath` flow (see [[SHU-015]]), not fetched
  client-side on mount.
- Don't reach for `useMemo`/`useCallback` reflexively — only memoize
  computation that's demonstrably expensive or a dependency of another
  memoized value/effect. Unnecessary memoization adds complexity without a
  measurable win.

## Motion & animation

- Respect `prefers-reduced-motion` for anything with autoplay, carousels, or
  animated transitions — this is a performance _and_ accessibility concern
  (unnecessary main-thread work for users who've opted out).
- No autoplaying carousel/video that can't be paused by the user.

## Verification

- Don't claim a performance win without measuring it — use the Lighthouse
  CI budget wired in [[SHU-022]] or a local Lighthouse run, not intuition.
