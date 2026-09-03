import { describe, expect, it } from 'vitest';
import { LOCALES, translations } from './index';

/**
 * Flatten a dictionary into its set of key paths, e.g.
 * `{ a: { b: [1, 2] } }` → `['a.b[0]', 'a.b[1]']`.
 * Array indices are part of the path, so differing array lengths produce
 * differing key sets.
 */
function keyPaths(value: unknown, prefix = ''): string[] {
	if (Array.isArray(value)) {
		return value.flatMap((item, i) => keyPaths(item, `${prefix}[${i}]`));
	}
	if (value !== null && typeof value === 'object') {
		return Object.entries(value).flatMap(([key, item]) =>
			keyPaths(item, prefix ? `${prefix}.${key}` : key)
		);
	}
	return [prefix];
}

describe('i18n dictionaries', () => {
	it('exposes exactly the locales listed in LOCALES', () => {
		expect(Object.keys(translations).sort()).toEqual([...LOCALES].sort());
	});

	it('has an identical key structure in every locale', () => {
		const reference = keyPaths(translations.en).sort();
		for (const locale of LOCALES) {
			if (locale === 'en') continue;
			expect(keyPaths(translations[locale]).sort()).toEqual(reference);
		}
	});

	it('has the same number of projects in every locale', () => {
		const count = translations.en.projects.items.length;
		expect(count).toBeGreaterThan(0);
		for (const locale of LOCALES) {
			expect(translations[locale].projects.items.length).toBe(count);
		}
	});

	it('gives every project a name, description, and at least one tag', () => {
		for (const locale of LOCALES) {
			for (const project of translations[locale].projects.items) {
				expect(project.name.trim().length).toBeGreaterThan(0);
				expect(project.description.trim().length).toBeGreaterThan(0);
				expect(project.tags.length).toBeGreaterThan(0);
			}
		}
	});

	it('gives every external link a valid absolute URL', () => {
		const url = (value: string | undefined) => {
			if (value === undefined) return;
			expect(() => new URL(value)).not.toThrow();
			expect(['http:', 'https:']).toContain(new URL(value).protocol);
		};
		for (const locale of LOCALES) {
			const { contact } = translations[locale];
			url(contact.github_url);
			url(contact.linkedin_url);
			for (const project of translations[locale].projects.items) {
				url(project.live);
				url(project.repo);
			}
		}
	});
});
