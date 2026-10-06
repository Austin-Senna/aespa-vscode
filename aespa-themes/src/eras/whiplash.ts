import type { EraPalette } from "../palette.js";

/**
 * Futuristic runway. Monochrome: color is removed rather than added.
 * Syntax is carried by grey steps plus bold and underline. Diagnostics keep
 * muted hues because losing error visibility is a bug, not a look.
 */
export const whiplash: EraPalette = {
  slug: "whiplash",
  label: "aespa · Whiplash",
  title: "Whiplash",
  year: 2024,
  type: "dark",
  finish: "mono",
  seed: { a: "#000000", b: "#FFFFFF", glow: "#C9CED6" },
  bg: { base: "#0a0a0b", mantle: "#050506", crust: "#000000" },
  surface: { s0: "#161618", s1: "#202023", s2: "#2c2c30" },
  border: "#232326",
  fg: { text: "#f4f4f5", subtext: "#b8b9be", muted: "#77787e" },
  accent: "#ffffff",
  accent2: "#c9ced6",
  syntax: {
    keyword: "#ffffff",
    storage: "#c9ced6",
    string: "#b4b7be",
    number: "#d6d8dd",
    function: "#f4f4f5",
    type: "#dadce1",
    variable: "#c9ced6",
    property: "#b8b9be",
    comment: "#9a9ba1",
    operator: "#b8b9be",
    tag: "#ffffff",
    attribute: "#b4b7be",
    regexp: "#b4b7be",
    escape: "#ffffff",
  },
  status: { success: "#9fd3b0", warning: "#e0c98a", error: "#f6a3ab", info: "#a8bfe0" },
  style: { italicComments: true, boldKeywords: true, underlineTypes: true },
};
