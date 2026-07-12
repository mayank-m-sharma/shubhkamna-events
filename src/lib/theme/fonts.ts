import { Inter, Lora, Montserrat, Playfair_Display } from "next/font/google";

import type { BodyFontKey, HeadingFontKey } from "@/types/theme";

// Curated, statically-analyzable font set — next/font requires literal calls
// at module scope, so the CMS can only pick from these keys, not an arbitrary
// font-family string. "system" needs no next/font call: it's the literal
// system-font stack SHU-001 already ships as a bootstrap default.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const headingFontCssValue: Record<HeadingFontKey, string> = {
  montserrat: "var(--font-montserrat)",
  playfair: "var(--font-playfair)",
  system: '"Georgia", serif',
};

export const bodyFontCssValue: Record<BodyFontKey, string> = {
  inter: "var(--font-inter)",
  lora: "var(--font-lora)",
  system: '"Helvetica Neue", Arial, sans-serif',
};

// Applied once on <html> so every curated font's CSS custom property exists;
// buildThemeStyle then picks which one is "active" per the CMS selection.
export function getFontClassName(): string {
  return [montserrat, playfairDisplay, inter, lora]
    .map((font) => font.variable)
    .join(" ");
}
