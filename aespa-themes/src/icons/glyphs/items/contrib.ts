// Custom pair of person silhouettes built with ../shapes.ts, for CONTRIBUTING,
// CODE_OF_CONDUCT, AUTHORS, MAINTAINERS. Two equal figures side by side rather
// than overlapped: an overlapped back figure degrades to a sliver at 16 px.
// Heads are 6.4 units across, the gap between figures 2 units, so both survive
// the 16 px file icon and still read as a cluster in the folder cutout.
import { circle, union } from "../shapes.js";
import type { Glyph } from "../types.js";

const f = (n: number) => Number(n.toFixed(3)).toString();

const HEAD_R = 3.2;
const HEAD_CY = 4.6;
const BODY_W = 8;
const BODY_TOP = 9.2;
const BODY_BOTTOM = 18.6;

/** Torso: flat bottom, semicircular shoulders. Wound clockwise on screen. */
function torso(cx: number): string {
  const r = BODY_W / 2;
  const left = cx - r;
  const right = cx + r;
  return `M${f(left)} ${f(BODY_BOTTOM)}V${f(BODY_TOP + r)}A${f(r)} ${f(r)} 0 0 1 ${f(right)} ${f(BODY_TOP + r)}V${f(BODY_BOTTOM)}Z`;
}

function person(cx: number): string {
  return union(circle(cx, HEAD_CY, HEAD_R), torso(cx));
}

export const GLYPH: Glyph = {
  id: "contrib",
  source: "custom",
  d: union(person(5), person(15)),
};
