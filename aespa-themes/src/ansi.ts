/** Derive the 16 terminal ANSI colors from an era's roles. */
import { contrast, darken, lighten, mix } from "./color.js";
import { hexToOklch, oklch } from "./oklch.js";
import type { AnsiRoles, EraPalette } from "./palette.js";

/** The terminal rewrites any foreground below this ratio, so every ANSI color must clear it. */
export const TERMINAL_MIN_CONTRAST = 4.5;

/** Nudge `hex` toward `toward` until it clears the terminal floor against `bg`. */
export function ensureContrast(hex: string, bg: string, toward: string): string {
  let t = 0;
  let out = hex;
  while (contrast(out, bg) < TERMINAL_MIN_CONTRAST && t < 1) {
    t += 0.05;
    out = mix(hex, toward, t);
  }
  return out;
}

/** Hue targets terminal programs assume when they print magenta or cyan. */
const MAGENTA_HUE = 330;
const CYAN_HUE = 200;
/** How far an era color may sit from the target hue and still pass as that ANSI color. */
const HUE_TOLERANCE = 35;

function hueDistance(a: number, b: number): number {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

/**
 * The era's own syntax color closest to `hue`, if one is close and colorful
 * enough; otherwise a new color at `hue` with the lightness and chroma of `like`.
 */
function ansiHue(era: EraPalette, hue: number, like: string): string {
  let best: { hex: string; d: number } | undefined;
  for (const hex of Object.values(era.syntax)) {
    const o = hexToOklch(hex);
    const d = hueDistance(o.h, hue);
    if (o.c >= 0.06 && d <= HUE_TOLERANCE && (!best || d < best.d)) {
      best = { hex, d };
    }
  }
  if (best) {
    return best.hex;
  }
  const ref = hexToOklch(like);
  return oklch(ref.l, Math.max(ref.c, 0.08), hue);
}

export function deriveAnsi(era: EraPalette): AnsiRoles {
  const { status, fg, surface, bg, type } = era;
  const dark = type === "dark";
  /** "Bright" ANSI colors get pushed toward white on dark, toward black on light. */
  const bright = (hex: string) => (dark ? lighten(hex, 0.2) : darken(hex, 0.18));
  const base: AnsiRoles = {
    black: dark ? surface.s2 : fg.text,
    red: status.error,
    green: status.success,
    yellow: status.warning,
    blue: status.info,
    magenta: ansiHue(era, MAGENTA_HUE, status.info),
    cyan: ansiHue(era, CYAN_HUE, status.info),
    white: fg.subtext,
    brightBlack: ensureContrast(fg.muted, bg.base, fg.subtext),
    brightRed: bright(status.error),
    brightGreen: bright(status.success),
    brightYellow: bright(status.warning),
    brightBlue: bright(status.info),
    brightMagenta: bright(ansiHue(era, MAGENTA_HUE, status.info)),
    brightCyan: bright(ansiHue(era, CYAN_HUE, status.info)),
    brightWhite: fg.text,
  };
  return { ...base, ...era.ansi };
}
