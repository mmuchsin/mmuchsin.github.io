# MDX over Plain Markdown for Blog Content

Blog posts use MDX (`.mdx` extension) rather than plain Markdown (`.md`). This allows embedding interactive Svelte components directly inside post content — charts, live code snippets, and other visualizations that are valuable for learning notes. Plain Markdown is simpler, but the ability to render Svelte components inline provides a meaningful advantage for technical explanations without adding significant complexity.

## Considered Options
- **Plain Markdown** — zero dependencies, simplest rendering pipeline. No interactivity.
- **MDX** — allows Svelte components inside posts. Slightly more build complexity.

## Consequences
- Blog content files will use `.mdx` extension
- Build pipeline needs `@mdx-js/sveltekit` or equivalent
- Custom MDX components (callouts, code blocks) become first-class citizens
