# aespa Themes: implementation plan

Spec: `../specs/2026-10-06-aespa-themes-design.md`

1. Scaffold `aespa-themes/` with package.json, tsconfig, vitest, .vscodeignore, launch.json, LICENSE. Install tsx, typescript, vitest, @vscode/vsce.
2. `src/color.ts`: hex normalize, alpha, mix, luminance, contrast. Unit tests.
3. `src/palette.ts`: `EraPalette` type and `deriveAnsi`.
4. `scripts/update-keys.ts` + `src/schema/workbench-keys.json` from vscode-docs `theme-color.md`.
5. `src/workbench.ts`, `src/tokens.ts`, `src/semantic.ts`, `src/theme.ts`.
6. Twelve era palettes in `src/eras/`, plus `index.ts`.
7. `src/build.ts`: write themes, sync `contributes.themes`.
8. Tests: schema keys, hex validity, contrast, package sync, semantic selectors.
9. Icon, README (root and extension), CHANGELOG.
10. `vsce package`, install locally, screenshot, fix what looks wrong.
