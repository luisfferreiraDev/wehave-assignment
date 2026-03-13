<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import SectionAccordion from '$lib/components/SectionAccordion.svelte';
	import SeasonDropdown from '$lib/components/SeasonDropdown.svelte';
	import type { PageData } from './$types';
	import { queryParam, ssp } from 'sveltekit-search-params/sveltekit-search-params';

	let { data }: { data: PageData } = $props();

	const seasonParam = queryParam('season', ssp.string(), {
		pushHistory: false
	});
</script>

<Container>
	{#snippet header()}
		<div class="flex items-center justify-between gap-4">
			<h1 class="text-lg font-bold">Stadium Sections</h1>
		</div>
	{/snippet}
	<div class="space-y-4 p-6">
		<div class="flex items-center justify-between">
			<SeasonDropdown bind:value={$seasonParam} options={data.seasons} />
		</div>
		{#each data.sectionOverviews as sectionOverview (sectionOverview.section.id)}
			<SectionAccordion {sectionOverview} upcomingMatches={data.upcomingMatches} />
		{/each}

		{#if data.sectionOverviews.length === 0}
			<p class="py-8 text-center text-gray-500">No stadium sections available.</p>
		{/if}
	</div>
</Container>
