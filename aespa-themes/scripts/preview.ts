/** Render a mock VS Code window per theme to preview/<slug>.html for eyeballing palettes. */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { eras } from "../src/eras/index.js";
import { compileTheme } from "../src/theme.js";
import type { TokenRule } from "../src/tokens.js";

const OUT = resolve(import.meta.dirname, "../preview");

type Tok = [scope: string, text: string];

const TS_SAMPLE: Tok[][] = [
  [["storage", "import"], ["", " { "], ["variable", "readFileSync"], ["", " } "], ["storage", "from"], ["", " "], ["string", "\"node:fs\""], ["punctuation", ";"]],
  [["storage", "import"], ["", " "], ["storage", "type"], ["", " { "], ["entity.name.type", "EraPalette"], ["", " } "], ["storage", "from"], ["", " "], ["string", "\"./palette\""], ["punctuation", ";"]],
  [],
  [["comment", "/** Load an era and report its contrast against the editor background. */"]],
  [["storage", "export"], ["", " "], ["storage", "async"], ["", " "], ["storage", "function"], ["", " "], ["entity.name.function", "loadEra"], ["punctuation", "("], ["variable.parameter", "slug"], ["punctuation", ": "], ["support.type.primitive", "string"], ["punctuation", ", "], ["variable.parameter", "retries"], ["keyword.operator", " = "], ["constant.numeric", "3"], ["punctuation", "): "], ["entity.name.type", "Promise"], ["punctuation", "<"], ["entity.name.type", "EraPalette"], ["keyword.operator", " | "], ["constant.language", "null"], ["punctuation", "> {"]],
  [["", "  "], ["storage", "const"], ["", " "], ["variable", "path"], ["keyword.operator", " = "], ["string", "`./eras/"], ["punctuation.definition.template-expression", "${"], ["variable", "slug"], ["punctuation.definition.template-expression", "}"], ["string", ".json`"], ["punctuation", ";"]],
  [["", "  "], ["storage", "const"], ["", " "], ["variable.other.constant", "RE"], ["keyword.operator", " = "], ["string.regexp", "/^[a-z-]+$/"], ["punctuation", ";"]],
  [["", "  "], ["keyword", "if"], ["", " ("], ["keyword.operator", "!"], ["variable.other.constant", "RE"], ["punctuation", "."], ["entity.name.function", "test"], ["punctuation", "("], ["variable", "slug"], ["punctuation", ")) {"]],
  [["", "    "], ["keyword", "throw"], ["", " "], ["keyword.operator.new", "new"], ["", " "], ["entity.name.type", "Error"], ["punctuation", "("], ["string", "\"bad slug\""], ["punctuation", ");"]],
  [["", "  }"]],
  [["", "  "], ["keyword", "for"], ["", " ("], ["storage", "let"], ["", " "], ["variable", "i"], ["keyword.operator", " = "], ["constant.numeric", "0"], ["punctuation", "; "], ["variable", "i"], ["keyword.operator", " < "], ["variable", "retries"], ["punctuation", "; "], ["variable", "i"], ["keyword.operator", "++"], ["punctuation", ") {"]],
  [["", "    "], ["keyword", "try"], ["", " {"]],
  [["", "      "], ["storage", "const"], ["", " "], ["variable", "era"], ["punctuation", ": "], ["entity.name.type", "EraPalette"], ["keyword.operator", " = "], ["support.class", "JSON"], ["punctuation", "."], ["support.function", "parse"], ["punctuation", "("], ["entity.name.function", "readFileSync"], ["punctuation", "("], ["variable", "path"], ["punctuation", ", "], ["string", "\"utf8\""], ["punctuation", "));"]],
  [["", "      "], ["support.class", "console"], ["punctuation", "."], ["support.function", "log"], ["punctuation", "("], ["string", "`loaded "], ["punctuation.definition.template-expression", "${"], ["variable", "era"], ["punctuation", "."], ["variable.other.property", "label"], ["punctuation.definition.template-expression", "}"], ["string", "`"], ["punctuation", ", { "], ["meta.object-literal.key", "type"], ["punctuation", ": "], ["variable", "era"], ["punctuation", "."], ["variable.other.property", "type"], ["punctuation", ", "], ["meta.object-literal.key", "ok"], ["punctuation", ": "], ["constant.language", "true"], ["punctuation", " });"]],
  [["", "      "], ["keyword", "return"], ["", " "], ["variable", "era"], ["punctuation", ";"]],
  [["", "    } "], ["keyword", "catch"], ["", " ("], ["variable", "err"], ["punctuation", ") {"]],
  [["", "      "], ["comment", "// TODO: back off before the next attempt"]],
  [["", "      "], ["keyword", "await"], ["", " "], ["keyword.operator.new", "new"], ["", " "], ["entity.name.type", "Promise"], ["punctuation", "(("], ["variable.parameter", "r"], ["punctuation", ") "], ["storage.type.function.arrow", "=>"], ["", " "], ["support.function", "setTimeout"], ["punctuation", "("], ["variable", "r"], ["punctuation", ", "], ["constant.numeric", "100"], ["keyword.operator", " * "], ["constant.numeric", "2"], ["keyword.operator", " ** "], ["variable", "i"], ["punctuation", "));"]],
  [["", "    }"]],
  [["", "  }"]],
  [["", "  "], ["keyword", "return"], ["", " "], ["constant.language", "null"], ["punctuation", ";"]],
  [["", "}"]],
  [],
  [["storage", "class"], ["", " "], ["entity.name.type", "ThemeStore"], ["", " {"]],
  [["", "  "], ["storage", "private"], ["", " "], ["storage", "readonly"], ["", " "], ["variable.other.property", "cache"], ["keyword.operator", " = "], ["keyword.operator.new", "new"], ["", " "], ["entity.name.type", "Map"], ["punctuation", "<"], ["support.type.primitive", "string"], ["punctuation", ", "], ["entity.name.type", "EraPalette"], ["punctuation", ">();"]],
  [["", "  "], ["storage", "static"], ["", " "], ["storage", "readonly"], ["", " "], ["variable.other.constant", "VERSION"], ["keyword.operator", " = "], ["constant.numeric", "0x1f"], ["punctuation", ";"]],
  [["", "  "], ["entity.name.function", "@"], ["entity.name.function.decorator", "memo"], ["", " "], ["storage", "get"], ["", " "], ["entity.name.function", "size"], ["punctuation", "(): "], ["support.type.primitive", "number"], ["punctuation", " { "], ["keyword", "return"], ["", " "], ["variable.language", "this"], ["punctuation", "."], ["variable.other.property", "cache"], ["punctuation", "."], ["variable.other.property", "size"], ["punctuation", "; }"]],
  [["", "}"]],
];

