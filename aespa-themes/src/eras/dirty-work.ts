import { derive } from "../derive.js";

/** The covers: pure black, bling gold blackletter, chrome tin case, safety orange. */
export const dirtyWork = derive({
  slug: "dirty-work",
  label: "aespa · Dirty Work",
  title: "Dirty Work",
  year: 2025,
  type: "dark",
  finish: "grunge",
  seed: { a: "#0B0B0B", b: "#B8924A", glow: "#F04E1E" },
  bg: { h: 80, c: 0.004, l: 0.155, surfaceC: 0.008 },
  mood: "normal",
  accent: { h: 82, c: 0.12, l: 0.76 },
  accent2: { h: 250, c: 0.015, l: 0.78 },
  brand: "#7a3f22",
  brandText: "#e2bd6a",
  hues: {
    keyword: { h: 82, c: 0.12, l: 0.82 },
    storage: { h: 42, c: 0.17, l: 0.79 },
    string: { h: 250, c: 0.02, l: 0.85 },
    number: { h: 62, c: 0.14, l: 0.81 },
    function: { h: 90, c: 0.09, l: 0.9 },
    type: { h: 230, c: 0.045, l: 0.8 },
  },
});
