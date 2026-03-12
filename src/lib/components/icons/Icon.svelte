<script lang="ts">
	import BuildingIcon from './BuildingIcon.svelte';
	import TicketIcon from './TicketIcon.svelte';
	import UtensilsCrossedIcon from './UtensilsCrossedIcon.svelte';

	interface Props {
		name: string;
		size?: number;
		class?: string;
	}

	let { name, size = 16, class: className = '' }: Props = $props();

	const iconMap: Record<string, any> = {
		building: BuildingIcon,
		ticket: TicketIcon,
		'utensils-crossed': UtensilsCrossedIcon
	};

	const IconComponent = $derived(iconMap[name] || TicketIcon);
</script>

<IconComponent {size} class={className} />
