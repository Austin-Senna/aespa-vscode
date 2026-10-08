import { AE_GLYPH } from "./ae.js";
import { GLYPHS as FILES_A } from "./files-a.js";
import { GLYPHS as FILES_B } from "./files-b.js";
import { GLYPHS as FOLDERS } from "./folders.js";
import { ITEMS } from "./items/index.js";
import { GLYPHS as MOTIFS } from "./motifs.js";
import type { Glyph } from "./types.js";

export type { Glyph } from "./types.js";

/** Module glyphs first, then per-icon items, which override by id. */
const BY_ID = new Map<string, Glyph>();
for (const g of [AE_GLYPH, ...MOTIFS, ...FILES_A, ...FILES_B, ...FOLDERS, ...ITEMS]) {
  BY_ID.set(g.id, g);
}

export const GLYPHS: readonly Glyph[] = [...BY_ID.values()];

export function glyphFor(id: string): Glyph | undefined {
  return BY_ID.get(id);
}
