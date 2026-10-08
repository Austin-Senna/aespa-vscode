// Custom: a bold four-point sparkle with a small companion, built from shapes.ts.
import { star, union } from "../shapes.js";
import type { Glyph } from "../types.js";

/** Big sparkle low-left with fat arms; small sparkle high-right. Chunkier than the era "sparkle" motif. */
export const GLYPH: Glyph = {
  id: "claude",
  source: "custom",
  d: union(
    star(8.5, 11.3, 4, 8.3, 3.4),
    star(16, 4, 4, 3.6, 1.3),
  ),
};
