---
status: accepted
---

# SvelteKit + adapter-static for GitHub Pages

## Context

The portfolio must be hosted on GitHub Pages (`mmuchsin.github.io/portfolio`) — free, no server runtime, nothing to manage (spec user story 6). The site also requires TypeScript strict mode and Svelte 5 runes.

## Decision

Build with SvelteKit + TypeScript (strict) and export a fully static site via `@sveltejs/adapter-static`, served from the `/portfolio` base path. No SSR, no server-only APIs.

## Consequences

- Every route must be pre-renderable; anything needing a server is out by construction — contact is GitHub/LinkedIn links only, no form.
- Astro was the conventional alternative for a content site; SvelteKit was chosen to get runes and strict TS in one framework. Next.js implies SSR we cannot host on Pages.
