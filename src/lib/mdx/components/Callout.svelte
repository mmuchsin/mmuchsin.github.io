<script lang="ts">
	let { type = 'info', title, children }: {
		type?: 'note' | 'tip' | 'warning' | 'info';
		title?: string;
		children?: import('svelte').Snippet<[]>;
	} = $props()

	const icons: Record<string, string> = {
		note: '📝',
		tip: '💡',
		warning: '⚠️',
		info: 'ℹ️'
	}

	const colors: Record<string, string> = {
		note: '#3b82f6',
		tip: '#10b981',
		warning: '#f59e0b',
		info: '#6366f1'
	}

	const displayTitle = $derived(title ?? type.charAt(0).toUpperCase() + type.slice(1))
</script>

<div class="callout" style="--callout-color: {colors[type]}">
	<div class="callout-header">
		<span class="callout-icon">{icons[type]}</span>
		<span class="callout-title">{displayTitle}</span>
	</div>
	<div class="callout-content">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>

<style>
	.callout {
		border-left: 4px solid var(--callout-color);
		background: color-mix(in srgb, var(--callout-color) 8%, transparent);
		border-radius: 0.5rem;
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.callout-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
		font-weight: 600;
		color: var(--callout-color);
	}

	.callout-icon {
		font-size: 1.1rem;
	}

	.callout-content {
		color: var(--text-secondary);
		line-height: 1.6;
	}
</style>
