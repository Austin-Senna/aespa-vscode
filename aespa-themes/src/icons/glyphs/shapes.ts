/**
 * Path-building primitives for glyphs in the 0..20 box. Every helper returns
 * SVG path data. Positive shapes wind one way, holes the other, so nonzero
 * fill unions overlapping positives and cuts holes cleanly.
 *
 * Convention: pass polygon points in clockwise screen order (y grows down)
 * for positive shapes; use `hole: true` to reverse.
 */
import svgpath from "svgpath";

export type Point = [number, number];

const f = (n: number) => Number(n.toFixed(3)).toString();

export interface ShapeOptions {
  hole?: boolean;
}

export function circle(cx: number, cy: number, r: number, opts: ShapeOptions = {}): string {
  const sweep = opts.hole ? 0 : 1;
  return `M${f(cx - r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 ${sweep} ${f(cx + r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 ${sweep} ${f(cx - r)} ${f(cy)}Z`;
}

export function ring(cx: number, cy: number, outer: number, inner: number): string {
  return circle(cx, cy, outer) + circle(cx, cy, inner, { hole: true });
}

export function polygon(points: Point[], opts: ShapeOptions = {}): string {
  const pts = opts.hole ? [...points].reverse() : points;
  return `M${pts.map(([x, y]) => `${f(x)} ${f(y)}`).join("L")}Z`;
}

export function rect(x: number, y: number, w: number, h: number, opts: ShapeOptions = {}): string {
  return polygon([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], opts);
}

export function roundRect(x: number, y: number, w: number, h: number, r: number, opts: ShapeOptions = {}): string {
  const rr = Math.min(r, w / 2, h / 2);
  const d = `M${f(x + rr)} ${f(y)}H${f(x + w - rr)}A${f(rr)} ${f(rr)} 0 0 1 ${f(x + w)} ${f(y + rr)}V${f(y + h - rr)}A${f(rr)} ${f(rr)} 0 0 1 ${f(x + w - rr)} ${f(y + h)}H${f(x + rr)}A${f(rr)} ${f(rr)} 0 0 1 ${f(x)} ${f(y + h - rr)}V${f(y + rr)}A${f(rr)} ${f(rr)} 0 0 1 ${f(x + rr)} ${f(y)}Z`;
  return opts.hole ? reverse(d) : d;
}

