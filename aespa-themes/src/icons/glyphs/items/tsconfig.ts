// Composed with src/icons/glyphs/shapes.ts: one bold six-tooth gear with a
// hollow center, set inside square brackets to say "config".
import type { Glyph } from "../types.js";
import { circle, rect, roundRect, transform, union } from "../shapes.js";

const CX = 10;
const CY = 10;
const TEETH = 6;
const BODY_R = 4.8;
const TOOTH_REACH = 6.6;
const TOOTH_W = 2.5;
const HOLE_R = 2.5;
const BRACKET_T = 2;
const BRACKET_X = 0.8;
const SERIF_W = 3.8;

/** One tooth, pointing straight up, then rotated into place about the center. */
function tooth(index: number): string {
  const top = CY - TOOTH_REACH;
  const d = roundRect(CX - TOOTH_W / 2, top, TOOTH_W, TOOTH_REACH - BODY_R + 1.5, 0.5);
  // Teeth at 0, 60, 120... so none points sideways into the bracket bars.
  return transform(d, { rotate: (360 / TEETH) * index });
}

const teeth = Array.from({ length: TEETH }, (_, i) => tooth(i));

const gear = union(circle(CX, CY, BODY_R), ...teeth, circle(CX, CY, HOLE_R, { hole: true }));

const leftBracket = union(
  rect(BRACKET_X, 1, BRACKET_T, 18),
  rect(BRACKET_X, 1, SERIF_W, BRACKET_T),
  rect(BRACKET_X, 17, SERIF_W, BRACKET_T),
);

const rightBracket = union(
  rect(20 - BRACKET_X - BRACKET_T, 1, BRACKET_T, 18),
  rect(20 - BRACKET_X - SERIF_W, 1, SERIF_W, BRACKET_T),
  rect(20 - BRACKET_X - SERIF_W, 17, SERIF_W, BRACKET_T),
);

export const GLYPH: Glyph = {
  id: "tsconfig",
  source: "custom:gear-in-brackets",
  d: union(gear, leftBracket, rightBracket),
};
