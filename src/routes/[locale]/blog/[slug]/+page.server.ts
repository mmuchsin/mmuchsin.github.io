import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { posts, locale } = await parent();
	const post = posts.find((p) => p.slug === params.slug);
	// Language alignment (ADR 0008): a post only exists in the tree of its
	// own locale — an /en/ URL must not serve an Indonesian post.
	if (!post || post.lang !== locale) {
		error(404, 'Not found');
	}
	return { post };
};
