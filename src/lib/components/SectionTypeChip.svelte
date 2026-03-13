<script lang="ts">
	type SectionType = 'vip' | 'business' | 'standard' | 'premium';

	interface Props {
		type: SectionType | undefined;
		size?: 'sm' | 'md';
	}

	let { type, size = 'md' }: Props = $props();

	const config: Record<
		SectionType,
		{
			label: string;
			colors: string;
		}
	> = {
		vip: {
			label: 'VIP',
			colors: 'bg-purple-100 text-purple-800 border-purple-300'
		},
		business: {
			label: 'Business',
			colors: 'bg-blue-100 text-blue-800 border-blue-300'
		},
		premium: {
			label: 'Premium',
			colors: 'bg-amber-100 text-amber-800 border-amber-300'
		},
		standard: {
			label: 'Standard',
			colors: 'bg-gray-100 text-gray-800 border-gray-300'
		}
	};

	const currentConfig = $derived(type ? config[type] : config.standard);

	const sizeClasses = $derived(size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm');
</script>

<span
	class="inline-flex items-center rounded-full border font-medium {currentConfig.colors} {sizeClasses}"
>
	{currentConfig.label}
</span>
