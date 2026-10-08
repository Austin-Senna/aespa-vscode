// Custom: two interlocking gears, built from shapes.ts at module load.
// Deliberately bolder and busier than the tsconfig mark (one plain gear).
import { circle, orientCw, polygon, union } from "../shapes.js";
import type { Point } from "../shapes.js";
import type { Glyph } from "../types.js";

interface GearSpec {
  cx: number;
  cy: number;
  /** Radius of the solid body (tooth roots). */
  body: number;
  /** Radius at tooth tips. */
  outer: number;
  /** Radius of the center hole; 0 for solid. */
  hole: number;
  teeth: number;
  /** Half-width of a tooth at its root and tip, in box units. */
  rootHalf: number;
  tipHalf: number;
  /** Angle of the first tooth, degrees, screen orientation. */
  rotation: number;
}

function gear(s: GearSpec): string {
  const parts: string[] = [circle(s.cx, s.cy, s.body)];
  for (let i = 0; i < s.teeth; i++) {
    const a = ((s.rotation + (360 / s.teeth) * i) * Math.PI) / 180;
    const ux = Math.cos(a);
    const uy = Math.sin(a);
    const px = -uy;
    const py = ux;
    // Start the tooth a little inside the body so the union has no seam.
    const r0 = s.body - 0.4;
    const r1 = s.outer;
    const pts: Point[] = [
      [s.cx + ux * r0 + px * s.rootHalf, s.cy + uy * r0 + py * s.rootHalf],
      [s.cx + ux * r1 + px * s.tipHalf, s.cy + uy * r1 + py * s.tipHalf],
      [s.cx + ux * r1 - px * s.tipHalf, s.cy + uy * r1 - py * s.tipHalf],
      [s.cx + ux * r0 - px * s.rootHalf, s.cy + uy * r0 - py * s.rootHalf],
    ];
    parts.push(polygon(orientCw(pts)));
  }
  if (s.hole > 0) {
    parts.push(circle(s.cx, s.cy, s.hole, { hole: true }));
  }
  return union(...parts);
}

const big = gear({
  cx: 12.4,
  cy: 12.4,
  body: 5.0,
  outer: 6.6,
  hole: 2.1,
  teeth: 8,
  rootHalf: 1.35,
  tipHalf: 1.0,
  rotation: 0,
});

const small = gear({
  cx: 5.5,
  cy: 5.5,
  body: 3.2,
  outer: 4.5,
  hole: 1.1,
  teeth: 6,
  rootHalf: 1.3,
  tipHalf: 1.0,
  rotation: 15,
});

export const GLYPH: Glyph = {
  id: "rs",
  source: "custom",
  d: union(big, small),
};
