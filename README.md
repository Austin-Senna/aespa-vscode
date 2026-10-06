# aespa-vscode

VS Code themes for aespa. The extension lives in [`aespa-themes/`](aespa-themes/).

[![Marketplace](https://img.shields.io/visual-studio-marketplace/v/AustinSenna.aespa-themes?label=Marketplace)](https://marketplace.visualstudio.com/items?itemName=AustinSenna.aespa-themes)

Twelve eras. Each is a color theme and a matching file icon theme, generated from a short OKLCH spec per era, with a small runtime that applies both together. See the [extension README](aespa-themes/README.md) for the list and install steps.

## Development

```
cd aespa-themes
npm install
npm test            # generates themes/ and icons/, then runs vitest
npm run bundle      # bundles the runtime to dist/extension.cjs
npx vsce package    # produces aespa-themes-<version>.vsix
npx tsx scripts/preview.ts   # mock-window previews in preview/
```

Era specs live in `aespa-themes/src/eras/`, the OKLCH derivation in `src/derive.ts`, the icon catalog in `src/icons/catalog.ts`. The build writes `themes/*.json`, `icons/<era>/`, and rewrites `contributes.themes` and `contributes.iconThemes` in `package.json`, so adding an era is one spec file plus one line in `src/eras/index.ts`.
