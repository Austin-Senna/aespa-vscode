// Custom: two upright book spines and one leaning book (a shelf), bold enough to cut out of a folder.
// Built with shapes.ts: rect(0.5,3.5,4,15.5) + rect(7,0.8,4,18.2) + rect(13.2,7.5,4,11.5) rotated 14deg about (13.2,19).
import type { Glyph } from "../types.js";

export const GLYPH: Glyph = {
  id: "folder-lib",
  source: "custom",
  d: "M0.5 3.5L4.5 3.5L4.5 19L0.5 19ZM7 0.8L11 0.8L11 19L7 19ZM15.982 7.842L19.863 8.809 17.081 19.968 13.2 19Z",
};
