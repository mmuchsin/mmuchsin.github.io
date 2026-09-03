# Categories and Tags for Blog Posts

Blog posts use both categories (broad groupings like "Frontend", "Backend") and tags (specific labels like "typescript", "sveltekit"). Both are stored as metadata in frontmatter — categories do not affect URL routing. This keeps URLs flat and clean while providing two levels of filtering on the blog listing page.

## Considered Options
- **Flat list only** — no organization, just chronological posts. Simplest but hard to navigate as content grows.
- **Tags only** — flexible labels, single level. Simpler than categories + tags.
- **Categories in URL prefix** — `/blog/frontend/svelte-tips`. More structure but rigid (a post can't easily belong to multiple categories) and creates longer URLs.
- **Flat routes with category metadata** — all posts at `/blog/post-slug`, filtered by category/tag on the list page. Flexible, clean URLs.

## Consequences
- Frontmatter includes both `categories` (array) and `tags` (array)
- Blog list page supports filtering by both dimensions
- URL structure stays flat: `/blog`, `/blog/slug`, `/blog/tags/tag-name`
- Easier to add/remove categories without breaking URLs
