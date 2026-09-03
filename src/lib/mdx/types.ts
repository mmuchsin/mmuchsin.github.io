export interface BlogPostFrontmatter {
	title: string;
	date: string;
	tags: string[];
	categories: string[];
	description: string;
	lang: 'en' | 'id';
}

export interface BlogPost extends BlogPostFrontmatter {
	slug: string;
	content: string;
	readingTime: number;
}

export function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const trimmed = content.trim();
	if (!trimmed) return 0;
	const words = trimmed.split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
}
