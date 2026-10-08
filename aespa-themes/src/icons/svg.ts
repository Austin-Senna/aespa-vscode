/** SVG templates for file chips and folders, colored and finished from an era palette. */
import { alpha, mix } from "../color.js";
import type { EraPalette, Finish } from "../palette.js";
import { glyphFor, type Glyph } from "./glyphs/index.js";
import { GLYPH_HEIGHT, labelPath, labelWidth } from "./pixelfont.js";

export const SIZE = 32;

/** Colors an icon may reference, by role name. */
export type IconRole =
  | keyof EraPalette["syntax"]
  | keyof EraPalette["status"]
  | "accent"
  | "accent2"
  | "muted"
  | "subtext"
  | "text";

export function roleColor(era: EraPalette, role: IconRole): string {
  if (role in era.syntax) {
    return era.syntax[role as keyof EraPalette["syntax"]];
  }
  if (role in era.status) {
    return era.status[role as keyof EraPalette["status"]];
  }
  switch (role) {
    case "accent":
      return era.accent;
    case "accent2":
      return era.accent2;
    case "muted":
      return era.fg.muted;
    case "subtext":
      return era.fg.subtext;
    case "text":
      return era.fg.text;
  }
  throw new Error(`Unknown icon role ${role}`);
}

/** What goes on the face of an icon: a drawn glyph, a pixel label, or nothing. */
export type Mark = { glyph: Glyph } | { label: string } | null;

export function resolveMark(glyphId: string | undefined, label: string | null): Mark {
  const glyph = glyphId ? glyphFor(glyphId) : undefined;
  if (glyph) {
    return { glyph };
  }
  return label ? { label } : null;
}

function labelMark(label: string, color: string, boxX: number, boxY: number, boxW: number, boxH: number, maxScale: number): string {
  const w = labelWidth(label);
  const scale = Math.min(maxScale, (boxW - 4) / w);
  const x = boxX + (boxW - w * scale) / 2;
  const y = boxY + (boxH - GLYPH_HEIGHT * scale) / 2;
  return `<path fill="${color}" d="${labelPath(label, x, y, scale)}"/>`;
}

function glyphMark(glyph: Glyph, color: string, x: number, y: number, size: number, opacity = 1): string {
  const s = (size / 20).toFixed(3);
  const rule = glyph.fillRule ? ` fill-rule="${glyph.fillRule}"` : "";
  const second = glyph.d2 ? `<path d="${glyph.d2}" fill="${color}" opacity="0.45"${rule}/>` : "";
  const op = opacity < 1 ? ` opacity="${opacity}"` : "";
  return `<g transform="translate(${x} ${y}) scale(${s})"${op}><path d="${glyph.d}" fill="${color}"${rule}/>${second}</g>`;
}

function svg(defs: string, body: string): string {
  const d = defs ? `<defs>${defs}</defs>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">${d}${body}</svg>\n`;
}

/** Era finish: how the chip surface is shaded. Returns defs and the fill to use. */
function surfaceFill(finish: Finish, base: string, color: string, dark: boolean, id: string): { defs: string; fill: string; overlay: string } {
  switch (finish) {
    case "chrome": {
      const hi = mix(base, dark ? "#ffffff" : "#ffffff", dark ? 0.16 : 0.5);
      const lo = mix(base, "#000000", dark ? 0.22 : 0.06);
      const mid = mix(base, color, 0.08);
      return {
        defs: `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset="0.45" stop-color="${mid}"/><stop offset="0.62" stop-color="${lo}"/><stop offset="1" stop-color="${hi}"/></linearGradient>`,
        fill: `url(#${id})`,
        overlay: "",
      };
    }
    case "candy": {
      const top = mix(base, "#ffffff", dark ? 0.1 : 0.35);
      return {
        defs: `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${base}"/></linearGradient>`,
        fill: `url(#${id})`,
        overlay: `<ellipse cx="11" cy="5.5" rx="5.5" ry="2" fill="#ffffff" opacity="${dark ? 0.12 : 0.32}"/>`,
      };
    }
    case "grunge":
    case "matte":
    case "mono":
      return { defs: "", fill: base, overlay: "" };
  }
}

/** Dirty Work's hazard stripes, clipped to a rect. */
function hazardBar(x: number, y: number, w: number, h: number, color: string, id: string): { defs: string; body: string } {
  const stripes: string[] = [];
  for (let sx = x - h; sx < x + w + h; sx += 6) {
    stripes.push(`<path d="M${sx} ${y + h}l${h} -${h}h3l-${h} ${h}z" fill="${color}"/>`);
  }
  return {
    defs: `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>`,
    body: `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${alpha(color, 0.35)}"/><g clip-path="url(#${id})">${stripes.join("")}</g>`,
  };
}

/**
 * A file icon. Known kinds render as a full-size glyph or big pixel label in
 * the role color so they differ at a glance; `framed` kinds (the unknown
 * file) render as a document chip carrying the era motif.
 */
