<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import paths from '$lib/paths';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Icon from '$lib/components/icons/Icon.svelte';
	import { menuItems } from '$lib/menu';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen">
	<div
		class="box-content flex w-11 flex-col items-center justify-between gap-4 border-r border-medium-gray bg-light-gray py-1.5"
	>
		<div class="flex w-full flex-col items-center gap-4">
			<a
				href={resolve(paths.home.home())}
				aria-label="Home"
				class="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-white transition-colors hover:bg-primary/80"
			>
				<Icon name="building" />
			</a>

			<div class="flex flex-col gap-8">
				{#each menuItems as group (group.id)}
					<div class="flex flex-col gap-1">
						{#each group.items as item (item.id)}
							{@const isActive = page.url.pathname === item.path}
							<svelte:element
								this={item.disabled ? 'div' : 'a'}
								class="flex h-8 w-8 items-center justify-center rounded-[10px] {item.disabled
									? 'cursor-not-allowed text-dark-gray'
									: ` ${isActive ? 'bg-medium-gray/30 text-black' : 'text-dark-gray'}`} transition-colors hover:bg-medium-gray/50"
								href={item.disabled ? undefined : resolve(item.path)}
								aria-label={item.label}
								aria-disabled={item.disabled ? 'true' : undefined}
							>
								<Icon name={item.icon} />
							</svelte:element>
						{/each}
					</div>
				{/each}
			</div>
		</div>

		<img
			alt="Profile"
			src="https://media.licdn.com/dms/image/v2/D4E03AQGjXBfy_1QLBg/profile-displayphoto-scale_400_400/B4EZwL4xDiH8Ak-/0/1769725958082?e=1775088000&v=beta&t=oyux83pC9HDD6aBzFRiKqdH4UCy-xTesjzwSiJiO4mA"
			class="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-white transition-colors hover:bg-primary/80"
		/>
	</div>
	{@render children()}
</div>
