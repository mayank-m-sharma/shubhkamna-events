// Splits off a CMS-controlled trailing substring to render with a gradient
// highlight (e.g. "Our Magic." within "Your Vision, Our Magic.") rather
// than guessing which word(s) to emphasize in code. Shared by every hero
// that supports a `headlineHighlight` field (Hero, PageHero) so they can't
// drift on the matching logic.
export function splitHeadline(
  headline: string,
  highlight?: string,
): { rest: string; highlight?: string } {
  if (highlight && headline.endsWith(highlight)) {
    return {
      rest: headline.slice(0, headline.length - highlight.length),
      highlight,
    };
  }
  return { rest: headline, highlight: undefined };
}
