import { derive } from "../derive.js";

/** Glossy parallel world. Lemon, mint, bubblegum. Candy mode flips the page light. */
export const lemonade = derive({
  slug: "lemonade",
  label: "aespa · LEMONADE",
  title: "LEMONADE",
  year: 2026,
  type: "light",
  finish: "candy",
  seed: { a: "#F7E85A", b: "#F6A9D8", glow: "#A8F0D1" },
  bg: { h: 100, c: 0.035 },
  mood: "vivid",
  accent: { h: 350, c: 0.16, l: 0.55 },
  accent2: { h: 160, c: 0.12, l: 0.5 },
  hues: {
    keyword: 350,
    storage: 300,
    string: 160,
    number: 60,
    function: 260,
    type: 200,
  },
});
