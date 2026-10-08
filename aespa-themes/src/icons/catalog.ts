/** Which files and folders get which chip, and in which role color. */
import type { IconRole } from "./svg.js";

export interface FileIconDef {
  id: string;
  /** Pixel-font label, up to three glyphs; used when no drawn glyph exists for the icon. */
  label: string | null;
  role: IconRole;
  /** Drawn glyph id; defaults to the icon id. "motif" means the era's own motif. */
  glyph?: string;
  /** Render as a document chip with the mark inside, instead of a bare full-size mark. */
  framed?: boolean;
  fileExtensions?: string[];
  fileNames?: string[];
  languageIds?: string[];
}

export interface FolderIconDef {
  id: string;
  label: string | null;
  role: IconRole;
  /** Drawn glyph id; defaults to the icon id. "motif" means the era's own motif. */
  glyph?: string;
  /** Multiplier on the glyph size for marks that want more presence. */
  markScale?: number;
  folderNames?: string[];
}

export const FILE_ICONS: FileIconDef[] = [
  { id: "file", label: null, role: "subtext", glyph: "motif", framed: true },
  { id: "ts", label: "TS", role: "function", fileExtensions: ["ts", "mts", "cts"], languageIds: ["typescript"] },
  { id: "tsx", label: "TSX", role: "function", fileExtensions: ["tsx"], languageIds: ["typescriptreact"] },
  { id: "dts", label: "DTS", role: "type", fileExtensions: ["d.ts", "d.mts", "d.cts"] },
  { id: "js", label: "JS", role: "number", fileExtensions: ["js", "mjs", "cjs"], languageIds: ["javascript"] },
  { id: "jsx", label: "JSX", role: "number", fileExtensions: ["jsx"], languageIds: ["javascriptreact"] },
  { id: "test", label: "✓", role: "success", fileExtensions: ["test.ts", "spec.ts", "test.tsx", "spec.tsx", "test.js", "spec.js", "test.mjs", "test.py", "spec.rb"] },
  { id: "stories", label: "SB", role: "attribute", fileExtensions: ["stories.tsx", "stories.ts", "stories.jsx", "stories.js", "stories.mdx"] },
  { id: "json", label: "{ }", role: "property", fileExtensions: ["json", "jsonc", "json5", "jsonl", "webmanifest"], languageIds: ["json", "jsonc", "jsonl"] },
  { id: "yaml", label: "YML", role: "property", fileExtensions: ["yml", "yaml"], languageIds: ["yaml"] },
  { id: "toml", label: "TML", role: "property", fileExtensions: ["toml"] },
  { id: "xml", label: "XML", role: "tag", fileExtensions: ["xml", "plist", "xsd", "xsl", "svg.xml"], languageIds: ["xml", "xsl"] },
  { id: "md", label: "MD", role: "subtext", fileExtensions: ["md", "markdown", "mdx", "rst"], languageIds: ["markdown", "restructuredtext"] },
  { id: "txt", label: "TXT", role: "muted", fileExtensions: ["txt", "text", "rtf"], languageIds: ["plaintext"] },
  { id: "py", label: "PY", role: "type", fileExtensions: ["py", "pyi", "pyw", "pyx"], fileNames: ["pyproject.toml", "requirements.txt", "setup.cfg", "pipfile", "pipfile.lock", "uv.lock", "poetry.lock", "pytest.ini", "tox.ini", ".python-version"], languageIds: ["python"] },
  { id: "ipynb", label: "NB", role: "type", fileExtensions: ["ipynb"] },
  { id: "rs", label: "RS", role: "keyword", fileExtensions: ["rs"], fileNames: ["cargo.toml", "cargo.lock", "rust-toolchain", "rust-toolchain.toml"], languageIds: ["rust"] },
  { id: "go", label: "GO", role: "storage", fileExtensions: ["go"], fileNames: ["go.mod", "go.sum", "go.work"], languageIds: ["go"] },
  { id: "rb", label: "RB", role: "keyword", fileExtensions: ["rb", "erb", "rake", "gemspec"], fileNames: ["gemfile", "gemfile.lock", "rakefile"], languageIds: ["ruby"] },
  { id: "php", label: "PHP", role: "storage", fileExtensions: ["php", "phtml"], fileNames: ["composer.json", "composer.lock"], languageIds: ["php"] },
  { id: "java", label: "JVA", role: "number", fileExtensions: ["java", "jar", "class"], fileNames: ["pom.xml", "build.gradle", "build.gradle.kts", "settings.gradle", "gradlew"], languageIds: ["java"] },
  { id: "kt", label: "KT", role: "storage", fileExtensions: ["kt", "kts"], languageIds: ["kotlin"] },
  { id: "swift", label: "SWF", role: "number", fileExtensions: ["swift"], fileNames: ["package.swift", "podfile"], languageIds: ["swift"] },
  { id: "c", label: "C", role: "tag", fileExtensions: ["c", "h"], languageIds: ["c"] },
  { id: "cpp", label: "C++", role: "tag", fileExtensions: ["cpp", "cc", "cxx", "hpp", "hh", "hxx"], fileNames: ["cmakelists.txt"], languageIds: ["cpp", "cuda-cpp"] },
  { id: "cs", label: "C#", role: "storage", fileExtensions: ["cs", "csproj", "sln", "csx"], languageIds: ["csharp"] },
  { id: "dart", label: "DRT", role: "type", fileExtensions: ["dart"], fileNames: ["pubspec.yaml", "pubspec.lock"], languageIds: ["dart"] },
  { id: "lua", label: "LUA", role: "keyword", fileExtensions: ["lua"], languageIds: ["lua"] },
  { id: "zig", label: "ZIG", role: "number", fileExtensions: ["zig", "zon"] },
  { id: "elixir", label: "EX", role: "storage", fileExtensions: ["ex", "exs", "heex"], fileNames: ["mix.exs", "mix.lock"] },
  { id: "haskell", label: "HS", role: "storage", fileExtensions: ["hs", "lhs", "cabal"] },
  { id: "scala", label: "SCL", role: "keyword", fileExtensions: ["scala", "sc", "sbt"] },
  { id: "r", label: "R", role: "function", fileExtensions: ["r", "rmd"], languageIds: ["r"] },
  { id: "julia", label: "JL", role: "type", fileExtensions: ["jl"], languageIds: ["julia"] },
  { id: "sh", label: "$_", role: "warning", fileExtensions: ["sh", "bash", "zsh", "fish", "ksh"], fileNames: [".bashrc", ".zshrc", ".bash_profile", ".zprofile", ".profile", ".zshenv"], languageIds: ["shellscript"] },
  { id: "ps1", label: "PS", role: "warning", fileExtensions: ["ps1", "psm1", "psd1"], languageIds: ["powershell"] },
  { id: "bat", label: "BAT", role: "warning", fileExtensions: ["bat", "cmd"], languageIds: ["bat"] },
  { id: "css", label: "CSS", role: "tag", fileExtensions: ["css", "pcss", "postcss"], languageIds: ["css"] },
  { id: "scss", label: "SCS", role: "tag", fileExtensions: ["scss", "sass"], languageIds: ["scss", "sass"] },
  { id: "less", label: "LES", role: "tag", fileExtensions: ["less"], languageIds: ["less"] },
  { id: "html", label: "<>", role: "tag", fileExtensions: ["html", "htm", "xhtml", "ejs", "hbs", "handlebars", "njk", "pug", "jade"], languageIds: ["html", "handlebars", "jade"] },
  { id: "vue", label: "VUE", role: "string", fileExtensions: ["vue"], languageIds: ["vue"] },
  { id: "svelte", label: "SVL", role: "number", fileExtensions: ["svelte"], fileNames: ["svelte.config.js", "svelte.config.ts"], languageIds: ["svelte"] },
  { id: "astro", label: "AST", role: "keyword", fileExtensions: ["astro"], fileNames: ["astro.config.mjs", "astro.config.ts"], languageIds: ["astro"] },
  { id: "sql", label: "SQL", role: "attribute", fileExtensions: ["sql", "psql", "db", "sqlite", "sqlite3"], languageIds: ["sql"] },
  { id: "graphql", label: "GQL", role: "attribute", fileExtensions: ["graphql", "gql", "graphqls"], languageIds: ["graphql"] },
  { id: "proto", label: "PB", role: "attribute", fileExtensions: ["proto"], languageIds: ["proto3", "proto"] },
  { id: "prisma", label: "PRS", role: "attribute", fileExtensions: ["prisma"], languageIds: ["prisma"] },
  { id: "tf", label: "TF", role: "attribute", fileExtensions: ["tf", "tfvars", "hcl"], languageIds: ["terraform", "hcl"] },
  { id: "env", label: "ENV", role: "error", fileExtensions: ["env"], fileNames: [".env", ".env.local", ".env.example", ".env.sample", ".env.development", ".env.production", ".env.test", ".envrc"], languageIds: ["dotenv"] },
  { id: "ini", label: "INI", role: "operator", fileExtensions: ["ini", "cfg", "conf", "config", "properties"], languageIds: ["ini", "properties"] },
  { id: "lock", label: "LCK", role: "muted", fileExtensions: ["lock"], fileNames: ["package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bun.lock", "bun.lockb", "deno.lock", "flake.lock"] },
  { id: "log", label: "LOG", role: "muted", fileExtensions: ["log"], languageIds: ["log"] },
  { id: "csv", label: "CSV", role: "property", fileExtensions: ["csv", "tsv", "psv"] },
  { id: "image", label: "IMG", role: "regexp", fileExtensions: ["png", "jpg", "jpeg", "gif", "webp", "ico", "avif", "bmp", "tif", "tiff", "heic", "psd"] },
  { id: "svg", label: "SVG", role: "regexp", fileExtensions: ["svg"] },
  { id: "audio", label: "AUD", role: "regexp", fileExtensions: ["mp3", "wav", "flac", "ogg", "m4a", "aac", "aiff"] },
  { id: "video", label: "VID", role: "regexp", fileExtensions: ["mp4", "webm", "mov", "mkv", "avi", "m4v"] },
  { id: "font", label: "FNT", role: "subtext", fileExtensions: ["woff", "woff2", "ttf", "otf", "eot"] },
  { id: "pdf", label: "PDF", role: "error", fileExtensions: ["pdf"] },
  { id: "archive", label: "ZIP", role: "muted", fileExtensions: ["zip", "tar", "gz", "tgz", "bz2", "xz", "7z", "rar", "dmg", "iso"] },
  { id: "wasm", label: "WSM", role: "storage", fileExtensions: ["wasm", "wat"], languageIds: ["wat"] },
  { id: "binary", label: "BIN", role: "muted", fileExtensions: ["bin", "exe", "dll", "so", "dylib", "o", "a", "pyc"], languageIds: ["code-text-binary"] },
  { id: "map", label: "MAP", role: "muted", fileExtensions: ["map"] },
  { id: "diff", label: "+-", role: "success", fileExtensions: ["diff", "patch"], languageIds: ["diff"] },
  { id: "git", label: "GIT", role: "warning", fileNames: [".gitignore", ".gitattributes", ".gitmodules", ".gitkeep", ".gitconfig", ".mailmap", "codeowners", ".github/codeowners"], languageIds: ["ignore", "git-commit", "git-rebase"] },
  { id: "docker", label: "DKR", role: "info", fileExtensions: ["dockerfile"], fileNames: ["dockerfile", ".dockerignore", "docker-compose.yml", "docker-compose.yaml", "compose.yml", "compose.yaml", "containerfile"], languageIds: ["dockerfile", "dockercompose"] },
  { id: "npm", label: "NPM", role: "error", fileNames: ["package.json", ".npmrc", ".npmignore", ".yarnrc", ".yarnrc.yml", ".pnpmfile.cjs", "pnpm-workspace.yaml", ".nvmrc", ".node-version"] },
  { id: "tsconfig", label: "TSC", role: "function", fileNames: ["tsconfig.json", "tsconfig.base.json", "tsconfig.build.json", "tsconfig.node.json", "tsconfig.app.json", "tsconfig.spec.json", "jsconfig.json"] },
  { id: "lint", label: "LNT", role: "warning", fileNames: [".eslintrc", ".eslintrc.js", ".eslintrc.cjs", ".eslintrc.json", ".eslintrc.yml", ".eslintignore", "eslint.config.js", "eslint.config.mjs", "eslint.config.cjs", "eslint.config.ts", "biome.json", "biome.jsonc", ".stylelintrc", ".stylelintrc.json", "stylelint.config.js", "ruff.toml", ".ruff.toml", ".flake8", "mypy.ini", ".pylintrc"] },
  { id: "format", label: "FMT", role: "keyword", fileNames: [".prettierrc", ".prettierrc.json", ".prettierrc.js", ".prettierrc.cjs", ".prettierrc.yml", ".prettierignore", "prettier.config.js", "prettier.config.mjs", "prettier.config.cjs", ".editorconfig", "rustfmt.toml", ".clang-format"] },
  { id: "vite", label: "VIT", role: "accent", fileNames: ["vite.config.ts", "vite.config.js", "vite.config.mts", "vite.config.mjs", "vitest.config.ts", "vitest.config.js", "vitest.config.mts", "vitest.workspace.ts"] },
  { id: "next", label: "NXT", role: "subtext", fileNames: ["next.config.js", "next.config.mjs", "next.config.ts", "next-env.d.ts", "middleware.ts"] },
  { id: "tailwind", label: "TW", role: "info", fileNames: ["tailwind.config.js", "tailwind.config.ts", "tailwind.config.cjs", "tailwind.config.mjs", "postcss.config.js", "postcss.config.cjs", "postcss.config.mjs", "postcss.config.ts"] },
  { id: "testconfig", label: "TST", role: "success", fileNames: ["jest.config.js", "jest.config.ts", "jest.config.mjs", "jest.config.cjs", "jest.setup.js", "jest.setup.ts", "playwright.config.ts", "playwright.config.js", "cypress.config.ts", "cypress.config.js", "karma.conf.js", "conftest.py"] },
  { id: "babel", label: "BBL", role: "number", fileNames: [".babelrc", ".babelrc.json", "babel.config.js", "babel.config.json", "babel.config.cjs"] },
  { id: "bundler", label: "PCK", role: "storage", fileNames: ["webpack.config.js", "webpack.config.ts", "webpack.config.cjs", "rollup.config.js", "rollup.config.mjs", "rollup.config.ts", "esbuild.js", "esbuild.mjs", "esbuild.config.js", "tsup.config.ts", "rspack.config.js", "turbo.json", "nx.json", "lerna.json", "rush.json"] },
  { id: "readme", label: "RDM", role: "accent", fileNames: ["readme.md", "readme", "readme.txt", "readme.rst"] },
  { id: "changelog", label: "CHG", role: "subtext", fileNames: ["changelog.md", "changelog", "changes.md", "history.md", "releases.md"] },
  { id: "license", label: "LIC", role: "subtext", fileNames: ["license", "license.md", "license.txt", "licence", "licence.md", "copying", "copying.md", "notice", "unlicense"] },
  { id: "contrib", label: "CTR", role: "subtext", fileNames: ["contributing.md", "code_of_conduct.md", "security.md", "support.md", "authors", "authors.md", "maintainers.md", "governance.md"] },
  { id: "make", label: "MK", role: "warning", fileNames: ["makefile", "gnumakefile", "justfile", "taskfile.yml", "procfile"], languageIds: ["makefile"] },
  { id: "vscode", label: "VSC", role: "info", fileNames: [".vscodeignore", ".vscode/settings.json", ".vscode/launch.json", ".vscode/tasks.json", ".vscode/extensions.json", ".vscode/keybindings.json", ".vscode/mcp.json", "settings.json", "launch.json", "tasks.json", "keybindings.json", "extensions.json", ".vscode-test.mjs", ".vscode-test.js"] },
  { id: "ci", label: "CI", role: "info", fileExtensions: ["jenkinsfile"], fileNames: [".gitlab-ci.yml", ".travis.yml", "jenkinsfile", "azure-pipelines.yml", "bitbucket-pipelines.yml", ".circleci/config.yml", ".github/dependabot.yml", ".github/funding.yml", ".github/release.yml", ".github/pull_request_template.md", "appveyor.yml", "cloudbuild.yaml"] },
  { id: "workflow", label: "RUN", role: "info", fileNames: ["workflows/ci.yml", "workflows/ci.yaml", "workflows/release.yml", "workflows/publish.yml", "workflows/test.yml", "workflows/build.yml", "workflows/deploy.yml", "workflows/lint.yml"] },
  { id: "deploy", label: "DPL", role: "accent2", fileNames: ["vercel.json", "netlify.toml", "fly.toml", "render.yaml", "app.yaml", "app.json", "serverless.yml", "wrangler.toml", "wrangler.json", "wrangler.jsonc", "now.json", "railway.json", "railway.toml", "heroku.yml"] },
  { id: "deps", label: "DEP", role: "muted", fileNames: ["renovate.json", ".renovaterc", ".renovaterc.json", "dependabot.yml", ".dependabot.yml"] },
  { id: "husky", label: "HK", role: "warning", fileNames: ["pre-commit", "pre-push", "commit-msg", ".pre-commit-config.yaml", "lefthook.yml", ".huskyrc", "commitlint.config.js", "commitlint.config.cjs", ".commitlintrc", ".commitlintrc.json"] },
  { id: "nix", label: "NIX", role: "info", fileExtensions: ["nix"], fileNames: ["flake.nix", "shell.nix", "default.nix"] },
  { id: "claude", label: "AI", role: "accent2", fileExtensions: ["prompt.md", "instructions.md", "agent.md"], fileNames: ["claude.md", "agents.md", "agent.md", ".clauderc", ".cursorrules", "copilot-instructions.md", "gemini.md", ".claude/settings.json", ".claude/settings.local.json", "skill.md"], languageIds: ["prompt", "instructions", "chatagent", "skill"] },
  { id: "latex", label: "TEX", role: "storage", fileExtensions: ["tex", "bib", "cls", "sty"], languageIds: ["latex", "tex", "bibtex"] },
  { id: "key", label: "KEY", role: "error", fileExtensions: ["pem", "key", "crt", "cer", "pub", "p12", "pfx", "gpg", "asc"] },
  { id: "database", label: "DB", role: "attribute", fileExtensions: ["db3", "parquet", "avro", "dump", "mdb", "accdb"] },
];

