import { derive } from "../derive.js";

/** Industrial sci-fi, cosmic violet, ember orange, steel. Supernova's toxic green leaks in. */
export const armageddon = derive({
  slug: "armageddon",
  label: "aespa · Armageddon",
  title: "Armageddon",
  year: 2024,
  type: "dark",
  finish: "matte",
  seed: { a: "#2A1250", b: "#FF6A1A", glow: "#8A8F99" },
  bg: { h: 300, c: 0.045, l: 0.21 },
  mood: "normal",
  accent: { h: 45, c: 0.16, l: 0.76 },
  accent2: { h: 250, c: 0.02, l: 0.72 },
  hues: {
    keyword: 300,
    storage: { h: 45, c: 0.15 },
    string: 140,
    number: 65,
    function: { h: 255, c: 0.08 },
    type: 225,
  },
});
