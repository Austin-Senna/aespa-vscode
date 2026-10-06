/** Semantic token colors. Mostly mirrors the TextMate roles, with what only a language server knows. */
import type { EraPalette } from "./palette.js";
import { styleOf } from "./palette.js";

export type SemanticStyle = string | { foreground?: string; bold?: boolean; italic?: boolean; underline?: boolean; strikethrough?: boolean };

export type SemanticTokenColors = Record<string, SemanticStyle>;

export function semanticTokenColors(era: EraPalette): SemanticTokenColors {
  const { syntax, fg } = era;
  const style = styleOf(era);
  const colors: SemanticTokenColors = {
    "namespace": syntax.storage,
    "class": syntax.type,
    "enum": syntax.type,
    "interface": syntax.type,
    "struct": syntax.type,
    "typeParameter": syntax.type,
    "type": syntax.type,
    "parameter": syntax.variable,
    "variable": syntax.variable,
    "variable.readonly": syntax.number,
    "variable.defaultLibrary": syntax.type,
    "property": syntax.property,
    "property.readonly": syntax.number,
    "enumMember": syntax.number,
    "decorator": syntax.attribute,
    "event": syntax.attribute,
    "function": syntax.function,
    "function.defaultLibrary": syntax.function,
    "method": syntax.function,
    "macro": syntax.keyword,
    "label": syntax.keyword,
    "comment": syntax.comment,
    "string": syntax.string,
    "keyword": syntax.keyword,
    "number": syntax.number,
    "regexp": syntax.regexp,
    "operator": syntax.operator,
    "selfParameter": syntax.keyword,
    "clsParameter": syntax.keyword,
    "builtinConstant": syntax.number,
    "magicFunction": syntax.type,
    "newOperator": syntax.keyword,
    "stringLiteral": syntax.string,
    "numberLiteral": syntax.number,
    "customLiteral": syntax.function,
    "*.deprecated": { strikethrough: true, foreground: fg.muted },
  };
  if (style.boldKeywords) {
    colors["keyword"] = { foreground: syntax.keyword, bold: true };
  }
  if (style.underlineTypes) {
    for (const key of ["class", "enum", "interface", "struct", "typeParameter", "type"]) {
      colors[key] = { foreground: syntax.type, underline: true };
    }
  }
  if (style.italicComments) {
    colors["comment"] = { foreground: syntax.comment, italic: true };
  }
  return colors;
}
