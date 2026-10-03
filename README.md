# portfolio-site

This repo houses the source code of my personal website. It is still in development, but you can take a look by building it yourself!

## Building & Running From Source

1. Make sure you have [Node.js](https://www.nodejs.org) installed.
2. Clone this repo.
3. Install all dependencies using npm.

```
npm install
```

4. Start the development. Use the project's `dev` script for this.

```
npm run dev
```

5. Open the link `http://localhost:8080` to see the website.
6. To stop the development server, press `Ctrl + C` in the terminal.

## Linting & Formatting

Biome handles JavaScript, TypeScript, JSON, linting, and import organization.
Prettier handles the SCSS and Markdown files.

- `npm run lint`: check Biome lint rules.
- `npm run lint:fix`: apply safe lint fixes.
- `npm run check`: check lint rules, formatting, and imports together.
- `npm run check:fix`: apply safe fixes, formatting, and import organization.
- `npm run format`: format Biome-supported files, SCSS, and Markdown.
- `npm run format:check`: verify formatting without writing changes.

Install the recommended Biome VS Code extension for formatting and safe fixes on save.

The configuration was generated with Biome 2.5.15 using
`biome migrate eslint --write --include-inspired` and `biome migrate prettier --write`.
Generated output and the npm lockfile are excluded from Biome checks. Semicolons
are explicitly enabled to preserve the previous Prettier style.

The migration preserves supported ESLint rules and TypeScript overrides. React
Compiler validation is explicitly enabled at error severity with Biome's experimental
[`nursery.useReactCompiler`](https://biomejs.dev/linter/rules/use-react-compiler/javascript/)
rule; the ESLint migration tool does not map the individual compiler-related rules
to it automatically. Some other ESLint rules still have no Biome equivalent. The
Prettier import-order and JSON-sorting plugins were removed; Biome's import
organizer now controls imports. See the [Biome migration guide](https://biomejs.dev/guides/migrate-eslint-prettier/).
