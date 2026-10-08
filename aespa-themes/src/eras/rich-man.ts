import { derive } from "../derive.js";

/** The guitar pick: deep cobalt-navy body, yellow metal lettering. Cold-storage ice on the side. */
export const richMan = derive({
  slug: "rich-man",
  label: "aespa · Rich Man",
  title: "Rich Man",
  year: 2025,
  type: "dark",
  finish: "matte",
  seed: { a: "#DCE9F2", b: "#E0A33A", glow: "#1A1A1E" },
  bg: { h: 266, c: 0.08, l: 0.17 },
  mood: "vivid",
  accent: "#f2e33a",
  accent2: { h: 268, c: 0.15, l: 0.72 },
  brand: "#2440c8",
  brandText: "#f2e33a",
  hues: {
    keyword: { h: 102, c: 0.17, l: 0.91 },
    storage: { h: 85, c: 0.13, l: 0.84 },
    string: { h: 225, c: 0.07, l: 0.87 },
    number: { h: 60, c: 0.13, l: 0.82 },
    function: { h: 255, c: 0.1, l: 0.85 },
    type: { h: 200, c: 0.1, l: 0.83 },
  },
});
