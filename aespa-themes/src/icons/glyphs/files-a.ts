import type { Glyph } from "./types.js";

/**
 * File marks, set A. Every path lives in a 0..20 box with ~1 unit margin,
 * fill-only under the nonzero rule. Additive subpaths wind clockwise
 * (right, down, left); holes wind counter-clockwise so they cut.
 * Nothing is thinner than 2 units so the marks survive 10 px.
 */
export const GLYPHS: Glyph[] = [
  {
    // Curly brace pair.
    id: "json",
    d: "M3.8 2H7.5V4.3H6.1V8.2L4.3 10L6.1 11.8V15.7H7.5V18H3.8V12.5L1.5 10L3.8 7.5ZM16.2 2H12.5V4.3H13.9V8.2L15.7 10L13.9 11.8V15.7H12.5V18H16.2V12.5L18.5 10L16.2 7.5Z",
  },
  {
    // Three list rows with dash bullets.
    id: "yaml",
    d: "M2 3h3v2.5H2zM7 3h11v2.5H7zM2 8.75h3v2.5H2zM7 8.75h11v2.5H7zM2 14.5h3v2.5H2zM7 14.5h11v2.5H7z",
  },
  {
    // Square brackets around a key bar.
    id: "toml",
    d: "M2 2h4v2.2H4.3v11.6H6V18H2zM18 2h-4v2.2h1.7v11.6H14V18h4zM7.5 8.8h5v2.4h-5z",
  },
  {
    // Angle-bracket tag pair with a slash.
    id: "xml",
    d: "M5 5.5L1.2 10L5 14.5H7.5L3.7 10L7.5 5.5ZM15 5.5L18.8 10L15 14.5H12.5L16.3 10L12.5 5.5ZM10.85 2.5h2.3L9.15 17.5h-2.3Z",
  },
  {
    // Bold M with a down arrow.
    id: "md",
    d: "M1 16V4H3.8L6.5 8.5L9.2 4H12V16H9.5V8.6L6.5 13.2L3.5 8.6V16ZM15 4h2.5v6.5h3.3L16.25 16.5L12.95 10.5H15Z",
  },
  {
    // Three text lines of differing length.
    id: "txt",
    d: "M2 3h16v2.5H2zM2 8.75h11v2.5H2zM2 14.5h13v2.5H2z",
  },
  {
    // Angle brackets.
    id: "html",
    d: "M6.5 3.5L1 10L6.5 16.5H9.3L3.8 10L9.3 3.5ZM13.5 3.5L19 10L13.5 16.5H10.7L16.2 10L10.7 3.5Z",
  },
  {
    // Hash sign.
    id: "css",
    d: "M5.5 2h2.5v16H5.5zM12 2h2.5v16H12zM2 5.5h16v2.5H2zM2 12h16v2.5H2z",
  },
  {
    // Small hash over a tilde wave.
    id: "scss",
    d: "M5.5 1h2.4v11H5.5zM12.1 1h2.4v11h-2.4zM2 3.2h16v2.4H2zM2 7.4h16v2.4H2zM2 15.7C5 12.7 8 12.7 10 14.9C12 17.1 15 17.1 18 14.1V16.7C15 19.7 12 19.7 10 17.5C8 15.3 5 15.3 2 18.3Z",
  },
  {
    // Small hash over a minus bar.
    id: "less",
    d: "M5.5 1h2.4v11H5.5zM12.1 1h2.4v11h-2.4zM2 3.2h16v2.4H2zM2 7.4h16v2.4H2zM4 14.5h12v2.6H4z",
  },
  {
    // Framed landscape: mountain and sun.
    id: "image",
    d: "M1 1h18v18H1zM3 3v14h14V3zM3 17L7.5 9.5L10.5 13.5L12.5 11L17 17ZM13.5 5a2 2 0 1 1 0 4a2 2 0 1 1 0-4z",
  },
  {
    // Bezier S-curve with square anchor nodes.
    id: "svg",
    d: "M2.6 16a7.4 7.4 0 0 1 7.4-7.4a4.6 4.6 0 0 0 4.6-4.6h2.8a7.4 7.4 0 0 1-7.4 7.4a4.6 4.6 0 0 0-4.6 4.6zM1.5 13.5h5v5h-5zM13.5 1.5h5v5h-5z",
  },
  {
    // Eighth note.
    id: "audio",
    d: "M8 2h2.3v13H8zM7 12.6a3.2 2.4 0 1 1 0 4.8a3.2 2.4 0 1 1 0-4.8zM10.3 2C14 4 16 6 15 11H12.8C13.3 8 12 6.5 10.3 5.5Z",
  },
  {
    // Play triangle cut from a rounded rect.
    id: "video",
    d: "M4 1h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3zM7.5 5.5V14.5L14.5 10z",
  },
  {
    // Bold A with a counter.
    id: "font",
    d: "M8 2h4l6.5 16h-4l-1.4-3.8H6.9L5.5 18h-4zM10 6.2L8.1 11.2h3.8z",
  },
  {
    // Page outline with a folded corner and a bar.
    id: "pdf",
    d: "M3 1h9l5 5v13H3zM5 3v14h10V7h-4V3zM7 11h6v3H7z",
  },
  {
    // Box with lid and a zigzag zipper cut.
    id: "archive",
    d: "M1 1h18v4H1zM2 6.5h16V19H2zM7 7.5v3h3v-3zM10 10.5v3h3v-3zM7 13.5v3h3v-3z",
  },
  {
    // 3x3 bit grid: ones solid, zeros dimmed.
    id: "binary",
    d: "M1 1h5v5H1zM14 1h5v5h-5zM7.5 7.5h5v5h-5zM1 14h5v5H1zM7.5 14h5v5h-5z",
    d2: "M7.5 1h5v5h-5zM1 7.5h5v5H1zM14 7.5h5v5h-5zM14 14h5v5h-5z",
  },
  {
    // Map pin.
    id: "map",
    d: "M10 1a6.5 6.5 0 0 1 6.5 6.5c0 4.2-6.5 11.5-6.5 11.5S3.5 11.7 3.5 7.5A6.5 6.5 0 0 1 10 1zM10 5a2.5 2.5 0 0 0 0 5a2.5 2.5 0 0 0 0-5z",
  },
  {
    // Padlock with keyhole.
    id: "lock",
    d: "M5.5 11V7a4.5 4.5 0 0 1 9 0v4h-2.3V7a2.2 2.2 0 0 0-4.4 0v4zM3 10.5a1.5 1.5 0 0 1 1.5-1.5h11a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 17.5zM10 11.5A1.7 1.7 0 0 0 8.8 14.4L9 17h2l.2-2.6A1.7 1.7 0 0 0 10 11.5z",
  },
  {
    // Key: ring bow, shaft, two teeth.
    id: "key",
    d: "M5.5 5.5a4.5 4.5 0 1 1 0 9a4.5 4.5 0 1 1 0-9zM5.5 8.2a1.8 1.8 0 0 0 0 3.6a1.8 1.8 0 0 0 0-3.6zM9 8.8h10v2.4H9zM13.5 11h2.3v3h-2.3zM17 11h2v3.5h-2z",
  },
  {
    // Shield.
    id: "env",
    d: "M10 1L18 4V9.5C18 14.5 14.5 17.5 10 19C5.5 17.5 2 14.5 2 9.5V4Z",
  },
  {
    // Solid page with three cut lines.
    id: "log",
    d: "M3 1h14v18H3zM6 5v2h8V5zM6 9v2h8V9zM6 13v2h5v-2z",
  },
  {
    // 3x3 table grid.
    id: "csv",
    d: "M1 1h18v18H1zM3 3v14h14V3zM6.2 3h2.2v14H6.2zM11.6 3h2.2v14h-2.2zM3 6.2h14v2.2H3zM3 11.6h14v2.2H3z",
  },
  {
    // Plus over minus.
    id: "diff",
    d: "M8.75 2h2.5v2.75H14v2.5h-2.75V10h-2.5V7.25H6v-2.5h2.75zM6 13.5h8v2.5H6z",
  },
  {
    // Cylinder: top ellipse and rim crescents, body dimmed.
    id: "database",
    d: "M2 4.5a8 3.5 0 1 1 16 0a8 3.5 0 1 1-16 0zM2 9.5a8 3.5 0 0 0 16 0a8 1.3 0 0 1-16 0zM2 15.5a8 3.5 0 0 0 16 0a8 1.3 0 0 1-16 0z",
    d2: "M2 4.5v11a8 3.5 0 0 0 16 0v-11a8 3.5 0 0 1-16 0z",
  },
  {
    // Small cylinder with a magnifier.
    id: "sql",
    d: "M1 3.8a6.5 2.8 0 1 1 13 0a6.5 2.8 0 1 1-13 0zM13.5 9.5a4 4 0 1 1 0 8a4 4 0 1 1 0-8zM13.5 11.5a2 2 0 0 0 0 4a2 2 0 0 0 0-4zM16.45 14.75L19.15 17.45L17.45 19.15L14.75 16.45z",
    d2: "M1 3.8v8a6.5 2.8 0 0 0 13 0v-8a6.5 2.8 0 0 1-13 0z",
  },
  {
    // Hexagon ring with a triangle.
    id: "graphql",
    d: "M10 1L18 5.5V14.5L10 19L2 14.5V5.5ZM10 3.54L4.4 6.77V13.23L10 16.46L15.6 13.23V6.77ZM10 6L13.5 12.5H6.5Z",
  },
  {
    // Two stacked blocks, lower one dimmed.
    id: "proto",
    d: "M1.5 2h17v7h-17z",
    d2: "M1.5 10.5h17V18h-17z",
  },
  {
    // Triangular prism: two faces, right one dimmed.
    id: "prisma",
    d: "M10 1V18H1Z",
    d2: "M10 1L19 18H10Z",
  },
  {
    // Three slabs stepped like terraces.
    id: "tf",
    d: "M1 2h11v4H1zM4 8h11v4H4zM7 14h11v4H7z",
  },
  {
    // A dot and two short bars.
    id: "ini",
    d: "M4.6 2a2.6 2.6 0 1 1 0 5.2a2.6 2.6 0 1 1 0-5.2zM2 9h13v2.5H2zM2 14.5h9v2.5H2z",
  },
  {
    // Page outline with three binder rings and two cell bars.
    id: "ipynb",
    d: "M5 1h14v18H5zM7 3v14h10V3zM5 2a2.5 2.5 0 1 1 0 5a2.5 2.5 0 1 1 0-5zM5 7.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 1 1 0-5zM5 13a2.5 2.5 0 1 1 0 5a2.5 2.5 0 1 1 0-5zM9.5 6h5v2h-5zM9.5 11h5v2h-5z",
  },
  {
    // Bold T stepped over an E.
    id: "latex",
    d: "M1 1h12v3H8.5v9h-3V4H1zM10 7.5h9V10h-6v2h5v2.5h-5v2h6V19h-9z",
  },
  {
    // Bold T inside square brackets.
    id: "dts",
    d: "M1 2h3v2.2H3.2v11.6H4V18H1zM19 2h-3v2.2h1.8v11.6H16V18h3zM5.5 2h9v3h-3.2v13H8.7V5H5.5z",
  },
  {
    // Book outline with a star.
    id: "stories",
    d: "M2 1h16v18H2zM5 3v14h11V3zM10.5 5L11.85 8.14L15.26 8.45L12.69 10.71L13.44 14.05L10.5 12.3L7.56 14.05L8.31 10.71L5.74 8.45L9.15 8.14Z",
  },
];
