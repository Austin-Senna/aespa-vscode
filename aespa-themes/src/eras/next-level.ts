import { derive } from "../derive.js";

/** Desert highway, Y2K cyber, chrome on tan. Teal night, sand status bar. */
export const nextLevel = derive({
  slug: "next-level",
  label: "aespa · Next Level",
  title: "Next Level",
  year: 2021,
  type: "dark",
  finish: "chrome",
  seed: { a: "#C9A86A", b: "#1C6E73", glow: "#DDE2EA" },
  bg: { h: 200, c: 0.04, l: 0.22 },
  mood: "normal",
  accent: { h: 80, c: 0.11, l: 0.78 },
  accent2: { h: 190, c: 0.1, l: 0.76 },
  brand: "#c9a86a",
  hues: {
    keyword: { h: 80, c: 0.12, l: 0.8 },
    storage: { h: 192, c: 0.1, l: 0.76 },
    string: { h: 140, c: 0.09, l: 0.83 },
    number: { h: 45, c: 0.13, l: 0.79 },
    function: { h: 230, c: 0.03, l: 0.9 },
    type: { h: 172, c: 0.1, l: 0.8 },
    regexp: { h: 30, c: 0.12, l: 0.8 },
  },
});
