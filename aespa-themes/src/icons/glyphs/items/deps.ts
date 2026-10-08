// Custom chain links built from ../shapes.ts: "dependencies kept up to date"
// (renovate.json, dependabot.yml). Two stadium-shaped links overlapping along
// a 45 degree diagonal. Drawn heavy for 16 px: 2.5-unit walls, 3-unit open
// centers. Deliberately not a cube (npm) or a box with a bow (bundler).
import { roundRect, transform, union } from "../shapes.js";
import type { Glyph } from "../types.js";

const LINK_LEN = 11.2;
const LINK_W = 8;
const WALL = 2.5;
// How far the two links slide into each other along the chain axis.
const OVERLAP = 4.4;

/** One stadium ring centered at (cx, cy), long axis horizontal. */
function link(cx: number, cy: number): string {
  const outer = roundRect(cx - LINK_LEN / 2, cy - LINK_W / 2, LINK_LEN, LINK_W, LINK_W / 2);
  const innerW = LINK_W - 2 * WALL;
  const inner = roundRect(cx - LINK_LEN / 2 + WALL, cy - innerW / 2, LINK_LEN - 2 * WALL, innerW, innerW / 2, { hole: true });
  return union(outer, inner);
}

const SHIFT = (LINK_LEN - OVERLAP) / 2;
const CHAIN = union(link(10 - SHIFT, 10), link(10 + SHIFT, 10));

export const GLYPH: Glyph = {
  id: "deps",
  source: "custom",
  d: transform(CHAIN, { rotate: -45 }),
};
