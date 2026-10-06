import { derive } from "../derive.js";

/** Industrial construction site. Rust, mud, raw steel, off-white. Grunge, not glamour. */
export const dirtyWork = derive({
  slug: "dirty-work",
  label: "aespa · Dirty Work",
  title: "Dirty Work",
  year: 2025,
  type: "dark",
  finish: "grunge",
  seed: { a: "#8C4A2F", b: "#3A3F44", glow: "#E8E2D6" },
  bg: { h: 60, c: 0.008 },
  mood: "muted",
  accent: { h: 40, c: 0.14, l: 0.72 },
  accent2: { h: 240, c: 0.03, l: 0.72 },
  hues: {
    keyword: { h: 40, c: 0.13 },
    storage: { h: 75, c: 0.08 },
    string: { h: 115, c: 0.08 },
    number: { h: 60, c: 0.11 },
    function: { h: 85, c: 0.05, l: 0.86 },
    type: { h: 230, c: 0.05 },
  },
});
