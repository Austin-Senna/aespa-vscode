// Black Mamba era motif: a long serpent seen from above, winding up the box
// in an open S from a thin tail at the bottom left to a broad wedge head at
// the top right. Built with ../shapes.ts; kept apart from the Python icon
// (mdi:snake, a tight side-profile coil with a raised head) by being an open
// sinuous line with the mass in the head. Sized for the folder cutout
// (7 px at 16 px): body 4 units thick at the neck, head 6.4 units wide; the
// eye and tongue only show from 24 px up.
import { circle, stroke, union, type Point } from "../shapes.js";
import type { Glyph } from "../types.js";

/** Catmull-Rom spline through `points`, `steps` samples per span, so a short polyline strokes smoothly. */
function smooth(points: Point[], steps: number): Point[] {
  const out: Point[] = [points[0]];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push([
        0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
      ]);
    }
  }
  return out;
}

/** Stroke a polyline whose width grows linearly from `w0` at the start to `w1` at the end. */
function taperedStroke(points: Point[], w0: number, w1: number): string {
  const parts: string[] = [];
  const n = points.length - 1;
  for (let i = 0; i < n; i++) {
    const w = w0 + ((w1 - w0) * (i + 0.5)) / n;
    parts.push(stroke([points[i], points[i + 1]], w));
  }
  return parts.join("");
}

// Spine from tail tip to the base of the head.
const SPINE: Point[] = [
  [2.2, 16.4], [5, 18.3], [9, 17.8], [11.5, 15], [11.4, 11.8],
  [8.4, 9.6], [6, 7.6], [6.4, 4.6], [8.6, 3.4], [10.8, 3.4],
];
const TAIL_W = 1.8;
const NECK_W = 4;

// Wedge head pointing right, rounded snout.
const HEAD = "M10.4 0.6C14.2 0 17.7 1.3 18.8 3.4C17.7 5.5 14.2 6.8 10.4 6.2Z";
const EYE: Point = [14.4, 2.5];
const EYE_R = 0.9;

// Forked tongue flicking out of the snout.
const TONGUE = union(
  stroke([[18.5, 3.4], [19.3, 3.4]], 0.7),
  stroke([[19.1, 3.4], [19.7, 2.8]], 0.6),
  stroke([[19.1, 3.4], [19.7, 4]], 0.6),
);

export const GLYPH: Glyph = {
  id: "black-mamba",
  d: union(
    taperedStroke(smooth(SPINE, 4), TAIL_W, NECK_W),
    HEAD,
    circle(EYE[0], EYE[1], EYE_R, { hole: true }),
    TONGUE,
  ),
};
