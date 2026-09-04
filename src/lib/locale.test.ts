import { describe, expect, it } from 'vitest';
import {
	formatDate,
	isLocale,
	localeFromPath,
	resolveLocale,
	swapLocale
} from './locale.js';
import { LOCALES, type Locale } from './i18n';

describe('resolveLocale', () => {
	it('returns en for undefined input', () => {
		expect(resolveLocale(undefined)).toBe('en');
	});

	it('returns en for empty string', () => {
		expect(resolveLocale('')).toBe('en');
	});

	it('recognizes exact "en"', () => {
		expect(resolveLocale('en')).toBe('en');
	});

	it('recognizes exact "id"', () => {
		expect(resolveLocale('id')).toBe('id');
	});

	it('recognizes lowercase "en"', () => {
		expect(resolveLocale('en-us')).toBe('en');
	});

	it('recognizes lowercase "id"', () => {
		expect(resolveLocale('id-ID')).toBe('id');
	});

	it('defaults to en for unsupported locale', () => {
		expect(resolveLocale('fr')).toBe('en');
	});

	it('defaults to en for unsupported regional locale', () => {
		expect(resolveLocale('ja-JP')).toBe('en');
	});

	it('extracts primary language from regional tag', () => {
		expect(resolveLocale('pt-BR')).toBe('en');
	});

	it('is case-insensitive', () => {
		expect(resolveLocale('EN')).toBe('en');
		expect(resolveLocale('ID')).toBe('id');
		expect(resolveLocale('En-US')).toBe('en');
	});

	it('handles locale with multiple subtags', () => {
		expect(resolveLocale('en-x-private')).toBe('en');
	});
});

describe('isLocale', () => {
	it('accepts en and id', () => {
		expect(isLocale('en')).toBe(true);
		expect(isLocale('id')).toBe(true);
	});

	it('rejects other strings', () => {
		expect(isLocale('fr')).toBe(false);
		expect(isLocale('EN')).toBe(false);
		expect(isLocale('')).toBe(false);
	});

	it('rejects non-strings', () => {
		expect(isLocale(undefined)).toBe(false);
		expect(isLocale(1)).toBe(false);
		expect(isLocale(null)).toBe(false);
	});
});

describe('localeFromPath', () => {
	it('reads the locale segment (root domain, empty base)', () => {
		expect(localeFromPath('/en/')).toBe('en');
		expect(localeFromPath('/id/blog/')).toBe('id');
		expect(localeFromPath('/en/blog/my-post/')).toBe('en');
	});

	it('reads the locale after a non-empty base', () => {
		expect(localeFromPath('/portfolio/en/', '/portfolio')).toBe('en');
		expect(localeFromPath('/portfolio/id/blog/', '/portfolio')).toBe('id');
	});

	it('returns null for paths without a locale', () => {
		expect(localeFromPath('/')).toBe(null);
		expect(localeFromPath('/blog/hello-world/')).toBe(null);
	});

	it('does not mistake a later segment for the locale', () => {
		expect(localeFromPath('/blog/tags/id/')).toBe(null);
	});
});

describe('swapLocale', () => {
	it('swaps the locale segment by position', () => {
		expect(swapLocale('/en/blog/', 'id')).toBe('/id/blog/');
		expect(swapLocale('/id/#about', 'en')).toBe('/en/#about');
		expect(swapLocale('/en/blog/my-post/', 'id')).toBe('/id/blog/my-post/');
	});

	it('swaps the segment after a non-empty base', () => {
		expect(swapLocale('/portfolio/en/blog/', 'id', '/portfolio')).toBe(
			'/portfolio/id/blog/'
		);
	});

	it('never touches tag or slug segments that name themselves en/id', () => {
		// The old first-match swap corrupted /en/blog/tags/id/ → /en/blog/tags/en/
		expect(swapLocale('/en/blog/tags/id/', 'id')).toBe('/id/blog/tags/id/');
		expect(swapLocale('/en/blog/id/', 'id')).toBe('/id/blog/id/');
	});

	it('returns the path unchanged when it has no locale segment', () => {
		expect(swapLocale('/blog/hello/', 'id')).toBe('/blog/hello/');
		expect(swapLocale('/', 'en')).toBe('/');
	});
});

describe('formatDate', () => {
	it('formats en dates in long US English', () => {
		expect(formatDate('2026-08-29', 'en')).toBe('August 29, 2026');
	});

	it('formats id dates in long Indonesian', () => {
		expect(formatDate('2026-08-29', 'id')).toBe('29 Agustus 2026');
	});

	it('formats at UTC regardless of the viewer timezone', () => {
		// "2026-01-01" is UTC midnight; a UTC format must never roll back a day
		// even when the host timezone is behind UTC.
		expect(formatDate('2026-01-01', 'en')).toBe('January 1, 2026');
	});
});

describe('LOCALES', () => {
	it('lists en and id', () => {
		expect([...LOCALES]).toEqual(['en', 'id']);
	});

	it('holds only valid locales', () => {
		LOCALES.forEach((locale: Locale) => {
			expect(isLocale(locale)).toBe(true);
		});
	});
});
