<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	interface Props {
		trigger: Snippet<[{ isOpen: boolean }]>;
		content: Snippet<[{ close: () => void }]>;
		class?: string;
		contentClass?: string;
		triggerStyle?: string;
		align?: 'left' | 'right' | 'auto';
	}

	let {
		trigger,
		content,
		class: className = '',
		triggerStyle = 'border border-medium-gray bg-white text-black',
		contentClass = '',
		align = 'auto'
	}: Props = $props();

	let isOpen = $state(false);
	let dropdownEl: HTMLDivElement;
	let contentEl = $state<HTMLDivElement | null>(null);
	let effectiveAlign = $state<'left' | 'right'>('right');

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

	function updateAlignment() {
		if (align !== 'auto') {
			effectiveAlign = align;
			return;
		}

		if (!dropdownEl || !contentEl) {
			effectiveAlign = 'right';
			return;
		}

		const margin = 8;
		const viewportWidth = window.innerWidth;
		const triggerRect = dropdownEl.getBoundingClientRect();
		const contentWidth = contentEl.offsetWidth;

		const fitsLeft = triggerRect.left + contentWidth <= viewportWidth - margin;
		const fitsRight = triggerRect.right - contentWidth >= margin;

		if (!fitsLeft && fitsRight) {
			effectiveAlign = 'right';
			return;
		}

		if (!fitsRight && fitsLeft) {
			effectiveAlign = 'left';
			return;
		}

		const leftAvailable = viewportWidth - triggerRect.left - margin;
		const rightAvailable = triggerRect.right - margin;
		effectiveAlign = leftAvailable >= rightAvailable ? 'left' : 'right';
	}

	$effect(() => {
		if (isOpen) {
			const rafId = requestAnimationFrame(updateAlignment);
			document.addEventListener('click', handleClickOutside);
			window.addEventListener('resize', updateAlignment);
			window.addEventListener('scroll', updateAlignment, true);
			return () => {
				cancelAnimationFrame(rafId);
				document.removeEventListener('click', handleClickOutside);
				window.removeEventListener('resize', updateAlignment);
				window.removeEventListener('scroll', updateAlignment, true);
			};
		}
	});
</script>

<div class="relative inline-block {className}" bind:this={dropdownEl}>
	<button
		type="button"
		onclick={toggle}
		class="flex h-10 cursor-pointer items-center justify-between gap-2 rounded-lg {triggerStyle} px-3 py-1.5 shadow-xs"
		aria-haspopup="listbox"
		aria-expanded={isOpen}
		aria-label="Dropdown menu"
	>
		{@render trigger({ isOpen })}
	</button>

	{#if isOpen}
		<div
			bind:this={contentEl}
			transition:slide
			class="absolute {effectiveAlign === 'left'
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
