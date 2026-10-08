// husky (git hooks: pre-commit, commit-msg, lefthook, commitlint): a bold
// J-shaped hook with a barbed tip. Built from shapes.ts; no logo, fill only.
import { arcBand, circle, polygon, rect, union } from "../shapes.js";
import type { Glyph } from "../types.js";

const W = 2.8; // stroke thickness
const CX = 9.8; // bend center x
const CY = 11.2; // bend center y
const R = 4; // bend centerline radius

// Shank: straight run from the knob at the top down to the bend.
const shank = rect(CX + R - W / 2, 2.4, W, CY - 2.4);
// Knob at the top of the shank (where the line would tie on).
const knob = circle(CX + R, 2.4, W / 2 + 0.3);
// Bend: half ring from the shank around the bottom to the tip.
const bend = arcBand(CX, CY, R + W / 2, R - W / 2, 0, 180);
// Tip: short rise on the left, ending in a pointed barb.
const tip = rect(CX - R - W / 2, 8.6, W, CY - 8.6);
const barb = polygon([[CX - R - 2.5, 9.2], [CX - R, 4.2], [CX - R + 3, 9.2]]);

export const GLYPH: Glyph = {
  id: "husky",
  source: "custom: barbed J-hook",
  d: union(shank, knob, bend, tip, barb),
};
