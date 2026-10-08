/** Write themes/*.json for every era and sync contributes.themes in package.json. */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { eras } from "./eras/index.js";
import { compileTheme, themeFileName, uiTheme } from "./theme.js";
import { iconThemeFileName, writeIconTheme } from "./icons/build.js";
import { colorThemeId, iconThemeId } from "./palette.js";

const ROOT = resolve(import.meta.dirname, "..");
const THEMES_DIR = resolve(ROOT, "themes");
const ICONS_DIR = resolve(ROOT, "icons");
const PACKAGE_JSON = resolve(ROOT, "package.json");

export interface ThemeContribution {
  id: string;
  label: string;
  uiTheme: "vs" | "vs-dark";
  path: string;
}

export function themeContributions(): ThemeContribution[] {
  return eras.map((era) => ({
    id: colorThemeId(era),
    label: era.label,
    uiTheme: uiTheme(era),
    path: `./themes/${themeFileName(era)}`,
  }));
}

export interface IconThemeContribution {
  id: string;
  label: string;
  path: string;
}

export function iconThemeContributions(): IconThemeContribution[] {
  return eras.map((era) => ({
    id: iconThemeId(era),
    label: `${era.label} Icons`,
    path: `./icons/${era.slug}/${iconThemeFileName(era)}`,
  }));
}

export function build(): void {
  mkdirSync(THEMES_DIR, { recursive: true });
  for (const era of eras) {
    const theme = compileTheme(era);
    writeFileSync(resolve(THEMES_DIR, themeFileName(era)), `${JSON.stringify(theme, null, 2)}\n`);
    writeIconTheme(era, ICONS_DIR);
  }
  const pkg = JSON.parse(readFileSync(PACKAGE_JSON, "utf8"));
  pkg.contributes = { ...pkg.contributes, themes: themeContributions(), iconThemes: iconThemeContributions() };
  writeFileSync(PACKAGE_JSON, `${JSON.stringify(pkg, null, 2)}\n`);
  console.log(`Wrote ${eras.length} themes to ${THEMES_DIR} and icon themes to ${ICONS_DIR}`);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  build();
}
