import type { Glyph } from "./types.js";

/**
 * Folder-front marks. Each sits on the face of a folder shape and has to read
 * at ~9 px, so silhouettes are heavy: nothing thinner than 2.5 units, holes
 * no narrower than 2 units, roughly 1 unit of margin in the 0..20 box.
 *
 * Winding: positive shapes run clockwise on screen, holes counter-clockwise.
 * Positive shapes may overlap each other or cross a hole; two holes never overlap.
 */
export const GLYPHS: Glyph[] = [
  {
    // < > code brackets
    id: "folder-src",
    d: "M1 10L5.5 4.5H9L4.5 10L9 15.5H5.5ZM19 10L14.5 4.5H11L15.5 10L11 15.5H14.5Z",
  },
  {
    // three book spines on a shelf
    id: "folder-lib",
    d: "M1 4H6V16H1ZM7.5 6H12.5V16H7.5ZM14 2H19V16H14Z",
    d2: "M1 16.5H19V19H1Z",
  },
  {
    // open box, arrow leaving to the right
    id: "folder-out",
    d: "M1 4H11V6.5H1ZM1 13.5H11V16H1ZM1 4H3.5V16H1ZM5 8.5H14V11.5H5ZM13 5L19 10L13 15Z",
  },
  {
    // isometric cube: top face solid, front edge solid, side faces at 45%
    id: "folder-deps",
    d: "M10 2L17 6L10 10L3 6ZM8.75 10H11.25V17.3L10 18L8.75 17.3Z",
    d2: "M3 6L10 10V18L3 14ZM10 10L17 6V14L10 18Z",
  },
  {
    // globe: ring, equator, meridian ellipse
    id: "folder-public",
    d: "M10 1A9 9 0 1 1 10 19A9 9 0 1 1 10 1ZM10 3.5A6.5 6.5 0 1 0 10 16.5A6.5 6.5 0 1 0 10 3.5ZM1 8.75H19V11.25H1ZM10 1A4 9 0 1 1 10 19A4 9 0 1 1 10 1ZM10 3.5A1.5 6.5 0 1 0 10 16.5A1.5 6.5 0 1 0 10 3.5Z",
  },
  {
    // mountains and a sun
    id: "folder-media",
    d: "M1 18L7.5 5L12 14L14 11L19 18ZM16 2.25A2.75 2.75 0 1 1 16 7.75A2.75 2.75 0 1 1 16 2.25Z",
  },
  {
    // paint drop
    id: "folder-styles",
    d: "M10 1.5L15 6.6A7 7 0 1 1 5 6.6Z",
  },
  {
    // window: title bar, narrow sidebar, wide main pane
    id: "folder-ui",
    d: "M1 3H19V17H1ZM3.5 6.5V14.5H7V6.5ZM9.5 6.5V14.5H16.5V6.5Z",
  },
  {
    // wrench, handle lower-left, open jaw upper-right
    id: "folder-utils",
    d: "M2.76 14.76L11.25 6.28L13.72 8.75L5.24 17.24ZM17.14 5.69A5 5 0 1 1 14.31 2.86L11.42 5.75L14.25 8.58Z",
  },
  {
    // erlenmeyer flask
    id: "folder-test",
    d: "M7.5 1.5H12.5V7.5L19 17L18 18.5H2L1 17L7.5 7.5Z",
  },
  {
    // open book, two leaves
    id: "folder-docs",
    d: "M1.5 3.5Q5.5 2.5 8.75 5V17.5Q5.5 15 1.5 16ZM11.25 5Q14.5 2.5 18.5 3.5V16Q14.5 15 11.25 17.5Z",
  },
  {
    // terminal prompt: chevron and underscore
    id: "folder-scripts",
    d: "M1.5 4.5H5.5L11 10L5.5 15.5H1.5L7 10ZM12 13H18.5V16H12Z",
  },
  {
    // six-tooth gear
    id: "folder-config",
    d: "M8.03 3.54L8.24 0.92L11.76 0.92L11.97 3.54A6.75 6.75 0 0 1 14.6 5.06L16.98 3.93L18.75 6.99L16.58 8.48A6.75 6.75 0 0 1 16.58 11.52L18.75 13.01L16.98 16.07L14.6 14.94A6.75 6.75 0 0 1 11.97 16.46L11.76 19.08L8.24 19.08L8.03 16.46A6.75 6.75 0 0 1 5.4 14.94L3.02 16.07L1.25 13.01L3.42 11.52A6.75 6.75 0 0 1 3.42 8.48L1.25 6.99L3.02 3.93L5.4 5.06A6.75 6.75 0 0 1 8.03 3.54ZM10 7.25A2.75 2.75 0 1 0 10 12.75A2.75 2.75 0 1 0 10 7.25Z",
  },
  {
    // bold T inside square brackets
    id: "folder-types",
    d: "M1 3H5V5.5H3.5V14.5H5V17H1ZM15 3H19V17H15V14.5H16.5V5.5H15ZM7 3H13V6H7ZM8.5 6H11.5V17H8.5Z",
  },
  {
    // plug on its side: cord left, prongs right
    id: "folder-api",
    d: "M1 8.75H5V11.25H1ZM9 3H13V17H9Q5 17 5 13V7Q5 3 9 3ZM13 4.5H19V7.5H13ZM13 12.5H19V15.5H13Z",
  },
  {
    // branch: trunk with two nodes, third node joined by an elbow
    id: "folder-git",
    d: "M5 1A3 3 0 1 1 5 7A3 3 0 1 1 5 1ZM5 13A3 3 0 1 1 5 19A3 3 0 1 1 5 13ZM15.5 1A3 3 0 1 1 15.5 7A3 3 0 1 1 15.5 1ZM3.75 4H6.25V16H3.75ZM14.25 4H16.75V7A6.25 6.25 0 0 1 10.5 13.25H5V10.75H10.5A3.75 3.75 0 0 0 14.25 7Z",
  },
  {
    // text cursor I-beam
    id: "folder-ide",
    d: "M4 1.5H16V4.5H11.5V15.5H16V18.5H4V15.5H8.5V4.5H4Z",
  },
  {
    // hourglass
    id: "folder-tmp",
    d: "M2 1.5H18V4L11.25 10L18 16V18.5H2V16L8.75 10L2 4Z",
  },
  {
    // two speech bubbles, back one at 45%
    id: "folder-i18n",
    d: "M9 7.5H17Q19 7.5 19 9.5V14Q19 16 17 16L18 19L15 16H9Q7 16 7 14V9.5Q7 7.5 9 7.5Z",
    d2: "M3 1.5H11Q13 1.5 13 3.5V8Q13 10 11 10H5L2 13L3 10Q1 10 1 8V3.5Q1 1.5 3 1.5Z",
  },
  {
    // database cylinder: top disc solid, body at 45%
    id: "folder-db",
    d: "M1.5 5A8.5 3.5 0 1 1 18.5 5A8.5 3.5 0 1 1 1.5 5Z",
    d2: "M1.5 5H18.5V15.5A8.5 3.5 0 0 1 1.5 15.5Z",
  },
  {
    // two stacked boxes
    id: "folder-packages",
    d: "M1 11.5H19V18.5H1ZM4 2H16V9.5H4Z",
  },
  {
    // lightbulb
    id: "folder-examples",
    d: "M10 1A6.75 6.75 0 1 1 10 14.5A6.75 6.75 0 1 1 10 1ZM7 11H13V15.5H7ZM7.5 17H12.5V19H7.5Z",
  },
  {
    // shipping container, two horizontal slats cut out
    id: "folder-docker",
    d: "M1 3.5H19V16.5H1ZM4 6.5V8.75H16V6.5ZM4 11.25V13.5H16V11.25Z",
  },
  {
    // shield with keyhole
    id: "folder-security",
    d: "M10 1L18.5 4V10Q18.5 16 10 19Q1.5 16 1.5 10V4ZM8.5 10V15H11.5V10A2.5 2.5 0 1 0 8.5 10Z",
  },
  {
    // magic wand with a four-point sparkle, small echo sparkle at 45%
    id: "folder-generated",
    d: "M1.94 15.94L10.44 7.44L12.56 9.56L4.06 18.06ZM14.5 1L16.25 3.75L19 5.5L16.25 7.25L14.5 10L12.75 7.25L10 5.5L12.75 3.75Z",
    d2: "M4.5 2.5L5.3 4.2L7 5L5.3 5.8L4.5 7.5L3.7 5.8L2 5L3.7 4.2Z",
  },
  {
    // four-point sparkle
    id: "folder-root",
    d: "M10 1L12.5 7.5L19 10L12.5 12.5L10 19L7.5 12.5L1 10L7.5 7.5Z",
  },
];
