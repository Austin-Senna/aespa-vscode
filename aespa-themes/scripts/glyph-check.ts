/**
 * Render one or more glyphs in every context that matters, to preview/check-<id>.png:
 * bare at 16/24/32/64 px on dark and light, as a full-size file mark, and cut out of a folder.
 *
 *   npx tsx scripts/glyph-check.ts py            # one icon
 *   npx tsx scripts/glyph-check.ts py rs git     # several, one PNG each
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { eras } from "../src/eras/index.js";
import { GLYPHS } from "../src/icons/glyphs/index.js";
import type { Glyph } from "../src/icons/glyphs/types.js";
import { fileIcon, folderIcon } from "../src/icons/svg.js";
import { loadItems } from "./glyph-items.js";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = resolve(import.meta.dirname, "../preview");
const ids = process.argv.slice(2);
if (ids.length === 0) {
  console.error("usage: glyph-check.ts <id> [id...]");
  process.exit(2);
}

const items = await loadItems();
const byId = new Map<string, Glyph>();
for (const g of [...GLYPHS, ...items]) {
  byId.set(g.id, g);
}

const dark = eras.find((e) => e.slug === "savage")!;
const light = eras.find((e) => e.slug === "lemonade")!;

function bare(g: Glyph, color: string): string {
  const rule = g.fillRule ? ` fill-rule="${g.fillRule}"` : "";
  const second = g.d2 ? `<path d="${g.d2}" fill="${color}" opacity="0.45"${rule}/>` : "";
  return `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><rect width='20' height='20' fill='none'/><path d="${g.d}" fill="${color}"${rule}/>${second}</svg>`)}`;
}
const data = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

mkdirSync(OUT, { recursive: true });
for (const id of ids) {
  const g = byId.get(id);
  if (!g) {
    console.error(`no glyph with id ${id} (items dir or glyph modules)`);
    continue;
  }
  const rows = [dark, light].map((era) => {
    const bg = era.bg.mantle;
    const fg = era.fg.text;
    const sizes = [16, 24, 32, 64].map((s) => `<img style="width:${s}px;height:${s}px" src="${bare(g, era.syntax.function)}">`).join("");
    const file = fileIcon(era, "function", { glyph: g });
    const folder = folderIcon(era, "function", { glyph: g }, false);
    const folderOpen = folderIcon(era, "function", { glyph: g }, true);
    const ctx = [file, folder, folderOpen].map((svg) => `<img style="width:16px;height:16px" src="${data(svg)}"><img style="width:32px;height:32px" src="${data(svg)}">`).join("");
    const tree = `<div class="tree"><div><img style="width:16px;height:16px" src="${data(folder)}"> src</div><div><img style="width:16px;height:16px" src="${data(file)}"> index.ts</div><div><img style="width:16px;height:16px" src="${data(file)}"> ${id}</div></div>`;
    return `<div class="pane" style="background:${bg};color:${fg}"><div class="row">${sizes}</div><div class="row">${ctx}</div>${tree}</div>`;
  });
  const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;font:13px/22px -apple-system,sans-serif;display:grid;grid-template-columns:1fr 1fr}.pane{padding:14px}.row{display:flex;align-items:center;gap:12px;margin-bottom:10px}.tree div{display:flex;align-items:center;gap:6px}</style><h3 style="grid-column:1/3;margin:8px 14px;font:600 14px -apple-system">${id} ${g.source ? `(${g.source})` : ""}</h3>${rows.join("")}`;
  const htmlPath = resolve(OUT, `check-${id}.html`);
  const pngPath = resolve(OUT, `check-${id}.png`);
  writeFileSync(htmlPath, html);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2", "--window-size=760,330", `--screenshot=${pngPath}`, `file://${htmlPath}`], { stdio: "ignore" });
  console.log(`${id} -> ${pngPath}`);
}
