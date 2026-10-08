import { derive } from "../derive.js";

/**
 * The covers: black packaging, a chrome crop-circle emblem, the crop-circle
 * field green, Superbeing's hot pink, and the CD player's electric blue glow.
 */
export const armageddon = derive({
  slug: "armageddon",
  label: "aespa · Armageddon",
  title: "Armageddon",
  year: 2024,
  type: "dark",
  finish: "matte",
  seed: { a: "#0B0B0B", b: "#6E9A45", glow: "#D9DDE3" },
  bg: { h: 150, c: 0.004, l: 0.155, surfaceC: 0.008 },
  mood: "vivid",
  accent: { h: 135, c: 0.14, l: 0.78 },
  accent2: { h: 355, c: 0.16, l: 0.74 },
  brand: "#6e9a45",
  hues: {
    keyword: { h: 135, c: 0.13, l: 0.84 },
    storage: { h: 355, c: 0.16, l: 0.79 },
    string: { h: 245, c: 0.02, l: 0.85 },
    number: { h: 258, c: 0.14, l: 0.79 },
    function: { h: 220, c: 0.02, l: 0.93 },
    type: { h: 195, c: 0.08, l: 0.84 },
    regexp: { h: 330, c: 0.13, l: 0.8 },
  },
});
