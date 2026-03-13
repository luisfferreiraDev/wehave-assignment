<script lang="ts">
	import BuildingIcon from './BuildingIcon.svelte';
	import TicketIcon from './TicketIcon.svelte';
	import UtensilsCrossedIcon from './UtensilsCrossedIcon.svelte';
	import ChevronLeftIcon from './ChevronLeftIcon.svelte';
	import ChevronDownIcon from './ChevronDownIcon.svelte';

	interface Props {
		name: string;
		size?: number;
		class?: string;
	}

	let { name, size = 16, class: className = '' }: Props = $props();

	type IconComponent = typeof BuildingIcon;

	const iconMap: Record<string, IconComponent> = {
		building: BuildingIcon,
		ticket: TicketIcon,
		'chevron-left': ChevronLeftIcon,
		'chevron-down': ChevronDownIcon,
		'utensils-crossed': UtensilsCrossedIcon
	};

	const IconComponent = $derived(iconMap[name] || TicketIcon);
</script>

<IconComponent {size} class={className} />