/** A regular polygon or star. `inner` omitted gives a regular polygon. */
export function star(cx: number, cy: number, points: number, outer: number, inner?: number, rotationDeg = -90): string {
  const pts: Point[] = [];
  const n = inner === undefined ? points : points * 2;
  for (let i = 0; i < n; i++) {
    const r = inner === undefined || i % 2 === 0 ? outer : inner;
    const a = ((rotationDeg + (360 / n) * i) * Math.PI) / 180;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return polygon(pts);
}

/** Pie slice from startDeg to endDeg (clockwise on screen). */
export function sector(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const a0 = (startDeg * Math.PI) / 180;
  const a1 = (endDeg * Math.PI) / 180;
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M${f(cx)} ${f(cy)}L${f(cx + r * Math.cos(a0))} ${f(cy + r * Math.sin(a0))}A${f(r)} ${f(r)} 0 ${large} 1 ${f(cx + r * Math.cos(a1))} ${f(cy + r * Math.sin(a1))}Z`;
}

/** Arc band (a ring segment) from startDeg to endDeg. */
export function arcBand(cx: number, cy: number, outer: number, inner: number, startDeg: number, endDeg: number): string {
  const a0 = (startDeg * Math.PI) / 180;
  const a1 = (endDeg * Math.PI) / 180;
  const large = endDeg - startDeg > 180 ? 1 : 0;
  const p = (r: number, a: number) => `${f(cx + r * Math.cos(a))} ${f(cy + r * Math.sin(a))}`;
  return `M${p(outer, a0)}A${f(outer)} ${f(outer)} 0 ${large} 1 ${p(outer, a1)}L${p(inner, a1)}A${f(inner)} ${f(inner)} 0 ${large} 0 ${p(inner, a0)}Z`;
}

export interface StrokeOptions {
  cap?: "round" | "butt";
  closed?: boolean;
}

/**
 * Turn a polyline into a filled outline of the given width: one quad per
 * segment plus a disc at each joint (and ends, for round caps). All pieces
 * wind positive, so they union under nonzero.
 */
export function stroke(points: Point[], width: number, opts: StrokeOptions = {}): string {
  const half = width / 2;
  const pts = opts.closed ? [...points, points[0]] : points;
  const parts: string[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.hypot(dx, dy) || 1;
    const nx = (-dy / len) * half;
    const ny = (dx / len) * half;
    parts.push(polygon(orientCw([[x0 + nx, y0 + ny], [x1 + nx, y1 + ny], [x1 - nx, y1 - ny], [x0 - nx, y0 - ny]])));
  }
  const joints = opts.closed ? pts.slice(0, -1) : opts.cap === "butt" ? pts.slice(1, -1) : pts;
  for (const [x, y] of joints) {
    parts.push(circle(x, y, half));
  }
  return parts.join("");
}

/** Rotate, scale and translate path data (applied in that order) about the origin. */
export function transform(d: string, opts: { rotate?: number; scale?: number; translate?: Point; around?: Point } = {}): string {
  const [ax, ay] = opts.around ?? [10, 10];
  let p = svgpath(d).translate(-ax, -ay);
  if (opts.rotate) {
    p = p.rotate(opts.rotate);
  }
  if (opts.scale) {
    p = p.scale(opts.scale);
  }
  p = p.translate(ax, ay);
  if (opts.translate) {
    p = p.translate(opts.translate[0], opts.translate[1]);
  }
  return p.round(3).toString();
}

/** Mirror across the vertical center line of the box. */
export function mirrorX(d: string, cx = 10): string {
  return svgpath(d).translate(-cx, 0).scale(-1, 1).translate(cx, 0).round(3).toString();
}

/** Reverse a path's direction (positive <-> hole) for simple polygon/arc paths. */
export function reverse(d: string): string {
  return svgpath(d).abs().unarc().unshort().iterate((seg) => [seg]).toString().length > 0 ? reversePolyline(d) : d;
}

function reversePolyline(d: string): string {
  // Flatten to a polygon by sampling curves, then reverse point order.
  const pts: Point[] = [];
  svgpath(d).abs().unarc().unshort().iterate((seg) => {
    const cmd = seg[0] as string;
    if (cmd === "M" || cmd === "L") {
      pts.push([seg[1] as number, seg[2] as number]);
    } else if (cmd === "C") {
      const [x0, y0] = pts[pts.length - 1];
      for (let t = 0.2; t <= 1.0001; t += 0.2) {
        const mt = 1 - t;
        pts.push([
          mt * mt * mt * x0 + 3 * mt * mt * t * (seg[1] as number) + 3 * mt * t * t * (seg[3] as number) + t * t * t * (seg[5] as number),
          mt * mt * mt * y0 + 3 * mt * mt * t * (seg[2] as number) + 3 * mt * t * t * (seg[4] as number) + t * t * t * (seg[6] as number),
        ]);
      }
    }
  });
  return polygon(pts.reverse());
}

function signedArea(points: Point[]): number {
  let a = 0;
  for (let i = 0; i < points.length; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[(i + 1) % points.length];
    a += x0 * y1 - x1 * y0;
  }
  return a / 2;
}

/** Ensure a polygon winds "positive" (clockwise on screen, positive signed area in y-down space). */
export function orientCw(points: Point[]): Point[] {
  return signedArea(points) < 0 ? [...points].reverse() : points;
}

export function union(...parts: string[]): string {
  return parts.join("");
}
