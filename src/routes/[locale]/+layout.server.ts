import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { translations } from '$lib/i18n';
import { isLocale } from '$lib/locale';

export const load: LayoutServerLoad = async ({ params, parent }) => {
	if (!isLocale(params.locale)) {
		error(404, 'Locale not found');
	}

	const { posts } = await parent();

	return {
		locale: params.locale,
		t: translations[params.locale],
		posts
	};
};
