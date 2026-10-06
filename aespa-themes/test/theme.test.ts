import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { isHex } from "../src/color.js";
import { eras } from "../src/eras/index.js";
import { compileTheme, themeFileName } from "../src/theme.js";
import { iconThemeContributions, themeContributions } from "../src/build.js";
import schema from "../src/schema/workbench-keys.json" with { type: "json" };

const ROOT = resolve(import.meta.dirname, "..");
const KNOWN_KEYS = new Set([...schema.keys, ...schema.verified.keys]);
const SEMANTIC_SELECTOR = /^(\*|[a-zA-Z][a-zA-Z0-9]*)(\.[a-zA-Z][a-zA-Z0-9]*)*(:[a-zA-Z][a-zA-Z0-9-]*)?$/;
const FONT_STYLE = /^(\s*\b(italic|bold|underline|strikethrough))*\s*$/;

describe.each(eras.map((era) => [era.slug, era] as const))("%s theme", (_slug, era) => {
  const theme = compileTheme(era);

  it("emits only known workbench keys", () => {
    const unknown = Object.keys(theme.colors).filter((k) => !KNOWN_KEYS.has(k));
    expect(unknown).toEqual([]);
  });

  it("emits valid hex for every workbench color", () => {
    for (const [key, value] of Object.entries(theme.colors)) {
      expect(isHex(value), `${key}=${value}`).toBe(true);
    }
  });

  it("emits valid token rules", () => {
    for (const rule of theme.tokenColors) {
      const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
      expect(scopes.length).toBeGreaterThan(0);
      if (rule.settings.foreground !== undefined) {
        expect(isHex(rule.settings.foreground), rule.name).toBe(true);
      }
      if (rule.settings.fontStyle !== undefined) {
        expect(rule.settings.fontStyle, rule.name).toMatch(FONT_STYLE);
      }
    }
  });

  it("emits valid semantic selectors", () => {
    for (const [selector, style] of Object.entries(theme.semanticTokenColors)) {
      expect(selector).toMatch(SEMANTIC_SELECTOR);
      const fg = typeof style === "string" ? style : style.foreground;
      if (fg !== undefined) {
        expect(isHex(fg), selector).toBe(true);
      }
    }
  });

  it("matches the committed theme file", () => {
    const path = resolve(ROOT, "themes", themeFileName(era));
    const onDisk = JSON.parse(readFileSync(path, "utf8"));
    expect(onDisk).toEqual(JSON.parse(JSON.stringify(theme)));
  });
});

describe("package.json", () => {
  const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8"));

  it("contributes exactly the era index", () => {
    expect(pkg.contributes.themes).toEqual(themeContributions());
    expect(pkg.contributes.iconThemes).toEqual(iconThemeContributions());
  });

  it("points every contribution at a file that exists", () => {
    for (const entry of [...pkg.contributes.themes, ...pkg.contributes.iconThemes]) {
      expect(() => readFileSync(resolve(ROOT, entry.path))).not.toThrow();
    }
  });
});
