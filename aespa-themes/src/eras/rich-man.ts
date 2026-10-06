import { derive } from "../derive.js";

/** Rock band in a cold-storage warehouse. Icy blue-white, concrete, warm amber. Light. */
export const richMan = derive({
  slug: "rich-man",
  label: "aespa · Rich Man",
  title: "Rich Man",
  year: 2025,
  type: "light",
  finish: "matte",
  seed: { a: "#DCE9F2", b: "#E0A33A", glow: "#1A1A1E" },
  bg: { h: 240, c: 0.014 },
  mood: "muted",
  accent: { h: 70, c: 0.13, l: 0.55 },
  accent2: { h: 240, c: 0.04, l: 0.5 },
  hues: {
    keyword: { h: 70, c: 0.11 },
    storage: 250,
    string: 160,
    number: 40,
    function: { h: 255, c: 0.09, l: 0.42 },
    type: 200,
  },
});
