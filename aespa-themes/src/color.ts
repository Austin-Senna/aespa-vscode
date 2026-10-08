/** Small color helpers: hex parsing, alpha, mixing and WCAG contrast. */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

const HEX_RE = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

export function isHex(value: string): boolean {
  return HEX_RE.test(value);
}

/** Expand any valid hex form to lowercase #rrggbb, dropping alpha. */
export function normalize(hex: string): string {
  if (!isHex(hex)) {
    throw new Error(`Not a hex color: ${hex}`);
  }
  const body = hex.slice(1);
  if (body.length === 3 || body.length === 4) {
    const [r, g, b] = body;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return `#${body.slice(0, 6)}`.toLowerCase();
}

export function toRgb(hex: string): Rgb {
  const n = normalize(hex);
  return {
    r: parseInt(n.slice(1, 3), 16),
    g: parseInt(n.slice(3, 5), 16),
    b: parseInt(n.slice(5, 7), 16),
  };
}

export function fromRgb({ r, g, b }: Rgb): string {
  const part = (v: number) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0");
  return `#${part(r)}${part(g)}${part(b)}`;
}

/** Append an alpha channel (0..1) as #rrggbbaa. */
export function alpha(hex: string, a: number): string {
  const byte = Math.round(Math.min(1, Math.max(0, a)) * 255).toString(16).padStart(2, "0");
  return `${normalize(hex)}${byte}`;
}

/** Linear mix in sRGB: t=0 returns a, t=1 returns b. */
export function mix(a: string, b: string, t: number): string {
  const x = toRgb(a);
  const y = toRgb(b);
  return fromRgb({
    r: x.r + (y.r - x.r) * t,
    g: x.g + (y.g - x.g) * t,
    b: x.b + (y.b - x.b) * t,
  });
}

export function lighten(hex: string, t: number): string {
  return mix(hex, "#ffffff", t);
}

export function darken(hex: string, t: number): string {
  return mix(hex, "#000000", t);
}

function channel(v: number): number {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** WCAG 2.x relative luminance. */
export function luminance(hex: string): number {
  const { r, g, b } = toRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** WCAG contrast ratio, always >= 1. */
export function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** Whichever candidate reads best on `fill`. */
export function readableOn(fill: string, candidates: readonly string[]): string {
  return candidates.reduce((best, c) => (contrast(c, fill) > contrast(best, fill) ? c : best));
}

function apcaY(hex: string): number {
  const { r, g, b } = toRgb(hex);
  const y = 0.2126729 * Math.pow(r / 255, 2.4) + 0.7151522 * Math.pow(g / 255, 2.4) + 0.072175 * Math.pow(b / 255, 2.4);
  return y < 0.022 ? y + Math.pow(0.022 - y, 1.414) : y;
}

/**
 * APCA-W3 0.0.98G lightness contrast. Positive for dark text on light,
 * negative for light text on dark. |Lc| 60 is the floor for content text,
 * 75 for body text, 45 for large or secondary text.
 */
export function apca(text: string, bg: string): number {
  const yt = apcaY(text);
  const yb = apcaY(bg);
  if (yb > yt) {
    const s = (Math.pow(yb, 0.56) - Math.pow(yt, 0.57)) * 1.14;
    return s < 0.1 ? 0 : (s - 0.027) * 100;
  }
  const s = (Math.pow(yb, 0.65) - Math.pow(yt, 0.62)) * 1.14;
  return s > -0.1 ? 0 : (s + 0.027) * 100;
}
