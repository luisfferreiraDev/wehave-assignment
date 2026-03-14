<script lang="ts">
	import ChevronLeftIcon from '../icons/ChevronLeftIcon.svelte';

	let { header, children } = $props();
</script>

<div
	class="fixed top-0 right-0 left-11 z-30 box-content hidden h-22 flex-col border-b border-medium-gray bg-light-gray md:flex"
>
	<div class="relative h-full w-full px-2">
		<div class="mx-auto max-w-400">
			<button
				class="flex h-11 w-fit cursor-pointer items-center gap-2 pl-6 font-bold text-dark-gray transition-colors hover:text-gray-900"
			>
				<ChevronLeftIcon class=" " />
				<p>Stadiums</p>
			</button>
		</div>
		<div
			class="mx-auto flex h-11 max-w-400 items-center rounded-t-lg border-x border-t border-medium-gray bg-white px-8"
		>
			{@render header()}
		</div>
	</div>
</div>
<div class="relative z-20 mx-auto max-w-400 rounded-lg border border-medium-gray bg-white md:pt-11">
	{@render children()}
</div>
