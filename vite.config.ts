import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Note: the base path lives in svelte.config.js (`kit.paths.base`), not here —
// SvelteKit enforces Vite's `base` from its own config.
export default defineConfig({
	plugins: [sveltekit()]
});