export function fileIcon(era: EraPalette, role: IconRole, mark: Mark, framed = false): string {
  const color = roleColor(era, role);
  const dark = era.type === "dark";
  if (!framed && mark !== null) {
    const surface = surfaceFill(era.finish, color, color, dark, "s");
    if ("glyph" in mark) {
      const rule = mark.glyph.fillRule ? ` fill-rule="${mark.glyph.fillRule}"` : "";
      const second = mark.glyph.d2 ? `<path d="${mark.glyph.d2}" fill="${surface.fill}" opacity="0.45"${rule}/>` : "";
      return svg(surface.defs, `<g transform="translate(2 2) scale(1.4)"><path d="${mark.glyph.d}" fill="${surface.fill}"${rule}/>${second}</g>`);
    }
    // Pixel letters stay flat: a gradient breaks them into unrelated squares.
    const w = labelWidth(mark.label);
    const scale = Math.min(4.2, 29 / w);
    const x = (32 - w * scale) / 2;
    const y = (32 - GLYPH_HEIGHT * scale) / 2;
    return svg("", `<path fill="${color}" d="${labelPath(mark.label, x, y, scale)}"/>`);
  }
  const base = mix(era.surface.s1, color, dark ? 0.1 : 0.08);
  const stroke = mix(era.border, color, 0.45);
  const fold = mix(era.surface.s2, color, 0.2);
  const surface = surfaceFill(era.finish, base, color, dark, "s");
  const outline = `<path d="M5.5 1.5h15L28.5 9.5v19a2 2 0 0 1-2 2h-21a2 2 0 0 1-2-2v-25a2 2 0 0 1 2-2z" fill="${surface.fill}" stroke="${stroke}" stroke-width="1"/>`;
  const corner = `<path d="M20.5 1.5v6a2 2 0 0 0 2 2h6z" fill="${fold}" stroke="${stroke}" stroke-width="1" stroke-linejoin="round"/>`;
  let defs = surface.defs;
  let bar: string;
  if (era.finish === "grunge") {
    const hz = hazardBar(3.5, 25.5, 25, 3.5, color, "h");
    defs += hz.defs;
    bar = hz.body;
  } else {
    bar = `<rect x="3.5" y="26.5" width="25" height="2.5" fill="${alpha(color, 0.9)}"/>`;
  }
  const content = mark && "glyph" in mark
    ? glyphMark(mark.glyph, color, 7.5, 8.5, 17)
    : `<path fill="${alpha(era.fg.muted, 0.75)}" d="M8 14h16v2.5H8zM8 19h16v2.5H8zM8 24h10v2.5H8z"/>`;
  return svg(defs, outline + corner + surface.overlay + bar + content);
}

/**
 * A folder, closed or open: solid role color with the mark cut out in the
 * background color, so each kind is a distinct colored shape.
 */
export function folderIcon(era: EraPalette, role: IconRole, mark: Mark, open: boolean, markScale = 1): string {
  const color = roleColor(era, role);
  const dark = era.type === "dark";
  const body = dark ? mix(color, era.bg.base, 0.22) : mix(color, "#ffffff", 0.08);
  const tab = dark ? mix(color, "#ffffff", 0.12) : mix(color, "#000000", 0.12);
  const front = dark ? mix(color, "#ffffff", 0.06) : mix(color, "#ffffff", 0.16);
  const cut = dark ? era.bg.crust : "#ffffff";
  const surface = surfaceFill(era.finish, open ? front : body, color, dark, "s");
  const back = `<path d="M2 7.5a2 2 0 0 1 2-2h7.5l3 3h13.5a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-24a2 2 0 0 1-2-2z" fill="${tab}"/>`;
  const flap = open
    ? `<path d="M5 13h25l-3 13a2 2 0 0 1-2 1.5h-21a2 2 0 0 1-2-2z" fill="${surface.fill}"/>`
    : `<path d="M2 12h28v14.5a2 2 0 0 1-2 2h-24a2 2 0 0 1-2-2z" fill="${surface.fill}"/>`;
  const gloss = era.finish === "candy" ? `<rect x="4" y="${open ? 15 : 14}" width="24" height="3" rx="1.5" fill="#ffffff" opacity="${dark ? 0.16 : 0.35}"/>` : "";
  let defs = surface.defs;
  let stripe = "";
  if (era.finish === "grunge") {
    const hz = hazardBar(2, open ? 25.5 : 26, 28, 2.5, cut, "h");
    defs += hz.defs;
    stripe = hz.body;
  }
  let text = "";
  if (mark && "glyph" in mark) {
    const size = 14 * markScale;
    text = glyphMark(mark.glyph, cut, 16 - size / 2, (open ? 21 : 20) - size / 2, size);
  } else if (mark && "label" in mark) {
    text = labelMark(mark.label, cut, 3, open ? 15 : 13, 26, 13, 2.2);
  }
  return svg(defs, back + flap + gloss + stripe + text);
}
