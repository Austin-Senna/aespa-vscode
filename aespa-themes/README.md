# aespa Themes

Twelve VS Code eras. Each one is a color theme plus a matching file icon theme, seeded from the era's concept: Black Mamba's violet dreamscape, Savage's chrome ice under a teal sky, Drama's crimson and gold, LEMONADE's neon lemon and lime on black.

## Eras

| Era | Base | Seed |
| --- | --- | --- |
| aespa · Black Mamba | dark | violet dusk, periwinkle, pink coral, rose gold |
| aespa · Next Level | dark | sand, teal, chrome |
| aespa · Savage | dark | teal sky, chrome ice, black |
| aespa · Girls | dark | magenta, cyan, white |
| aespa · MY WORLD | light | slime green, hot pink, sky, lavender |
| aespa · Drama | dark | blood red, black, gold |
| aespa · Armageddon | dark | black, crop-circle green, chrome, hot pink |
| aespa · Whiplash | dark | black, white, chrome (monochrome) |
| aespa · Dirty Work | dark | black, bling gold, chrome, safety orange |
| aespa · Rich Man | dark | cobalt navy, pick-lettering yellow, ice |
| aespa · LEMONADE | dark | neon lemon, lime, mint, bubblegum |
| aespa · KISS N TELL | light | pastel pink, lavender, baby blue, chocolate |

## Install

Search for "aespa Themes" in the Extensions view, or:

```
code --install-extension AustinSenna.aespa-themes
```

Then run **aespa: Choose Era** from the Command Palette, or click the `æ` item in the status bar. That sets the color theme and the icon theme together. **Next Era**, **Previous Era** and **Random Era** cycle without the picker.

If you pick an era from the normal color theme or file icon theme picker instead, the other one follows automatically. Turn that off with `"aespa.syncIconTheme": false` if you'd rather mix and match. `"aespa.statusBar": false` hides the status bar item.

## Icons

Each era ships its own file icon theme, generated from the same palette as the color theme:

- **Era motif.** The plain file and plain folder carry the era's mark: Black Mamba's snake, Savage's P.O.S portal, Girls' glitch bars, Drama's antlers, Armageddon's supernova, LEMONADE's lemon slice, KISS N TELL's lips, and so on.
- **æ root folder.** The workspace root wears the `æ` ligature from Cormorant Garamond, in the era's accent.
- **Era finish.** Chrome eras get a diagonal sheen, candy eras a gloss highlight, Dirty Work hazard stripes, Whiplash stays greyscale.
- **Drawn glyphs.** About 110 file kinds and 26 folder kinds have hand-drawn marks (braces, gear, flask, padlock, branch, rocket, snake, globe, shield...) that fill the icon box. Languages whose letters are their identity (TS, JS, GO, C++, C#, ...) get a big pixel-font label. Folders are solid color with the mark cut out. Everything is colored by the role that era gives it, so TypeScript changes color from era to era, and only unknown files get the document chip.

Picking an era's color theme switches the icons, and picking an era's icons switches the color theme (`aespa.syncIconTheme`), and the `aespa: Choose Era` command sets both at once.

## How the colors are built

Each era is a hand-tuned spec in OKLCH: a tinted background, a signature brand color, two UI accents, and a hue, chroma and lightness for every syntax role. The era is loud where it costs nothing: the background tint and the status bar, which is filled with the era's signature color (sky teal for Savage, blood red for Drama, neon lemon for LEMONADE). Syntax stays in a legible lightness band, so variables and punctuation stay foreground and the loudest color is reserved for errors. Whiplash keeps a black-and-white page and cuts its syntax from ice: steel blue, glacier, frost lavender. The test suite checks WCAG AA and APCA floors for every token on every background, and that every workbench key exists in VS Code.

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
