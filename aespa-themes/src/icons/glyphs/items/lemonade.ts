// Whole lemon with a leaf for the LEMONADE era (2026): a tilted ellipse with a nub at
// each end, unioned under nonzero, and a detached lens leaf over the stem. Built with
// shapes.ts helpers (ellipse + circle nubs, transform), path baked in. Reads at 16 px on
// the file chip and as a 14-unit folder cutout; a citrus slice did not (ring + 4 wedges
// read as a crosshair at that size).
import type { Glyph } from "../types.js";

export const GLYPH: Glyph = {
  id: "lemonade",
  source: "custom:lemon-leaf",
  d: "M3.215 14.369A5.32 7.22 70 1 1 16.785 9.431 5.32 7.22 70 1 1 3.215 14.369ZM1.876 14.857A1.71 1.71 0 1 1 5.09 13.687 1.71 1.71 0 1 1 1.876 14.857ZM14.91 10.113A1.71 1.71 0 1 1 18.124 8.943 1.71 1.71 0 1 1 14.91 10.113ZM13.9 4.3Q12.196 0.002 7.6 0.5Q9.304 4.798 13.9 4.3Z",
};
