// Custom shape built with src/icons/glyphs/shapes.ts: a solid terminal window
// (rounded rect with a title-bar slot) with a ">_" prompt cut out of the body.
// Differs from `sh` (bare prompt, no window) and `bat` (window frame, solid prompt).
import type { Glyph } from "../types.js";

export const GLYPH: Glyph = {
  id: "ps1",
  source: "custom",
  d: "M3.5 1.5H16.5A2.5 2.5 0 0 1 19 4V16A2.5 2.5 0 0 1 16.5 18.5H3.5A2.5 2.5 0 0 1 1 16V4A2.5 2.5 0 0 1 3.5 1.5ZM1 7L19 7L19 5.4L1 5.4ZM7 12.9L4.2 15.5L6.1 17.2L10.6 12.9L6.1 8.6L4.2 10.3ZM11.2 17L16.4 17L16.4 14.9L11.2 14.9Z",
};
