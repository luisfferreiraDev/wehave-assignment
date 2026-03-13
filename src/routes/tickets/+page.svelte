<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import SectionAccordion from '$lib/components/SectionAccordion.svelte';
	import { getSectionTicketOverview, getUpcomingMatchdays } from '$lib/data/mockTickets';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedSeason = $state('');

	$effect(() => {
		if (data.seasons.length > 0 && !selectedSeason) {
			selectedSeason = data.seasons[0];
		}
	});

	// Filter data based on selected season
	const filteredSectionOverviews = $derived(getSectionTicketOverview(selectedSeason));
	const filteredUpcomingMatches = $derived(getUpcomingMatchdays(5, selectedSeason));
</script>

<Container>
	{#snippet header()}
		<div class="flex items-center justify-between gap-4">
			<h1 class="text-lg font-bold">Stadium Sections</h1>
		</div>
	{/snippet}
	<div class="space-y-4 p-6">
		<div class="flex items-center gap-2">
			<label for="season-select" class="text-sm text-gray-600">Season:</label>
			<select
				id="season-select"
				bind:value={selectedSeason}
				class="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
			>
				{#each data.seasons as season (season)}
					<option value={season}>{season}</option>
				{/each}
			</select>
		</div>
		{#each filteredSectionOverviews as sectionOverview (sectionOverview.section.id)}
			<SectionAccordion {sectionOverview} upcomingMatches={filteredUpcomingMatches} />
		{/each}

		{#if filteredSectionOverviews.length === 0}
			<p class="py-8 text-center text-gray-500">No stadium sections available.</p>
		{/if}
	</div>
</Container>
