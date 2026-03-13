<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	interface Props {
		trigger: Snippet<[{ isOpen: boolean }]>;
		content: Snippet<[{ close: () => void }]>;
		class?: string;
		contentClass?: string;
		align?: 'left' | 'right';
	}

	let {
		trigger,
		content,
		class: className = '',
		contentClass = '',
		align = 'right'
	}: Props = $props();

	let isOpen = $state(false);
	let dropdownEl: HTMLDivElement;

	function toggle() {
		isOpen = !isOpen;
	}

	function close() {
		isOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});
</script>

<div class="relative inline-block {className}" bind:this={dropdownEl}>
	<button
		type="button"
		onclick={toggle}
		class="flex cursor-pointer items-center justify-between gap-2 rounded-md bg-primary px-3 py-1.5 text-white transition-colors hover:bg-primary/80"
		aria-haspopup="listbox"
		aria-expanded={isOpen}
		aria-label="Dropdown menu"
	>
		{@render trigger({ isOpen })}
	</button>

	{#if isOpen}
		<div
			transition:slide
			class="absolute {align === 'left'
				? 'left-0'
				: 'right-0'} z-50 mt-1 w-full min-w-32 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg {contentClass}"
			role="listbox"
		>
			<div class="max-h-60 overflow-auto py-1">
				{@render content({ close })}
			</div>
		</div>
	{/if}
</div>
