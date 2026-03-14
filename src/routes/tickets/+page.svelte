<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import SectionAccordion from '$lib/components/SectionAccordion.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import XIcon from '$lib/components/icons/XIcon.svelte';
	import TicketDetailDrawer from '$lib/components/TicketDetailDrawer.svelte';
	import FilterIcon from '$lib/components/icons/FilterIcon.svelte';
	import Drawer from '$lib/components/Drawer.svelte';
	import SearchClearButton from '$lib/components/SearchClearButton.svelte';
	import { tick } from 'svelte';
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
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import { slide } from 'svelte/transition';
	import { SEARCH_PLACEHOLDER, SORT_OPTIONS } from '$lib/data/ticketsPageConstants';

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

	let isSearchOpen = $state(false);
	let searchInputEl = $state<HTMLInputElement | null>(null);

	function clearSearch() {
		$searchParam = null;
		isSearchOpen = false;
	}

	async function openSearch() {
		isSearchOpen = true;
		await tick();
		searchInputEl?.focus();
	}

	function handleSearchAction() {
		clearSearch();
	}

	function handleSearchBlur() {
		isSearchOpen = false;
	}

	$effect(() => {
		if (Array.isArray($sectionTypeParam) && $sectionTypeParam.length === 0) {
			$sectionTypeParam = null;
		}
	});

	$effect(() => {
		if ($searchParam && !isSearchOpen) {
			isSearchOpen = true;
		}
	});

	function clearSort(event: MouseEvent | KeyboardEvent) {
		event.stopPropagation();
		$sortParam = null;
	}

	function resetFilters() {
		$sectionTypeParam = null;
		$matchdayIdsParam = null;
	}

	function clearAllFilters() {
		resetFilters();
	}

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

	function handleMatchdayCheckboxChange(matchdayId: string, checked: boolean) {
		if (checked) {
			handleMatchdaySelectionChange([...selectedMatchdayIds, matchdayId]);
		} else {
			if (selectedMatchdayIds.length > 1) {
				handleMatchdaySelectionChange(selectedMatchdayIds.filter((id) => id !== matchdayId));
			}
		}
	}

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: 'short'
		}).format(date);
	};

	$effect(() => {
		if (
			$matchdayIdsParam &&
			$matchdayIdsParam.length === 5 &&
			JSON.stringify($matchdayIdsParam) === JSON.stringify(defaultMatchdayIds)
		) {
			$matchdayIdsParam = null;
		}
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

	let mobileSearchOpen = $state(false);
	let mobileSearchInputEl = $state<HTMLInputElement | null>(null);

	async function toggleMobileSearch() {
		mobileSearchOpen = !mobileSearchOpen;

		if (mobileSearchOpen) {
			await tick();
			mobileSearchInputEl?.focus();
		}
	}
</script>

<Container>
	{#snippet header()}
		<div class="flex items-center justify-between gap-4">
			<h1 class="text-lg font-bold">Stadium Sections</h1>
		</div>
	{/snippet}
	<div class=" flex flex-col items-start gap-4 pt-4 md:p-6">
		<div
			class="sticky top-11.25 z-10 -mx-px w-full border-b border-medium-gray px-1 md:relative md:top-0 md:border-0"
		>
			<div
				class="relative flex items-center justify-center gap-4 bg-white px-3 py-2 md:justify-between"
			>
				<SeasonDropdown bind:value={$seasonParam} onChange={resetFilters} options={data.seasons} />

				<div class="flex w-full justify-end gap-2">
					<div class="z-10 hidden md:block">
						<div
							class="relative overflow-hidden transition-[width] duration-300 ease-out {isSearchOpen
								? 'w-full md:w-72'
								: ' w-24'}"
						>
							{#if isSearchOpen}
								<input
									type="text"
									bind:this={searchInputEl}
									bind:value={$searchParam}
									onblur={handleSearchBlur}
									placeholder={SEARCH_PLACEHOLDER}
									class="h-10 w-full rounded-md border border-gray-300 px-3 py-1.5 pr-9 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
								/>
								<SearchClearButton hasQuery={Boolean($searchParam)} onClick={handleSearchAction} />
							{:else}
								<button
									type="button"
									onclick={openSearch}
									class="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-medium-gray bg-white px-3 py-1.5 text-black shadow-xs"
									aria-label="Open search"
								>
									<SearchIcon size={16} />
									Search
								</button>
							{/if}
						</div>
					</div>
					<button
						type="button"
						onclick={toggleMobileSearch}
						class=" flex h-10 cursor-pointer items-center justify-between gap-2 rounded-md border border-medium-gray bg-white px-3 py-1.5 text-black shadow-xs md:hidden"
					>
						<SearchIcon class="h-4 w-4" />
					</button>
					<button
						type="button"
						onclick={openFilterDrawer}
						class="flex h-10 cursor-pointer items-center justify-between gap-2 rounded-md border border-medium-gray bg-white px-3 py-1.5 text-black shadow-xs"
					>
						<FilterIcon class="h-4 w-4" />
						<span class="hidden md:block"> Filters </span>
						{#if activeFilterCount > 0}
							<span
								class="flex h-5 w-5 items-center justify-center rounded-full border border-primary bg-primary/10 text-xs text-primary"
							>
								{activeFilterCount}
							</span>
						{/if}
					</button>
					<Dropdown contentClass="min-w-50">
						{#snippet trigger()}
							{#if $sortParam}
								{$sortParam
									? SORT_OPTIONS.find((opt) => opt.value === $sortParam)?.label || 'Sort'
									: 'Sort'}
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
								<span class="hidden md:block">Sort</span>
							{/if}
						{/snippet}
						{#snippet content({ close })}
							<div class="flex flex-col gap-1 py-1">
								{#each SORT_OPTIONS as option (option.value)}
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
			{#if mobileSearchOpen}
				<div
					transition:slide
					class=" flex h-16 items-center bg-white px-4 inset-shadow-sm md:hidden"
				>
					<div class="relative w-full">
						<input
							type="text"
							bind:this={mobileSearchInputEl}
							bind:value={$searchParam}
							placeholder={SEARCH_PLACEHOLDER}
							class="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 pr-9 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
						/>
						{#if $searchParam}
							<SearchClearButton hasQuery={Boolean($searchParam)} onClick={handleSearchAction} />
						{/if}
					</div>
				</div>
			{/if}
		</div>

		{#if data.sectionOverviews.length > 0}
			<div class="w-full px-4 py-3">
				{#each data.sectionOverviews as sectionOverview (sectionOverview.section.id)}
					<SectionAccordion
						{sectionOverview}
						upcomingMatches={displayedMatchdays}
						sortBy={$sortParam}
						onTicketClick={handleTicketClick}
					/>
				{/each}
			</div>
		{/if}

		{#if data.sectionOverviews.length === 0}
			<div class="flex w-full flex-col items-center justify-center py-16 text-center">
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
				<div class="space-y-2">
					{#each data.sectionTypes as option (option.value)}
						<label
							class="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors hover:bg-gray-50"
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
			</div>

			<div>
				<div class="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
					<span>Matchdays</span>
					<span class="text-xs text-gray-500">
						{selectedMatchdayIds.length} of {data.upcomingMatches.length} selected (min 1, max 10)
					</span>
				</div>
				<div class="max-h-96 space-y-2 overflow-y-auto">
					{#each data.upcomingMatches as matchday (matchday.id)}
						{@const isSelected = selectedMatchdayIds.includes(matchday.id)}
						{@const isMaxReached = !isSelected && selectedMatchdayIds.length >= 10}
						{@const isLastSelected = isSelected && selectedMatchdayIds.length === 1}
						{@const isDisabled = isMaxReached || isLastSelected}
						<label
							class="flex cursor-pointer items-start gap-3 rounded px-2 py-1.5 transition-colors {isDisabled
								? 'cursor-not-allowed opacity-50'
								: ''}"
							title={isLastSelected ? 'At least 1 matchday must be selected' : ''}
						>
							<input
								type="checkbox"
								checked={isSelected}
								disabled={isDisabled}
								onchange={(e) => handleMatchdayCheckboxChange(matchday.id, e.currentTarget.checked)}
								class="mt-0.5 h-4 w-4 rounded accent-primary/10 checked:border checked:border-primary disabled:cursor-not-allowed"
							/>
							<div class="flex-1">
								<div class="flex items-baseline justify-between gap-2">
									<span class="text-sm font-medium text-gray-900">{matchday.opponent}</span>
									<span class="text-xs text-gray-500">{formatDate(matchday.date)}</span>
								</div>
								{#if matchday.competition}
									<span class="text-xs text-gray-500">{matchday.competition}</span>
								{/if}
							</div>
						</label>
					{/each}
				</div>
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
