// Custom: a globe reduced to its silhouette. Disc r=9 at (10,10) split into
// four pieces by a 3.6-unit equator gap and a 3-unit meridian gap, so it stays
// a disc with one equator and one meridian when cut out of a folder at 16 px.
import type { Glyph } from "../types.js";

export const GLYPH: Glyph = {
  id: "folder-public",
  source: "custom:globe-quartered",
  d: "M11.5 8.2L18.818 8.2A9 9 0 0 0 11.5 1.126ZM11.5 11.8L18.818 11.8A9 9 0 0 1 11.5 18.874ZM8.5 11.8L1.182 11.8A9 9 0 0 0 8.5 18.874ZM8.5 8.2L1.182 8.2A9 9 0 0 1 8.5 1.126Z",
};
