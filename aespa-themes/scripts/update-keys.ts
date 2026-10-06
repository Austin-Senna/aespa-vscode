/** Refresh src/schema/workbench-keys.json from the VS Code theme-color reference. */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SOURCE = "https://raw.githubusercontent.com/microsoft/vscode-docs/main/api/references/theme-color.md";
const OUT = resolve(import.meta.dirname, "../src/schema/workbench-keys.json");

async function main(): Promise<void> {
  const res = await fetch(SOURCE);
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  }
  const md = await res.text();
  const keys = new Set<string>();
  for (const match of md.matchAll(/^- `([a-zA-Z][a-zA-Z0-9]*(?:\.[a-zA-Z0-9]+)*)`/gm)) {
    keys.add(match[1]);
  }
  if (keys.size < 500) {
    throw new Error(`Only ${keys.size} keys parsed; the page format may have changed`);
  }
  const sorted = [...keys].sort();
  /** Keys that exist in VS Code but have not reached the docs page yet. Kept across refreshes. */
  const verified = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")).verified ?? { source: "", keys: [] } : { source: "", keys: [] };
  writeFileSync(OUT, `${JSON.stringify({ source: SOURCE, fetched: new Date().toISOString().slice(0, 10), keys: sorted, verified }, null, 2)}\n`);
  console.log(`Wrote ${sorted.length} keys to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
