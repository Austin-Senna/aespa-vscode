/** Per-era palette shape. Every theme is compiled from one of these. */

export type ThemeType = "dark" | "light";

export type Finish = "chrome" | "matte" | "mono" | "candy" | "grunge";

export interface Seed {
  /** Fansite --era-a: dominant. */
  a: string;
  /** Fansite --era-b: secondary. */
  b: string;
  /** Fansite --era-glow: shader highlight. */
  glow: string;
}

export interface Backgrounds {
  /** Editor background. */
  base: string;
  /** Side bar, panel, activity bar. */
  mantle: string;
  /** Title bar, status bar, deepest chrome. */
  crust: string;
}

export interface Surfaces {
  /** Hover, line highlight. */
  s0: string;
  /** Selection, active list rows. */
  s1: string;
  /** Overlays, widgets, scrollbar. */
  s2: string;
}

export interface Foregrounds {
  text: string;
  subtext: string;
  muted: string;
}

export interface SyntaxRoles {
  keyword: string;
  storage: string;
  string: string;
  number: string;
  function: string;
  type: string;
  variable: string;
  property: string;
  comment: string;
  operator: string;
  tag: string;
  attribute: string;
  regexp: string;
  escape: string;
}

export interface StatusRoles {
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface AnsiRoles {
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  cyan: string;
  white: string;
  brightBlack: string;
  brightRed: string;
  brightGreen: string;
  brightYellow: string;
  brightBlue: string;
  brightMagenta: string;
  brightCyan: string;
  brightWhite: string;
}

export interface StyleFlags {
  italicComments: boolean;
  boldKeywords: boolean;
  underlineTypes: boolean;
}

export interface EraPalette {
  slug: string;
  /** Picker label, e.g. "aespa · Savage". */
  label: string;
  /** Era title as the fansite spells it. */
  title: string;
  year: number;
  type: ThemeType;
  finish: Finish;
  seed: Seed;
  bg: Backgrounds;
  surface: Surfaces;
  border: string;
  fg: Foregrounds;
  accent: string;
  accent2: string;
  syntax: SyntaxRoles;
  status: StatusRoles;
  ansi?: Partial<AnsiRoles>;
  style?: Partial<StyleFlags>;
}

export const DEFAULT_STYLE: StyleFlags = {
  italicComments: true,
  boldKeywords: false,
  underlineTypes: false,
};

export function styleOf(era: EraPalette): StyleFlags {
  return { ...DEFAULT_STYLE, ...era.style };
}
