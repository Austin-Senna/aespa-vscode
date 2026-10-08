// Custom paint roller built with ../shapes.ts: "make it pretty". A solid
// rounded sleeve with a bracket handle that drops to a grip. Sized for 16 px:
// sleeve 6.5 units tall, handle 2.6 units wide, no holes. Deliberately not a
// checkmark so it stays distinct from the lint icon.
import { roundRect, stroke, union, type Point } from "../shapes.js";
import type { Glyph } from "../types.js";

const HANDLE_W = 2.6;

// Sleeve: x 1..13.5, y 2..8.5.
const SLEEVE = roundRect(1, 2, 12.5, 6.5, 1.8);

// Handle leaves the sleeve's right edge at mid-height, drops, crosses back
// under the sleeve, then the grip runs straight down.
const HANDLE: Point[] = [
  [12.5, 5.25],
  [17, 5.25],
  [17, 12],
  [10, 12],
  [10, 18.7],
];

export const GLYPH: Glyph = {
  id: "format",
  d: union(SLEEVE, stroke(HANDLE, HANDLE_W)),
};
