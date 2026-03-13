<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import SectionAccordion from '$lib/components/SectionAccordion.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
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
		<div class="flex items-center justify-between">
			<Dropdown bind:value={selectedSeason} options={data.seasons} />
		</div>
		{#each filteredSectionOverviews as sectionOverview (sectionOverview.section.id)}
			<SectionAccordion {sectionOverview} upcomingMatches={filteredUpcomingMatches} />
		{/each}

		{#if filteredSectionOverviews.length === 0}
			<p class="py-8 text-center text-gray-500">No stadium sections available.</p>
		{/if}
	</div>
</Container>
