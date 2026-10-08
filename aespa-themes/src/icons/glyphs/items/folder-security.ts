// Custom padlock built from shapes.ts. A shield would echo `env`; the lock is the
// one security mark that survives being cut out of a folder at 16 px.
import { arcBand, rect, union } from "../shapes.js";
import type { Glyph } from "../types.js";

/**
 * Padlock: a solid body with a 3-unit-thick shackle arching over it. The
 * shackle opening is 6 x 5 units so it still reads as a hole at 16 px.
 */
export const GLYPH: Glyph = {
  id: "folder-security",
  source: "custom:padlock",
  d: union(
    // Shackle: half ring centered 2 units above the body, legs sunk into it.
    arcBand(10, 8, 6, 3, 180, 360),
    rect(4, 8, 3, 2.5),
    rect(13, 8, 3, 2.5),
    // Body.
    rect(2, 10, 16, 9),
  ),
};
