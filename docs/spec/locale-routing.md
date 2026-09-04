# Spec: Locale-Based Routing

> Status: implemented on `fix/blog` (2026-09-03) — stable-UI port of the
> design in ADR 0008, reconfigured for the root domain (`muchsin.me`,
> base `''`). The original implementation history lives on the
> `feat/ui-ux-redesign` branch of the `portfolio` repo.

## Goal

Migrate from store-based language filtering (localStorage toggle) to URL-driven locale prefixes (`/en/`, `/id/`). The URL path segment drives all language logic — translations, content filtering, date formatting, document lang attribute.

## Route Structure

```
src/routes/
  +page.svelte                  → Root redirect stub (client-side, browser language)
  +error.svelte                 → 404 page (rendered into 404.html by adapter fallback)
  +layout.server.ts             → Loads blog posts, typed LayoutServerLoad
  +layout.svelte                → Skip link + slot (unchanged)
  +layout.ts                    → prerender: true (unchanged)

  [locale]/                     → Catch-all route for locale-prefixed paths
    +layout.server.ts           → Validates params.locale (en/id), 404s otherwise
    +layout.svelte              → Header (stable) + Footer + html lang effect + active-section observer
    +page.svelte                → One-page home: Hero + About + Projects + Contact

    blog/
      +layout.svelte            → Pass-through snippet render
      +page.svelte              → Blog index (filters posts by URL locale)
      [slug]/
        +page.server.ts         → Finds post, 404s if post.lang !== locale
        +page.svelte            → Post detail
    blog/tags/[tag]/
        +page.server.ts         → Load posts by tag + locale
        +page.svelte            → Tag page (filtered by URL locale)
```

## Root Redirect Logic

- `src/lib/locale.ts` (`resolveLocale`) maps the browser language to
  `en`/`id` with `en` fallback
- Prerendered root stub (`+page.svelte`) redirects client-side on mount;
  a `<noscript>` block links both locales
- Uses `base` from `$app/paths` — the empty string on the root domain

## Locale Layout (`[locale]/+layout.svelte`)

- `[locale]/+layout.server.ts` validates `params.locale` (`en`/`id`) and 404s otherwise
- Loads translations based on locale: `translations[locale]`
- Sets `<html lang>` to the active locale (hydration effect)
- Header receives translated nav labels and the language toggle
- Toggle swaps the locale segment **by position** (`swapLocale` in
  `src/lib/locale.ts`) — a tag or slug named "en"/"id" further along the path
  is never mistaken for the locale
- Active-section tracking (IntersectionObserver) lives in this layout so nav highlighting works across navigations

## Home Page (`[locale]/+page.svelte`)

- One-page home: Hero + About + Projects + Contact (ADR 0002 pattern)
- Nav and Hero CTAs target section anchors (`/en/#about`)
- Scroll reveals wired per page (ADR 0005)

## Blog Migration

- Blog index filters posts by URL locale: `posts.filter(p => p.lang === locale)`
- Post detail enforces language alignment: if `post.lang !== locale`, return 404
- Tag page filters by both tag AND locale
- Dates format via `formatDate(date, locale)` (`src/lib/locale.ts`) — long
  form, `id-ID` vs `en-US`, formatted at UTC (date-only frontmatter parses
  at UTC midnight)
- No inline language filter — the URL locale does the filtering, the
  Header toggle is the only language switch

## Language Toggle

- Single toggle in `[locale]/+layout.svelte` Header (stable `LanguageToggle` component)
- Shows "EN" / "ID" buttons
- Clicking links to `/en/same-path` or `/id/same-path`
- Active button highlighted with `.active` class
- Removed from: blog layout, blog index, tag page, post detail

## 404 Page

- Custom error page (bilingual body) for unsupported locales and missing pages
- Rendered into `build/404.html` by `adapter-static` fallback

## Cleanup

- **Removed `lang-store.ts`** — no longer needed, locale comes from URL
- **No standalone section routes** — deliberate deviation from ADR 0008's
  amendment (stable UI kept; sections are anchors only)
- **`nav.home` dropped** from the Dictionary — stable nav is about/projects/contact/blog
- **Prerender entries** (`svelte.config.js`) cover locale prefix for all
  routes; posts prerender only in their own language's tree

## Root-Domain Configuration (this repo)

- `kit.paths.base: ''` — root domain (CNAME `muchsin.me`), NOT `/portfolio`
- `adapter-static` with `strict: true` + `fallback: '404.html'`

## Translation Keys Added

| Key | EN value | ID value |
|-----|----------|----------|
| `blog_subtitle` | "Learning notes and technical reflections" | "Catatan belajar dan renungan teknis" |
| `tag_heading` | "Posts tagged with " | "Postingan bertanda " |
| `blog_back` | "← Back to Blog" | "← Kembali ke Blog" |
| `redirect.message` | "Redirecting…" | "Mengalihkan…" |
| `redirect.link_en` / `redirect.link_id` | "English" / "Bahasa Indonesia" | same (self-named) |
| `error.not_found` | "This page could not be found." | "Halaman ini tidak ditemukan." |

Locale type logic lives in `src/lib/locale.ts`: `isLocale` (type guard,
replaces casting), `resolveLocale`, `localeFromPath`, `swapLocale`,
`formatDate`. `SUPPORTED_LOCALES` was consolidated into i18n's `LOCALES`.

## Translation Keys Removed

- `hero.flip_hint` — unused by Hero.svelte; dropped from the Dictionary and both locale files

## Breaking Changes

- All URLs change: `/blog/hello-world` → `/en/blog/hello-world`
- Existing bookmarks and shared links will break (no redirect configured)
- Acceptable for a personal portfolio with minimal existing traffic
