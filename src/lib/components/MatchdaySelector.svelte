<script lang="ts">
	import type { Matchday } from '$lib/types/tickets';
	import Dropdown from './Dropdown.svelte';
	import ChevronDownIcon from './icons/ChevronDownIcon.svelte';
	import { formatShortDate } from '$lib/utils/date';

	interface Props {
		allMatchdays: Matchday[];
		selectedIds: string[];
		onSelectionChange: (ids: string[]) => void;
	}

	let { allMatchdays, selectedIds, onSelectionChange }: Props = $props();

	function handleCheckboxChange(matchdayId: string, checked: boolean) {
		if (checked) {
			onSelectionChange([...selectedIds, matchdayId]);
		} else {
			if (selectedIds.length > 1) {
				onSelectionChange(selectedIds.filter((id) => id !== matchdayId));
			}
		}
	}
</script>

<Dropdown class="inline-block" contentClass="min-w-72">
	{#snippet trigger({ isOpen })}
		Upcoming Matches
		<ChevronDownIcon
			class="h-4 w-4 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
		/>
	{/snippet}
	{#snippet content()}
		<div class="p-2">
			{#each allMatchdays as matchday (matchday.id)}
				{@const isSelected = selectedIds.includes(matchday.id)}
				{@const isMaxReached = !isSelected && selectedIds.length >= 10}
				{@const isLastSelected = isSelected && selectedIds.length === 1}
				{@const isDisabled = isMaxReached || isLastSelected}
				<label
					class="flex cursor-pointer items-start gap-3 rounded px-2 py-2 transition-colors hover:bg-gray-50 {isDisabled
						? 'cursor-not-allowed opacity-50'
						: ''}"
					title={isLastSelected ? 'At least 1 matchday must be selected' : ''}
				>
					<input
						type="checkbox"
						checked={isSelected}
						disabled={isDisabled}
						onchange={(e) => handleCheckboxChange(matchday.id, e.currentTarget.checked)}
						class="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed"
					/>
					<div class="flex-1">
						<div class="flex items-baseline justify-between gap-2">
							<span class="text-sm font-medium text-gray-900">{matchday.opponent}</span>
							<span class="text-xs text-gray-500">{formatShortDate(matchday.date)}</span>
						</div>
						{#if matchday.competition}
							<span class="text-xs text-gray-500">{matchday.competition}</span>
						{/if}
					</div>
				</label>
			{/each}
		</div>
	{/snippet}
</Dropdown>
