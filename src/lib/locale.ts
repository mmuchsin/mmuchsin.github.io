import type { Locale } from './i18n';
export type { Locale };

export const SUPPORTED_LOCALES: readonly Locale[] = ['en', 'id'];
/**
 * Map a browser language string (e.g. `navigator.language`) to the closest supported locale.
 * Falls back to `'en'` for unsupported or missing values.
 */
export function resolveLocale(browserLang: string | undefined): Locale {
	if (!browserLang) return 'en';
	const lower = browserLang.toLowerCase();
	// Exact match first (e.g. 'en', 'id')
	if (SUPPORTED_LOCALES.includes(lower as Locale)) return lower as Locale;
	// Prefix match (e.g. 'en-US' → 'en', 'id-ID' → 'id')
	const primary = lower.split('-')[0];
	if (SUPPORTED_LOCALES.includes(primary as Locale)) return primary as Locale;
	return 'en'; // Default fallback
}
