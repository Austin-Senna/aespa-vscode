// Windows batch (.bat/.cmd): a hollow window frame with a solid title bar and a
// solid chevron prompt inside. Built from shapes.ts; no logo, fill only.
import { rect, roundRect, stroke, union } from "../shapes.js";
import type { Glyph } from "../types.js";

// Frame: 2-unit walls, 3-unit title bar, rounded outer corners.
const frame = union(roundRect(1, 2, 18, 16, 2), rect(3, 5, 14, 11, { hole: true }));
// Prompt chevron ">" centered in the client area.
const chevron = stroke([[8, 7.5], [12, 10.5], [8, 13.5]], 2.2, { cap: "round" });

export const GLYPH: Glyph = {
  id: "bat",
  source: "custom: window frame + chevron",
  d: union(frame, chevron),
};
