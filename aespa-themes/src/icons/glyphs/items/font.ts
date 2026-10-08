// Serif capital A, built from polygons (see shapes.ts conventions): flat apex, thin left leg,
// thick right leg, slab serifs on the baseline. Counter is a counter-clockwise hole, 4.8 units
// wide at the crossbar so it stays open at 16 px.
import type { Glyph } from "../types.js";

export const GLYPH: Glyph = {
  id: "font",
  source: "custom:serif-a",
  d: "M8.7 1.5L11.3 1.5L17.495 16.5L19.5 16.5L19.5 18.5L13.5 18.5L13.5 16.5L14.095 16.5L12.98 13.8L6.32 13.8L5.205 16.5L5.7 16.5L5.7 18.5L0.5 18.5L0.5 16.5L2.505 16.5ZM7.27 11.5L12.03 11.5L10 5.737Z",
};
