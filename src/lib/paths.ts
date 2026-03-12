const home = {
	home: () => '/' as const
} as const;

const tickets = {
	home: () => '/tickets' as const
} as const;

export default {
	home,
	tickets
} as const;
