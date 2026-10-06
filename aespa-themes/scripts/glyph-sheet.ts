/**
 * Render every glyph in one module (or all) at 16 px and 32 px on dark and
 * light backgrounds to preview/glyphs-<module>.png, for eyeballing legibility.
 *
 * Usage: npx tsx scripts/glyph-sheet.ts [motifs|files-a|files-b|folders|all]
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { GLYPHS as FILES_A } from "../src/icons/glyphs/files-a.js";
import { GLYPHS as FILES_B } from "../src/icons/glyphs/files-b.js";
import { GLYPHS as FOLDERS } from "../src/icons/glyphs/folders.js";
import { GLYPHS as MOTIFS } from "../src/icons/glyphs/motifs.js";
import type { Glyph } from "../src/icons/glyphs/types.js";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = resolve(import.meta.dirname, "../preview");
const which = process.argv[2] ?? "all";
const sets: Record<string, Glyph[]> = { motifs: MOTIFS, "files-a": FILES_A, "files-b": FILES_B, folders: FOLDERS };
const glyphs = which === "all" ? Object.values(sets).flat() : (sets[which] ?? []);

function svg(g: Glyph, color: string): string {
  const second = g.d2 ? `<path d="${g.d2}" fill="${color}" opacity="0.45"/>` : "";
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d="${g.d}" fill="${color}"/>${second}</svg>`;
}

function cell(g: Glyph, color: string): string {
  const data = `data:image/svg+xml;utf8,${encodeURIComponent(svg(g, color))}`;
  return `<div class="c"><img class="s16" src="${data}"><img class="s32" src="${data}"><img class="s64" src="${data}"><span>${g.id}</span></div>`;
}

const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;font:11px/1.2 -apple-system,sans-serif;display:grid;grid-template-columns:1fr 1fr}
.pane{padding:12px;display:flex;flex-wrap:wrap;gap:6px 14px;align-content:flex-start}
.dark{background:#1a1726;color:#d8d4e8}.light{background:#f4f0f6;color:#2b2430}
.c{display:flex;align-items:center;gap:6px;width:180px}.s16{width:16px;height:16px}.s32{width:32px;height:32px}.s64{width:48px;height:48px}
</style>
<div class="pane dark">${glyphs.map((g) => cell(g, "#c7b7ff")).join("")}</div>
<div class="pane light">${glyphs.map((g) => cell(g, "#5a3f9e")).join("")}</div>`;

mkdirSync(OUT, { recursive: true });
const htmlPath = resolve(OUT, `glyphs-${which}.html`);
const pngPath = resolve(OUT, `glyphs-${which}.png`);
writeFileSync(htmlPath, html);
const rows = Math.ceil(glyphs.length / 3);
execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2", `--window-size=1300,${Math.max(300, rows * 56 + 40)}`, `--screenshot=${pngPath}`, `file://${htmlPath}`], { stdio: "ignore" });
console.log(`${glyphs.length} glyphs -> ${pngPath}`);
