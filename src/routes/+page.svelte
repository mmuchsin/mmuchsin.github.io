<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { translations } from '$lib/i18n';
	import { resolveLocale } from '$lib/locale';

	onMount(() => {
		const locale = resolveLocale(navigator.language);
		window.location.replace(`${base}/${locale}/`);
	});
</script>

<!-- Fully static site: the redirect must happen client-side, based on the
     visitor's browser language. This prerendered page is just a stub —
     no locale is in scope yet, so the copy shows both languages. -->
<main id="main-content" class="redirect-stub">
	<div class="wrap">
		<h1 class="brand">{translations.en.hero.name}</h1>
		<p class="message">
			{translations.en.redirect.message} · {translations.id.redirect.message}
		</p>
		<noscript>
			<div class="cta-row">
				<a class="btn btn-primary" href={`${base}/en/`}>{translations.en.redirect.link_en}</a>
				<a class="btn btn-ghost" href={`${base}/id/`}>{translations.id.redirect.link_id}</a>
			</div>
		</noscript>
	</div>
</main>

<style>
	.redirect-stub {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 4rem 1.5rem;
	}

	.brand {
		font-family: var(--font-serif);
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 400;
		letter-spacing: -0.02em;
		line-height: 1;
	}

	.brand::after {
		content: '';
		display: block;
		width: 3rem;
		height: 2px;
		background: var(--accent);
		margin: 1.25rem auto 0;
	}

	.message {
		color: var(--text-secondary);
		margin: 1.5rem 0;
	}
</style>
