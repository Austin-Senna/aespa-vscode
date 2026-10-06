/** Pure helpers shared by the runtime and its tests. No vscode imports here. */
import { eras } from "../eras/index.js";
import type { EraPalette } from "../palette.js";

export interface EraThemeIds {
  slug: string;
  label: string;
  colorTheme: string;
  iconTheme: string;
  year: number;
  type: "dark" | "light";
}

export const ERA_THEMES: readonly EraThemeIds[] = eras.map((era: EraPalette) => ({
  slug: era.slug,
  label: era.label,
  colorTheme: era.label,
  iconTheme: `aespa-${era.slug}-icons`,
  year: era.year,
  type: era.type,
}));

/** The era whose color theme label matches, if any. */
export function eraForColorTheme(label: string | undefined): EraThemeIds | undefined {
  return ERA_THEMES.find((e) => e.colorTheme === label);
}

export function eraForIconTheme(id: string | undefined): EraThemeIds | undefined {
  return ERA_THEMES.find((e) => e.iconTheme === id);
}

/** Step through eras in release order, wrapping. A non-era current theme starts from the first. */
export function stepEra(currentColorTheme: string | undefined, delta: 1 | -1): EraThemeIds {
  const index = ERA_THEMES.findIndex((e) => e.colorTheme === currentColorTheme);
  if (index === -1) {
    return delta === 1 ? ERA_THEMES[0] : ERA_THEMES[ERA_THEMES.length - 1];
  }
  const n = ERA_THEMES.length;
  return ERA_THEMES[(index + delta + n) % n];
}

export function randomEra(exclude: string | undefined, rand: () => number = Math.random): EraThemeIds {
  const pool = ERA_THEMES.filter((e) => e.colorTheme !== exclude);
  return pool[Math.floor(rand() * pool.length)];
}
