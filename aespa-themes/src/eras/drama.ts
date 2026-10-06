import { derive } from "../derive.js";

/** Femme fatale cinema. Red carries the page, gold is reserved for highlights. */
export const drama = derive({
  slug: "drama",
  label: "aespa · Drama",
  title: "Drama",
  year: 2023,
  type: "dark",
  finish: "matte",
  seed: { a: "#B3121B", b: "#0B0B10", glow: "#D4AF37" },
  bg: { h: 20, c: 0.008, l: 0.21 },
  mood: "muted",
  accent: "#d4af37",
  accent2: { h: 25, c: 0.15, l: 0.7 },
  hues: {
    keyword: { h: 25, c: 0.15, l: 0.8 },
    storage: { h: 350, c: 0.06 },
    string: { h: 78, c: 0.07, l: 0.84 },
    number: { h: 50, c: 0.11 },
    function: { h: 88, c: 0.12 },
    type: { h: 15, c: 0.08 },
  },
  status: { info: { h: 250, c: 0.07 } },
});
