// Custom: database cylinder with a bold magnifier knocked out of the body.
import { circle, polygon, stroke, union, type Point } from "../shapes.js";
import type { Glyph } from "../types.js";

// Cylinder: top ellipse at full opacity in d, body in d2 at 45%.
const CX = 8;
const RX = 7;
const RY = 2.8;
const TOP = 3.8;
const BOTTOM = 14.2;

// Magnifier: thick ring plus a round-capped handle toward the bottom-right.
const LENS: Point = [13.8, 12.6];
const OUTER = 3.6;
const INNER = 1.9;
const HANDLE_W = 2.3;
const HANDLE_END: Point = [18.5, 17.3];
const GAP = 1.1;

const STEPS = 48;

/** Points along an ellipse arc, angles in degrees, increasing = clockwise on screen (y down). */
function arcPts(cx: number, cy: number, rx: number, ry: number, from: number, to: number): Point[] {
  const pts: Point[] = [];
  const n = Math.max(1, Math.round((STEPS * (to - from)) / 360));
  for (let i = 0; i <= n; i++) {
    const a = ((from + ((to - from) * i) / n) * Math.PI) / 180;
    pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
  }
  return pts;
}

/** Cylinder body, clockwise: top bulge left to right, down the right side, bottom bulge right to left, up. */
function body(): Point[] {
  return [...arcPts(CX, TOP, RX, RY, 180, 360), ...arcPts(CX, BOTTOM, RX, RY, 0, 180)];
}

const [lx, ly] = LENS;
const [ex, ey] = HANDLE_END;
const handleLen = Math.hypot(ex - lx, ey - ly);
const ux = (ex - lx) / handleLen;
const uy = (ey - ly) / handleLen;
const handleDeg = (Math.atan2(uy, ux) * 180) / Math.PI;

/** Handle starts just inside the ring so the two union without a notch. */
const HANDLE_START: Point = [lx + ux * (OUTER - 0.4), ly + uy * (OUTER - 0.4)];

/** Magnifier silhouette grown by GAP, as one clockwise polygon so it cuts a single clean hole. */
function knockout(): Point[] {
  const r = OUTER + GAP;
  const half = HANDLE_W / 2 + GAP;
  const spread = (Math.asin(half / r) * 180) / Math.PI;
  // Normal on the clockwise side of the handle direction.
  const nx = -uy * half;
  const ny = ux * half;
  const lens = arcPts(lx, ly, r, r, handleDeg + spread, handleDeg + 360 - spread);
  const cap = arcPts(ex, ey, half, half, handleDeg - 90, handleDeg + 90);
  return [...lens, [ex - nx, ey - ny], ...cap, [ex + nx, ey + ny]];
}

/** Sutherland-Hodgman: clip a polygon to a convex clockwise polygon, so a hole never escapes its host. */
function clipToConvex(subject: Point[], clip: Point[]): Point[] {
  let out = subject;
  for (let i = 0; i < clip.length; i++) {
    const [ax, ay] = clip[i];
    const [bx, by] = clip[(i + 1) % clip.length];
    const inside = ([px, py]: Point) => (bx - ax) * (py - ay) - (by - ay) * (px - ax) >= 0;
    const cross = (p: Point, q: Point): Point => {
      const t = ((ax - p[0]) * (by - ay) - (ay - p[1]) * (bx - ax)) / ((q[0] - p[0]) * (by - ay) - (q[1] - p[1]) * (bx - ax));
      return [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
    };
    const input = out;
    out = [];
    for (let j = 0; j < input.length; j++) {
      const cur = input[j];
      const prev = input[(j + input.length - 1) % input.length];
      if (inside(cur)) {
        if (!inside(prev)) {
          out.push(cross(prev, cur));
        }
        out.push(cur);
      } else if (inside(prev)) {
        out.push(cross(prev, cur));
      }
    }
  }
  return out;
}

const BODY = body();

export const GLYPH: Glyph = {
  id: "sql",
  source: "custom",
  d: union(
    polygon(arcPts(CX, TOP, RX, RY, 0, 360)),
    circle(lx, ly, OUTER),
    circle(lx, ly, INNER, { hole: true }),
    stroke([HANDLE_START, HANDLE_END], HANDLE_W),
  ),
  d2: union(polygon(BODY), polygon(clipToConvex(knockout(), BODY), { hole: true })),
};
