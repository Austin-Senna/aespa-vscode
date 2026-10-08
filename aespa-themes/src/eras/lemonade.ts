import { derive } from "../derive.js";

/** Glossy parallel world after dark. Black page, neon lemon and lime, mint and bubblegum on the side. */
export const lemonade = derive({
  slug: "lemonade",
  label: "aespa · LEMONADE",
  title: "LEMONADE",
  year: 2026,
  type: "dark",
  finish: "candy",
  seed: { a: "#F7E85A", b: "#F6A9D8", glow: "#A8F0D1" },
  bg: { h: 115, c: 0.012, l: 0.16 },
  mood: "vivid",
  accent: { h: 105, c: 0.2, l: 0.93 },
  accent2: { h: 142, c: 0.24, l: 0.86 },
  brand: "#f2ff1f",
  hues: {
    keyword: { h: 105, c: 0.2, l: 0.93 },
    storage: { h: 142, c: 0.24, l: 0.86 },
    string: { h: 165, c: 0.11, l: 0.88 },
    number: { h: 350, c: 0.13, l: 0.8 },
    function: { h: 125, c: 0.2, l: 0.9 },
    type: { h: 190, c: 0.11, l: 0.83 },
    regexp: { h: 320, c: 0.13, l: 0.8 },
  },
});
