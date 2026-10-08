// MY WORLD era motif: a lollipop, built from shapes.ts (no library source).
// Big disc with one continuous two-arm swirl cut out as a single hole, and a
// straight stick. Sized so the swirl survives the 7 px folder cutout.
import { circle, stroke, transform, union } from "../shapes.js";
import type { Glyph } from "../types.js";

const f = (n: number) => Number(n.toFixed(3)).toString();

/**
 * A thick S-shaped band (two arms curling out from the center) as one closed
 * subpath wound as a hole. Each arm is an arc of `sweepDeg` degrees around a
 * center offset `r` from (cx, cy); the band is `width` wide with round tips.
 */
function swirlHole(cx: number, cy: number, r: number, width: number, sweepDeg: number): string {
  const ro = r + width / 2;
  const ri = r - width / 2;
  const cap = width / 2;
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const at = (ox: number, oy: number, radius: number, deg: number) => `${f(ox + radius * Math.cos(rad(deg)))} ${f(oy + radius * Math.sin(rad(deg)))}`;
  const arc = (radius: number, large: 0 | 1, sweep: 0 | 1, to: string) => `A${f(radius)} ${f(radius)} 0 ${large} ${sweep} ${to}`;
  const large = sweepDeg > 180 ? 1 : 0;
  const s1x = cx - r;
  const s2x = cx + r;
  const tip1 = -sweepDeg;
  const tip2 = 180 - sweepDeg;
  return [
    `M${at(s1x, cy, ro, tip1)}`,
    arc(cap, 0, 0, at(s1x, cy, ri, tip1)),
    arc(ri, large, 1, at(s1x, cy, ri, 0)),
    arc(ro, large, 0, at(s2x, cy, ro, tip2)),
    arc(cap, 0, 0, at(s2x, cy, ri, tip2)),
    arc(ri, large, 1, at(s2x, cy, ri, 180)),
    arc(ro, large, 0, at(s1x, cy, ro, tip1)),
    "Z",
  ].join("");
}

const CX = 10;
const CY = 7.4;
const R = 7.4;

export const GLYPH: Glyph = {
  id: "my-world",
  source: "custom lollipop (shapes.ts)",
  d: union(
    circle(CX, CY, R),
    transform(swirlHole(CX, CY, 2.3, 2.7, 200), { rotate: -35, around: [CX, CY] }),
    stroke([[CX, CY + 4], [CX, 18.5]], 2.8),
  ),
};
