import { getContrastRatio, meetsWcagAa } from "./contrast";

describe("getContrastRatio", () => {
  it("returns 21 for black against white (maximum contrast)", () => {
    expect(getContrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 0);
  });

  it("returns 1 for identical colors (no contrast)", () => {
    expect(getContrastRatio("#1a227f", "#1a227f")).toBeCloseTo(1, 5);
  });

  it("is symmetric regardless of argument order", () => {
    const a = getContrastRatio("#1a227f", "#f6f6f8");
    const b = getContrastRatio("#f6f6f8", "#1a227f");

    expect(a).toBeCloseTo(b, 5);
  });

  it("accepts 3-digit hex shorthand", () => {
    expect(getContrastRatio("#000", "#fff")).toBeCloseTo(21, 0);
  });
});

describe("meetsWcagAa", () => {
  it("passes normal text at the reference site's primary/background pair", () => {
    const ratio = getContrastRatio("#1a227f", "#f6f6f8");

    expect(meetsWcagAa(ratio)).toBe(true);
  });

  it("fails normal text for a low-contrast pair", () => {
    const ratio = getContrastRatio("#f6f6f8", "#ffffff");

    expect(meetsWcagAa(ratio)).toBe(false);
  });

  it("uses the lower 3:1 threshold for large text", () => {
    // A ratio between 3 and 4.5 should pass for large text but fail for normal text.
    const ratio = 3.5;

    expect(meetsWcagAa(ratio, { isLargeText: true })).toBe(true);
    expect(meetsWcagAa(ratio, { isLargeText: false })).toBe(false);
  });
});
