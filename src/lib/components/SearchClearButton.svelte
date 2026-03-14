<script lang="ts">
	import XIcon from '$lib/components/icons/XIcon.svelte';

	let {
		hasQuery = false,
		onClick
	}: {
		hasQuery?: boolean;
		onClick: () => void;
	} = $props();
</script>

<button
	type="button"
	onmousedown={(event) => event.preventDefault()}
	onclick={onClick}
	class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
	aria-label={hasQuery ? 'Clear search' : 'Close search'}
>
	<XIcon class="h-4 w-4" />
</button>
