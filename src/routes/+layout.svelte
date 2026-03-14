<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import paths from '$lib/paths';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Icon from '$lib/components/icons/Icon.svelte';
	import Drawer from '$lib/components/Drawer.svelte';
	import { menuItems } from '$lib/menu';
	import MenuIcon from '$lib/components/icons/MenuIcon.svelte';

	let { children } = $props();
	let mobileMenuOpen = $state(false);

	function openMobileMenu() {
		mobileMenuOpen = true;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen">
	<div
		class="fixed z-50 box-content hidden h-dvh w-11 border-r border-medium-gray bg-light-gray md:flex"
	>
		<div class="flex h-full w-full flex-col items-center justify-between py-1.5">
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
									href={item.disabled ? undefined : resolve(item.path as '/' | '/tickets')}
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

			<button
				class="flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-[10px]"
			>
				<img
					alt="Profile"
					src="https://media.licdn.com/dms/image/v2/D4E03AQGjXBfy_1QLBg/profile-displayphoto-scale_400_400/B4EZwL4xDiH8Ak-/0/1769725958082?e=1775088000&v=beta&t=oyux83pC9HDD6aBzFRiKqdH4UCy-xTesjzwSiJiO4mA"
					class=" "
				/>
			</button>
		</div>
	</div>

	<div
		class="fixed top-0 right-0 left-0 z-40 box-content flex h-11 items-center justify-between border-b border-medium-gray bg-light-gray px-3 md:hidden"
	>
		<a
			href={resolve(paths.home.home())}
			aria-label="Home"
			class="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-white transition-colors hover:bg-primary/80"
		>
			<Icon name="building" />
		</a>

		<button
			type="button"
			onclick={openMobileMenu}
			class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[10px] text-dark-gray transition-colors hover:bg-medium-gray/50"
			aria-label="Open menu"
		>
			<MenuIcon />
		</button>
	</div>

	<div class="relative w-full pt-13 pr-2 pl-2 md:pt-11 md:pl-13">
		{@render children()}
	</div>
</div>

<Drawer bind:open={mobileMenuOpen} title="Menu" onClose={closeMobileMenu} class="px-0!">
	<div class="flex h-full flex-col justify-between">
		<div class="flex flex-col gap-6 px-6">
			{#each menuItems as group (group.id)}
				<div class="flex flex-col gap-2">
					{#each group.items as item (item.id)}
						{@const isActive = page.url.pathname === item.path}
						{#if item.disabled}
							<div
								class="flex cursor-not-allowed items-center gap-3 rounded-[10px] px-3 py-2 text-dark-gray/60"
								aria-label={item.label}
								aria-disabled="true"
							>
								<Icon name={item.icon} />
								<span class="font-medium">{item.label}</span>
							</div>
						{:else}
							<a
								href={resolve(item.path as '/' | '/tickets')}
								onclick={closeMobileMenu}
								class="flex items-center gap-3 rounded-[10px] px-3 py-2 text-dark-gray transition-colors {isActive
									? 'bg-primary/10 text-primary'
									: 'hover:bg-medium-gray/50 hover:text-black'}"
								aria-label={item.label}
							>
								<Icon name={item.icon} />
								<span class="font-medium">{item.label}</span>
							</a>
						{/if}
					{/each}
				</div>
			{/each}
		</div>

		<div class="mt-6 border-t border-medium-gray pt-4">
			<div class="flex items-center gap-3 rounded-[10px] px-6 py-1">
				<div class="h-10 w-10 overflow-hidden rounded-full">
					<img
						alt="Profile"
						src="https://media.licdn.com/dms/image/v2/D4E03AQGjXBfy_1QLBg/profile-displayphoto-scale_400_400/B4EZwL4xDiH8Ak-/0/1769725958082?e=1775088000&v=beta&t=oyux83pC9HDD6aBzFRiKqdH4UCy-xTesjzwSiJiO4mA"
						class="h-full w-full object-cover"
					/>
				</div>
				<div class="flex flex-col">
					<span class="text-sm font-semibold text-black">Luis Ferreira</span>
					<span class="text-xs text-dark-gray">Profile</span>
				</div>
			</div>
		</div>
	</div>
</Drawer>
