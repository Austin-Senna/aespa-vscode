// Custom: `</>` with a tall forward slash set clear of two compact chevrons.
// Differs from `html` (bare `< >`) and `folder-src` by the slash; all gaps >= 2 units.
import { mirrorX, polygon, union } from "../shapes.js";
import type { Glyph } from "../types.js";

// Chevron: tip on the left edge, arms rising to y 6..14, horizontal thickness TH.
const TIP = 0.8;
const RUN = 2.75;
const RISE = 4;
const TH = 2.3;
// Slash: centered on (10, 10), spans y 3..17, leaning HALF_RUN each way, horizontal thickness TS.
const HALF_RUN = 1.75;
const TS = 2.3;

const chevron = polygon([
  [TIP + RUN, 10 - RISE],
  [TIP, 10],
  [TIP + RUN, 10 + RISE],
  [TIP + RUN + TH, 10 + RISE],
  [TIP + TH, 10],
  [TIP + RUN + TH, 10 - RISE],
]);

const slash = polygon([
  [10 + HALF_RUN - TS / 2, 3],
  [10 + HALF_RUN + TS / 2, 3],
  [10 - HALF_RUN + TS / 2, 17],
  [10 - HALF_RUN - TS / 2, 17],
]);

export const GLYPH: Glyph = {
  id: "xml",
  source: "custom",
  d: union(chevron, slash, mirrorX(chevron)),
};
