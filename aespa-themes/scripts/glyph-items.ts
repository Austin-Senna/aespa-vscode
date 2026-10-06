/** Load every per-icon glyph under src/icons/glyphs/items (one file per icon, exporting GLYPH). */
import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { Glyph } from "../src/icons/glyphs/types.js";

export async function loadItems(): Promise<Glyph[]> {
  const dir = resolve(import.meta.dirname, "../src/icons/glyphs/items");
  const out: Glyph[] = [];
  for (const f of readdirSync(dir).filter((n) => n.endsWith(".ts") && n !== "index.ts").sort()) {
    const mod = (await import(pathToFileURL(resolve(dir, f)).href)) as { GLYPH?: Glyph };
    if (mod.GLYPH) {
      out.push(mod.GLYPH);
    }
  }
  return out;
}
