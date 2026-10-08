# Change Log

## [0.1.1] - 2026-10-07

- Hand-tuned palettes for all twelve eras. Backgrounds carry the era tint at up to 3x the old chroma, and syntax chroma goes up to 0.20 for vivid eras, so the eras no longer collapse into the same pastel-on-grey look.
- The status bar is filled with each era's signature color (`brand`), with text and the remote chip picked for contrast and tested at 4.5:1.
- Whiplash keeps its black-and-white page and gets icy syntax: steel blue, glacier, frost lavender and ice teal. It was pure greyscale before.
- LEMONADE is now dark: a black page with neon lemon and lime, mint and bubblegum on the side. Drama's page is crimson-black with crimson as the primary accent and gold second.
- Rich Man is now dark, after the album's guitar pick: a cobalt-navy page, yellow keywords and accent, and a cobalt status bar with yellow text.
- Dirty Work follows the album covers: a neutral black page, gold keywords and accent, chrome silver strings and types, and a rust-brown status bar with gold text.
- Armageddon follows the album covers: a black page, crop-circle green status bar and keywords, chrome silver strings and functions, hot pink declarations, and electric-blue numbers.
- Terminal magenta and cyan now actually look magenta and cyan. They used to be the keyword and type colors, so Armageddon's magenta was green and Girls' cyan was violet.
- Savage follows the teaser art: a teal-blue page, chrome-ice syntax, and a sky-blue status bar. The old neon purple and acid green are gone.
- MY WORLD is now light: a near-white page, a slime-green status bar after the 3D logo, hot pink accents, and green, pink, sky and lavender syntax.
- Black Mamba follows the dreamscape photos: a deep dusk-violet page, a violet status bar, orchid-pink keywords, fairy-light gold strings and rose-gold numbers.
- KISS N TELL follows the covers: a pink-white page, a candy-pink status bar with chocolate-brown text after the fur, rose-pink accents, and lavender, baby blue and caramel syntax. The indigo is gone.
- LEMONADE and KISS N TELL no longer share an accent.
- Fixed: `aespa: Choose Era`, Next, Previous, Random and the icon sync wrote the theme's label into `workbench.colorTheme`, but VS Code matches that setting by the contributed id, so the background never changed and the default theme showed. They now write the id, accept either form when reading, and rewrite a leftover label to the id on startup.
- Theme sync works both ways: picking an era's icon theme now switches the color theme too.
- The icon generator sources in `src/icons/` were being ignored by git (`icons/` matched them). The ignore rule is now `/icons/`.

## [0.1.0] - 2026-10-06

- Twelve color themes, one per era: Black Mamba, Next Level, Savage, Girls, MY WORLD, Drama, Armageddon, Whiplash, Dirty Work, Rich Man, LEMONADE, KISS N TELL. Dark base for nine, light base for Rich Man, LEMONADE and KISS N TELL.
- Palettes derived in OKLCH from a per-era spec so every accent shares one lightness and chroma band, with WCAG and APCA contrast checks in the test suite.
- Twelve matching file icon themes: each era's motif on plain files and folders, the æ ligature on the root folder, chrome/candy/grunge finishes, and about 110 drawn file marks and 26 folder marks in the era's colors.
- Commands `aespa: Choose Era`, `Next Era`, `Previous Era`, `Random Era` and `Match Icon Theme to Color Theme`, a status bar era indicator, and automatic icon sync when the color theme changes to an era (`aespa.syncIconTheme`).
- Full workbench coverage including the 2026 Modern UI keys, TextMate rules for JS/TS, Python, CSS, HTML, JSON, Markdown, diff and regex, and semantic token colors.
