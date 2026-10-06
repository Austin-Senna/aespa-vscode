import { describe, expect, it } from "vitest";
import { hexToOklch, maxChroma, oklch, oklchToHex } from "../src/oklch.js";

describe("oklch", () => {
  it("round-trips sRGB primaries and greys", () => {
    for (const hex of ["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff", "#808080", "#a9d6ff", "#3b0f6b"]) {
      expect(oklchToHex(hexToOklch(hex))).toBe(hex);
    }
  });

  it("matches Ottosson's reference values for white and red", () => {
    const white = hexToOklch("#ffffff");
    expect(white.l).toBeCloseTo(1, 3);
    expect(white.c).toBeCloseTo(0, 3);
    const red = hexToOklch("#ff0000");
    expect(red.l).toBeCloseTo(0.628, 2);
    expect(red.c).toBeCloseTo(0.258, 2);
    expect(red.h).toBeCloseTo(29.2, 0);
  });

  it("clamps out-of-gamut chroma while keeping lightness and hue", () => {
    const hex = oklch(0.8, 0.3, 140);
    const back = hexToOklch(hex);
    expect(back.l).toBeCloseTo(0.8, 2);
    expect(back.h).toBeCloseTo(140, 0);
    expect(back.c).toBeLessThan(0.3);
    expect(back.c).toBeCloseTo(maxChroma(0.8, 140), 3);
  });
});
