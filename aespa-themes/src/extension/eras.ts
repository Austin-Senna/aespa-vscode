/** Pure helpers shared by the runtime and its tests. No vscode imports here. */
import { eras } from "../eras/index.js";
import { colorThemeId, iconThemeId, type EraPalette } from "../palette.js";

export interface EraThemeIds {
  slug: string;
  label: string;
  /** Value for `workbench.colorTheme`: the contributed id, never the label. */
  colorTheme: string;
  iconTheme: string;
  year: number;
  type: "dark" | "light";
}

export const ERA_THEMES: readonly EraThemeIds[] = eras.map((era: EraPalette) => ({
  slug: era.slug,
  label: era.label,
  colorTheme: colorThemeId(era),
  iconTheme: iconThemeId(era),
  year: era.year,
  type: era.type,
}));

/**
 * The era for a `workbench.colorTheme` value. Accepts the id VS Code writes and
 * the label that 0.1.0 and 0.1.1 wrote by mistake.
 */
export function eraForColorTheme(value: string | undefined): EraThemeIds | undefined {
  return ERA_THEMES.find((e) => e.colorTheme === value || e.label === value);
}

/** The id to write when `workbench.colorTheme` holds an era's label instead of its id. */
export function repairedColorTheme(value: string | undefined): string | undefined {
  const era = ERA_THEMES.find((e) => e.label === value);
  return era?.colorTheme;
}

export function eraForIconTheme(id: string | undefined): EraThemeIds | undefined {
  return ERA_THEMES.find((e) => e.iconTheme === id);
}

export type ThemeSetting = "color" | "icon";

/**
 * What to write after one of the two theme settings changed, if anything.
 * An aespa color theme pulls in its icons and an aespa icon theme pulls in its
 * colors. Non-aespa themes on the changed side leave the other side alone, and
 * an already-matching pair returns undefined, so the two listeners cannot loop.
 */
export function syncTarget(changed: ThemeSetting, colorTheme: string | undefined, iconTheme: string | undefined): { setting: ThemeSetting; value: string } | undefined {
  if (changed === "color") {
    const era = eraForColorTheme(colorTheme);
    return era && iconTheme !== era.iconTheme ? { setting: "icon", value: era.iconTheme } : undefined;
  }
  const era = eraForIconTheme(iconTheme);
  return era && eraForColorTheme(colorTheme)?.slug !== era.slug ? { setting: "color", value: era.colorTheme } : undefined;
}

/** Step through eras in release order, wrapping. A non-era current theme starts from the first. */
export function stepEra(currentColorTheme: string | undefined, delta: 1 | -1): EraThemeIds {
  const current = eraForColorTheme(currentColorTheme);
  const index = current ? ERA_THEMES.indexOf(current) : -1;
  if (index === -1) {
    return delta === 1 ? ERA_THEMES[0] : ERA_THEMES[ERA_THEMES.length - 1];
  }
  const n = ERA_THEMES.length;
  return ERA_THEMES[(index + delta + n) % n];
}

export function randomEra(exclude: string | undefined, rand: () => number = Math.random): EraThemeIds {
  const excluded = eraForColorTheme(exclude);
  const pool = ERA_THEMES.filter((e) => e !== excluded);
  return pool[Math.floor(rand() * pool.length)];
}
