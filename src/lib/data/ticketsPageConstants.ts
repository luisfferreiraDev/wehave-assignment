export const SEARCH_PLACEHOLDER = 'Search sponsors or sections';

export const SORT_OPTIONS = [
	{ value: 'name-asc', label: 'Name (A-Z)' },
	{ value: 'name-desc', label: 'Name (Z-A)' },
	{ value: 'total-desc', label: 'Total Tickets (High-Low)' },
	{ value: 'total-asc', label: 'Total Tickets (Low-High)' },
	{ value: 'usage-desc', label: 'Usage % (High-Low)' },
	{ value: 'usage-asc', label: 'Usage % (Low-High)' }
] as const;
