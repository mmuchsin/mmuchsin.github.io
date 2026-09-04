<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { translations } from '$lib/i18n';
	import { localeFromPath } from '$lib/locale';

	// The failing URL's own locale segment picks the copy; errors outside a
	// locale tree (e.g. /fr/) fall back to English.
	const locale = $derived(localeFromPath(page.url.pathname, base) ?? 'en');
	const t = $derived(translations[locale]);

	// 404s get localized copy; other statuses surface the error message
	// (useful in development, never user-facing in a prerendered build).
	const message = $derived(
		page.status === 404 || !page.error?.message ? t.error.not_found : page.error.message
	);

	// app.html ships lang="en"; errors outside the [locale] layout (e.g. /fr/)
	// have nothing else keeping the document language in sync with the copy.
	$effect(() => {
		document.documentElement.lang = locale;
	});
</script>

<main id="main-content" class="error-page">
	<div class="wrap">
		<p class="eyebrow">{t.error.eyebrow}</p>
		<h1 class="status">{page.status}</h1>
		<p class="message">{message}</p>
		<div class="cta-row">
			<a class="btn btn-primary" href={`${base}/${locale}/`}>{t.error.cta}</a>
		</div>
	</div>
</main>

<style>
	.error-page {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 4rem 1.5rem;
	}

	.status {
		font-family: var(--font-serif);
		font-size: clamp(5rem, 14vw, 9rem);
		font-weight: 400;
		line-height: 1;
		letter-spacing: -0.02em;
		margin: 1rem 0;
	}

	.status::after {
		content: '';
		display: block;
		width: 3rem;
		height: 2px;
		background: var(--accent);
		margin: 1.5rem auto 0;
	}

	.message {
		color: var(--text-secondary);
		font-size: 1.125rem;
		margin: 0 auto 2rem;
		max-width: 32rem;
	}
</style>
