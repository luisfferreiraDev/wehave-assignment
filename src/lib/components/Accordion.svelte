<script lang="ts">
	import type { Snippet } from 'svelte';
	import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte';

	interface Props {
		header?: Snippet<[boolean]>;
		headerText?: string;
		children?: Snippet;
		open?: boolean;
		containerClass?: string;
		headerClass?: string;
		contentClass?: string;
	}

	let {
		header,
		headerText,
		children,
		open = $bindable(false),
		containerClass = '',
		headerClass = '',
		contentClass = ''
	}: Props = $props();

	function toggle() {
		open = !open;
	}
</script>

<section class="w-full overflow-hidden {containerClass}">
	<button
		type="button"
		class="flex w-full cursor-pointer items-center justify-start gap-2 px-4 py-2 text-left {headerClass}"
		onclick={toggle}
		aria-expanded={open}
	>
		<ChevronDownIcon
			class="h-4 w-4 shrink-0 transition-transform duration-300 {open ? 'rotate-180' : ''}"
		/>
		{#if header}
			{@render header(open)}
		{:else if headerText}
			<h3 class="text-left">{headerText}</h3>
		{/if}
	</button>

	<div
		class="grid overflow-hidden transition-[grid-template-rows] duration-300 {open
			? 'grid-rows-[1fr]'
			: 'grid-rows-[0fr]'}"
	>
		<div class="overflow-hidden">
			<div class={contentClass}>
				{#if children}
					{@render children()}
				{/if}
			</div>
		</div>
	</div>
</section>
