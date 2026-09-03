import enJson from './en.json';
import idJson from './id.json';

export type Locale = 'en' | 'id';

export const LOCALES: readonly Locale[] = ['en', 'id'];

export interface Project {
	name: string;
	description: string;
	tags: string[];
	/** URL of the live site, if one exists */
	live?: string;
	/** URL of the source repository, if public */
	repo?: string;
}

export interface Dictionary {
	meta: { title: string; description: string };
	nav: { about: string; projects: string; contact: string; blog: string };
	hero: {
		name: string;
		tagline: string;
		sub: string;
		cta_projects: string;
		cta_contact: string;
	};
	about: {
		eyebrow: string;
		title: string;
		body_1: string;
		body_2: string;
		highlights_title: string;
		highlights: string[];
	};
	projects: {
		eyebrow: string;
		title: string;
		intro: string;
		live: string;
		repo_label: string;
		items: Project[];
	};
	contact: {
		eyebrow: string;
		title: string;
		intro: string;
		github: string;
		linkedin: string;
		github_url: string;
		linkedin_url: string;
	};
	footer: { text: string; colophon: string };
	blog_subtitle: string;
	tag_heading: string;
	blog_back: string;
}

/**
 * All site copy, keyed by locale. Each JSON file is checked at compile time
 * against `Dictionary`, so a missing or mistyped key fails the build.
 */
export const translations: Record<Locale, Dictionary> = {
	en: enJson,
	id: idJson
};
