import { derive } from "../derive.js";

/**
 * Futuristic runway. The page stays black and white; syntax is cut from ice:
 * steel blue, glacier, frost lavender, all low chroma so it still reads as
 * monochrome from across the room. Keywords keep the bold.
 */
export const whiplash = derive({
  slug: "whiplash",
  label: "aespa · Whiplash",
  title: "Whiplash",
  year: 2024,
  type: "dark",
  finish: "mono",
  seed: { a: "#000000", b: "#FFFFFF", glow: "#C9CED6" },
  bg: { h: 250, c: 0.008, l: 0.17 },
  mood: "muted",
  accent: "#e8eef5",
  accent2: { h: 245, c: 0.07, l: 0.76 },
  brand: "#c9d6e3",
  hues: {
    keyword: { h: 230, c: 0.04, l: 0.96 },
    storage: { h: 248, c: 0.075, l: 0.77 },
    string: { h: 200, c: 0.06, l: 0.86 },
    number: { h: 280, c: 0.065, l: 0.81 },
    function: { h: 220, c: 0.035, l: 0.9 },
    type: { h: 190, c: 0.065, l: 0.8 },
    property: { h: 240, c: 0.02, l: 0.82 },
    regexp: { h: 180, c: 0.07, l: 0.84 },
  },
  style: { boldKeywords: true },
});
