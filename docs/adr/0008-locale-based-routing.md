---
status: accepted
---

# Locale-based routing replaces client-side language toggle

## Context

ADR 0003 rejected per-locale URLs in v1 because a static subpath site would double build output and complicate anchor links. The decision was: one page, one address, language toggled via localStorage.

The blog feature (v1.2) changed the trade-off calculus. Blog posts have `lang: en/id` frontmatter and are independent content units. With store-based filtering, both locales ship to every visitor and per-language SEO is limited. ADR 0003 explicitly noted this would be revisited if per-locale indexing ever matters.

## Decision

Replace the localStorage-based language toggle with URL-driven locale prefixes:

- `domain.com/en/...` — English content
- `domain.com/id/...` — Indonesian content
- Root path (`domain.com/`) auto-redirects to `/en/` or `/id/` based on browser language
- Unsupported locales return a custom bilingual 404 page
- Blog posts are enforced per-locale via frontmatter `lang` — an English post under `/id/` returns 404

The site keeps the one-page home (ADR 0002): About, Projects, and Contact render as sections on the home page below the Hero, reached via anchors (`/en/#about`). Standalone routes (`/en/about`, `/en/projects`, `/en/contact`) also exist as deep-linkable per-locale URLs rendering the same components. Blog remains multi-page (each post has its own URL).

> **Amended (2026-09-01):** the migration originally shipped a multi-page split — Hero only on `/en/`, sections as separate routes with route-based nav. That regressed the one-page UX (nav could no longer scroll to sections from the home page) and the migration had also dropped the reveal/active-section observers and the mobile-menu rules. Restored: one-page home, anchor nav, per-page reveal wiring, observer-based nav highlighting, state-driven mobile menu. Standalone section routes remain as deep links.
>
> **Amended (2026-09-03, fix/blog):** the `fix/blog` port of this migration targets the root domain (`muchsin.me`, base `''`) and deliberately keeps the stable v1 UI — the standalone section routes (`/en/about`, `/en/projects`, `/en/contact`) and the `nav.home` entry from the redesign are **not** included. Sections exist only as anchors on the one-page home (`/en/#about`).

The `lang-store.ts` store is removed entirely — locale comes from the URL path segment via SvelteKit's `[locale]` catch-all route.

## Consequences

- **SEO:** Each locale has its own URL structure, enabling per-language indexing by search engines
- **Build output:** Doubles HTML files (one per locale), but the site is small (~3 main pages + blog posts) so this is negligible
- **Deep links:** Section URLs are shareable both ways — anchor (`/en/#about`) and standalone route (`/en/about`)
- **Navigation:** Nav links target the home page's section anchors (matching the one-page UX); standalone section routes are retained for deep links. Hero + all sections appear on the home page.
- **Language toggle:** Simplified to one toggle in the shared Header, linking `/en/path` ↔ `/id/path`
- **Breaking change:** All existing URLs change. GitHub Pages links like `domain.com/blog/hello-world` become `domain.com/en/blog/hello-world`. A redirect from old paths may be needed if there's existing traffic.
- **Supersedes ADR 0003** (Bilingual i18n toggle).
