<script lang="ts">
	import type { SectionTicketOverview } from '$lib/types/tickets';
	import type { Matchday } from '$lib/types/tickets';
	import Accordion from '$lib/components/Accordion.svelte';
	import AnimatedNumber from './AnimatedNumber.svelte';
	import SectionTypeChip from './SectionTypeChip.svelte';

	interface Props {
		sectionOverview: SectionTicketOverview;
		upcomingMatches: Matchday[];
		sortBy?: string | null;
		onTicketClick?: (sectionId: string, sponsorId: string, matchdayId: string) => void;
	}

	let { sectionOverview, upcomingMatches, sortBy, onTicketClick }: Props = $props();

	let isOpen = $state(true);
	let shouldAnimate = $state(false);

	$effect(() => {
		if (isOpen && !shouldAnimate) {
			const timer = setTimeout(() => {
				shouldAnimate = true;
			}, 50);
			return () => clearTimeout(timer);
		}
	});

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: 'short'
		}).format(date);
	};

	const getTicketCountForMatchday = (
		sponsorSummary: SectionTicketOverview['sponsors'][0],
		matchdayId: string
	) => {
		const allocation = sponsorSummary.matchdayAllocations.find((a) => a.matchday.id === matchdayId);
		return allocation?.ticketCount || 0;
	};

	const calculateUsagePercentage = (sponsorSummary: SectionTicketOverview['sponsors'][0]) => {
		const totalMatchdays = sponsorSummary.matchdayAllocations.length;
		const maxPossibleTickets = sectionOverview.section.capacity * totalMatchdays;
		if (maxPossibleTickets === 0) return 0;
		return Math.round((sponsorSummary.totalSeasonTickets / maxPossibleTickets) * 100);
	};

	const sortedSponsors = $derived.by(() => {
		const sponsors = [...sectionOverview.sponsors];

		if (!sortBy) return sponsors;

		switch (sortBy) {
			case 'name-asc':
				return sponsors.sort((a, b) => a.sponsor.name.localeCompare(b.sponsor.name));
			case 'name-desc':
				return sponsors.sort((a, b) => b.sponsor.name.localeCompare(a.sponsor.name));
			case 'total-desc':
				return sponsors.sort((a, b) => b.totalSeasonTickets - a.totalSeasonTickets);
			case 'total-asc':
				return sponsors.sort((a, b) => a.totalSeasonTickets - b.totalSeasonTickets);
			case 'usage-desc':
				return sponsors.sort((a, b) => calculateUsagePercentage(b) - calculateUsagePercentage(a));
			case 'usage-asc':
				return sponsors.sort((a, b) => calculateUsagePercentage(a) - calculateUsagePercentage(b));
			default:
				return sponsors;
		}
	});
</script>

<Accordion bind:open={isOpen}>
	{#snippet header()}
		<div class="flex flex-col gap-3 md:flex-row md:items-center">
			<h3 class="font-semibold">{sectionOverview.section.name}</h3>
			<div class="flex items-center gap-3">
				<SectionTypeChip type={sectionOverview.section.type} size="sm" />
				<span class=" text-gray-500">
					{sectionOverview.sponsors.length} sponsor{sectionOverview.sponsors.length !== 1
						? 's'
						: ''}
				</span>
			</div>
		</div>
	{/snippet}

	<div class="overflow-x-auto pb-8 pl-8">
		<table class="w-full border-collapse overflow-hidden rounded-lg">
			<thead>
				<tr class="border-b border-medium-gray">
					<th class="p-3 text-left font-semibold text-dark-gray">Sponsor</th>
					<th class="p-3 text-right font-semibold text-dark-gray">
						<div class="min-w-48">
							<div>Season Total</div>
							<div class="text-xs font-normal text-gray-500">Capacity Usage</div>
						</div>
					</th>
					{#each upcomingMatches as match (match.id)}
						<th class="p-3 text-right font-semibold text-dark-gray">
							<div class="flex flex-col items-end">
								<span class="text-xs text-gray-500">{formatDate(match.date)}</span>
								<span class="max-w-30 truncate text-xs" title={match.opponent}>
									{match.opponent}
								</span>
							</div>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each sortedSponsors as sponsorSummary (sponsorSummary.sponsor.id)}
					<tr class="border-b border-medium-gray transition-colors hover:bg-gray-50">
						<td class="p-3 font-medium text-gray-900">
							{sponsorSummary.sponsor.name}
						</td>
						<td class="p-3">
							<div class="flex items-center justify-end gap-3">
								<div class="flex min-w-32 flex-col items-end gap-1">
									<AnimatedNumber value={sponsorSummary.totalSeasonTickets} />
									<div class="h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
										<div
											class="h-full bg-primary transition-all duration-700 ease-out"
											style="width: {shouldAnimate ? calculateUsagePercentage(sponsorSummary) : 0}%"
										></div>
									</div>
								</div>
								<span class="w-10 text-xs text-gray-500">
									{calculateUsagePercentage(sponsorSummary)}%
								</span>
							</div>
						</td>
						{#each upcomingMatches as match (match.id)}
							{@const ticketCount = getTicketCountForMatchday(sponsorSummary, match.id)}
							<td class="p-3">
								<div class="flex items-center justify-end">
									{#if ticketCount > 0}
										<button
											type="button"
											onclick={() =>
												onTicketClick?.(
													sectionOverview.section.id,
													sponsorSummary.sponsor.id,
													match.id
												)}
											class="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-primary/10 text-primary ring ring-primary transition-colors hover:bg-primary/20"
											title="View ticket details"
										>
											{ticketCount}
										</button>
									{:else}
										<span class=" text-dark-gray">-</span>
									{/if}
								</div>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Accordion>
