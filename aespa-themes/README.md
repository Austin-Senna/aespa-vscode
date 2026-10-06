# aespa Themes

Twelve VS Code eras. Each one is a color theme plus a matching file icon theme, seeded from the era's concept: Black Mamba's ice-blue digital arena, Savage's acid-on-chrome, Drama's red and gold, LEMONADE's candy light mode.

## Eras

| Era | Base | Seed |
| --- | --- | --- |
| aespa · Black Mamba | dark | navy, ice blue, white |
| aespa · Next Level | dark | sand, teal, chrome |
| aespa · Savage | dark | neon purple, acid green, chrome |
| aespa · Girls | dark | magenta, cyan, white |
| aespa · MY WORLD | dark | hot pink, lemon, sky |
| aespa · Drama | dark | blood red, black, gold |
| aespa · Armageddon | dark | cosmic violet, ember, steel |
| aespa · Whiplash | dark | black, white, chrome (monochrome) |
| aespa · Dirty Work | dark | rust, raw steel, off-white |
| aespa · Rich Man | light | ice, amber, black |
| aespa · LEMONADE | light | lemon, bubblegum, mint |
| aespa · KISS N TELL | light | pink, ink, white |

## Install

Search for "aespa Themes" in the Extensions view, or:

```
code --install-extension AustinSenna.aespa-themes
```

Then run **aespa: Choose Era** from the Command Palette, or click the `æ` item in the status bar. That sets the color theme and the icon theme together. **Next Era**, **Previous Era** and **Random Era** cycle without the picker.

If you pick an era from the normal theme picker instead, the icon theme follows automatically. Turn that off with `"aespa.syncIconTheme": false` if you'd rather keep another icon set. `"aespa.statusBar": false` hides the status bar item.

## Icons

Each era ships its own file icon theme, generated from the same palette as the color theme:

- **Era motif.** The plain file and plain folder carry the era's mark: Black Mamba's snake, Savage's P.O.S portal, Girls' glitch bars, Drama's antlers, Armageddon's supernova, LEMONADE's lemon slice, KISS N TELL's lips, and so on.
- **æ root folder.** The workspace root wears the `æ` ligature from Cormorant Garamond, in the era's accent.
- **Era finish.** Chrome eras get a diagonal sheen, candy eras a gloss highlight, Dirty Work hazard stripes, Whiplash stays greyscale.
- **Drawn glyphs.** About 110 file kinds and 26 folder kinds have hand-drawn marks (braces, gear, flask, padlock, branch, rocket, snake, globe, shield...) that fill the icon box. Languages whose letters are their identity (TS, JS, GO, C++, C#, ...) get a big pixel-font label. Folders are solid color with the mark cut out. Everything is colored by the role that era gives it, so TypeScript is lavender in Savage and gold in Drama, and only unknown files get the document chip.

Picking an era from the normal theme picker switches the icons automatically (`aespa.syncIconTheme`), and the `aespa: Choose Era` command sets both at once.

## How the colors are built

Each era is a short spec: a background hue, two signature hues, a mood, and a hue per syntax role. A generator turns that into the full palette in OKLCH so that every accent in a theme sits in one lightness band with uniform chroma, variables and punctuation stay foreground, and the loudest color is reserved for errors. The test suite checks WCAG AA and APCA floors for every token on every background, and that every workbench key exists in VS Code.

## Tweaking

The theme's exact label is the settings key:

```jsonc
"workbench.colorCustomizations": {
  "[aespa · Savage]": { "editor.background": "#120822" }
},
"editor.tokenColorCustomizations": {
  "[aespa · Savage]": { "comments": "#8a7aa8" }
}
```

Whiplash carries syntax with bold keywords, underlined types and grey steps instead of hue. Diagnostics keep muted color so errors stay visible.

## Credits

A few icon marks are adapted from Material Design Icons (Apache 2.0) and the `æ` ligature is from Cormorant Garamond (OFL 1.1); see `THIRD_PARTY_NOTICES.md`. Palettes are derived from the aespa era concepts. aespa and all related names are the property of SM Entertainment; this is a fan project with no affiliation.

## License

MIT. See `LICENSE`.
