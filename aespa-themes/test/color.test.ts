import { describe, expect, it } from "vitest";
import { alpha, apca, contrast, isHex, mix, normalize } from "../src/color.js";

describe("color", () => {
  it("normalizes short and long hex", () => {
    expect(normalize("#ABC")).toBe("#aabbcc");
    expect(normalize("#aabbccdd")).toBe("#aabbcc");
  });

  it("rejects bad hex", () => {
    expect(isHex("abc")).toBe(false);
    expect(isHex("#12345")).toBe(false);
    expect(() => normalize("red")).toThrow();
  });

  it("appends alpha", () => {
    expect(alpha("#ffffff", 0.5)).toBe("#ffffff80");
    expect(alpha("#000", 1)).toBe("#000000ff");
  });

  it("mixes linearly", () => {
    expect(mix("#000000", "#ffffff", 0.5)).toBe("#808080");
  });

  it("matches APCA reference values", () => {
    expect(apca("#888888", "#ffffff")).toBeCloseTo(63.1, 0);
    expect(apca("#ffffff", "#000000")).toBeCloseTo(-107.9, 0);
    expect(apca("#000000", "#ffffff")).toBeCloseTo(106.0, 0);
  });

  it("computes WCAG contrast", () => {
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 1);
    expect(contrast("#ffffff", "#ffffff")).toBe(1);
  });
});
