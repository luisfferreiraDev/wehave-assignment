<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	import XIcon from './icons/XIcon.svelte';

	interface Props {
		open: boolean;
		onClose: () => void;
		title?: string;
		children: Snippet;
	}

	let { open = $bindable(), onClose, title, children }: Props = $props();

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			onClose();
		}
	}

	function handleBackdropClick() {
		onClose();
	}

	$effect(() => {
		if (open) {
			document.addEventListener('keydown', handleKeydown);
			document.body.style.overflow = 'hidden';
			return () => {
				document.removeEventListener('keydown', handleKeydown);
				document.body.style.overflow = '';
			};
		}
	});
</script>

{#if open}
	<div
		role="presentation"
		class="fixed inset-0 z-60 bg-black/30"
		transition:fade={{ duration: 200 }}
		onclick={handleBackdropClick}
	></div>

	<div
		role="dialog"
		aria-modal="true"
		aria-labelledby="drawer-title"
		class="fixed top-0 right-0 z-70 h-full w-full bg-white shadow-2xl sm:w-125 lg:w-150"
		transition:fly={{ x: 200, duration: 300 }}
	>
		<div class="flex h-full flex-col">
			<div class="box-content flex h-11 items-center justify-between border-b border-gray-200 px-6">
				<h2 id="drawer-title" class="text-lg font-semibold text-gray-900">
					{title || 'Details'}
				</h2>
				<button
					type="button"
					onclick={onClose}
					class="cursor-pointer rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
					aria-label="Close drawer"
				>
					<XIcon class="h-5 w-5" />
				</button>
			</div>
			<div class="flex-1 overflow-y-auto p-6">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
