import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { posts, locale } = await parent();
	const tagPosts = posts.filter(
		(post) => post.tags.includes(params.tag) && post.lang === locale
	);
	return { tag: params.tag, posts: tagPosts, locale };
};
