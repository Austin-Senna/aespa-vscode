// Whiplash era motif (2024): one bold lightning bolt. Edit freely.
import { polygon } from "../shapes.js";
import type { Glyph } from "../types.js";

/** Thick bolt: a wide upper arm, a notch, and a tapered lower strike. */
const BOLT = polygon([
  [9, 0.5],
  [15.5, 0.5],
  [11.8, 8.2],
  [17, 8.2],
  [4.5, 19.5],
  [8.4, 11.8],
  [3, 11.8],
]);

export const GLYPH: Glyph = {
  id: "whiplash",
  source: "custom: bold lightning bolt",
  d: BOLT,
};
