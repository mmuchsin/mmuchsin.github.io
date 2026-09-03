<script lang="ts">
	import { base } from '$app/paths';
	import LanguageToggle from '$lib/components/LanguageToggle.svelte';
	import type { Locale } from '$lib/i18n';

	// ADR 0003: locale lives in localStorage, never in the URL.
	let lang = $state<Locale>('en');
	try {
		const stored = localStorage.getItem('portfolio-lang');
		if (stored === 'en' || stored === 'id') lang = stored;
	} catch {
		// Storage unavailable — default to EN.
	}

	function setLang(next: Locale) {
		lang = next;
		try {
			localStorage.setItem('portfolio-lang', next);
		} catch {
			// Storage unavailable — toggle still works for this visit.
		}
	}
</script>

<header class="site-header">
	<div class="wrap">
		<a class="brand" href={`${base}/`}>Muchsin</a>
		<nav class="site-nav" aria-label="Sections">
			<a href={`${base}/#about`}>About</a>
			<a href={`${base}/#projects`}>Projects</a>
			<a href={`${base}/#contact`}>Contact</a>
			<a href={`${base}/blog`} aria-current="page">Blog</a>
		</nav>
		<LanguageToggle {lang} {setLang} />
		<button
			type="button"
			class="hamburger"
			aria-label="Open menu"
			onclick={() => document.querySelector('.mobile-nav')?.classList.toggle('open')}>
			<span class="bar bar-top"></span>
			<span class="bar bar-mid"></span>
			<span class="bar bar-bot"></span>
		</button>
	</div>

	<nav class="mobile-nav" aria-label="Sections mobile">
		<a href={`${base}/#about`}>About</a>
		<a href={`${base}/#projects`}>Projects</a>
		<a href={`${base}/#contact`}>Contact</a>
		<a href={`${base}/blog`}>Blog</a>
	</nav>
</header>

<slot />

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
		transition: transform 0.3s ease, opacity 0.3s ease;
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

	.mobile-nav.open {
		display: flex;
	}

	.mobile-nav a {
		display: block;
		padding: 1rem 1.5rem;
		color: var(--muted);
		text-decoration: none;
		font-size: 1.05rem;
		border-top: 1px solid var(--border);
	}

	@media (max-width: 36em) {
		.hamburger {
			display: flex;
		}

		.site-nav {
			display: none !important;
		}
	}
</style>
