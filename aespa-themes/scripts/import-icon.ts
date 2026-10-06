/**
 * Import a filled icon from an open-licensed set and fit it into the 0..20 glyph box.
 *
 *   npx tsx scripts/import-icon.ts mdi snake                 # print fitted path data
 *   npx tsx scripts/import-icon.ts mdi snake --out py        # write src/icons/glyphs/items/py.ts
 *   npx tsx scripts/import-icon.ts phosphor flask-fill --out testconfig
 *   npx tsx scripts/import-icon.ts tabler flask --out folder-test
 *   npx tsx scripts/import-icon.ts file ./some.svg --out foo
 *
 * Sets: mdi (Material Design Icons, Apache 2.0, 7000+ icons, https://pictogrammers.com/library/mdi/),
 *       phosphor (MIT, use the "-fill" names, https://phosphoricons.com/),
 *       tabler (MIT, filled subset, https://tabler.io/icons).
 * Options: --margin <units> (default 1), --out <id>, --evenodd (keep evenodd fill rule).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import svgpath from "svgpath";

const [set, name, ...rest] = process.argv.slice(2);
if (!set || !name) {
  console.error("usage: import-icon.ts <mdi|phosphor|tabler|file> <name|path> [--out <id>] [--margin <n>] [--evenodd]");
  process.exit(2);
}
const opt = (flag: string) => {
  const i = rest.indexOf(flag);
  return i >= 0 ? rest[i + 1] : undefined;
};
const outId = opt("--out");
const margin = Number(opt("--margin") ?? 1);
const keepEvenOdd = rest.includes("--evenodd");

const SOURCES: Record<string, (n: string) => string> = {
  mdi: (n) => `https://raw.githubusercontent.com/Templarian/MaterialDesign/master/svg/${n}.svg`,
  phosphor: (n) => `https://raw.githubusercontent.com/phosphor-icons/core/main/assets/fill/${n.endsWith("-fill") ? n : `${n}-fill`}.svg`,
  tabler: (n) => `https://raw.githubusercontent.com/tabler/tabler-icons/main/icons/filled/${n}.svg`,
};

async function load(): Promise<string> {
  if (set === "file") {
    return readFileSync(resolve(name), "utf8");
  }
  const url = SOURCES[set]?.(name);
  if (!url) {
    throw new Error(`Unknown set ${set}`);
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status} fetching ${url}`);
  }
  return res.text();
}

function bbox(d: string): { minX: number; minY: number; maxX: number; maxY: number } {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  svgpath(d).abs().unarc().unshort().iterate((seg) => {
    const cmd = seg[0] as string;
    const nums = seg.slice(1) as number[];
    if (cmd === "H") {
      minX = Math.min(minX, nums[0]);
      maxX = Math.max(maxX, nums[0]);
    } else if (cmd === "V") {
      minY = Math.min(minY, nums[0]);
      maxY = Math.max(maxY, nums[0]);
    } else {
      for (let i = 0; i + 1 < nums.length; i += 2) {
        minX = Math.min(minX, nums[i]);
        maxX = Math.max(maxX, nums[i]);
        minY = Math.min(minY, nums[i + 1]);
        maxY = Math.max(maxY, nums[i + 1]);
      }
    }
  });
  return { minX, minY, maxX, maxY };
}

const svg = await load();
const paths = [...svg.matchAll(/<path\b([^>]*)>/g)]
  .map((m) => m[1])
  .filter((attrs) => !/fill\s*=\s*"none"/.test(attrs))
  .map((attrs) => /\bd\s*=\s*"([^"]+)"/.exec(attrs)?.[1])
  .filter((d): d is string => Boolean(d));
if (paths.length === 0) {
  throw new Error("No filled <path> elements found");
}
const evenodd = /fill-rule\s*=\s*"evenodd"/.test(svg);
const raw = paths.map((d) => svgpath(d).abs().toString()).join("");
const b = bbox(raw);
const w = b.maxX - b.minX;
const h = b.maxY - b.minY;
const scale = (20 - 2 * margin) / Math.max(w, h);
const ox = (20 - w * scale) / 2 - b.minX * scale;
const oy = (20 - h * scale) / 2 - b.minY * scale;
const fitted = svgpath(raw).scale(scale).translate(ox, oy).round(2).toString();

const source = set === "file" ? `file:${name}` : `${set}:${name}`;
if (outId) {
  const file = resolve(import.meta.dirname, `../src/icons/glyphs/items/${outId}.ts`);
  const rule = evenodd && keepEvenOdd ? `\n  fillRule: "evenodd",` : "";
  writeFileSync(file, `// Imported with scripts/import-icon.ts from ${source}. Edit freely; re-import overwrites.
import type { Glyph } from "../types.js";

export const GLYPH: Glyph = {
  id: "${outId}",
  source: "${source}",${rule}
  d: "${fitted}",
};
`);
  console.log(`wrote ${file}${evenodd ? (keepEvenOdd ? " (evenodd kept)" : " (source used evenodd; pass --evenodd if holes fill in)") : ""}`);
} else {
  console.log(fitted);
  if (evenodd) {
    console.log("# source used fill-rule evenodd");
  }
}
