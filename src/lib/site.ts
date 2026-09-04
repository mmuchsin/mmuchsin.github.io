import type { Locale } from './i18n';

/** Canonical site origin — the CNAME domain (ADR 0001, base `''`). */
export const SITE_URL = 'https://muchsin.me';
/** Site name used as the title suffix (matches `meta.title` in the dictionaries). */
export const SITE_NAME = 'Muchsin';
/** Default social card image, served from static/. */
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

/** Canonical, trailing-slashed URL for a locale page: `pageUrl('en', 'blog')` → `/en/blog/`. */
export function pageUrl(locale: Locale, subpath = ''): string {
	return `${SITE_URL}/${locale}/${subpath ? `${subpath}/` : ''}`;
}

/** Compose a page title with the site-name suffix, e.g. `Blog — Muchsin`. */
export function formatTitle(pageTitle: string): string {
	return `${pageTitle} — ${SITE_NAME}`;
}

