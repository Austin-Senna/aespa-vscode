// Custom: a bold geometric N inside a thin ring, so it reads as a badge
// rather than a letter label. Built from shapes.ts at module load.
import { polygon, rect, ring, union } from "../shapes.js";
import type { Point } from "../shapes.js";
import type { Glyph } from "../types.js";

/** Ring radii; the N's corners sit just inside the inner edge. */
const OUTER = 9.5;
const INNER = 8.2;
/** Box the N occupies, inside the ring. */
const LEFT = 4.6;
const RIGHT = 15.4;
const TOP = 4.6;
const BOTTOM = 15.4;
/** Stem width, in box units. */
const STEM = 3;
/** Horizontal width of the diagonal; about 3 units measured perpendicular. */
const DIAG = 3.7;

const leftStem = rect(LEFT, TOP, STEM, BOTTOM - TOP);
const rightStem = rect(RIGHT - STEM, TOP, STEM, BOTTOM - TOP);
const diagonalPts: Point[] = [
  [LEFT, TOP],
  [LEFT + DIAG, TOP],
  [RIGHT, BOTTOM],
  [RIGHT - DIAG, BOTTOM],
];
const diagonal = polygon(diagonalPts);

export const GLYPH: Glyph = {
  id: "next",
  source: "custom",
  d: union(ring(10, 10, OUTER, INNER), leftStem, diagonal, rightStem),
};
