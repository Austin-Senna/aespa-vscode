import { derive } from "../derive.js";

/** Spicy. Bright Y2K campus, hot pink, cherry, sky blue. Dark so the candy stays readable. */
export const myWorld = derive({
  slug: "my-world",
  label: "aespa · MY WORLD",
  title: "MY WORLD",
  year: 2023,
  type: "dark",
  finish: "candy",
  seed: { a: "#FF3D7F", b: "#FFE066", glow: "#7CC6FF" },
  bg: { h: 345, c: 0.02 },
  mood: "vivid",
  accent: { h: 350, c: 0.16 },
  accent2: { h: 95, c: 0.12, l: 0.86 },
  hues: {
    keyword: 350,
    storage: 290,
    string: 95,
    number: 50,
    function: 240,
    type: 200,
    regexp: 160,
  },
});
