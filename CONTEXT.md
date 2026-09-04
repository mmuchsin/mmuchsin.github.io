# CONTEXT.md — Portfolio Project

## Project
Personal portfolio website for **Muchsin**, deployed on GitHub Pages.

## Glossary

| Term | Definition |
|------|------------|
| **Ucin** | Nickname / alias; rarely used externally — display name is just "Muchsin" |
| **Santri** | Islamic student/scholar background; expertise in classical Arabic grammar (*nahwu*) and Pegon script |
| **Pegon** | Javanese script for writing Arabic-script languages; core of Pegonku project |
| **Nahwu** | Classical Arabic grammar; part of Muchsin's scholarly background |
| **Kitab** | Classical Islamic texts; domain of translation tracker project |
| **RAG** | Retrieval-Augmented Generation; thesis research area |
| **TQA** | Thesis Question Answering dataset; thesis playground project |
| **HPC** | High-Performance Computing; UNNES cluster used for thesis work |
| **locale** | The language prefix segment in the URL path (`en` or `id`); drives all language logic — translations, content filtering, date formatting, document lang |

## Current State

**v1 implemented (2026-08-27):** single-page site built with SvelteKit + TypeScript (strict) + Svelte 5 runes; fully static via `@sveltejs/adapter-static`; EN/ID toggle persisted in localStorage. Deploys to GitHub Pages via GitHub Actions on push to `main`.

**v2 locale-based routing (2026-09-03, `fix/blog`):** URL-driven locale prefixes (`/en/`, `/id/`) replace the localStorage toggle — ADR 0008, superseding ADR 0003. Root path redirects client-side by browser language (with `<noscript>` fallback). Blog posts are enforced per-locale via frontmatter `lang` (mismatched locale 404s); the blog language filter group is gone. Stable v1 UI kept — no redesign UX. Custom domain `muchsin.me` live at the root (base `''`); development continues in this repo (`mmuchsin.github.io`).

**v1.1 design pass (2026-08-27):** three-voice type system (serif display / sans body / mono utility), featured + list project layout, script-flip hero signature (`assalamu'alaikum` ↔ `السلام عليكم`), orchestrated motion per ADR 0005 (load stagger, scroll reveals, micro-interactions).

**v1.2 light editorial redesign (2026-08-28):** three-phase rollout — (14) palette swap to light theme (`--bg: #f8f9fa`, `--surface: #ffffff`, `--accent: #c49a3a` gold), (15) typography scale refinements (clamp-based hero name, lighter heading weight, tighter container), (16) motion refinements (scaled component animations, increased translate distances, polished layout). ADR 0004 (dark typographic design) fully superseded.

- Repo: `mmuchsin/mmuchsin.github.io` (public; active development repo — `mmuchsin/portfolio`, the earlier dev repo, was **archived 2026-09-04**: read-only, Pages off, kept for history; its code stays fetchable via `git fetch https://github.com/mmuchsin/portfolio.git`)
- Issue tracker: GitHub Issues with 5 canonical triage labels
- Tech stack: SvelteKit + TypeScript (strict) + Svelte 5 runes + `@sveltejs/adapter-static`
- Deploy: GitHub Pages via GitHub Actions; root domain `muchsin.me` (CNAME, `kit.paths.base: ''`)
- Design: Light editorial theme, three-voice typography (serif / sans / mono), warm gold accent
- Bilingual: EN/ID via URL-driven locale routing (`/en/`, `/id/`)
- Structure: One-page home per locale (Header, Hero, About, Projects, Contact, Footer) + multi-page blog (index, post, tag pages)
- All copy flows through typed i18n dictionary (`src/lib/i18n/*.json`) — zero hardcoded text in components

## Projects to Showcase

1. **Pegonku** — Pegon transliteration engine (Nuxt + Python)
   - Live: `https://pegonku.netlify.app`
   - Repo: Public (Nuxt frontend + Python backend)
   - Tags: Nuxt, Python, NLP, Pegon, Transliteration

2. **Pemuda Inklusi** — Community platform (Vue/Nuxt)
   - Live: `https://pemudainklusi.org`
   - Repo: Private
   - Tags: Vue, Nuxt, Community Platform

3. **Tokodifabel** — E-commerce client site (WordPress/WooCommerce)
   - Live: `https://tokodifabel.com`
   - Repo: None (WordPress)
   - Tags: WordPress, WooCommerce, Freelance, GSAP

4. **TQA RAG Playground** — Master's thesis prep (RAG pipeline on UNNES HPC)
   - Live: None (local/HPC)
   - Repo: `mmuchsin/tqa-rag` (public)
   - Tags: Python, RAG, HPC, UNNES, Thesis Research

## Key Decisions (ADR references)

- ADR 0001: SvelteKit + adapter-static for GitHub Pages
- ADR 0002: Single-page layout with 4 sections
- ADR 0003: ~~Bilingual i18n with EN/ID toggle, localStorage persistence~~ — superseded by ADR 0008 (locale-based routing)
- ADR 0004: ~~Dark typographic design~~ — superseded by v1.2 light editorial redesign (2026-08-28)
- ADR 0005: Hand-rolled orchestrated motion (CSS keyframes + IntersectionObserver), no animation libraries — supersedes ADR 0004's "CSS transitions only" clause
- ADR 0008: Locale-based routing (`/en/`, `/id/` URL prefixes) replaces the client-side language toggle

## Open Questions

- Blog comments (giscus / GitHub Discussions — next feature candidate)
- CV/Resume page (future)
## Blog Feature (implemented 2026-08-29, locale-aware since v2)

**Status:** Shipped — per-locale URLs (`/en/blog/…`, `/id/blog/…`).

- **Content format**: MDX (`.mdx`) with local files in `src/content/blog/`; frontmatter includes `lang` (`en`/`id`)
- **Organization**: Categories + tags as frontmatter metadata (tag pages per locale)
- **Routing**: `/{locale}/blog` (list), `/{locale}/blog/slug` (post, 404s if `post.lang` ≠ locale), `/{locale}/blog/tags/tag-name` (tag filter)
- **Frontmatter**: `title`, `date`, `tags`, `categories`, `lang`, `description`
- **MDX components**: Syntax-highlighted code blocks + callout boxes (note/warning/tip/info)
- **Images**: Local assets folder alongside each post file
- **Extras**: Auto-calculated reading time, locale-aware date formatting (`id-ID`/`en-US`), no pagination
- **Build**: Build-time rendering via SvelteKit data loading; posts prerender only in their own language's tree
- **ADR**: 0006 (MDX choice), 0007 (categories + tags), 0008 (locale routing)
