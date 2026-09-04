<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import { pageUrl } from '$lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Scroll reveals — one observer, class toggle, CSS does the motion.
	// Pages remount on navigation, so this runs per page.
	$effect(() => {
		const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
		if (!('IntersectionObserver' in window)) {
			elements.forEach((el) => el.classList.add('is-visible'));
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
		);
		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<MetaTags
		title={data.t.meta.title}
		description={data.t.meta.description}
		url={pageUrl(data.locale)}
	/>
</svelte:head>

<Hero copy={data.t.hero} />
<About copy={data.t.about} />
<Projects copy={data.t.projects} />
<Contact copy={data.t.contact} />
