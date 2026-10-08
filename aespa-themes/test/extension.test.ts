import { describe, expect, it } from "vitest";
import { themeContributions, iconThemeContributions } from "../src/build.js";
import { ERA_THEMES, eraForColorTheme, eraForIconTheme, randomEra, repairedColorTheme, stepEra, syncTarget } from "../src/extension/eras.js";

describe("era helpers", () => {
  it("knows all twelve eras with distinct ids", () => {
    expect(ERA_THEMES).toHaveLength(12);
    expect(new Set(ERA_THEMES.map((e) => e.iconTheme)).size).toBe(12);
    expect(new Set(ERA_THEMES.map((e) => e.colorTheme)).size).toBe(12);
  });

  it("writes the same ids package.json contributes", () => {
    // VS Code matches workbench.colorTheme against the contributed id, so a
    // label here would select no theme and leave the default showing.
    expect(ERA_THEMES.map((e) => e.colorTheme)).toEqual(themeContributions().map((t) => t.id));
    expect(ERA_THEMES.map((e) => e.iconTheme)).toEqual(iconThemeContributions().map((t) => t.id));
  });

  it("looks up eras by color theme id or legacy label, and by icon theme id", () => {
    expect(eraForColorTheme("aespa-savage")?.slug).toBe("savage");
    expect(eraForColorTheme("aespa · Savage")?.slug).toBe("savage");
    expect(eraForColorTheme("Dark 2026")).toBeUndefined();
    expect(eraForIconTheme("aespa-savage-icons")?.slug).toBe("savage");
    expect(eraForIconTheme("material-icon-theme")).toBeUndefined();
  });

  it("repairs a legacy label to the id and leaves everything else alone", () => {
    expect(repairedColorTheme("aespa · Whiplash")).toBe("aespa-whiplash");
    expect(repairedColorTheme("aespa-whiplash")).toBeUndefined();
    expect(repairedColorTheme("Dark 2026")).toBeUndefined();
    expect(repairedColorTheme(undefined)).toBeUndefined();
  });

  it("syncs an era color theme to its icons", () => {
    expect(syncTarget("color", "aespa-drama", "aespa-savage-icons")).toEqual({ setting: "icon", value: "aespa-drama-icons" });
    expect(syncTarget("color", "aespa-drama", "material-icon-theme")).toEqual({ setting: "icon", value: "aespa-drama-icons" });
  });

  it("syncs an era icon theme to its colors by id", () => {
    expect(syncTarget("icon", "aespa-drama", "aespa-savage-icons")).toEqual({ setting: "color", value: "aespa-savage" });
    expect(syncTarget("icon", "Dark 2026", "aespa-whiplash-icons")).toEqual({ setting: "color", value: "aespa-whiplash" });
  });

  it("leaves the other side alone for non-era picks and matching pairs", () => {
    expect(syncTarget("color", "Dark 2026", "aespa-savage-icons")).toBeUndefined();
    expect(syncTarget("icon", "aespa-savage", "material-icon-theme")).toBeUndefined();
    // A matched pair is a fixed point, so each write's echo is a no-op and the listeners cannot loop.
    expect(syncTarget("color", "aespa-savage", "aespa-savage-icons")).toBeUndefined();
    expect(syncTarget("icon", "aespa-savage", "aespa-savage-icons")).toBeUndefined();
  });

  it("steps through eras in order and wraps", () => {
    expect(stepEra("aespa-black-mamba", 1).slug).toBe("next-level");
    expect(stepEra("aespa-black-mamba", -1).slug).toBe("kiss-n-tell");
    expect(stepEra("aespa-kiss-n-tell", 1).slug).toBe("black-mamba");
    expect(stepEra("aespa · Black Mamba", 1).slug).toBe("next-level");
    expect(stepEra("Dark 2026", 1).slug).toBe("black-mamba");
  });

  it("picks a random era that is not the current one", () => {
    for (let i = 0; i < 50; i++) {
      expect(randomEra("aespa-savage").slug).not.toBe("savage");
    }
    expect(randomEra("aespa-savage", () => 0).slug).toBe("black-mamba");
    expect(randomEra("aespa-savage", () => 0.999).slug).toBe("kiss-n-tell");
  });
});
