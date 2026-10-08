import { derive } from "../derive.js";

/** Glitch, digital landscapes, neon magenta against cyan. */
export const girls = derive({
  slug: "girls",
  label: "aespa · Girls",
  title: "Girls",
  year: 2022,
  type: "dark",
  finish: "chrome",
  seed: { a: "#FF2BD6", b: "#22E1FF", glow: "#FFFFFF" },
  bg: { h: 300, c: 0.045, l: 0.19 },
  mood: "vivid",
  accent: "#22e1ff",
  accent2: { h: 335, c: 0.2, l: 0.74 },
  brand: "#ff2bd6",
  hues: {
    keyword: { h: 335, c: 0.2, l: 0.79 },
    storage: { h: 210, c: 0.13, l: 0.83 },
    string: { h: 165, c: 0.13, l: 0.85 },
    number: { h: 75, c: 0.13, l: 0.86 },
    function: { h: 250, c: 0.13, l: 0.78 },
    type: { h: 300, c: 0.15, l: 0.78 },
    regexp: { h: 110, c: 0.15, l: 0.85 },
  },
});
