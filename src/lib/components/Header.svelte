<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import LanguageToggle from './LanguageToggle.svelte';
	import type { Dictionary, Locale } from '$lib/i18n';

	let { nav, locale, setLang, activeSection }: {
		nav: Dictionary['nav'];
		locale: Locale;
		setLang: (locale: Locale) => void;
		activeSection: string | null;
	} = $props();

	let menuOpen = $state(false);

	// Nav targets live under the active locale: section keys stay anchors
	// on the one-page home (/en/#about), blog is its own route. Track the
	// current route so Blog highlights on every blog page.
	const onBlogRoute = $derived(page.route.id?.startsWith('/[locale]/blog') ?? false);

	function closeMenu() {
		menuOpen = false;
	}

	function sectionHref(key: string): string {
		if (key === 'blog') return `${base}/${locale}/blog/`;
		return `${base}/${locale}/#${key}`;
	}

	function isSectionActive(sectionId: string): boolean {
		if (sectionId === 'blog') return onBlogRoute;
		return activeSection === sectionId;
	}
</script>

<header class="site-header">
	<div class="wrap">
		<a class="brand" href={`${base}/`}>Muchsin</a>
		<nav class="site-nav" aria-label="Sections">
			{#each Object.entries(nav) as [key, label]}
				<a
					href={sectionHref(key)}
					class:active={isSectionActive(key)}
					aria-current={isSectionActive(key) ? 'page' : undefined}
					onclick={closeMenu}>
					{label}
				</a>
			{/each}
		</nav>
		<LanguageToggle lang={locale} {setLang} />
		<button
			type="button"
			class="hamburger"
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}>
			<span class="bar bar-top"></span>
			<span class="bar bar-mid"></span>
			<span class="bar bar-bot"></span>
		</button>
	</div>

	{#if menuOpen}
		<nav class="mobile-nav" aria-label="Sections mobile">
			{#each Object.entries(nav) as [key, label]}
				<a
					href={sectionHref(key)}
					class:active={isSectionActive(key)}
					onclick={closeMenu}>
					{label}
				</a>
			{/each}
		</nav>
	{/if}
</header>

<style>
	.hamburger {
		display: none;
		flex-direction: column;
		gap: 4px;
		background: transparent;
		border: 0;
		padding: 0.5rem;
		cursor: pointer;
		margin-left: auto;
	}

	.hamburger .bar {
		display: block;
		width: 1.25rem;
		height: 2px;
		background-color: var(--text);
		border-radius: 1px;
		transition: transform var(--motion-normal) var(--ease-reveal),
					opacity var(--motion-normal) var(--ease-reveal);
	}

	.hamburger[aria-expanded='true'] .bar-top {
		transform: translateY(6px) rotate(45deg);
	}

	.hamburger[aria-expanded='true'] .bar-mid {
		opacity: 0;
	}

	.hamburger[aria-expanded='true'] .bar-bot {
		transform: translateY(-6px) rotate(-45deg);
	}

	.mobile-nav {
		position: fixed;
		top: 4rem;
		left: 0;
		right: 0;
		z-index: 20;
		display: none;
		flex-direction: column;
		gap: 0;
		background-color: color-mix(in srgb, var(--bg) 92%, transparent);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--border);
	}

	.mobile-nav a {
		display: block;
		padding: 1rem var(--gutter);
		color: var(--muted);
		text-decoration: none;
		font-size: 1.05rem;
		border-top: 1px solid var(--border);
		transition: color var(--motion-normal), background-color var(--motion-normal);
	}

	.mobile-nav a.active {
		color: var(--text);
	}

	@media (max-width: 36em) {
		.hamburger {
			display: flex;
		}

		.site-nav {
			display: none !important;
		}

		.mobile-nav {
			display: flex;
		}
	}
</style>
