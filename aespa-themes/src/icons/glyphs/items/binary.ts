// Custom: a bold "10" built from blocks. The "1" is a heavy bar with a
// slanted flag; the "0" is a rounded ring with a wide counter, so both
// digits survive 16 px and the folder cutout. Deliberately not a grid
// (csv owns the 3x3 table).
import { polygon, rect, roundRect, union } from "../shapes.js";
import type { Glyph } from "../types.js";

const TOP = 3;
const BOTTOM = 17;

// "1": bar plus flag hanging off the top-left.
const ONE_X = 2.6;
const ONE_W = 3.2;

// "0": outer rounded rect and a rounded counter.
const ZERO_X = 8.2;
const ZERO_W = 10.8;
const WALL = 3;

export const GLYPH: Glyph = {
  id: "binary",
  source: "custom",
  d: union(
    rect(ONE_X, TOP, ONE_W, BOTTOM - TOP),
    polygon([[ONE_X, TOP], [ONE_X, TOP + 5.2], [0.6, TOP + 5.2], [0.6, TOP + 2.4]]),
    roundRect(ZERO_X, TOP, ZERO_W, BOTTOM - TOP, 3.8),
    roundRect(ZERO_X + WALL, TOP + WALL, ZERO_W - 2 * WALL, BOTTOM - TOP - 2 * WALL, 1.6, { hole: true }),
  ),
};
