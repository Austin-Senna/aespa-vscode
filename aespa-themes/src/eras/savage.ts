import { derive } from "../derive.js";

/** Liquid chrome lettering, neon purple, acid green. The P.O.S opens. */
export const savage = derive({
  slug: "savage",
  label: "aespa · Savage",
  title: "Savage",
  year: 2021,
  type: "dark",
  finish: "chrome",
  seed: { a: "#3B0F6B", b: "#B6FF3B", glow: "#C9CED6" },
  bg: { h: 300, c: 0.045, l: 0.21 },
  mood: "vivid",
  accent: "#b6ff3b",
  accent2: "#c9ced6",
  hues: {
    keyword: 300,
    storage: 130,
    string: 220,
    number: 60,
    function: { h: 250, c: 0.05, l: 0.86 },
    type: 340,
  },
});
