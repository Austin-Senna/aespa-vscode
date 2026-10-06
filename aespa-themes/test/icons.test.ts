import { describe, expect, it } from "vitest";
import { eras } from "../src/eras/index.js";
import { FILE_ICONS, FOLDER_ICONS } from "../src/icons/catalog.js";
import { iconTheme, renderIcons } from "../src/icons/build.js";
import { hasGlyph } from "../src/icons/pixelfont.js";
import { GLYPHS, glyphFor } from "../src/icons/glyphs/index.js";

describe("icon catalog", () => {
  it("uses unique ids and labels of at most three glyphs with known glyphs", () => {
    const ids = new Set<string>();
    for (const def of [...FILE_ICONS, ...FOLDER_ICONS]) {
      expect(ids.has(def.id), def.id).toBe(false);
      ids.add(def.id);
      if (def.label !== null) {
        const glyphs = [...def.label];
        expect(glyphs.length, def.id).toBeLessThanOrEqual(3);
        for (const g of glyphs) {
          expect(hasGlyph(g), `${def.id}: ${g}`).toBe(true);
        }
      }
    }
  });

  it("maps every name, extension and language at most once", () => {
    const seen = new Map<string, string>();
    for (const def of FILE_ICONS) {
      for (const key of [...(def.fileExtensions ?? []).map((e) => `ext:${e}`), ...(def.fileNames ?? []).map((n) => `name:${n}`), ...(def.languageIds ?? []).map((l) => `lang:${l}`)]) {
        expect(seen.get(key), `${key} in ${def.id} and ${seen.get(key)}`).toBeUndefined();
        seen.set(key, def.id);
        expect(key).toBe(key.toLowerCase());
      }
    }
    const folders = new Map<string, string>();
    for (const def of FOLDER_ICONS) {
      for (const name of def.folderNames ?? []) {
        const key = name.replace(/\/$/, "");
        expect(folders.get(key), `${key} in ${def.id} and ${folders.get(key)}`).toBeUndefined();
        folders.set(key, def.id);
      }
    }
  });
});

describe("drawn glyphs", () => {
  const PATH_DATA = /^[MmZzLlHhVvCcSsQqTtAa0-9.,\s-]+$/;

  it("have unique ids and plain path data", () => {
    const ids = new Set<string>();
    for (const g of GLYPHS) {
      expect(ids.has(g.id), g.id).toBe(false);
      ids.add(g.id);
      expect(g.d, g.id).toMatch(PATH_DATA);
      if (g.d2) {
        expect(g.d2, g.id).toMatch(PATH_DATA);
      }
    }
  });

  it("exist for every era motif and the æ mark", () => {
    expect(glyphFor("ae")).toBeDefined();
    for (const era of eras) {
      expect(glyphFor(era.slug), era.slug).toBeDefined();
    }
  });

  it("exist for every explicit glyph reference in the catalog", () => {
    for (const def of [...FILE_ICONS, ...FOLDER_ICONS]) {
      if (def.glyph && def.glyph !== "motif") {
        expect(glyphFor(def.glyph), `${def.id} -> ${def.glyph}`).toBeDefined();
      }
    }
  });
});

describe.each(eras.map((era) => [era.slug, era] as const))("%s icon theme", (_slug, era) => {
  const theme = iconTheme(era);
  const rendered = renderIcons(era);

  it("references only rendered icons", () => {
    const defined = new Set(Object.keys(theme.iconDefinitions));
    for (const id of defined) {
      expect(rendered.has(id), id).toBe(true);
    }
    const refs = [theme.file, theme.folder, theme.folderExpanded, theme.rootFolder, theme.rootFolderExpanded, ...Object.values(theme.fileExtensions), ...Object.values(theme.fileNames), ...Object.values(theme.languageIds), ...Object.values(theme.folderNames), ...Object.values(theme.folderNamesExpanded)];
    for (const ref of refs) {
      expect(defined.has(ref), ref).toBe(true);
    }
  });

  it("renders self-contained SVGs", () => {
    for (const [id, svg] of rendered) {
      expect(svg.startsWith("<svg xmlns=")).toBe(true);
      expect(svg, id).not.toMatch(/currentColor|<script|<image|var\(|url\((?!#)/);
    }
  });
});
