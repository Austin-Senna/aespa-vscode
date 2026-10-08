// Custom zip box built from shapes.ts: a wide lid, a gap, then the body with a
// zipper of three wide teeth punched down the middle. Drawn heavy so the lid
// gap and the gaps between teeth survive 16 px (about 0.8 px per unit).
import { rect, roundRect, union } from "../shapes.js";
import type { Glyph } from "../types.js";

const LID_TOP = 1;
const LID_H = 2.6;
const BODY_TOP = 5;
const BODY_BOTTOM = 19;

const TOOTH_W = 3.6;
const TOOTH_H = 2.6;
const TOOTH_GAP = 1.6;
const TEETH = 3;

const zipperH = TEETH * TOOTH_H + (TEETH - 1) * TOOTH_GAP;
const zipperTop = BODY_TOP + (BODY_BOTTOM - BODY_TOP - zipperH) / 2;
const teeth = Array.from({ length: TEETH }, (_, i) =>
  rect(10 - TOOTH_W / 2, zipperTop + i * (TOOTH_H + TOOTH_GAP), TOOTH_W, TOOTH_H, { hole: true }),
);

export const GLYPH: Glyph = {
  id: "archive",
  source: "custom:zip-box",
  d: union(
    roundRect(1, LID_TOP, 18, LID_H, 0.8),
    roundRect(2, BODY_TOP, 16, BODY_BOTTOM - BODY_TOP, 1.2),
    ...teeth,
  ),
};
