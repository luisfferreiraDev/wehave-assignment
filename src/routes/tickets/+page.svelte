<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import SectionAccordion from '$lib/components/SectionAccordion.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte';
	import XIcon from '$lib/components/icons/XIcon.svelte';
	import TicketDetailDrawer from '$lib/components/TicketDetailDrawer.svelte';
	import MatchdaySelector from '$lib/components/MatchdaySelector.svelte';
	import FilterIcon from '$lib/components/icons/FilterIcon.svelte';
	import Drawer from '$lib/components/Drawer.svelte';
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
	import ArrowDownUp from '$lib/components/icons/ArrowDownUp.svelte';

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
	const sortParam = queryParam('sort', ssp.string(), {
		pushHistory: false
	});

	function clearSearch() {
		$searchParam = null;
	}

	$effect(() => {
		if (Array.isArray($sectionTypeParam) && $sectionTypeParam.length === 0) {
			$sectionTypeParam = null;
		}
	});

	function clearSectionTypeFilter(event: MouseEvent | KeyboardEvent) {
		event.stopPropagation();
		$sectionTypeParam = null;
	}

	function clearSort(event: MouseEvent | KeyboardEvent) {
		event.stopPropagation();
		$sortParam = null;
	}

	function clearAllFilters() {
		$sectionTypeParam = null;
		$matchdayIdsParam = null;
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

	const sortOptions = [
		{ value: 'name-asc', label: 'Name (A-Z)' },
		{ value: 'name-desc', label: 'Name (Z-A)' },
		{ value: 'total-desc', label: 'Total Tickets (High-Low)' },
		{ value: 'total-asc', label: 'Total Tickets (Low-High)' },
		{ value: 'usage-desc', label: 'Usage % (High-Low)' },
		{ value: 'usage-asc', label: 'Usage % (Low-High)' }
	];

	const matchdayIdsParam = queryParam('matchdayIds', ssp.array(), {
		pushHistory: false
	});

	const defaultMatchdayIds = $derived(data.upcomingMatches.slice(0, 5).map((m) => m.id));
	const selectedMatchdayIds = $derived(
		$matchdayIdsParam && $matchdayIdsParam.length > 0 ? $matchdayIdsParam : defaultMatchdayIds
	);

	const displayedMatchdays = $derived(
		data.upcomingMatches.filter((m) => selectedMatchdayIds.includes(m.id))
	);

	function handleMatchdaySelectionChange(ids: string[]) {
		if (ids.length === 0) {
			return;
		}
		$matchdayIdsParam = ids;
	}

	$effect(() => {
		if (
			$matchdayIdsParam &&
			$matchdayIdsParam.length === 5 &&
			JSON.stringify($matchdayIdsParam) === JSON.stringify(defaultMatchdayIds)
		) {
			$matchdayIdsParam = null;
		}
	});

	let previousSeason = $state($seasonParam);
	$effect(() => {
		if (previousSeason !== undefined && previousSeason !== $seasonParam) {
			$sectionTypeParam = null;
			$matchdayIdsParam = null;
		}
		previousSeason = $seasonParam;
	});

	let filterDrawerOpen = $state(false);

	const activeFilterCount = $derived.by(() => {
		let count = 0;
		if ($sectionTypeParam && $sectionTypeParam.length > 0) count++;
		if ($matchdayIdsParam && $matchdayIdsParam.length > 0) count++;
		return count;
	});

	function openFilterDrawer() {
		filterDrawerOpen = true;
	}

	function closeFilterDrawer() {
		filterDrawerOpen = false;
	}

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
				<button
					type="button"
					onclick={openFilterDrawer}
					class="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
				>
					<FilterIcon class="h-4 w-4" />
					Filters
					{#if activeFilterCount > 0}
						<span
							class="flex h-5 w-5 items-center justify-center rounded-full border border-primary bg-primary/10 text-xs text-primary"
						>
							{activeFilterCount}
						</span>
					{/if}
				</button>
				<Dropdown>
					{#snippet trigger()}
						{#if $sortParam}
							{$sortParam
								? sortOptions.find((opt) => opt.value === $sortParam)?.label || 'Sort by'
								: 'Sort by'}
							<span
								onclick={clearSort}
								onkeydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										clearSort(e);
									}
								}}
								class="cursor-pointer rounded-full bg-white p-0.5 text-primary"
								aria-label="Clear sort"
								role="button"
								tabindex="0"
							>
								<XIcon class="h-3 w-3" />
							</span>
						{:else}
							<ArrowDownUp class="h-4 w-4 transition-transform duration-200" />
							{$sortParam
								? sortOptions.find((opt) => opt.value === $sortParam)?.label || 'Sort by'
								: 'Sort by'}
						{/if}
					{/snippet}
					{#snippet content({ close })}
						<div class="flex flex-col gap-1 py-1">
							{#each sortOptions as option (option.value)}
								<button
									type="button"
									onclick={() => {
										$sortParam = option.value;
										close();
									}}
									class="flex w-full cursor-pointer items-center px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 {$sortParam ===
									option.value
										? 'bg-primary/10 font-medium text-primary'
										: 'text-gray-700'}"
								>
									{option.label}
								</button>
							{/each}
						</div>
					{/snippet}
				</Dropdown>
			</div>
		</div>
		{#each data.sectionOverviews as sectionOverview (sectionOverview.section.id)}
			<SectionAccordion
				{sectionOverview}
				upcomingMatches={displayedMatchdays}
				sortBy={$sortParam}
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

<Drawer bind:open={filterDrawerOpen} title="Filters" onClose={closeFilterDrawer}>
	<div class="flex h-full flex-col">
		<div class="grow space-y-6">
			<div>
				<div class="mb-2 block text-sm font-medium text-gray-700">Section Type</div>
				<Dropdown class="w-full">
					{#snippet trigger({ isOpen })}
						{sectionTypeLabel()}
						{#if hasSelection}
							<span
								onclick={clearSectionTypeFilter}
								onkeydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										clearSectionTypeFilter(e);
									}
								}}
								class="cursor-pointer rounded-full bg-white p-0.5 text-primary"
								aria-label="Clear filter"
								role="button"
								tabindex="0"
							>
								<XIcon class="h-3 w-3" />
							</span>
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

			<div>
				<div class="mb-2 block text-sm font-medium text-gray-700">Matchdays</div>
				<MatchdaySelector
					allMatchdays={data.upcomingMatches}
					selectedIds={selectedMatchdayIds}
					onSelectionChange={handleMatchdaySelectionChange}
				/>
			</div>
		</div>

		<div class="flex items-center justify-between border-t border-gray-200 pt-4">
			<button
				type="button"
				onclick={clearAllFilters}
				class="text-sm text-gray-600 underline transition-colors hover:text-gray-900"
			>
				Clear all
			</button>
			<button
				type="button"
				onclick={closeFilterDrawer}
				class="rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/80"
			>
				Done
			</button>
		</div>
	</div>
</Drawer>
