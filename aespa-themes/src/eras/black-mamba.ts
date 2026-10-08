import { derive } from "../derive.js";

/** The dreamscape: violet dusk, periwinkle rocks, pink coral, rose-gold sequins, fairy lights. */
export const blackMamba = derive({
  slug: "black-mamba",
  label: "aespa · Black Mamba",
  title: "Black Mamba",
  year: 2020,
  type: "dark",
  finish: "chrome",
  seed: { a: "#5B4BB0", b: "#F29AD6", glow: "#F2C98A" },
  bg: { h: 285, c: 0.07, l: 0.2 },
  mood: "vivid",
  accent: { h: 345, c: 0.14, l: 0.8 },
  accent2: { h: 278, c: 0.12, l: 0.76 },
  brand: "#7f72d4",
  hues: {
    keyword: { h: 342, c: 0.14, l: 0.8 },
    storage: { h: 290, c: 0.13, l: 0.79 },
    string: { h: 85, c: 0.1, l: 0.87 },
    number: { h: 45, c: 0.1, l: 0.82 },
    function: { h: 265, c: 0.1, l: 0.86 },
    type: { h: 315, c: 0.1, l: 0.82 },
    regexp: { h: 15, c: 0.13, l: 0.8 },
  },
});
