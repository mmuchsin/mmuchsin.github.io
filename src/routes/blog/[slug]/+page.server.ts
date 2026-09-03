import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { posts } = await parent();
	const post = posts.find((p) => p.slug === params.slug);
	if (!post) {
		throw error(404, 'Not found');
	}
	return { post };
};
