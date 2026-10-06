/** TextMate token color rules, shared across eras and driven by syntax roles. */
import type { EraPalette } from "./palette.js";
import { styleOf } from "./palette.js";

export interface TokenRule {
  name?: string;
  scope: string | string[];
  settings: {
    foreground?: string;
    fontStyle?: string;
  };
}

function joinStyles(...parts: Array<string | false>): string | undefined {
  const s = parts.filter(Boolean).join(" ");
  return s.length > 0 ? s : undefined;
}

export function tokenColors(era: EraPalette): TokenRule[] {
  const { syntax, fg, status } = era;
  const style = styleOf(era);
  const keywordStyle = joinStyles(style.boldKeywords && "bold");
  const typeStyle = joinStyles(style.underlineTypes && "underline");
  const commentStyle = joinStyles(style.italicComments && "italic");

  const rules: TokenRule[] = [
    {
      name: "Comments",
      scope: ["comment", "punctuation.definition.comment", "string.quoted.docstring"],
      settings: { foreground: syntax.comment, fontStyle: commentStyle },
    },
    {
      name: "Doc comment tags",
      scope: ["comment.block.documentation storage.type.class", "comment.block.documentation entity.name.type.instance"],
      settings: { foreground: syntax.property, fontStyle: commentStyle },
    },
    {
      name: "Strings",
      scope: ["string", "string.quoted", "string.template", "meta.embedded.assembly"],
      settings: { foreground: syntax.string },
    },
    {
      name: "String punctuation",
      scope: ["punctuation.definition.string"],
      settings: { foreground: syntax.string },
    },
    {
      name: "Template expression delimiters",
      scope: [
        "punctuation.definition.template-expression.begin",
        "punctuation.definition.template-expression.end",
        "punctuation.section.embedded",
        "punctuation.definition.interpolation",
      ],
      settings: { foreground: syntax.keyword },
    },
    {
      name: "Template expression body",
      scope: ["meta.template.expression", "meta.embedded", "source.python meta.fstring"],
      settings: { foreground: fg.text },
    },
    {
      name: "Escape sequences",
      scope: ["constant.character.escape", "constant.character.format.placeholder"],
      settings: { foreground: syntax.escape },
    },
    {
      name: "Regular expressions",
      scope: ["string.regexp", "punctuation.definition.string.regexp"],
      settings: { foreground: syntax.regexp },
    },
    {
      name: "Regex character classes and sets",
      scope: ["constant.character.character-class.regexp", "constant.other.character-class.set.regexp", "constant.other.character-class.regexp"],
      settings: { foreground: syntax.escape },
    },
    {
      name: "Regex operators",
      scope: [
        "keyword.operator.quantifier.regexp",
        "keyword.operator.or.regexp",
        "keyword.control.anchor.regexp",
        "punctuation.definition.group.regexp",
        "punctuation.definition.character-class.regexp",
      ],
      settings: { foreground: syntax.keyword },
    },
    {
      name: "Numbers and constants",
      scope: ["constant.numeric", "constant.language", "constant.character", "constant.other", "keyword.other.unit", "support.constant"],
      settings: { foreground: syntax.number },
    },
    {
      name: "Keywords",
      scope: ["keyword", "keyword.control", "keyword.other", "keyword.operator.new", "keyword.operator.expression", "keyword.operator.logical.python", "keyword.operator.delete"],
      settings: { foreground: syntax.keyword, fontStyle: keywordStyle },
    },
    {
      name: "Operators",
      scope: ["keyword.operator", "punctuation.separator.key-value", "storage.type.function.arrow"],
      settings: { foreground: syntax.operator, fontStyle: "" },
    },
    {
      name: "Storage and modifiers",
      scope: ["storage", "storage.type", "storage.modifier", "keyword.control.import", "keyword.control.export", "keyword.control.from", "keyword.control.as"],
      settings: { foreground: syntax.storage },
    },
    {
      name: "Primitive types",
      scope: ["support.type.primitive", "storage.type.primitive", "storage.type.built-in", "keyword.type"],
      settings: { foreground: syntax.type, fontStyle: typeStyle },
    },
    {
      name: "Functions",
      scope: ["entity.name.function", "support.function", "meta.function-call entity.name.function", "variable.function", "meta.function-call.generic"],
      settings: { foreground: syntax.function },
    },
    {
      name: "Methods",
      scope: ["entity.name.function.member", "meta.method-call entity.name.function", "support.function.builtin"],
      settings: { foreground: syntax.function },
    },
    {
      name: "Decorators",
      scope: ["entity.name.function.decorator", "meta.decorator", "punctuation.decorator", "meta.decorator entity.name.function", "meta.decorator variable.other.readwrite"],
      settings: { foreground: syntax.attribute },
    },
    {
      name: "Types and classes",
      scope: ["entity.name.type", "entity.name.class", "entity.name.namespace", "entity.name.scope-resolution", "support.type", "support.class", "entity.other.inherited-class", "entity.name.type.parameter"],
      settings: { foreground: syntax.type, fontStyle: typeStyle },
    },
    {
      name: "Variables",
      scope: ["variable", "variable.other.readwrite", "meta.definition.variable.name", "support.variable", "entity.name.variable"],
      settings: { foreground: syntax.variable },
    },
    {
      name: "Parameters",
      scope: ["variable.parameter", "meta.parameters variable"],
      settings: { foreground: syntax.variable },
    },
    {
      name: "Language variables (this, self, super)",
      scope: ["variable.language", "variable.parameter.function.language.special"],
      settings: { foreground: syntax.keyword },
    },
    {
      name: "Constants",
      scope: ["variable.other.constant", "variable.other.enummember", "constant.other.caps"],
      settings: { foreground: syntax.number },
    },
    {
      name: "Properties",
      scope: ["variable.other.property", "variable.other.object.property", "support.variable.property", "meta.property-name", "meta.object-literal.key", "entity.name.tag.yaml", "support.type.property-name.json", "support.type.property-name.toml"],
      settings: { foreground: syntax.property },
    },
    {
      name: "Object keys in literals",
      scope: ["meta.object-literal.key entity.name.function", "meta.object-literal.key string"],
      settings: { foreground: syntax.property },
    },
    {
      name: "Punctuation",
      scope: ["punctuation", "punctuation.separator", "punctuation.terminator", "meta.brace", "punctuation.definition.parameters", "punctuation.accessor"],
      settings: { foreground: syntax.operator },
    },
    {
      name: "Tags",
      scope: ["entity.name.tag", "meta.tag.sgml.doctype"],
      settings: { foreground: syntax.tag },
    },
    {
      name: "Tag punctuation",
      scope: ["punctuation.definition.tag"],
      settings: { foreground: syntax.operator },
    },
    {
      name: "Attributes",
      scope: ["entity.other.attribute-name", "meta.tag.attributes entity.other.attribute-name"],
      settings: { foreground: syntax.attribute },
    },
    {
      name: "React components",
      scope: ["support.class.component", "entity.name.tag.component"],
      settings: { foreground: syntax.type },
    },
    {
      name: "CSS selectors",
      scope: ["entity.name.tag.css", "entity.name.tag.scss", "entity.name.tag.less"],
      settings: { foreground: syntax.tag },
    },
    {
      name: "CSS class and id selectors",
      scope: ["entity.other.attribute-name.class.css", "entity.other.attribute-name.id.css", "entity.other.attribute-name.class.scss", "entity.other.attribute-name.id.scss"],
      settings: { foreground: syntax.attribute },
    },
    {
      name: "CSS pseudo selectors",
      scope: ["entity.other.attribute-name.pseudo-class.css", "entity.other.attribute-name.pseudo-element.css"],
      settings: { foreground: syntax.keyword },
    },
    {
      name: "CSS property names",
      scope: ["support.type.property-name.css", "support.type.vendored.property-name", "meta.property-name.css"],
      settings: { foreground: syntax.property },
    },
    {
      name: "CSS property values and functions",
      scope: ["support.constant.property-value", "support.constant.font-name", "support.constant.media-type", "support.function.misc.css", "support.function.calc.css"],
      settings: { foreground: syntax.function },
    },
    {
      name: "CSS colors and units",
      scope: ["constant.other.color.rgb-value", "constant.other.color", "keyword.other.unit.css"],
      settings: { foreground: syntax.number },
    },
    {
      name: "CSS variables",
      scope: ["source.css variable", "variable.scss", "variable.argument.css", "variable.css"],
      settings: { foreground: syntax.variable },
    },
    {
      name: "CSS at-rules",
      scope: ["keyword.control.at-rule", "keyword.control.at-rule punctuation.definition.keyword"],
      settings: { foreground: syntax.keyword },
    },
    {
      name: "Python builtins and magic",
      scope: ["support.type.python", "support.function.magic.python", "support.variable.magic.python"],
      settings: { foreground: syntax.type },
    },
    {
      name: "Python dictionary keys",
      scope: ["meta.structure.dictionary.key.python string"],
      settings: { foreground: syntax.property },
    },
    {
      name: "JSON keys",
      scope: ["source.json support.type.property-name"],
      settings: { foreground: syntax.property },
    },
    {
      name: "JSON string values",
      scope: ["source.json string.quoted.double.json"],
      settings: { foreground: syntax.string },
    },
    {
      name: "Markdown headings",
      scope: ["markup.heading", "markup.heading entity.name", "entity.name.section.markdown", "punctuation.definition.heading.markdown"],
      settings: { foreground: syntax.keyword, fontStyle: "bold" },
    },
    {
      name: "Markdown bold",
      scope: ["markup.bold", "strong"],
      settings: { foreground: syntax.number, fontStyle: "bold" },
    },
    {
      name: "Markdown italic",
      scope: ["markup.italic", "emphasis"],
      settings: { foreground: syntax.attribute, fontStyle: "italic" },
    },
    {
      name: "Markdown bold italic",
      scope: ["markup.bold markup.italic", "markup.italic markup.bold"],
      settings: { fontStyle: "bold italic" },
    },
    {
      name: "Markdown strikethrough",
      scope: ["markup.strikethrough"],
      settings: { foreground: fg.muted, fontStyle: "strikethrough" },
    },
    {
      name: "Markdown underline",
      scope: ["markup.underline"],
      settings: { fontStyle: "underline" },
    },
    {
      name: "Markdown links",
      scope: ["markup.underline.link", "string.other.link.title.markdown", "string.other.link.description.title.markdown", "constant.other.reference.link.markdown"],
      settings: { foreground: syntax.function, fontStyle: "underline" },
    },
    {
      name: "Markdown link text",
      scope: ["string.other.link", "meta.link.inline string"],
      settings: { foreground: syntax.string },
    },
    {
      name: "Markdown inline code and fenced blocks",
      scope: ["markup.inline.raw", "markup.raw.block", "markup.fenced_code.block.markdown", "fenced_code.block.language"],
      settings: { foreground: syntax.type },
    },
    {
      name: "Markdown quote",
      scope: ["markup.quote", "punctuation.definition.quote.begin.markdown"],
      settings: { foreground: syntax.comment, fontStyle: "italic" },
    },
    {
      name: "Markdown lists",
      scope: ["markup.list", "punctuation.definition.list.begin.markdown"],
      settings: { foreground: syntax.storage },
    },
    {
      name: "Markdown separators",
      scope: ["meta.separator", "meta.separator.markdown"],
      settings: { foreground: syntax.comment },
    },
    {
      name: "Markdown body text",
      scope: ["text.html.markdown", "markup.table"],
      settings: { foreground: fg.text },
    },
    {
      name: "Diff inserted",
      scope: ["markup.inserted", "punctuation.definition.inserted"],
      settings: { foreground: status.success },
    },
    {
      name: "Diff deleted",
      scope: ["markup.deleted", "punctuation.definition.deleted"],
      settings: { foreground: status.error },
    },
    {
      name: "Diff changed",
      scope: ["markup.changed", "punctuation.definition.changed"],
      settings: { foreground: status.warning },
    },
    {
      name: "Diff headers",
      scope: ["meta.diff.header", "meta.diff.header.from-file", "meta.diff.header.to-file", "meta.diff.index"],
      settings: { foreground: syntax.type, fontStyle: "bold" },
    },
    {
      name: "Diff ranges",
      scope: ["meta.diff.range", "punctuation.definition.range.diff"],
      settings: { foreground: syntax.keyword },
    },
    {
      name: "Git rebase",
      scope: ["constant.sha.git-rebase"],
      settings: { foreground: syntax.number },
    },
    {
      name: "Git rebase commands",
      scope: ["support.function.git-rebase"],
      settings: { foreground: syntax.keyword },
    },
    {
      name: "Invalid",
      scope: ["invalid", "invalid.illegal"],
      settings: { foreground: status.error },
    },
    {
      name: "Deprecated",
      scope: ["invalid.deprecated"],
      settings: { foreground: fg.muted, fontStyle: "strikethrough" },
    },
    {
      name: "Log info",
      scope: ["token.info-token"],
      settings: { foreground: status.info },
    },
    {
      name: "Log warn",
      scope: ["token.warn-token"],
      settings: { foreground: status.warning },
    },
    {
      name: "Log error",
      scope: ["token.error-token"],
      settings: { foreground: status.error },
    },
    {
      name: "Log debug",
      scope: ["token.debug-token"],
      settings: { foreground: syntax.keyword },
    },
  ];

  // Strip undefined fontStyle so the JSON stays clean.
  for (const rule of rules) {
    if (rule.settings.fontStyle === undefined) {
      delete rule.settings.fontStyle;
    }
  }
  return rules;
}
