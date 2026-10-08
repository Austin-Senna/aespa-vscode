// SCSS/Sass: the CSS family hash with a bold tilde wave beside it, the wave
// standing for "preprocessor". Built from shapes.ts; no logo, fill only.
import { type Point, rect, stroke, union } from "../shapes.js";
import type { Glyph } from "../types.js";

// Hash, left half of the box: 2-unit bars, 2-unit gap between the uprights,
// 4-unit gap between the crossbars so nothing merges at 16 px.
const hash = union(
  rect(1.5, 2, 2, 16),
  rect(5.5, 2, 2, 16),
  rect(0.5, 6, 8, 2),
  rect(0.5, 12, 8, 2),
);

// Tilde, right half: one sine period sampled into a polyline and stroked.
const wave: Point[] = [];
for (let i = 0; i <= 12; i++) {
  const u = -0.12 + (1.24 * i) / 12;
  wave.push([10.2 + (9.3 * i) / 12, 10 - 1.7 * Math.sin(2 * Math.PI * u)]);
}
const tilde = stroke(wave, 2.3, { cap: "round" });

export const GLYPH: Glyph = {
  id: "scss",
  source: "custom: hash + tilde wave",
  d: union(hash, tilde),
};
