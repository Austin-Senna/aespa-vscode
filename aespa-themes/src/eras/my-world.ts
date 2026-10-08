import { derive } from "../derive.js";

/** Glossy slime-green 3D logo, hot pink, sky blue, lavender. Light, like the spring-field photos. */
export const myWorld = derive({
  slug: "my-world",
  label: "aespa · MY WORLD",
  title: "MY WORLD",
  year: 2023,
  type: "light",
  finish: "candy",
  seed: { a: "#5FD068", b: "#FF6FA8", glow: "#7CC6FF" },
  bg: { h: 145, c: 0.014, l: 0.975 },
  mood: "vivid",
  accent: { h: 0, c: 0.17, l: 0.55 },
  accent2: { h: 148, c: 0.14, l: 0.52 },
  brand: "#5fd068",
  hues: {
    keyword: { h: 148, c: 0.15, l: 0.5 },
    storage: { h: 355, c: 0.17, l: 0.53 },
    string: { h: 250, c: 0.13, l: 0.5 },
    number: { h: 55, c: 0.14, l: 0.55 },
    function: { h: 295, c: 0.13, l: 0.48 },
    type: { h: 200, c: 0.1, l: 0.5 },
  },
});
