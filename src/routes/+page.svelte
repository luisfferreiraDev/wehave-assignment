<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
</script>

<Container>
	{#snippet header()}
		<p>Home</p>
	{/snippet}
	<div class="p-2">
		<p>List of tickets will go here...</p>
	</div>
</Container>
