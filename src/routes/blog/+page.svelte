<script lang="ts">
	import { base } from '$app/paths';
	import type { PageData } from './$types';
	import type { BlogPost } from '$lib/mdx/types.js';

	let { data }: { data: PageData } = $props();

	let selectedTag = $state<string | null>(null);
	let selectedCategory = $state<string | null>(null);
	let selectedLang = $state<'en' | 'id' | null>(null);

	const posts = $derived(data.posts.filter((post: BlogPost) => {
		const tagMatch = !selectedTag || post.tags.includes(selectedTag);
		const catMatch = !selectedCategory || post.categories.includes(selectedCategory);
		const langMatch = !selectedLang || post.lang === selectedLang;
		return tagMatch && catMatch && langMatch;
	}));

	const allTags = $derived(Array.from(new Set(data.posts.flatMap((p: BlogPost) => p.tags))).sort() as string[]);
	const allCategories = $derived(Array.from(new Set(data.posts.flatMap((p: BlogPost) => p.categories))).sort() as string[]);
	const allLangs = $derived(Array.from(new Set(data.posts.map((p: BlogPost) => p.lang))).sort() as ('en' | 'id')[]);

	function clearFilters() {
		selectedTag = null;
		selectedCategory = null;
		selectedLang = null;
	}

	const langLabel = (lang: string) => lang === 'id' ? 'Bahasa Indonesia' : 'English';

	function isActive(value: string, selected: string | null): boolean {
		return selected === value;
	}
</script>

<main id="main-content" class="blog-list">
	<header class="blog-header">
		<h1>Blog</h1>
		<p>Learning notes and technical reflections</p>
	</header>

	<!-- Language Filter -->
	{#if allLangs.length > 1}
		<div class="filters">
			<div class="filter-group">
				<span class="filter-label">Language:</span>
				<button
					class="filter-btn {isActive('all', selectedLang)}"
					onclick={() => { selectedLang = null; }}
				>
					All
				</button>
				{#each allLangs as lang}
					<button
						class="filter-btn {isActive(lang, selectedLang)}"
						onclick={() => { selectedLang = lang; }}
					>
						{langLabel(lang)}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Tag & Category Filters -->
	{#if allTags.length > 0 || allCategories.length > 0}
		<div class="filters">
			{#if allCategories.length > 0}
				<div class="filter-group">
					<span class="filter-label">Category:</span>
					<button
						class="filter-btn {isActive('all', selectedCategory)}"
						onclick={() => { selectedCategory = null; }}
					>
						All
					</button>
					{#each allCategories as category}
						<button
							class="filter-btn {isActive(category, selectedCategory)}"
							onclick={() => { selectedCategory = category; }}
						>
							{category}
						</button>
					{/each}
				</div>
			{/if}

			{#if allTags.length > 0}
				<div class="filter-group">
					<span class="filter-label">Tag:</span>
					<button
						class="filter-btn {isActive('all', selectedTag)}"
						onclick={() => { selectedTag = null; }}
					>
						All
					</button>
					{#each allTags as tag}
						<a href={`${base}/blog/tags/${tag}`} class="filter-btn {isActive(tag, selectedTag)}">
							#{tag}
						</a>
					{/each}
				</div>
			{/if}

			{#if selectedTag || selectedCategory || selectedLang}
				<button class="clear-btn" onclick={clearFilters}>Clear filters</button>
			{/if}
		</div>
	{/if}

	<!-- Post List -->
	{#if posts.length === 0}
		<p class="empty-state">No posts found. Check back soon!</p>
	{:else}
		<div class="post-list">
			{#each posts as post (post.slug)}
				<article class="post-card">
					<a href={`${base}/blog/${post.slug}`} class="post-link">
						<div class="post-meta">
							<span class="post-date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
							{#if post.categories.length > 0}
								<span class="post-category">{post.categories[0]}</span>
							{/if}
							<span class="post-lang">{langLabel(post.lang)}</span>
						</div>
						<h2 class="post-title">{post.title}</h2>
						<p class="post-description">{post.description}</p>
						<div class="post-footer">
							<span class="reading-time">{post.readingTime} min read</span>
							{#if post.tags.length > 0}
								<div class="post-tags">
									{#each post.tags as tag}
										<span class="tag">#{tag}</span>
									{/each}
								</div>
							{/if}
						</div>
					</a>
				</article>
			{/each}
		</div>
	{/if}
</main>

<style>
	.blog-list {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}

	.blog-header {
		margin-bottom: 2rem;
	}

	.blog-header h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.blog-header p {
		color: var(--text-secondary);
	}

	.filters {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
		padding: 1rem;
		background: var(--surface);
		border-radius: 0.5rem;
	}

	.filter-group {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	.filter-label {
		font-weight: 600;
		margin-right: 0.25rem;
	}

	.filter-btn {
		padding: 0.375rem 0.75rem;
		border: 1px solid var(--border);
		background: transparent;
		border-radius: 9999px;
		font-size: 0.875rem;
		cursor: pointer;
		text-decoration: none;
		color: var(--text-primary);
		transition: all 0.2s;
	}

	.filter-btn:hover {
		border-color: var(--accent);
	}

	.filter-btn.active {
		background: var(--accent);
		color: white;
		border-color: var(--accent);
	}

	.clear-btn {
		padding: 0.375rem 0.75rem;
		border: none;
		background: transparent;
		color: var(--text-secondary);
		cursor: pointer;
		font-size: 0.875rem;
		text-decoration: underline;
	}

	.post-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.post-card {
		background: var(--surface);
		border-radius: 0.75rem;
		overflow: hidden;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.post-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.post-link {
		display: block;
		padding: 1.5rem;
		text-decoration: none;
		color: inherit;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.post-category {
		background: var(--accent);
		color: white;
		padding: 0.125rem 0.5rem;
		border-radius: 9999px;
		font-size: 0.75rem;
	}

	.post-lang {
		background: var(--muted);
		color: var(--bg);
		padding: 0.125rem 0.5rem;
		border-radius: 9999px;
		font-size: 0.75rem;
	}

	.post-title {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.post-description {
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: 0.75rem;
	}

	.post-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.post-tags {
		display: flex;
		gap: 0.375rem;
		flex-wrap: wrap;
	}

	.tag {
		background: var(--bg);
		padding: 0.125rem 0.5rem;
		border-radius: 9999px;
		font-size: 0.75rem;
	}

	.empty-state {
		text-align: center;
		color: var(--text-secondary);
		padding: 3rem 0;
	}
</style>
