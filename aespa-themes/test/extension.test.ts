import { describe, expect, it } from "vitest";
import { ERA_THEMES, eraForColorTheme, eraForIconTheme, randomEra, stepEra } from "../src/extension/eras.js";

describe("era helpers", () => {
  it("knows all twelve eras with distinct ids", () => {
    expect(ERA_THEMES).toHaveLength(12);
    expect(new Set(ERA_THEMES.map((e) => e.iconTheme)).size).toBe(12);
    expect(new Set(ERA_THEMES.map((e) => e.colorTheme)).size).toBe(12);
  });

  it("looks up eras by color theme label and icon theme id", () => {
    expect(eraForColorTheme("aespa · Savage")?.slug).toBe("savage");
    expect(eraForColorTheme("Dark 2026")).toBeUndefined();
    expect(eraForIconTheme("aespa-savage-icons")?.slug).toBe("savage");
    expect(eraForIconTheme("material-icon-theme")).toBeUndefined();
  });

  it("steps through eras in order and wraps", () => {
    expect(stepEra("aespa · Black Mamba", 1).slug).toBe("next-level");
    expect(stepEra("aespa · Black Mamba", -1).slug).toBe("kiss-n-tell");
    expect(stepEra("aespa · KISS N TELL", 1).slug).toBe("black-mamba");
    expect(stepEra("Dark 2026", 1).slug).toBe("black-mamba");
  });

  it("picks a random era that is not the current one", () => {
    for (let i = 0; i < 50; i++) {
      expect(randomEra("aespa · Savage").slug).not.toBe("savage");
    }
    expect(randomEra("aespa · Savage", () => 0).slug).toBe("black-mamba");
    expect(randomEra("aespa · Savage", () => 0.999).slug).toBe("kiss-n-tell");
  });
});
