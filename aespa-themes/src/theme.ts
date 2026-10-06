/** Compile an era palette into a VS Code color theme document. */
import type { EraPalette } from "./palette.js";
import { semanticTokenColors, type SemanticTokenColors } from "./semantic.js";
import { tokenColors, type TokenRule } from "./tokens.js";
import { workbenchColors, type WorkbenchColors } from "./workbench.js";

export interface ThemeDocument {
  $schema: string;
  name: string;
  type: "dark" | "light";
  semanticHighlighting: true;
  colors: WorkbenchColors;
  tokenColors: TokenRule[];
  semanticTokenColors: SemanticTokenColors;
}

export function compileTheme(era: EraPalette): ThemeDocument {
  return {
    $schema: "vscode://schemas/color-theme",
    name: era.label,
    type: era.type,
    semanticHighlighting: true,
    colors: workbenchColors(era),
    tokenColors: tokenColors(era),
    semanticTokenColors: semanticTokenColors(era),
  };
}

export function themeFileName(era: EraPalette): string {
  return `${era.slug}-color-theme.json`;
}

export function uiTheme(era: EraPalette): "vs" | "vs-dark" {
  return era.type === "dark" ? "vs-dark" : "vs";
}
