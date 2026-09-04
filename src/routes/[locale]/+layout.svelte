<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { translations, type Locale } from '$lib/i18n';
	import type { Snippet } from 'svelte';

	let { data, children }: {
		data: { locale: Locale; t: typeof translations.en };
		children?: Snippet;
	} = $props();

	// app.html ships lang="en"; keep the document language in sync with
	// the active locale for accessibility and correct text rendering.
	$effect(() => {
		document.documentElement.lang = data.locale;
	});

	// Active section tracking for nav highlight. The sections only exist
	// on the one-page home; the Header sits in this (persistent) layout
	// and never remounts, so the observer must re-attach on navigation.
	let activeSection = $state<string | null>(null);
	const sectionIds = ['about', 'projects', 'contact'];

	$effect(() => {
		// Reading page.url.pathname tracks the route: this effect re-runs
		// on every navigation. Sections absent (blog pages) report none.
		void page.url.pathname;
		activeSection = null;
		if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) activeSection = entry.target.id;
				}
			},
			{ rootMargin: '-20% 0px -60% 0px', threshold: 0 }
		);

		for (const id of sectionIds) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	});

	function setLang(next: Locale) {
		// Swap the locale segment in-place. window.location.pathname already
		// includes the base path when one is configured, so don't prepend
		// `base` again — just replace the locale token and navigate as-is.
		const parts = window.location.pathname.split('/');
		for (let i = 1; i < parts.length; i++) {
			if (parts[i] === 'en' || parts[i] === 'id') {
				parts[i] = next;
				break;
			}
		}
		window.location.pathname = parts.join('/');
	}
</script>

<svelte:head>
	<title>{data.t.meta.title}</title>
	<meta name="description" content={data.t.meta.description} />
	<link rel="alternate" hreflang="en" href={`${base}/en/`} />
	<link rel="alternate" hreflang="id" href={`${base}/id/`} />
</svelte:head>

<Header locale={data.locale} nav={data.t.nav} {setLang} {activeSection} />

<main id="main-content">
	{@render children?.()}
</main>

<Footer copy={data.t.footer} />
