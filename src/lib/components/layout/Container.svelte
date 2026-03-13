<script lang="ts">
	import paths from '$lib/paths';
	import ChevronLeftIcon from '../icons/ChevronLeftIcon.svelte';
	import { resolve } from '$app/paths';

	let { header, children } = $props();
</script>

<div
	class="absolute top-0 right-0 left-11 box-content flex h-11 items-center border-b border-medium-gray bg-light-gray px-6 pb-11"
>
	<a href={resolve(paths.home.home())} class="flex items-center gap-2 font-bold">
		<ChevronLeftIcon class=" text-dark-gray" />
		<p>Tickets</p>
	</a>
</div>
<div class="relative z-20 rounded-lg border border-medium-gray bg-white">
	<div class="flex h-11 w-full items-center border-b border-medium-gray px-8">
		{@render header()}
	</div>
	{@render children()}
</div>
