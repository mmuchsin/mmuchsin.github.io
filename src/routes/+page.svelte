<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import { translations, type Locale } from '$lib/i18n';

	const STORAGE_KEY = 'portfolio-lang';

	let initial: Locale = 'en';
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'en' || stored === 'id') initial = stored;
	} catch {
		// Storage unavailable — default to EN.
	}
	let lang = $state<Locale>(initial);
	const t = $derived(translations[lang]);

	function setLang(next: Locale) {
		lang = next;
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// Storage unavailable — toggle still works for this visit.
		}
	}

	$effect(() => {
		document.documentElement.lang = lang;
		document.title = t.meta.title;
	});

	// Scroll reveals — one observer, class toggle, CSS does the motion.
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

	// Active section tracking for nav highlight
	let activeSection = $state('about');

	const sectionIds = ['about', 'projects', 'contact'];

	$effect(() => {
		if (!('IntersectionObserver' in window)) return;

		const callback: IntersectionObserverCallback = (entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					activeSection = entry.target.id;
				}
			}
		};

		const observer = new IntersectionObserver(callback, {
			rootMargin: '-20% 0px -60% 0px',
			threshold: 0
		});

		for (const id of sectionIds) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Muchsin — Software Engineer</title>

	<!-- Open Graph -->
	<meta property="og:title" content="Muchsin — Software Engineer" />
	<meta
		property="og:description"
		content="Portfolio of Muchsin — software engineer specializing in NLP, RAG research, and web engineering."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://mmuchsin.github.io/portfolio/" />
	<meta property="og:image" content="https://mmuchsin.github.io/portfolio/og-image.png" />

	<!-- JSON-LD: Person schema -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Muchsin",
			"url": "https://mmuchsin.github.io/portfolio/",
			"sameAs": [
				"https://github.com/mmuchsin",
				"https://www.linkedin.com/in/mmuchsin"
			]
		}
	</script>
</svelte:head>

<Header nav={t.nav} {lang} {setLang} activeSection={activeSection} />

<main id="main-content">
	<Hero copy={t.hero} />
	<About copy={t.about} />
	<Projects copy={t.projects} />
	<Contact copy={t.contact} />
</main>

<Footer copy={t.footer} />
