import { derive } from "../derive.js";

/** Y2K sticker sheet: pastel pink, lavender, baby blue, butter yellow, and the chocolate fur. Light. */
export const kissNTell = derive({
  slug: "kiss-n-tell",
  label: "aespa · KISS N TELL",
  title: "KISS N TELL",
  year: 2026,
  type: "light",
  finish: "candy",
  seed: { a: "#F4A6CF", b: "#C8B6F0", glow: "#4A2A20" },
  bg: { h: 350, c: 0.03, l: 0.97 },
  mood: "normal",
  accent: { h: 352, c: 0.16, l: 0.56 },
  accent2: { h: 235, c: 0.1, l: 0.55 },
  brand: "#f4a6cf",
  brandText: "#4a2a20",
  hues: {
    keyword: { h: 352, c: 0.16, l: 0.53 },
    storage: { h: 300, c: 0.13, l: 0.5 },
    string: { h: 235, c: 0.11, l: 0.5 },
    number: { h: 50, c: 0.1, l: 0.45 },
    function: { h: 280, c: 0.12, l: 0.47 },
    type: { h: 210, c: 0.09, l: 0.48 },
    regexp: { h: 330, c: 0.13, l: 0.5 },
  },
});
