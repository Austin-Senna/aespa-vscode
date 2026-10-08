// Custom mark: two overlapping speech bubbles, built from ../shapes.ts.
// Cut out of a solid folder, so the silhouette is heavy: front bubble solid,
// back bubble reduced to an L of 3.5+ units behind a 2.5 unit gap, each with
// its own tail so the pair still reads as "two voices" at 16 px.
import type { Glyph } from "../types.js";
import { polygon, roundRect, union } from "../shapes.js";

// Back bubble, top-left: rounded top corners, notched where the front bubble
// (plus gap) covers it, tail hanging bottom-left.
const back = "M2 0.5H12Q13.5 0.5 13.5 2V4.5H4V10.5H3.5L1 13.5L0.5 10.5V2Q0.5 0.5 2 0.5Z";

// Front bubble, bottom-right, with a tail pointing down-right.
const front = union(
  roundRect(6.5, 7, 13, 10, 1.5),
  polygon([[13.5, 16.5], [17.5, 16.5], [17.5, 19.5]]),
);

export const GLYPH: Glyph = {
  id: "folder-i18n",
  source: "custom: two speech bubbles",
  d: union(back, front),
};
