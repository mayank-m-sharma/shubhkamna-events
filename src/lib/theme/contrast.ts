// WCAG 2.x relative luminance / contrast ratio, per
// https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
function expandHex(hex: string): string {
  if (hex.length === 4) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }

  return hex;
}

function toLinearChannel(channel8Bit: number): number {
  const channel = channel8Bit / 255;

  return channel <= 0.03928
    ? channel / 12.92
    : Math.pow((channel + 0.055) / 1.055, 2.4);
}

function getRelativeLuminance(hex: string): number {
  const normalized = expandHex(hex);
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);

  return (
    0.2126 * toLinearChannel(r) +
    0.7152 * toLinearChannel(g) +
    0.0722 * toLinearChannel(b)
  );
}

export function getContrastRatio(hexA: string, hexB: string): number {
  const luminanceA = getRelativeLuminance(hexA);
  const luminanceB = getRelativeLuminance(hexB);
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);

  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsWcagAa(
  ratio: number,
  options: { isLargeText?: boolean } = {},
): boolean {
  const threshold = options.isLargeText ? 3 : 4.5;

  return ratio >= threshold;
}
