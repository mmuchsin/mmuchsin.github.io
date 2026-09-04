# Portfolio

Personal portfolio & blog for **Muchsin** — bilingual (EN/ID), light editorial design, fully static. Live at **[muchsin.me](https://muchsin.me)**.

## Stack

- [SvelteKit](https://svelte.dev/docs/kit) + TypeScript (strict) + Svelte 5 runes
- [`@sveltejs/adapter-static`](https://github.com/sveltejs/kit/tree/main/packages/adapter-static) — no SSR, everything prerendered at build time
- Blog posts in MDX (`src/content/blog/`), rendered with a local pipeline — code highlighting + callout boxes
- Deployed to the root of **muchsin.me** on GitHub Pages via GitHub Actions (CNAME, `paths.base: ''`)
- No CSS framework, no animation library — vanilla CSS custom properties and hand-rolled motion only (ADR 0005)

## Locale routing

The URL drives all language logic (ADR 0008): `/en/…` and `/id/…` prefixes select translations, blog content, date formats, and the document `lang`. The root path redirects client-side based on the visitor's browser language. Each post declares its language in frontmatter and is only served under its own locale — a mismatched locale 404s.

All site copy lives in `src/lib/i18n/{en,id}.json`; both files are checked against the same `Dictionary` type at compile time, and a Vitest suite asserts the two locales stay structurally in sync.

## Getting started

```sh
bun install
bun run dev        # → http://localhost:5173
```

## Scripts

| Script                | What it does                            |
| --------------------- | --------------------------------------- |
| `bun run dev`         | Dev server                              |
| `bun run build`       | Static export to `build/`               |
| `bun run preview`     | Preview the production build locally    |
| `bun run check`       | Typecheck with `svelte-check`           |
| `bun run test`        | Unit tests (Vitest)                     |
| `bun run test:e2e`    | E2E tests (Playwright, builds first)    |

## Structure

```
src/
├── content/blog/       # MDX posts, one folder per post (frontmatter: lang, tags, categories)
├── lib/
│   ├── components/     # Header, LanguageToggle, Hero, About, Projects, Contact, Footer
│   ├── i18n/           # en.json / id.json + Dictionary types + structural-sync test
│   ├── locale.ts       # isLocale, resolveLocale, swapLocale, formatDate
│   └── mdx/            # MDX renderer, frontmatter parsing, callout components
├── routes/
│   ├── +page.svelte    # Root stub — redirects by browser language
│   └── [locale]/       # One-page home (ADR 0002 pattern) + blog routes per locale
│       └── blog/        # index, [slug], tags/[tag]
└── app.css             # Design tokens and all styles
e2e/                    # Playwright specs (redirect, navigation, rendering, 404s)
```

## Documentation

- [`CONTEXT.md`](./CONTEXT.md) — project glossary, current state, open questions
- [`docs/adr/`](./docs/adr/) — architecture decision records (ADR 0008: locale routing)
- [`docs/spec/`](./docs/spec/) — feature specs (e.g. [locale routing](./docs/spec/locale-routing.md))
- [`docs/agents/`](./docs/agents/) — agent workflow configuration (issue tracker, triage labels, domain docs)
