import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { translations, LOCALES } from '$lib/i18n';

export const load: LayoutServerLoad = async ({ params, parent }) => {
	const locale = params.locale;

	if (!LOCALES.includes(locale as 'en' | 'id')) {
		error(404, 'Locale not found');
	}

	const { posts } = await parent();

	return {
		locale: locale as 'en' | 'id',
		t: translations[locale as 'en' | 'id'],
		posts
	};
};
