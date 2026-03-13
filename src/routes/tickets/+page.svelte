<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import SectionAccordion from '$lib/components/SectionAccordion.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte';
	import XIcon from '$lib/components/icons/XIcon.svelte';
	import type { PageData } from './$types';
	import { queryParam, ssp } from 'sveltekit-search-params/sveltekit-search-params';
	import SeasonDropdown from '$lib/components/SeasonDropdown.svelte';

	let { data }: { data: PageData } = $props();

	const seasonParam = queryParam('season', ssp.string(), {
		pushHistory: false
	});
	const sectionTypeParam = queryParam('sectionType', ssp.array(), {
		pushHistory: false
	});

	$effect(() => {
		if (Array.isArray($sectionTypeParam) && $sectionTypeParam.length === 0) {
			$sectionTypeParam = null;
		}
	});

	function clearSectionTypeFilter(event: MouseEvent) {
		event.stopPropagation();
		$sectionTypeParam = null;
	}

	const sectionTypeLabel = $derived(() => {
		if (!$sectionTypeParam || $sectionTypeParam.length === 0) {
			return 'Section type';
		}
		if ($sectionTypeParam.length === 1) {
			return (
				data.sectionTypes.find((opt) => opt.value === $sectionTypeParam?.[0])?.label ||
				'Section type'
			);
		}
		const firstLabel =
			data.sectionTypes.find((opt) => opt.value === $sectionTypeParam?.[0])?.label || '';
		const remainingCount = $sectionTypeParam.length - 1;
		return `${firstLabel} (+${remainingCount})`;
	});

	const hasSelection = $derived($sectionTypeParam && $sectionTypeParam.length > 0);
</script>

<Container>
	{#snippet header()}
		<div class="flex items-center justify-between gap-4">
			<h1 class="text-lg font-bold">Stadium Sections</h1>
		</div>
	{/snippet}
	<div class="space-y-4 p-6">
		<div class="flex items-center justify-between gap-4">
			<SeasonDropdown bind:value={$seasonParam} options={data.seasons} />
			<Dropdown>
				{#snippet trigger({ isOpen })}
					{sectionTypeLabel()}
					{#if hasSelection}
						<button
							type="button"
							onclick={clearSectionTypeFilter}
							class="cursor-pointer rounded-full bg-white p-0.5 text-primary"
							aria-label="Clear filter"
						>
							<XIcon class="h-3 w-3" />
						</button>
					{:else}
						<ChevronDownIcon
							class="h-4 w-4 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
						/>
					{/if}
				{/snippet}
				{#snippet content()}
					<div class="flex flex-col gap-1 px-2 py-1">
						{#each data.sectionTypes as option (option.value)}
							<label
								class="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors hover:bg-gray-100"
							>
								<input
									type="checkbox"
									bind:group={$sectionTypeParam}
									value={option.value}
									class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary/20"
								/>
								<span class="text-gray-700">{option.label}</span>
							</label>
						{/each}
					</div>
				{/snippet}
			</Dropdown>
		</div>
		{#each data.sectionOverviews as sectionOverview (sectionOverview.section.id)}
			<SectionAccordion {sectionOverview} upcomingMatches={data.upcomingMatches} />
		{/each}

		{#if data.sectionOverviews.length === 0}
			<p class="py-8 text-center text-gray-500">No stadium sections available.</p>
		{/if}
	</div>
</Container>
