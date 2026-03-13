<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import SectionAccordion from '$lib/components/SectionAccordion.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Container>
	{#snippet header()}
		<h1 class="text-lg font-bold">Stadium Sections</h1>
	{/snippet}
	<div class="space-y-4 p-6">
		{#each data.sectionOverviews as sectionOverview (sectionOverview.section.id)}
			<SectionAccordion {sectionOverview} upcomingMatches={data.upcomingMatches} />
		{/each}

		{#if data.sectionOverviews.length === 0}
			<p class="py-8 text-center text-gray-500">No stadium sections available.</p>
		{/if}
	</div>
</Container>
