<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import SectionAccordion from '$lib/components/SectionAccordion.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte';
	import XIcon from '$lib/components/icons/XIcon.svelte';
	import TicketDetailDrawer from '$lib/components/TicketDetailDrawer.svelte';
	import type { PageData } from './$types';
	import { queryParam, ssp } from 'sveltekit-search-params/sveltekit-search-params';
	import SeasonDropdown from '$lib/components/SeasonDropdown.svelte';
	import {
		getSponsorById,
		getSectionById,
		getMatchdayById,
		getTicketAllocation
	} from '$lib/data/mockTickets';
	import type { StadiumSection, Sponsor, Matchday, TicketAllocation } from '$lib/types/tickets';

	let { data }: { data: PageData } = $props();

	const seasonParam = queryParam('season', ssp.string(), {
		pushHistory: false
	});
	const sectionTypeParam = queryParam('sectionType', ssp.array(), {
		pushHistory: false
	});
	const searchParam = queryParam('q', ssp.string(), {
		pushHistory: false,
		debounceHistory: 300
	});

	function clearSearch() {
		$searchParam = null;
	}

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

	let drawerOpen = $state(false);
	let selectedSection = $state<StadiumSection | null>(null);
	let selectedSponsor = $state<Sponsor | null>(null);
	let selectedMatchday = $state<Matchday | null>(null);
	let selectedAllocation = $state<TicketAllocation | null>(null);
	let seasonTotal = $state<number | undefined>(undefined);

	function handleTicketClick(sectionId: string, sponsorId: string, matchdayId: string) {
		const section = getSectionById(sectionId);
		const sponsor = getSponsorById(sponsorId);
		const matchday = getMatchdayById(matchdayId);
		const allocation = getTicketAllocation(sectionId, sponsorId, matchdayId);

		if (section && sponsor && matchday && allocation) {
			selectedSection = section;
			selectedSponsor = sponsor;
			selectedMatchday = matchday;
			selectedAllocation = allocation;

			const sectionOverview = data.sectionOverviews.find((so) => so.section.id === sectionId);
			const sponsorSummary = sectionOverview?.sponsors.find((s) => s.sponsor.id === sponsorId);
			seasonTotal = sponsorSummary?.totalSeasonTickets;

			drawerOpen = true;
		}
	}

	function closeDrawer() {
		drawerOpen = false;
	}
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
			<div class="flex w-full items-center justify-end gap-2">
				<div class="relative w-64 transition-all duration-200">
					<input
						type="text"
						bind:value={$searchParam}
						placeholder="Search sponsors or sections"
						class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
					/>
					{#if $searchParam}
						<button
							type="button"
							onclick={clearSearch}
							class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
							aria-label="Clear search"
						>
							<XIcon class="h-4 w-4" />
						</button>
					{/if}
				</div>
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
		</div>
		{#each data.sectionOverviews as sectionOverview (sectionOverview.section.id)}
			<SectionAccordion
				{sectionOverview}
				upcomingMatches={data.upcomingMatches}
				onTicketClick={handleTicketClick}
			/>
		{/each}

		{#if data.sectionOverviews.length === 0}
			<div class="flex flex-col items-center justify-center py-16 text-center">
				<p class="mb-2 text-lg font-medium text-gray-700">No results found</p>
				<p class="text-sm text-gray-500">Try searching by sponsor or section</p>
			</div>
		{/if}
	</div>
</Container>

<TicketDetailDrawer
	bind:open={drawerOpen}
	onClose={closeDrawer}
	section={selectedSection}
	sponsor={selectedSponsor}
	matchday={selectedMatchday}
	allocation={selectedAllocation}
	{seasonTotal}
/>
