// Docker (Dockerfile, docker-compose.yml, .dockerignore): a shipping
// container built from ../shapes.ts. A wide, low rounded box with two
// horizontal slats cut out, drawn heavy so the slats survive 16 px
// (0.8 px per unit bare, about 0.35 px per unit in the folder cutout).
// Wide-and-low with horizontal cuts keeps it apart from npm (cube) and
// archive (tall lidded box with zipper). No logo, fill only.
import { rect, roundRect, union } from "../shapes.js";
import type { Glyph } from "../types.js";

const BOX_X = 1;
const BOX_Y = 3.4;
const BOX_W = 18;
const BOX_H = 13.2;
const BOX_R = 1.4;

// Slats: 2.4 units tall, 2.6 apart, inset 2.6 from each wall.
const SLAT_INSET = 2.6;
const SLAT_H = 2.4;
const SLAT_GAP = 2.6;
const SLAT_TOP = BOX_Y + (BOX_H - (2 * SLAT_H + SLAT_GAP)) / 2;

function slat(index: number): string {
  const y = SLAT_TOP + index * (SLAT_H + SLAT_GAP);
  return rect(BOX_X + SLAT_INSET, y, BOX_W - 2 * SLAT_INSET, SLAT_H, { hole: true });
}

export const GLYPH: Glyph = {
  id: "docker",
  source: "custom: shipping container with two horizontal slats",
  d: union(roundRect(BOX_X, BOX_Y, BOX_W, BOX_H, BOX_R), slat(0), slat(1)),
};
