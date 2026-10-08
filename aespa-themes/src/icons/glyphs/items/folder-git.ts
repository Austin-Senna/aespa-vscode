// Custom branch graph for .github / .gitlab / .husky / workflows folders.
// Three solid nodes on a thick trunk; the whole mark is cut out of the folder
// at about 7 px, so nothing here is thinner than 3.8 units.
import { circle, stroke, union } from "../shapes.js";
import type { Glyph } from "../types.js";

const R = 3.8;
const W = 4;
const TOP: [number, number] = [5, 4.5];
const BOTTOM: [number, number] = [5, 15.5];
const SIDE: [number, number] = [15.5, 6];

export const GLYPH: Glyph = {
  id: "folder-git",
  source: "custom",
  d: union(
    stroke([BOTTOM, TOP], W),
    stroke([BOTTOM, [9.5, 11.5], SIDE], W),
    circle(TOP[0], TOP[1], R),
    circle(BOTTOM[0], BOTTOM[1], R),
    circle(SIDE[0], SIDE[1], R),
  ),
};
