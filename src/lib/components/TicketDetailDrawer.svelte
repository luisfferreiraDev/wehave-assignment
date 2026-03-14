<script lang="ts">
	import Drawer from './Drawer.svelte';
	import SectionTypeChip from './SectionTypeChip.svelte';
	import type { StadiumSection, Sponsor, Matchday, TicketAllocation } from '$lib/types/tickets';

	interface Props {
		open: boolean;
		onClose: () => void;
		section: StadiumSection | null;
		sponsor: Sponsor | null;
		matchday: Matchday | null;
		allocation: TicketAllocation | null;
		seasonTotal?: number;
	}

	let {
		open = $bindable(),
		onClose,
		section,
		sponsor,
		matchday,
		allocation,
		seasonTotal
	}: Props = $props();

	let shouldAnimate = $state(false);
	let isLoading = $state(false);

	$effect(() => {
		if (open) {
			isLoading = true;
			shouldAnimate = false;

			const loadingTimer = setTimeout(() => {
				isLoading = false;
				const animTimer = setTimeout(() => {
					shouldAnimate = true;
				}, 50);
				return () => clearTimeout(animTimer);
			}, 400);

			return () => clearTimeout(loadingTimer);
		} else {
			shouldAnimate = false;
			isLoading = false;
		}
	});

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		}).format(date);
	};

	const formatTime = (date: Date) => {
		return new Intl.DateTimeFormat('en-GB', {
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	};

	const matchdayUsagePercent = $derived(
		section && allocation
			? Math.round((allocation.ticketCount / section.capacity) * 100 * 10) / 10
			: 0
	);

	const seasonUsagePercent = $derived(
		section && seasonTotal ? Math.round((seasonTotal / (section.capacity * 10)) * 100 * 10) / 10 : 0
	);

	const seatRange = $derived(() => {
		if (!allocation?.seatNumbers || allocation.seatNumbers.length === 0) {
			return 'Not assigned';
		}
		const seats = allocation.seatNumbers;
		if (seats.length === 1) {
			return seats[0];
		}
		return `${seats[0]} - ${seats[seats.length - 1]}`;
	});

	const allocationItems = $derived.by(() => {
		if (!allocation) return [];

		const items: Array<{ label: string; value: string | number; valueClass: string }> = [
			{ label: 'Tickets Allocated', value: allocation.ticketCount, valueClass: 'text-lg' }
		];

		if (allocation.accessLevel) {
			items.push({ label: 'Access Level', value: allocation.accessLevel, valueClass: '' });
		}

		if (allocation.gate) {
			items.push({ label: 'Gate', value: `Gate ${allocation.gate}`, valueClass: '' });
		}

		items.push({ label: 'Seat Range', value: seatRange(), valueClass: '' });

		return items;
	});
</script>

<Drawer {open} {onClose} title="Ticket Details">
	{#if isLoading}
		<div class="space-y-6">
			<div>
				<div class="mb-2 flex items-center gap-2">
					{@render skeletonBar('7', '48')}
					{@render skeletonBar('5', '16')}
				</div>
				{@render skeletonBar('4', '32')}
			</div>

			<div class="space-y-2 rounded-lg bg-gray-50 p-4">
				{@render skeletonBar('6', '40')}
				{@render skeletonBar('4', '36')}
				{@render skeletonBar('4', '32')}
			</div>

			<hr class="border-medium-gray" />

			<div class="space-y-4">
				{@render skeletonBar('5', '32')}
				<div class="space-y-3">
					{#each [1, 2, 3, 4] as i (i)}
						{@render skeletonInfoItem()}
					{/each}
				</div>
			</div>

			<hr class="border-medium-gray" />

			<div class="space-y-4">
				{@render skeletonBar('5', '28')}
				<div class="space-y-3">
					{@render skeletonInfoItem()}
					{#each [1, 2] as i (i)}
						{@render skeletonProgressBar()}
					{/each}
				</div>
			</div>

			<hr class="border-medium-gray" />

			<div class="space-y-3">
				{@render skeletonBar('5', '32')}
				<div class="rounded-lg bg-gray-50 p-3">
					<div class="flex flex-wrap gap-1.5">
						{#each Array.from({ length: 12 }, (_, i) => i) as idx (idx)}
							{@render skeletonBar('7', '10')}
						{/each}
					</div>
				</div>
			</div>
		</div>
	{:else if section && sponsor && matchday && allocation}
		<div class="space-y-6">
			<div>
				<div class="mb-2 flex items-center gap-2">
					<h3 class="text-xl font-semibold text-gray-900">{section.name}</h3>
					{#if section.type}
						<SectionTypeChip type={section.type} size="sm" />
					{/if}
				</div>
				<p class="text-sm text-gray-600">{sponsor.name}</p>
			</div>

			<div class="rounded-lg bg-gray-50 p-4">
				<div class="mb-1 text-lg font-semibold text-gray-900">{matchday.opponent}</div>
				<div class="text-sm text-gray-600">
					{formatDate(matchday.date)} • {formatTime(matchday.date)}
				</div>
				{#if matchday.competition}
					<div class="mt-1 text-sm text-gray-500">{matchday.competition}</div>
				{/if}
			</div>

			<hr class="border-medium-gray" />

			<div class="space-y-4">
				<h4 class="font-semibold text-gray-900">Ticket Allocation</h4>

				<div class="space-y-3">
					{#each allocationItems as item (item.label)}
						{@render infoItem(item.label, item.value, item.valueClass)}
					{/each}
				</div>
			</div>

			<hr class="border-medium-gray" />

			<div class="space-y-4">
				<h4 class="font-semibold text-gray-900">Section Usage</h4>

				<div class="space-y-3">
					<div class="flex items-center justify-between">
						<span class="text-sm text-gray-600">Section Capacity</span>
						<span class="font-medium text-gray-900">{section.capacity}</span>
					</div>
					{@render progressBar('This Matchday', matchdayUsagePercent, allocation.ticketCount)}
					{#if seasonTotal}
						{@render progressBar('Season Total', seasonUsagePercent, seasonTotal)}
					{/if}
				</div>
			</div>

			{#if allocation.seatNumbers && allocation.seatNumbers.length > 0}
				<hr class="border-medium-gray" />
				<div class="space-y-3">
					<h4 class="font-semibold text-gray-900">Seat Assignments</h4>
					<div class="max-h-40 overflow-y-auto rounded-lg bg-gray-50 p-3">
						<div class="flex flex-wrap gap-1.5">
							{#each allocation.seatNumbers as seat (seat)}
								<span
									class="inline-flex items-center rounded bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-gray-200"
								>
									{seat}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<div class="flex items-center justify-center py-12 text-gray-500">
			<p>No ticket details available</p>
		</div>
	{/if}
</Drawer>

{#snippet infoItem(label: string, value: string | number, valueClass: string = '')}
	<div class="flex items-center justify-between">
		<span class="text-sm text-gray-600">{label}</span>
		<span class="font-medium text-gray-900 {valueClass}">{value}</span>
	</div>
{/snippet}

{#snippet progressBar(label: string, usagePercentage: number, total: number)}
	<div>
		<div class="mb-1 flex items-center justify-between">
			<span class="text-sm text-gray-600">{label}</span>
			<span class="font-medium text-gray-900">
				{usagePercentage}% ({total})
			</span>
		</div>
		<div class="h-2 w-full overflow-hidden rounded-full bg-primary/10">
			<div
				class="h-full bg-primary transition-all duration-700 ease-out"
				style="width: {shouldAnimate ? Math.min(usagePercentage, 100) : 0}%"
			></div>
		</div>
	</div>
{/snippet}

{#snippet skeletonBar(height: string, width: string, rounded: string = 'rounded')}
	<div class="h-{height} w-{width} animate-pulse {rounded} bg-gray-200"></div>
{/snippet}

{#snippet skeletonInfoItem()}
	<div class="flex items-center justify-between">
		{@render skeletonBar('4', '24')}
		{@render skeletonBar('5', '16')}
	</div>
{/snippet}

{#snippet skeletonProgressBar()}
	<div class="space-y-1">
		<div class="flex items-center justify-between">
			{@render skeletonBar('4', '24')}
			{@render skeletonBar('4', '20')}
		</div>
		{@render skeletonBar('2', 'full', 'rounded-full')}
	</div>
{/snippet}
