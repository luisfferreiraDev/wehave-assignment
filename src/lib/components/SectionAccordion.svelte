<script lang="ts">
	import type { SectionTicketOverview } from '$lib/types/tickets';
	import type { Matchday } from '$lib/types/tickets';
	import Accordion from '$lib/components/Accordion.svelte';
	import AnimatedNumber from './AnimatedNumber.svelte';

	interface Props {
		sectionOverview: SectionTicketOverview;
		upcomingMatches: Matchday[];
	}

	let { sectionOverview, upcomingMatches }: Props = $props();

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

	const getSectionTypeLabel = (type?: string) => {
		const labels: Record<string, string> = {
			vip: 'VIP',
			business: 'Business',
			standard: 'Standard',
			premium: 'Premium'
		};
		return type ? labels[type] : 'Standard';
	};

	const getSectionTypeColor = (type?: string) => {
		const colors: Record<string, string> = {
			vip: 'bg-purple-100 text-purple-800 border-purple-200',
			business: 'bg-blue-100 text-blue-800 border-blue-200',
			standard: 'bg-gray-100 text-gray-800 border-gray-200',
			premium: 'bg-amber-100 text-amber-800 border-amber-200'
		};
		return type ? colors[type] : colors.standard;
	};

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
</script>

<Accordion bind:open={isOpen}>
	{#snippet header(_isOpen)}
		<div class="flex items-center gap-3">
			<h3 class="font-semibold">{sectionOverview.section.name}</h3>
			<span
				class="rounded border px-2 py-1 text-xs font-medium {getSectionTypeColor(
					sectionOverview.section.type
				)}"
			>
				{getSectionTypeLabel(sectionOverview.section.type)}
			</span>
			<span class=" text-gray-500">
				{sectionOverview.sponsors.length} sponsor{sectionOverview.sponsors.length !== 1 ? 's' : ''}
			</span>
		</div>
	{/snippet}

	<div class="overflow-x-auto pb-8 pl-8">
		<table class="w-full border-collapse overflow-hidden rounded-lg">
			<thead>
				<tr class="border-b border-medium-gray">
					<th class="p-3 text-left  font-semibold text-gray-700">Sponsor</th>
					<th class="p-3 text-right  font-semibold text-gray-700">
						<div class="min-w-48">Season Total</div>
					</th>
					{#each upcomingMatches as match (match.id)}
						<th class="p-3 text-right  font-semibold text-gray-700">
							<div class="flex flex-col items-end">
								<span class="text-xs text-gray-500">{formatDate(match.date)}</span>
								<span class="max-w-30 truncate" title={match.opponent}>
									{match.opponent}
								</span>
							</div>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each sectionOverview.sponsors as sponsorSummary (sponsorSummary.sponsor.id)}
					<tr class="border-b border-medium-gray transition-colors hover:bg-gray-50">
						<td class="p-3 font-medium text-gray-900">
							{sponsorSummary.sponsor.name}
						</td>
						<td class="p-3">
							<div class="flex items-center justify-end gap-3">
								<div class="flex min-w-32 flex-col items-end gap-1">
									<AnimatedNumber value={sponsorSummary.totalSeasonTickets} />
									<div class="h-1.5 w-full overflow-hidden rounded-full bg-light-primary">
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
							<td class=" p-3 text-right text-gray-700">
								{getTicketCountForMatchday(sponsorSummary, match.id)}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Accordion>
