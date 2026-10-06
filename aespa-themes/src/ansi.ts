/** Derive the 16 terminal ANSI colors from an era's roles. */
import { contrast, darken, lighten, mix } from "./color.js";
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

export function deriveAnsi(era: EraPalette): AnsiRoles {
  const { status, syntax, fg, surface, bg, type } = era;
  const dark = type === "dark";
  /** "Bright" ANSI colors get pushed toward white on dark, toward black on light. */
  const bright = (hex: string) => (dark ? lighten(hex, 0.2) : darken(hex, 0.18));
  const base: AnsiRoles = {
    black: dark ? surface.s2 : fg.text,
    red: status.error,
    green: status.success,
    yellow: status.warning,
    blue: status.info,
    magenta: syntax.keyword,
    cyan: syntax.type,
    white: fg.subtext,
    brightBlack: ensureContrast(fg.muted, bg.base, fg.subtext),
    brightRed: bright(status.error),
    brightGreen: bright(status.success),
    brightYellow: bright(status.warning),
    brightBlue: bright(status.info),
    brightMagenta: bright(syntax.keyword),
    brightCyan: bright(syntax.type),
    brightWhite: fg.text,
  };
  return { ...base, ...era.ansi };
}
