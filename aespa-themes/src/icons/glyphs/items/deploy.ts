// Deploy configs (vercel.json, netlify.toml, fly.toml, wrangler.toml, Procfile):
// an upright rocket built with ../shapes.ts. Sized for 16 px: body 7.6 units
// wide, porthole 3.8 units across, fins 3.6 units deep. The flame sits on the
// d2 layer so it reads as a lighter tongue under the nozzle rather than
// merging into the body. No logo, fill only.
import { circle, orientCw, polygon, rect, union, type Point } from "../shapes.js";
import type { Glyph } from "../types.js";

const CX = 10;
const NOSE_Y = 0.6;
const SHOULDER_Y = 7.2;
const BODY_HALF = 3.8;
const BODY_BOTTOM = 14.2;
const NOZZLE_BOTTOM = 15.6;
const PORTHOLE_R = 1.9;

// Pointed nose easing into straight sides, closed flat at the bottom.
const body =
  `M${CX} ${NOSE_Y}` +
  `C${CX + 2.7} ${NOSE_Y + 1.9} ${CX + BODY_HALF} ${SHOULDER_Y - 2.6} ${CX + BODY_HALF} ${SHOULDER_Y}` +
  `V${BODY_BOTTOM}H${CX - BODY_HALF}V${SHOULDER_Y}` +
  `C${CX - BODY_HALF} ${SHOULDER_Y - 2.6} ${CX - 2.7} ${NOSE_Y + 1.9} ${CX} ${NOSE_Y}Z`;

const porthole = circle(CX, 8.2, PORTHOLE_R, { hole: true });

/** A swept fin on one side (-1 left, +1 right), overlapping the body edge so it unions cleanly. */
function fin(side: -1 | 1): string {
  const inner = CX + side * (BODY_HALF - 0.2);
  const outer = CX + side * 7.2;
  const pts: Point[] = [[inner, 9.4], [inner, 15.6], [outer, 16.6], [outer, 13.6]];
  return polygon(orientCw(pts));
}

const nozzle = rect(CX - 1.8, BODY_BOTTOM, 3.6, NOZZLE_BOTTOM - BODY_BOTTOM);

// Teardrop flame hanging from the nozzle.
const flame =
  `M${CX - 2.4} ${NOZZLE_BOTTOM}H${CX + 2.4}` +
  `C${CX + 2.4} ${NOZZLE_BOTTOM + 1.9} ${CX + 1.2} ${NOZZLE_BOTTOM + 3.3} ${CX} ${NOZZLE_BOTTOM + 4}` +
  `C${CX - 1.2} ${NOZZLE_BOTTOM + 3.3} ${CX - 2.4} ${NOZZLE_BOTTOM + 1.9} ${CX - 2.4} ${NOZZLE_BOTTOM}Z`;

export const GLYPH: Glyph = {
  id: "deploy",
  source: "custom: upright rocket with porthole, fins and flame",
  d: union(body, porthole, fin(-1), fin(1), nozzle),
  d2: flame,
};
