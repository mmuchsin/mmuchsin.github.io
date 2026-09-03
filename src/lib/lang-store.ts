import { writable } from 'svelte/store';
import type { Locale } from '$lib/i18n';

const STORAGE_KEY = 'portfolio-lang';

function loadInitial(): Locale {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'en' || stored === 'id') return stored;
	} catch {
		// Storage unavailable — default to EN.
	}
	return 'en';
}

export const lang = writable<Locale>(loadInitial());

export function setLang(next: Locale) {
	lang.set(next);
	try {
		localStorage.setItem(STORAGE_KEY, next);
	} catch {
		// Storage unavailable — toggle still works for this visit.
	}
}
