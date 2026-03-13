<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import type { EasingFunction } from 'svelte/transition';

	interface Props {
		value: number;
		duration?: number;
		easing?: EasingFunction;
		decimals?: number;
		thousandsSeparator?: boolean;
		prefix?: string;
		suffix?: string;
		delay?: number;
		class?: string;
	}

	let {
		value,
		duration = 800,
		easing = cubicOut,
		decimals = 0,
		thousandsSeparator = false,
		prefix = '',
		suffix = '',
		delay = 0,
		class: className = ''
	}: Props = $props();

	const animated = tweened(0, {
		duration: 800,
		easing: cubicOut
	});

	// Update animation when value or settings change
	$effect(() => {
		animated.set(value, {
			duration,
			easing,
			delay
		});
	});

	// Format number based on options
	const formattedValue = $derived.by(() => {
		const num = $animated;

		let formatted: string;

		if (thousandsSeparator) {
			formatted = num.toLocaleString('en-US', {
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals
			});
		} else {
			formatted = num.toFixed(decimals);
		}

		return `${prefix}${formatted}${suffix}`;
	});
</script>

<span class={className}>
	{formattedValue}
</span>
