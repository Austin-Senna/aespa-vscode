import { derive } from "../derive.js";

/** Chrome ice crystals arching over a teal-blue sky and a black reflecting sea. */
export const savage = derive({
  slug: "savage",
  label: "aespa · Savage",
  title: "Savage",
  year: 2021,
  type: "dark",
  finish: "chrome",
  seed: { a: "#3E6E86", b: "#C9DCEB", glow: "#0E1A1F" },
  bg: { h: 226, c: 0.07, l: 0.215 },
  mood: "normal",
  accent: { h: 228, c: 0.06, l: 0.88 },
  accent2: { h: 220, c: 0.12, l: 0.74 },
  brand: "#3f93c4",
  hues: {
    keyword: { h: 228, c: 0.1, l: 0.89 },
    storage: { h: 222, c: 0.13, l: 0.79 },
    string: { h: 195, c: 0.08, l: 0.87 },
    number: { h: 285, c: 0.1, l: 0.82 },
    function: { h: 230, c: 0.02, l: 0.94 },
    type: { h: 182, c: 0.1, l: 0.82 },
    regexp: { h: 300, c: 0.09, l: 0.8 },
  },
});
