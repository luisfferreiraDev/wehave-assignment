<script lang="ts">
	import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte';
	import { slide } from 'svelte/transition';
	import type { SeasonOption } from '$lib/data/mockTickets';

	interface Props {
		value: string | null;
		options: SeasonOption[];
		placeholder?: string;
		onChange?: (value: string) => void;
		class?: string;
	}

	let {
		value = $bindable(),
		options,
		placeholder = 'Select...',
		onChange,
		class: className = ''
	}: Props = $props();

	const selectedLabel = $derived(options.find((opt) => opt.value === value)?.label || placeholder);

	let isOpen = $state(false);
	let dropdownEl: HTMLDivElement;

	function toggle() {
		isOpen = !isOpen;
	}

	function selectOption(option: string) {
		value = option;
		isOpen = false;
		onChange?.(option);
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
		class="flex cursor-pointer items-center justify-between gap-2 rounded-md bg-white px-3 py-1.5 text-sm"
		aria-haspopup="listbox"
		aria-expanded={isOpen}
		aria-label="Dropdown menu"
	>
		<span class="text-xl font-semibold text-gray-900">{selectedLabel}</span>
		<ChevronDownIcon
			class="h-4 w-4 text-gray-500 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
		/>
	</button>

	{#if isOpen}
		<div
			transition:slide
			class="absolute left-0 z-50 mt-1 w-full min-w-32 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
			role="listbox"
		>
			<div class="max-h-60 overflow-auto py-1">
				{#each options as option (option.value)}
					<button
						type="button"
						class="w-full cursor-pointer px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 {value ===
						option.value
							? 'bg-primary/10 font-medium text-primary'
							: 'text-gray-700'}"
						onclick={() => selectOption(option.value)}
						role="option"
						aria-selected={value === option.value}
					>
						{option.label}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
