<script lang="ts">
	import paths from '$lib/paths';
	import ChevronLeftIcon from '../icons/ChevronLeftIcon.svelte';
	import { resolve } from '$app/paths';

	let { header, children } = $props();
</script>

<div
	class="fixed top-0 right-0 left-11 z-30 box-content flex h-22 flex-col border-b border-medium-gray bg-light-gray"
>
	<div class="relative h-full w-full px-2">
		<a href={resolve(paths.home.home())} class="flex h-11 w-fit items-center gap-2 pl-6 font-bold">
			<ChevronLeftIcon class=" text-dark-gray" />
			<p>Tickets</p>
		</a>
		<div
			class="mx-auto flex h-11 max-w-400 items-center rounded-t-lg border-x border-t border-medium-gray bg-white px-8"
		>
			{@render header()}
		</div>
	</div>
</div>
<div class="relative z-20 mx-auto max-w-400 rounded-lg border border-medium-gray bg-white pt-11">
	{@render children()}
</div>