export const FOLDER_ICONS: FolderIconDef[] = [
  { id: "folder", label: null, role: "accent2", glyph: "motif" },
  { id: "folder-root", label: null, role: "accent", glyph: "ae", markScale: 1.25 },
  { id: "folder-src", label: "SRC", role: "accent", folderNames: ["src", "source", "sources", "code"] },
  { id: "folder-lib", label: "LIB", role: "storage", folderNames: ["lib", "libs", "library", "libraries", "vendor", "third_party", "third-party"] },
  { id: "folder-out", label: "OUT", role: "muted", folderNames: ["dist", "build", "out", "output", "target", "bin", "obj", ".next", ".nuxt", ".svelte-kit", ".output", ".vercel", ".netlify", "_site", "release"] },
  { id: "folder-deps", label: "DEP", role: "muted", folderNames: ["node_modules", ".pnpm", ".yarn", ".venv", "venv", "env", ".env", "__pycache__", ".tox", ".mypy_cache", ".ruff_cache", ".pytest_cache", "site-packages", ".cargo", ".gradle", "bower_components"] },
  { id: "folder-public", label: "PUB", role: "string", folderNames: ["public", "static", "assets", "resources", "res", "wwwroot"] },
  { id: "folder-media", label: "IMG", role: "regexp", folderNames: ["images", "img", "image", "media", "icons", "fonts", "font", "audio", "video", "videos", "pictures", "photos", "sprites", "textures"] },
  { id: "folder-styles", label: "CSS", role: "tag", folderNames: ["styles", "style", "css", "scss", "sass", "less", "stylesheets", "themes", "theme"] },
  { id: "folder-ui", label: "UI", role: "function", folderNames: ["components", "component", "ui", "views", "view", "pages", "page", "layouts", "layout", "screens", "widgets", "app", "routes", "templates", "partials"] },
  { id: "folder-utils", label: "UTL", role: "type", folderNames: ["utils", "util", "utilities", "helpers", "helper", "shared", "common", "core", "internal", "hooks", "composables", "stores", "store", "state", "context", "services", "service"] },
  { id: "folder-test", label: "✓", role: "success", folderNames: ["test", "tests", "__tests__", "__test__", "spec", "specs", "e2e", "__mocks__", "mocks", "fixtures", "__fixtures__", "__snapshots__", "cypress", "playwright", "testing", "integration"] },
  { id: "folder-docs", label: "DOC", role: "subtext", folderNames: ["docs", "doc", "documentation", "wiki", "guide", "guides", "manual", "notes", "adr", "rfcs", "rfc"] },
  { id: "folder-scripts", label: "$_", role: "warning", folderNames: ["scripts", "script", "tools", "tool", "cli", "commands", "tasks", ".husky"] },
  { id: "folder-config", label: "CFG", role: "operator", folderNames: ["config", "configs", "configuration", ".config", "settings", "conf", "etc", "environments"] },
  { id: "folder-types", label: "TYP", role: "type", folderNames: ["types", "type", "typings", "@types", "interfaces", "models", "model", "schemas", "schema", "entities", "dto", "dtos"] },
  { id: "folder-api", label: "API", role: "keyword", folderNames: ["api", "apis", "server", "backend", "controllers", "controller", "handlers", "handler", "middleware", "middlewares", "endpoints", "graphql", "grpc", "rpc", "functions", "lambda", "workers", "worker"] },
  { id: "folder-git", label: "GIT", role: "warning", folderNames: [".github", ".gitlab", ".circleci", ".git", ".changeset", ".github/workflows", "workflows", ".github/actions", "actions"] },
  { id: "folder-ide", label: "IDE", role: "info", folderNames: [".vscode", ".idea", ".vs", ".fleet", ".zed", ".devcontainer", ".claude", ".cursor", ".codex", ".agents"] },
  { id: "folder-tmp", label: "TMP", role: "muted", folderNames: ["coverage", ".nyc_output", ".cache", "cache", ".turbo", ".parcel-cache", "tmp", "temp", ".tmp", ".temp", "logs", "log", ".log", ".DS_Store", ".sass-cache", ".eslintcache", ".vite", ".webpack"] },
  { id: "folder-i18n", label: "LNG", role: "attribute", folderNames: ["i18n", "l10n", "locales", "locale", "lang", "langs", "languages", "translations", "translation", "intl", "messages"] },
  { id: "folder-db", label: "DB", role: "attribute", folderNames: ["migrations", "migration", "prisma", "db", "database", "databases", "data", "sql", "seeds", "seed", "seeders", "drizzle", "supabase"] },
  { id: "folder-packages", label: "PKG", role: "storage", folderNames: ["packages", "package", "apps", "modules", "module", "plugins", "plugin", "extensions", "extension", "addons", "crates", "workspaces", "projects", "monorepo"] },
  { id: "folder-examples", label: "EX", role: "string", folderNames: ["examples", "example", "demo", "demos", "samples", "sample", "playground", "sandbox", "prototypes", "experiments"] },
  { id: "folder-docker", label: "DKR", role: "info", folderNames: ["docker", "dockerfiles", ".docker", "containers", "k8s", "kubernetes", "helm", "charts", "terraform", "infra", "infrastructure", "deploy", "deployment", "deployments", "ansible", "cloud", "ops", "devops"] },
  { id: "folder-security", label: "KEY", role: "error", folderNames: ["secrets", "secret", "keys", "certs", "certificates", "credentials", "private", ".ssh", ".gnupg", "auth", "security"] },
  { id: "folder-generated", label: "GEN", role: "muted", folderNames: ["generated", "gen", "__generated__", ".generated", "codegen", "proto", "protos", "schemas/gen", "autogen"] },
];
