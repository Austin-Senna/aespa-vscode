// KISS N TELL era motif: wide lips with an open mouth line. Hand-built from sampled curves.
import { orientCw, polygon, union, type Point } from "../shapes.js";
import type { Glyph } from "../types.js";

const CX = 10;
/** Mouth line y: the mark spans roughly 4.8..16, so sit it a touch above center. */
const CY = 9.6;
const HALF_W = 9;
/** Half the mouth gap at center; the gap stays >= 2 units for |u| < 0.78. */
const GAP = 1.6;
const STEPS = 48;

/** Lens-shaped mouth line: half-gap at normalized x in -1..1. */
const lens = (u: number) => GAP * Math.sqrt(Math.max(0, 1 - u * u));

/** Upper lip top edge height above the mouth line, with a cupid's bow dip at center. */
const upperHeight = (u: number) => 6.6 * Math.sqrt(Math.max(0, 1 - u * u)) * (1 - 0.42 * Math.exp(-((u / 0.32) ** 2)));

/** Lower lip bottom edge depth below the mouth line, fuller than the upper lip. */
const lowerDepth = (u: number) => 6 * Math.sqrt(Math.max(0, 1 - u * u)) ** 0.85;

function sample(fn: (u: number) => number, reverse = false): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const u = -1 + (2 * i) / STEPS;
    pts.push([CX + u * HALF_W, fn(u)]);
  }
  return reverse ? pts.reverse() : pts;
}

const upperLip = polygon(orientCw([
  ...sample((u) => CY - upperHeight(u)),
  ...sample((u) => CY - lens(u), true),
]));

const lowerLip = polygon(orientCw([
  ...sample((u) => CY + lens(u)),
  ...sample((u) => CY + lowerDepth(u), true),
]));

export const GLYPH: Glyph = {
  id: "kiss-n-tell",
  d: union(upperLip, lowerLip),
};
