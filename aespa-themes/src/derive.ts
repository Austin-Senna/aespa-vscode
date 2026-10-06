/**
 * Derive a full EraPalette from a compact OKLCH spec.
 *
 * Numbers follow what well-regarded themes measure to: dark backgrounds at
 * L 0.22-0.26 tinted toward the era hue, surfaces stepping +0.07, text at
 * L 0.88, accents at L ~0.80 with uniform chroma; light themes mirror that
 * with accents at L ~0.50 and lower chroma. Variables and punctuation stay
 * foreground so the accents remain rare.
 */
import { hexToOklch, oklch } from "./oklch.js";
import type { EraPalette, Finish, Seed, StatusRoles, StyleFlags, SyntaxRoles, ThemeType } from "./palette.js";

export type Mood = "muted" | "normal" | "vivid";

/** A hue in degrees, or a hue with chroma and lightness overrides, or a literal hex. */
export type Tone = number | { h: number; c?: number; l?: number } | `#${string}`;

export interface EraSpec {
  slug: string;
  label: string;
  title: string;
  year: number;
  type: ThemeType;
  finish: Finish;
  seed: Seed;
  /**
   * Background hue, optional chroma (default 0.025 dark, 0.012 light) and
   * optional editor lightness (default 0.23 dark, 0.965 light; mantle and
   * crust step down from it).
   */
  bg: { h: number; c?: number; l?: number };
  mood: Mood;
  accent: Tone;
  accent2: Tone;
  /** Role hues. property defaults to a quiet tint of the function hue. */
  hues: {
    keyword: Tone;
    storage: Tone;
    string: Tone;
    number: Tone;
    function: Tone;
    type: Tone;
    tag?: Tone;
    attribute?: Tone;
    regexp?: Tone;
    escape?: Tone;
    property?: Tone;
  };
  /** Status hues default to red 25, yellow 85, green 140, blue 250. */
  status?: Partial<Record<keyof StatusRoles, Tone>>;
  style?: Partial<StyleFlags>;
}

interface Bands {
  bg: [number, number, number];
  bgC: number;
  surface: [number, number, number];
  surfaceC: number;
  border: number;
  fg: [number, number, number];
  fgC: number;
  comment: number;
  accentL: number;
  accentC: number;
  uiAccentL: number;
  uiAccentC: number;
  warningH: number;
  warningL: number;
}

function bands(type: ThemeType, mood: Mood): Bands {
  const chroma = { muted: 0.09, normal: 0.115, vivid: 0.14 }[mood];
  if (type === "dark") {
    return {
      bg: [0.23, 0.2, 0.17],
      bgC: 0.025,
      surface: [0.3, 0.37, 0.44],
      surfaceC: 0.03,
      border: 0.36,
      fg: [0.88, 0.78, 0.62],
      fgC: 0.03,
      comment: 0.69,
      accentL: { muted: 0.82, normal: 0.81, vivid: 0.8 }[mood],
      accentC: chroma,
      uiAccentL: 0.8,
      uiAccentC: chroma + 0.02,
      warningH: 85,
      warningL: 0.8,
    };
  }
  return {
    bg: [0.965, 0.935, 0.905],
    bgC: 0.012,
    surface: [0.9, 0.86, 0.81],
    surfaceC: 0.015,
    border: 0.84,
    fg: [0.3, 0.45, 0.6],
    fgC: 0.03,
    comment: 0.58,
    accentL: { muted: 0.52, normal: 0.5, vivid: 0.5 }[mood],
    accentC: { muted: 0.09, normal: 0.105, vivid: 0.12 }[mood],
    uiAccentL: 0.55,
    uiAccentC: chroma + 0.01,
    // No legible bright yellow exists on a light background; use ochre.
    warningH: 70,
    warningL: 0.52,
  };
}

function tone(t: Tone, l: number, c: number): string {
  if (typeof t === "string") {
    return t;
  }
  if (typeof t === "number") {
    return oklch(l, c, t);
  }
  return oklch(t.l ?? l, t.c ?? c, t.h);
}

export function derive(spec: EraSpec): EraPalette {
  const b = bands(spec.type, spec.mood);
  const bgH = spec.bg.h;
  const bgC = spec.bg.c ?? b.bgC;
  const bgShift = (spec.bg.l ?? b.bg[0]) - b.bg[0];
  const sC = Math.max(b.surfaceC, bgC);
  const hues = spec.hues;
  const acc = (t: Tone) => tone(t, b.accentL, b.accentC);

  const fgText = oklch(b.fg[0], b.fgC, bgH);
  const fgSubtext = oklch(b.fg[1], b.fgC, bgH);
  const fgMuted = oklch(b.fg[2], b.fgC, bgH);
  const functionHue = typeof hues.function === "number" ? hues.function : typeof hues.function === "object" ? hues.function.h : hexToOklch(hues.function).h;
  const propertyDefault = spec.type === "dark" ? oklch(0.84, 0.045, functionHue) : oklch(0.4, 0.045, functionHue);

  const syntax: SyntaxRoles = {
    keyword: acc(hues.keyword),
    storage: acc(hues.storage),
    string: acc(hues.string),
    number: acc(hues.number),
    function: acc(hues.function),
    type: acc(hues.type),
    variable: fgText,
    property: hues.property ? acc(hues.property) : propertyDefault,
    comment: oklch(b.comment, b.fgC, bgH),
    operator: fgSubtext,
    tag: acc(hues.tag ?? hues.keyword),
    attribute: acc(hues.attribute ?? hues.storage),
    regexp: acc(hues.regexp ?? hues.string),
    escape: acc(hues.escape ?? hues.number),
  };

  const st = spec.status ?? {};
  const status: StatusRoles = {
    success: tone(st.success ?? 140, b.accentL, b.accentC),
    warning: tone(st.warning ?? b.warningH, b.warningL, b.accentC),
    // Errors are the rarest role, so they carry the loudest chroma.
    error: tone(st.error ?? 25, b.accentL, b.accentC + 0.02),
    info: tone(st.info ?? 250, b.accentL, b.accentC),
  };

  return {
    slug: spec.slug,
    label: spec.label,
    title: spec.title,
    year: spec.year,
    type: spec.type,
    finish: spec.finish,
    seed: spec.seed,
    bg: {
      base: oklch(b.bg[0] + bgShift, bgC, bgH),
      mantle: oklch(b.bg[1] + bgShift, bgC * 0.9, bgH),
      crust: oklch(b.bg[2] + bgShift, bgC * 0.8, bgH),
    },
    surface: {
      s0: oklch(b.surface[0], sC, bgH),
      s1: oklch(b.surface[1], sC, bgH),
      s2: oklch(b.surface[2], sC, bgH),
    },
    border: oklch(b.border, sC, bgH),
    fg: { text: fgText, subtext: fgSubtext, muted: fgMuted },
    accent: tone(spec.accent, b.uiAccentL, b.uiAccentC),
    accent2: tone(spec.accent2, b.uiAccentL, b.uiAccentC),
    syntax,
    status,
    style: spec.style,
  };
}
