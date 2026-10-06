import { derive } from "../derive.js";

/** Retro-futuristic, pink-toned. Light, with an indigo counterweight. */
export const kissNTell = derive({
  slug: "kiss-n-tell",
  label: "aespa · KISS N TELL",
  title: "KISS N TELL",
  year: 2026,
  type: "light",
  finish: "candy",
  seed: { a: "#F6B8D8", b: "#2B2B3A", glow: "#FFFFFF" },
  bg: { h: 345, c: 0.02 },
  mood: "normal",
  accent: { h: 350, c: 0.16, l: 0.55 },
  accent2: { h: 285, c: 0.15, l: 0.5 },
  hues: {
    keyword: 350,
    storage: 285,
    string: 175,
    number: 45,
    function: 255,
    type: 320,
  },
});