function matchScore(selector: string, scope: string): number {
  // Approximate TextMate matching: each space-separated part must prefix-match a scope segment.
  const parts = selector.trim().split(/\s+/);
  const last = parts[parts.length - 1];
  if (scope === last) {
    return 1000 + last.length;
  }
  if (scope.startsWith(`${last}.`)) {
    return last.length;
  }
  return -1;
}

function resolve_(rules: TokenRule[], scope: string): { color?: string; fontStyle?: string } {
  let best = { score: -1, color: undefined as string | undefined, fontStyle: undefined as string | undefined };
  for (const rule of rules) {
    const selectors = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
    for (const sel of selectors) {
      const s = matchScore(sel, scope);
      if (s > best.score) {
        best = { score: s, color: rule.settings.foreground, fontStyle: rule.settings.fontStyle };
      }
    }
  }
  return best;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function render(slug: string): string {
  const era = eras.find((e) => e.slug === slug)!;
  const t = compileTheme(era);
  const c = t.colors;
  const code = TS_SAMPLE.map((line, i) => {
    const spans = line.map(([scope, text]) => {
      if (!scope) {
        return `<span style="color:${c["editor.foreground"]}">${esc(text)}</span>`;
      }
      const r = resolve_(t.tokenColors, scope);
      const fs = r.fontStyle ?? "";
      const style = [`color:${r.color ?? c["editor.foreground"]}`, fs.includes("italic") && "font-style:italic", fs.includes("bold") && "font-weight:700", fs.includes("underline") && "text-decoration:underline"].filter(Boolean).join(";");
      return `<span style="${style}">${esc(text)}</span>`;
    }).join("");
    const current = i === 7;
    return `<div class="ln" style="${current ? `background:${c["editor.lineHighlightBackground"]}` : ""}"><span class="num" style="color:${current ? c["editorLineNumber.activeForeground"] : c["editorLineNumber.foreground"]}">${i + 1}</span>${spans || "&nbsp;"}</div>`;
  }).join("");
  const ansi = ["Black", "Red", "Green", "Yellow", "Blue", "Magenta", "Cyan", "White"].map((n) => `<span style="color:${c[`terminal.ansi${n}`]}">■${n.toLowerCase()}</span> `).join("");
  const ansiB = ["Black", "Red", "Green", "Yellow", "Blue", "Magenta", "Cyan", "White"].map((n) => `<span style="color:${c[`terminal.ansiBright${n}`]}">■bright${n.toLowerCase()}</span> `).join("");
  return `<!doctype html><meta charset="utf-8"><title>${esc(era.label)}</title>
<style>
  body{margin:0;font:13px/1.45 -apple-system,Inter,system-ui,sans-serif;background:${c["titleBar.activeBackground"]};color:${c["foreground"]}}
  .win{width:1280px;height:800px;display:grid;grid-template-rows:36px 1fr 24px;grid-template-columns:48px 240px 1fr;}
  .title{grid-column:1/4;background:${c["titleBar.activeBackground"]};color:${c["titleBar.activeForeground"]};border-bottom:1px solid ${c["titleBar.border"]};display:flex;align-items:center;justify-content:center;font-size:12px}
  .cc{background:${c["commandCenter.background"]};border:1px solid ${c["commandCenter.border"]};border-radius:6px;padding:2px 90px;color:${c["commandCenter.foreground"]}}
  .ab{background:${c["activityBar.background"]};border-right:1px solid ${c["activityBar.border"]};display:flex;flex-direction:column;align-items:center;padding-top:8px;gap:14px}
  .ab i{width:24px;height:24px;border-radius:5px;background:${c["activityBar.inactiveForeground"]};opacity:.7}
  .ab i.on{background:${c["activityBar.foreground"]};opacity:1;box-shadow:-10px 0 0 -8px ${c["activityBar.activeBorder"]}}
  .ab .badge{width:16px;height:16px;border-radius:8px;background:${c["activityBarBadge.background"]};color:${c["activityBarBadge.foreground"]};font-size:10px;text-align:center;line-height:16px;margin-top:-10px}
  .sb{background:${c["sideBar.background"]};color:${c["sideBar.foreground"]};border-right:1px solid ${c["sideBar.border"]};font-size:12px}
  .sb h4{margin:0;padding:8px 12px;font-size:11px;letter-spacing:.06em;color:${c["sideBarTitle.foreground"]};font-weight:600}
  .sb .row{padding:3px 12px 3px 24px}
  .sb .row.sel{background:${c["list.activeSelectionBackground"]};color:${c["list.activeSelectionForeground"]};outline:1px solid ${c["list.focusOutline"]};outline-offset:-1px}
  .sb .row.hov{background:${c["list.hoverBackground"]}}
  .sb .m{color:${c["gitDecoration.modifiedResourceForeground"]}} .sb .a{color:${c["gitDecoration.addedResourceForeground"]}} .sb .d{color:${c["gitDecoration.deletedResourceForeground"]}} .sb .u{color:${c["gitDecoration.untrackedResourceForeground"]}} .sb .ig{color:${c["gitDecoration.ignoredResourceForeground"]}}
  .main{display:grid;grid-template-rows:35px 22px 1fr 200px;min-width:0}
  .tabs{background:${c["editorGroupHeader.tabsBackground"]};border-bottom:1px solid ${c["editorGroupHeader.tabsBorder"]};display:flex;font-size:12px}
  .tab{padding:0 14px;display:flex;align-items:center;background:${c["tab.inactiveBackground"]};color:${c["tab.inactiveForeground"]};border-right:1px solid ${c["tab.border"]}}
  .tab.on{background:${c["tab.activeBackground"]};color:${c["tab.activeForeground"]};box-shadow:inset 0 1px 0 ${c["tab.activeBorderTop"]}}
  .crumb{background:${c["breadcrumb.background"]};color:${c["breadcrumb.foreground"]};font-size:11px;padding:3px 16px}
  .ed{background:${c["editor.background"]};color:${c["editor.foreground"]};font:12.5px/19px "JetBrains Mono",Menlo,monospace;padding:4px 0;overflow:hidden;position:relative}
  .ln{white-space:pre;padding-left:0}
  .num{display:inline-block;width:40px;text-align:right;margin-right:22px;user-select:none}
  .sel{background:${c["editor.selectionBackground"]}}
  .find{background:${c["editor.findMatchBackground"]};outline:1px solid ${c["editor.findMatchBorder"]}}
  .err{text-decoration:wavy underline ${c["editorError.foreground"]}} .warn{text-decoration:wavy underline ${c["editorWarning.foreground"]}}
  .widget{position:absolute;right:24px;top:70px;width:300px;background:${c["editorSuggestWidget.background"]};border:1px solid ${c["editorSuggestWidget.border"]};color:${c["editorSuggestWidget.foreground"]};font-size:12px;box-shadow:0 2px 8px ${c["widget.shadow"]}}
  .widget div{padding:3px 8px} .widget .on{background:${c["editorSuggestWidget.selectedBackground"]}} .widget b{color:${c["editorSuggestWidget.highlightForeground"]};font-weight:600}
  .panel{background:${c["panel.background"]};border-top:1px solid ${c["panel.border"]};font-size:12px}
  .ptabs{display:flex;gap:18px;padding:6px 16px;border-bottom:1px solid ${c["panel.border"]}} .ptabs span{color:${c["panelTitle.inactiveForeground"]}} .ptabs .on{color:${c["panelTitle.activeForeground"]};box-shadow:0 7px 0 -6px ${c["panelTitle.activeBorder"]}}
  .term{font:12px/18px Menlo,monospace;padding:6px 16px;color:${c["terminal.foreground"]};white-space:pre}
  .status{grid-column:1/4;background:${c["statusBar.background"]};color:${c["statusBar.foreground"]};border-top:1px solid ${c["statusBar.border"]};display:flex;align-items:center;font-size:11.5px}
  .status .remote{background:${c["statusBarItem.remoteBackground"]};color:${c["statusBarItem.remoteForeground"]};padding:0 10px;height:100%;display:flex;align-items:center}
  .status span{padding:0 8px}
  .status .right{margin-left:auto;display:flex}
  .btn{display:inline-block;padding:3px 10px;border-radius:2px;background:${c["button.background"]};color:${c["button.foreground"]};font-size:11px;margin:6px 12px}
  .btn2{background:${c["button.secondaryBackground"]};color:${c["button.secondaryForeground"]}}
  .inp{display:block;margin:0 12px 6px;padding:3px 6px;background:${c["input.background"]};border:1px solid ${c["input.border"]};color:${c["input.placeholderForeground"]};font-size:11px}
  .swatches{display:flex;gap:4px;padding:6px 16px}.swatches i{width:22px;height:22px;border-radius:4px;display:block}
</style>
<div class="win">
  <div class="title"><span class="cc">⌕ ${esc(era.label)}</span></div>
  <div class="ab"><i class="on"></i><i></i><span class="badge">3</span><i></i><i></i><i></i></div>
  <div class="sb">
    <h4>EXPLORER</h4>
    <div class="row">▾ aespa-themes</div>
    <div class="row">  ▸ src</div>
    <div class="row sel">    sample.ts <span class="m">M</span></div>
    <div class="row hov">    palette.ts <span class="a">A</span></div>
    <div class="row">    legacy.ts <span class="d">D</span></div>
    <div class="row u">    notes.md <span>U</span></div>
    <div class="row ig">  ▸ node_modules</div>
    <h4>SEARCH</h4>
    <span class="inp">Search</span>
    <span class="btn">Primary</span><span class="btn btn2">Secondary</span>
    <h4>PALETTE</h4>
    <div class="swatches">${Object.values(era.syntax).slice(0, 8).map((h) => `<i style="background:${h}"></i>`).join("")}</div>
    <div class="swatches">${Object.values(era.status).map((h) => `<i style="background:${h}"></i>`).join("")}<i style="background:${era.accent}"></i><i style="background:${era.accent2}"></i></div>
  </div>
  <div class="main">
    <div class="tabs"><div class="tab on">sample.ts</div><div class="tab">palette.ts</div><div class="tab">README.md</div></div>
    <div class="crumb">src › sample.ts › loadEra</div>
    <div class="ed">${code}
      <div class="widget"><div class="on"><b>read</b>FileSync &nbsp;<span style="color:${c["editorSuggestWidget.foreground"]};opacity:.7">fs</span></div><div><b>read</b>dir</div><div><b>read</b>link</div></div>
    </div>
    <div class="panel">
      <div class="ptabs"><span>PROBLEMS</span><span>OUTPUT</span><span class="on">TERMINAL</span><span>PORTS</span></div>
      <div class="term"><span style="color:${c["terminal.ansiGreen"]}">➜</span> <span style="color:${c["terminal.ansiCyan"]}">aespa-themes</span> <span style="color:${c["terminal.ansiBlue"]}">git:(</span><span style="color:${c["terminal.ansiRed"]}">main</span><span style="color:${c["terminal.ansiBlue"]}">)</span> npm test
${ansi}
${ansiB}
<span style="color:${c["terminal.ansiGreen"]}">✓</span> 319 passed   <span style="color:${c["terminal.ansiRed"]}">✗</span> 0 failed   <span style="color:${c["terminal.ansiYellow"]}">⚠</span> 2 warnings
<span style="color:${c["terminal.ansiBrightBlack"]}"># bright black comment</span></div>
    </div>
  </div>
  <div class="status"><div class="remote">⇄ WSL</div><span>⎇ main*</span><span style="color:${c["statusBar.foreground"]}">⊗ 0 ⚠ 2</span><div class="right"><span>Ln 8, Col 12</span><span>UTF-8</span><span>TypeScript</span><span>${esc(era.label)}</span></div></div>
</div>`;
}

mkdirSync(OUT, { recursive: true });
for (const era of eras) {
  writeFileSync(resolve(OUT, `${era.slug}.html`), render(era.slug));
}
console.log(`Wrote ${eras.length} previews to ${OUT}`);
