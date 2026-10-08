import { describe, expect, it } from "vitest";
import { apca, contrast, isHex, luminance } from "../src/color.js";
import { eras } from "../src/eras/index.js";
import { deriveAnsi } from "../src/ansi.js";
import { hexToOklch } from "../src/oklch.js";

const AA = 4.5;
const LARGE = 3;

describe.each(eras.map((era) => [era.slug, era] as const))("%s palette", (_slug, era) => {
  it("has unique slug and label", () => {
    expect(eras.filter((e) => e.slug === era.slug)).toHaveLength(1);
    expect(eras.filter((e) => e.label === era.label)).toHaveLength(1);
  });

  it("uses valid hex everywhere", () => {
    const values = [
      ...Object.values(era.seed),
      ...Object.values(era.bg),
      ...Object.values(era.surface),
      era.border,
      ...Object.values(era.fg),
      era.accent,
      era.accent2,
      era.brand,
      ...(era.brandText ? [era.brandText] : []),
      ...Object.values(era.syntax),
      ...Object.values(era.status),
      ...Object.values(era.ansi ?? {}),
    ];
    for (const v of values) {
      expect(isHex(v), v).toBe(true);
    }
  });

  it("orders backgrounds by depth", () => {
    // Luminance runs base > mantle > crust in both modes; surfaces step away from base
    // toward the foreground, so lighter on dark and darker on light.
    expect(luminance(era.bg.base)).toBeGreaterThanOrEqual(luminance(era.bg.mantle));
    expect(luminance(era.bg.mantle)).toBeGreaterThanOrEqual(luminance(era.bg.crust));
    const sign = era.type === "dark" ? 1 : -1;
    const l = (hex: string) => sign * luminance(hex);
    expect(l(era.surface.s2)).toBeGreaterThan(l(era.surface.s1));
    expect(l(era.surface.s1)).toBeGreaterThan(l(era.surface.s0));
    expect(l(era.surface.s0)).toBeGreaterThan(l(era.bg.base));
  });

  it.each(Object.entries(era.syntax).filter(([k]) => k !== "comment"))("syntax.%s clears AA on the editor", (_k, hex) => {
    expect(contrast(hex, era.bg.base)).toBeGreaterThanOrEqual(AA);
  });

  it("comment and muted clear 3:1 on the editor", () => {
    expect(contrast(era.syntax.comment, era.bg.base)).toBeGreaterThanOrEqual(LARGE);
    expect(contrast(era.fg.muted, era.bg.base)).toBeGreaterThanOrEqual(LARGE);
  });

  it("text and subtext clear AA on every background", () => {
    for (const bg of [era.bg.base, era.bg.mantle, era.bg.crust, era.surface.s0, era.surface.s1]) {
      expect(contrast(era.fg.text, bg)).toBeGreaterThanOrEqual(AA);
      expect(contrast(era.fg.subtext, bg)).toBeGreaterThanOrEqual(AA);
    }
  });

  it("status colors clear AA on the editor", () => {
    for (const hex of Object.values(era.status)) {
      expect(contrast(hex, era.bg.base)).toBeGreaterThanOrEqual(AA);
    }
  });

  it("accent clears 3:1 on chrome backgrounds", () => {
    for (const bg of [era.bg.base, era.bg.mantle, era.bg.crust]) {
      expect(contrast(era.accent, bg)).toBeGreaterThanOrEqual(LARGE);
      expect(contrast(era.accent2, bg)).toBeGreaterThanOrEqual(LARGE);
    }
  });

  it("clears APCA floors: text 75, syntax 60, comment 45", () => {
    const lc = (hex: string) => Math.abs(apca(hex, era.bg.base));
    expect(lc(era.fg.text)).toBeGreaterThanOrEqual(75);
    for (const [k, hex] of Object.entries(era.syntax)) {
      if (k === "comment") {
        expect(lc(hex), k).toBeGreaterThanOrEqual(45);
      } else {
        expect(lc(hex), k).toBeGreaterThanOrEqual(60);
      }
    }
    for (const [k, hex] of Object.entries(era.status)) {
      expect(lc(hex), k).toBeGreaterThanOrEqual(60);
    }
  });

  it("ANSI magenta and cyan look like magenta and cyan", () => {
    const ansi = deriveAnsi(era);
    const dist = (h: number, target: number) => {
      const d = Math.abs(h - target) % 360;
      return d > 180 ? 360 - d : d;
    };
    for (const [name, target] of [["magenta", 330], ["brightMagenta", 330], ["cyan", 200], ["brightCyan", 200]] as const) {
      expect(dist(hexToOklch(ansi[name]).h, target), name).toBeLessThanOrEqual(35);
    }
  });

  it("ANSI colors clear the terminal's 4.5 floor except black", () => {
    const ansi = deriveAnsi(era);
    for (const [name, hex] of Object.entries(ansi)) {
      if (name === "black" && era.type === "dark") {
        continue;
      }
      expect(contrast(hex, era.bg.base), name).toBeGreaterThanOrEqual(AA);
    }
  });
});
