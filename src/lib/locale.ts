import { LOCALES, type Locale } from './i18n';
export type { Locale };

const localeSet: ReadonlySet<string> = new Set(LOCALES);

/**
 * Narrow an unknown value (route params, URL segments) to a supported locale.
 */
export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && localeSet.has(value);
}

/**
 * Map a browser language string (e.g. `navigator.language`) to the closest supported locale.
 * Falls back to `'en'` for unsupported or missing values.
 */
export function resolveLocale(browserLang: string | undefined): Locale {
	if (!browserLang) return 'en';
	const lower = browserLang.toLowerCase();
	// Exact match first (e.g. 'en', 'id')
	if (isLocale(lower)) return lower;
	// Prefix match (e.g. 'en-US' → 'en', 'id-ID' → 'id')
	const primary = lower.split('-')[0];
	if (isLocale(primary)) return primary;
	return 'en'; // Default fallback
}

/**
 * The path segment a URL's locale sits in — directly after the base path.
 * With the empty base on the root domain that's segment 1.
 */
function localeSegmentIndex(base: string): number {
	return base === '' ? 1 : base.split('/').length;
}

/**
 * The locale a URL path carries (`/en/blog/…` → `'en'`), or null when the
 * path has no locale segment.
 */
export function localeFromPath(path: string, base = ''): Locale | null {
	const segment = path.split('/')[localeSegmentIndex(base)];
	return isLocale(segment) ? segment : null;
}

/**
 * Replace the locale segment of a URL path, leaving base path, slugs, and
 * tag names untouched. The locale is replaced by position — a tag or slug
 * named "en" or "id" further along the path must never be mistaken for it.
 * Returns the path unchanged when it carries no locale.
 */
export function swapLocale(path: string, next: Locale, base = ''): string {
	const segments = path.split('/');
	const index = localeSegmentIndex(base);
	if (!isLocale(segments[index])) return path;
	segments[index] = next;
	return segments.join('/');
}

/**
 * Locale-aware long date for post frontmatter dates. Date-only strings
 * ("2026-08-29") parse at UTC midnight, so format in UTC — otherwise
 * viewers in negative-offset timezones see the previous day.
 */
export function formatDate(date: string, locale: Locale): string {
	return new Date(date).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	});
}
