/** OKLab / OKLCH conversions (Björn Ottosson) with sRGB gamut clamping by chroma reduction. */
import { fromRgb, toRgb } from "./color.js";

export interface Oklch {
  /** Lightness 0..1 */
  l: number;
  /** Chroma 0..~0.37 */
  c: number;
  /** Hue in degrees 0..360 */
  h: number;
}

function srgbToLinear(v: number): number {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(v: number): number {
  const c = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  return c * 255;
}

export function hexToOklch(hex: string): Oklch {
  const { r, g, b } = toRgb(hex);
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const c = Math.sqrt(a * a + bb * bb);
  let h = (Math.atan2(bb, a) * 180) / Math.PI;
  if (h < 0) {
    h += 360;
  }
  return { l: L, c, h: c < 1e-6 ? 0 : h };
}

function oklchToLinearRgb({ l, c, h }: Oklch): [number, number, number] {
  const hr = (h * Math.PI) / 180;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;
  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;
  return [
    4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  ];
}

function inGamut(rgb: [number, number, number]): boolean {
  const eps = 1e-4;
  return rgb.every((v) => v >= -eps && v <= 1 + eps);
}

/**
 * Convert OKLCH to hex. If the color is outside sRGB, chroma is reduced
 * (binary search) until it fits, keeping lightness and hue.
 */
export function oklchToHex(color: Oklch): string {
  const l = Math.min(1, Math.max(0, color.l));
  let lo = 0;
  let hi = color.c;
  let rgb = oklchToLinearRgb({ l, c: hi, h: color.h });
  if (!inGamut(rgb)) {
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      rgb = oklchToLinearRgb({ l, c: mid, h: color.h });
      if (inGamut(rgb)) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    rgb = oklchToLinearRgb({ l, c: lo, h: color.h });
  }
  return fromRgb({
    r: linearToSrgb(Math.min(1, Math.max(0, rgb[0]))),
    g: linearToSrgb(Math.min(1, Math.max(0, rgb[1]))),
    b: linearToSrgb(Math.min(1, Math.max(0, rgb[2]))),
  });
}

/** Shorthand: build a hex from OKLCH numbers. */
export function oklch(l: number, c: number, h: number): string {
  return oklchToHex({ l, c, h });
}

/** Maximum chroma at this lightness and hue that still fits in sRGB. */
export function maxChroma(l: number, h: number): number {
  return hexToOklch(oklchToHex({ l, c: 0.4, h })).c;
}
