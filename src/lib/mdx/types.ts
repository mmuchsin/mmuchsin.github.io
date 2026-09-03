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
	const words = content.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
}
