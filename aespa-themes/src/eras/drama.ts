import { derive } from "../derive.js";

/** Femme fatale cinema. A crimson-black stage, crimson carrying the page, gold for highlights. */
export const drama = derive({
  slug: "drama",
  label: "aespa · Drama",
  title: "Drama",
  year: 2023,
  type: "dark",
  finish: "matte",
  seed: { a: "#B3121B", b: "#0B0B10", glow: "#D4AF37" },
  bg: { h: 18, c: 0.042, l: 0.165 },
  mood: "vivid",
  accent: { h: 22, c: 0.2, l: 0.62 },
  accent2: "#d4af37",
  brand: "#b3121b",
  hues: {
    keyword: { h: 22, c: 0.19, l: 0.79 },
    storage: { h: 8, c: 0.14, l: 0.8 },
    string: { h: 85, c: 0.09, l: 0.87 },
    number: { h: 40, c: 0.15, l: 0.8 },
    function: { h: 88, c: 0.14, l: 0.83 },
    type: { h: 355, c: 0.13, l: 0.8 },
  },
  status: { info: { h: 250, c: 0.07 } },
});
