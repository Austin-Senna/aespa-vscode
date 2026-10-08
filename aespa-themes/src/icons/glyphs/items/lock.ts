// Custom padlock built from shapes.ts. Drawn heavy so the shackle gap and
// keyhole survive the 16 px folder cutout (about 0.35 px per unit there).
import { arcBand, rect, roundRect, union } from "../shapes.js";
import type { Glyph } from "../types.js";

const f = (n: number) => Number(n.toFixed(3)).toString();

/** A keyhole (round top, straight slot) as one counter-clockwise subpath, so it cuts a hole under nonzero. */
function keyhole(cx: number, cy: number, r: number, slotHalf: number, bottom: number): string {
  const k = Math.sqrt(r * r - slotHalf * slotHalf);
  const y = cy + k;
  return `M${f(cx + slotHalf)} ${f(bottom)}V${f(y)}A${f(r)} ${f(r)} 0 1 0 ${f(cx - slotHalf)} ${f(y)}V${f(bottom)}Z`;
}

// Shackle: 2.5-unit wall, 4.8-unit gap, legs dropping into the body.
const SHACKLE_CY = 7.2;
const SHACKLE_OUTER = 4.9;
const SHACKLE_INNER = 2.4;

export const GLYPH: Glyph = {
  id: "lock",
  source: "custom",
  d: union(
    arcBand(10, SHACKLE_CY, SHACKLE_OUTER, SHACKLE_INNER, 180, 360),
    rect(10 - SHACKLE_OUTER, SHACKLE_CY, SHACKLE_OUTER - SHACKLE_INNER, 2.3),
    rect(10 + SHACKLE_INNER, SHACKLE_CY, SHACKLE_OUTER - SHACKLE_INNER, 2.3),
    roundRect(3, 8.5, 14, 10.5, 1.6),
    keyhole(10, 12.6, 1.9, 1.3, 16.6),
  ),
};
