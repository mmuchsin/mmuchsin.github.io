# Portfolio

Personal portfolio website for **M. Muchsin (Ucin)** — bilingual (EN/ID), dark typographic design, fully static.

## Stack

- [SvelteKit](https://svelte.dev/docs/kit) + TypeScript (strict) + Svelte 5 runes
- [`@sveltejs/adapter-static`](https://github.com/sveltejs/kit/tree/main/packages/adapter-static) — no SSR, everything prerendered at build time
- Deployed to GitHub Pages (`mmuchsin.github.io/portfolio`) via GitHub Actions
- No CSS framework, no animation library — vanilla CSS custom properties and transitions only

## Getting started

```sh
bun install
bun run dev        # → http://localhost:5173/portfolio
```

## Scripts

| Script            | What it does                              |
| ----------------- | ----------------------------------------- |
| `bun run dev`     | Dev server (served under `/portfolio`)    |
| `bun run build`   | Static export to `build/`                 |
| `bun run preview` | Preview the production build locally      |
| `bun run check`   | Typecheck with `svelte-check`             |
| `bun run test`    | Unit tests (Vitest)                       |

## Structure

```
src/
├── lib/
│   ├── components/     # Header, Hero, About, Projects, Contact, Footer
│   └── i18n/           # en.json / id.json + Dictionary types
├── routes/             # Single page at / (ADR 0002)
└── app.css             # Design tokens and all styles (ADR 0004)
```

All site copy lives in `src/lib/i18n/{en,id}.json`; both files are checked against the same `Dictionary` type, and a Vitest suite asserts the two locales stay structurally in sync.

## Documentation

- [`CONTEXT.md`](./CONTEXT.md) — project glossary, current state, open questions
- [`docs/adr/`](./docs/adr/) — architecture decision records
- [`docs/agents/`](./docs/agents/) — agent workflow configuration (issue tracker, triage labels, domain docs)
