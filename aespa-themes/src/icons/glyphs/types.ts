/** A vector mark drawn inside a 0..20 box, filled with one color. */
export interface Glyph {
  /** Catalog id this glyph serves (file icon id, folder icon id, or era slug for motifs). */
  id: string;
  /**
   * SVG path data in a 0..20 viewBox. Fill only (nonzero rule), no strokes,
   * may contain several subpaths. Designed to read at 10 px on screen.
   */
  d: string;
  /** Optional second layer drawn at 45% opacity in the same color, for two-tone depth. */
  d2?: string;
  /** Fill rule for d and d2. Default nonzero; imported icons that rely on evenodd set this. */
  fillRule?: "evenodd";
  /** Where the shape came from, for attribution (e.g. "mdi:snake", "phosphor:flask-fill"). */
  source?: string;
}
