import { derive } from "../derive.js";

/** Desert highway, Y2K cyber, chrome on tan. */
export const nextLevel = derive({
  slug: "next-level",
  label: "aespa · Next Level",
  title: "Next Level",
  year: 2021,
  type: "dark",
  finish: "chrome",
  seed: { a: "#C9A86A", b: "#1C6E73", glow: "#DDE2EA" },
  bg: { h: 195, c: 0.018 },
  mood: "normal",
  accent: { h: 80, c: 0.11 },
  accent2: { h: 195, c: 0.11 },
  hues: {
    keyword: 195,
    storage: 80,
    string: 130,
    number: 55,
    function: { h: 230, c: 0.03, l: 0.86 },
    type: 165,
    regexp: 30,
  },
});
