// Custom branch graph built with ../shapes.ts. Two commits on a trunk and a
// third branched off top-right, rejoining the trunk mid-way. Sized for 16 px:
// node diameter 6 units, connectors 2.5 units wide, no holes.
import { circle, stroke, union, type Point } from "../shapes.js";
import type { Glyph } from "../types.js";

const NODE_R = 3;
const LINE_W = 2.5;

const TRUNK_X = 5;
const TOP_Y = 4.5;
const BOTTOM_Y = 15.5;
const BRANCH: Point = [15, 4.5];
const JOIN: Point = [TRUNK_X, 10.5];

/** Sample a quadratic Bezier into a polyline so `stroke` can outline it. */
function quadratic(p0: Point, c: Point, p1: Point, steps: number): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;
    pts.push([
      mt * mt * p0[0] + 2 * mt * t * c[0] + t * t * p1[0],
      mt * mt * p0[1] + 2 * mt * t * c[1] + t * t * p1[1],
    ]);
  }
  return pts;
}

// Leaves the branch node straight down, then sweeps left into the trunk.
const curve = quadratic(BRANCH, [BRANCH[0], JOIN[1]], JOIN, 14);

export const GLYPH: Glyph = {
  id: "git",
  d: union(
    stroke([[TRUNK_X, TOP_Y], [TRUNK_X, BOTTOM_Y]], LINE_W),
    stroke(curve, LINE_W),
    circle(TRUNK_X, TOP_Y, NODE_R),
    circle(TRUNK_X, BOTTOM_Y, NODE_R),
    circle(BRANCH[0], BRANCH[1], NODE_R),
  ),
};
