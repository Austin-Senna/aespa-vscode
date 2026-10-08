/** Write one icon theme per era: SVGs plus the theme JSON that maps names to them. */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { EraPalette } from "../palette.js";
import { FILE_ICONS, FOLDER_ICONS } from "./catalog.js";
import { fileIcon, folderIcon, resolveMark } from "./svg.js";

export interface IconThemeDocument {
  iconDefinitions: Record<string, { iconPath: string }>;
  file: string;
  folder: string;
  folderExpanded: string;
  rootFolder: string;
  rootFolderExpanded: string;
  fileExtensions: Record<string, string>;
  fileNames: Record<string, string>;
  languageIds: Record<string, string>;
  folderNames: Record<string, string>;
  folderNamesExpanded: Record<string, string>;
  hidesExplorerArrows: boolean;
  showLanguageModeIcons: boolean;
}

/** Render every SVG for an era, keyed by definition id. */
export function renderIcons(era: EraPalette): Map<string, string> {
  const out = new Map<string, string>();
  const glyphId = (id: string | undefined, fallback: string) => (id === "motif" ? era.slug : (id ?? fallback));
  for (const def of FILE_ICONS) {
    out.set(def.id, fileIcon(era, def.role, resolveMark(glyphId(def.glyph, def.id), def.label), def.framed));
  }
  for (const def of FOLDER_ICONS) {
    const mark = resolveMark(glyphId(def.glyph, def.id), def.label);
    out.set(def.id, folderIcon(era, def.role, mark, false, def.markScale));
    out.set(`${def.id}-open`, folderIcon(era, def.role, mark, true, def.markScale));
  }
  return out;
}

export function iconTheme(era: EraPalette): IconThemeDocument {
  const doc: IconThemeDocument = {
    iconDefinitions: {},
    file: "file",
    folder: "folder",
    folderExpanded: "folder-open",
    rootFolder: "folder-root",
    rootFolderExpanded: "folder-root-open",
    fileExtensions: {},
    fileNames: {},
    languageIds: {},
    folderNames: {},
    folderNamesExpanded: {},
    hidesExplorerArrows: false,
    showLanguageModeIcons: false,
  };
  for (const id of renderIcons(era).keys()) {
    doc.iconDefinitions[id] = { iconPath: `./${id}.svg` };
  }
  for (const def of FILE_ICONS) {
    for (const ext of def.fileExtensions ?? []) {
      doc.fileExtensions[ext] = def.id;
    }
    for (const name of def.fileNames ?? []) {
      doc.fileNames[name] = def.id;
    }
    for (const lang of def.languageIds ?? []) {
      doc.languageIds[lang] = def.id;
    }
  }
  for (const def of FOLDER_ICONS) {
    for (const name of def.folderNames ?? []) {
      const key = name.replace(/\/$/, "");
      doc.folderNames[key] = def.id;
      doc.folderNamesExpanded[key] = `${def.id}-open`;
    }
  }
  return doc;
}

export function iconThemeFileName(era: EraPalette): string {
  return `${era.slug}-icon-theme.json`;
}

/** Write icons/<slug>/ with every SVG and the theme JSON. Replaces any previous output. */
export function writeIconTheme(era: EraPalette, iconsRoot: string): void {
  const dir = resolve(iconsRoot, era.slug);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  for (const [id, svg] of renderIcons(era)) {
    writeFileSync(resolve(dir, `${id}.svg`), svg);
  }
  writeFileSync(resolve(dir, iconThemeFileName(era)), `${JSON.stringify(iconTheme(era), null, 2)}\n`);
}
