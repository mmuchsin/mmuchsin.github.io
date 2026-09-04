# Portfolio

Personal portfolio website for Muchsin, deployed on GitHub Pages.

## Tech Stack

- SvelteKit + TypeScript (strict mode)
- Static output via `@sveltejs/adapter-static`
- Deployed via GitHub Actions to GitHub Pages
- Bilingual (EN/ID)

## Conventions

- TypeScript strict mode everywhere; no implicit `any`
- Prefer Svelte 5 runes (`$state`, `$derived`, `$effect`) over legacy stores
- Keep site static-export compatible
- Locale routing: `/en/…` and `/id/…` URL prefixes (ADR 0008); base path: `''` — root domain `muchsin.me` via CNAME

## Package Management

**Always use `bun` instead of `npm` or `yarn` for all package management and script execution** (install, run, build, test) in this project. Never fall back to npm even if `package-lock.json` exists.

Examples:
- `bun install` instead of `npm install`
- `bun add <package>` instead of `npm install <package>`
- `bun remove <package>` instead of `npm uninstall <package>`
- `bunx instead` of `npx`
- `bun run dev`, `bun run build`, `bun run check`, `bun run test`

This applies to all shell commands, scripts, and agent actions.

## Agent skills

### Issue tracker

Issues live in GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical roles: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: `CONTEXT.md` at root, ADRs in `docs/adr/`. See `docs/agents/domain.md`.
