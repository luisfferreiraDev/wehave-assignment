/**
 * Mock Data for Ticketing System
 *
 * This file contains:
 * - Sample sponsors, stadium sections, matchdays
 * - Generated ticket allocations
 * - Helper functions to retrieve and format data
 */

import type {
	Sponsor,
	Matchday,
	StadiumSection,
	TicketAllocation,
	SectionTicketOverview,
	SponsorTicketSummary,
	MatchdayDetailData
} from '$lib/types/tickets';

// =============================================================================
// MOCK DATA
// =============================================================================

/**
 * Mock Sponsors
 * Based on the screenshot showing "Munro" as a sponsor
 */
export const sponsors: Sponsor[] = [
	{ id: 'munro', name: 'Munro' },
	{ id: 'techcorp', name: 'TechCorp International' },
	{ id: 'brewco', name: 'BrewCo Premium Beverages' },
	{ id: 'automax', name: 'AutoMax Motors' },
	{ id: 'finserve', name: 'FinServe Group' },
	{ id: 'sportgear', name: 'SportGear Pro' }
];

/**
 * Mock Stadium Sections
 * Based on the screenshot categories (Business Seats, Lounge, VIP, Parking)
 */
export const stadiumSections: StadiumSection[] = [
	{
		id: 'business-106',
		name: 'Business Seats Section 106',
		capacity: 200,
		type: 'business'
	},
	{
		id: 'lounge-1880',
		name: 'Lounge 1880',
		capacity: 120,
		type: 'premium'
	},
	{
		id: 'vip-uefa',
		name: 'VIP UEFA Arrangement',
		capacity: 80,
		type: 'vip'
	},
	{
		id: 'parking-p2',
		name: 'Parking Spaces P2',
		capacity: 50,
		type: 'standard'
	},
	{
		id: 'skybox-east',
		name: 'Skybox East Wing',
		capacity: 40,
		type: 'vip'
	}
];

/**
 * Mock Matchdays for Seasons 2024/25, 2025/26, and 2026/27
 * Includes top European football teams for realism
 */
export const matchdays: Matchday[] = [
	// Season 2024/25 (Past season - completed)
	{
		id: 'md-20',
		date: new Date('2025-01-15T20:00:00'),
		opponent: 'AC Milan',
		homeTeam: 'Home Club',
		season: '2024/25',
		competition: 'Serie A'
	},
	{
		id: 'md-21',
		date: new Date('2025-01-22T18:30:00'),
		opponent: 'Borussia Dortmund',
		homeTeam: 'Home Club',
		season: '2024/25',
		competition: 'Bundesliga'
	},
	{
		id: 'md-22',
		date: new Date('2025-02-05T15:00:00'),
		opponent: 'Chelsea FC',
		homeTeam: 'Home Club',
		season: '2024/25',
		competition: 'Premier League'
	},
	{
		id: 'md-23',
		date: new Date('2025-02-12T20:00:00'),
		opponent: 'Atletico Madrid',
		homeTeam: 'Home Club',
		season: '2024/25',
		competition: 'La Liga'
	},
	{
		id: 'md-24',
		date: new Date('2025-02-19T18:30:00'),
		opponent: 'Inter Milan',
		homeTeam: 'Home Club',
		season: '2024/25',
		competition: 'Serie A'
	},
	{
		id: 'md-25',
		date: new Date('2025-02-26T16:00:00'),
		opponent: 'Arsenal FC',
		homeTeam: 'Home Club',
		season: '2024/25',
		competition: 'Premier League'
	},

	// Season 2025/26 (Current season - ongoing)
	{
		id: 'md-28',
		date: new Date('2026-03-15T15:00:00'),
		opponent: 'FC Barcelona',
		homeTeam: 'Home Club',
		season: '2025/26',
		competition: 'UEFA Champions League'
	},
	{
		id: 'md-29',
		date: new Date('2026-03-22T18:30:00'),
		opponent: 'Bayern Munich',
		homeTeam: 'Home Club',
		season: '2025/26',
		competition: 'UEFA Champions League'
	},
	{
		id: 'md-30',
		date: new Date('2026-04-05T20:00:00'),
		opponent: 'Real Madrid',
		homeTeam: 'Home Club',
		season: '2025/26',
		competition: 'La Liga'
	},
	{
		id: 'md-31',
		date: new Date('2026-04-12T15:00:00'),
		opponent: 'Liverpool FC',
		homeTeam: 'Home Club',
		season: '2025/26',
		competition: 'Premier League'
	},
	{
		id: 'md-32',
		date: new Date('2026-04-19T18:30:00'),
		opponent: 'Manchester City',
		homeTeam: 'Home Club',
		season: '2025/26',
		competition: 'Premier League'
	},
	{
		id: 'md-33',
		date: new Date('2026-04-26T16:00:00'),
		opponent: 'Paris Saint-Germain',
		homeTeam: 'Home Club',
		season: '2025/26',
		competition: 'UEFA Champions League'
	},
	{
		id: 'md-34',
		date: new Date('2026-05-03T20:00:00'),
		opponent: 'Juventus',
		homeTeam: 'Home Club',
		season: '2025/26',
		competition: 'Serie A'
	},

	// Season 2026/27 (Future season - scheduled)
	{
		id: 'md-35',
		date: new Date('2026-08-15T15:00:00'),
		opponent: 'Tottenham Hotspur',
		homeTeam: 'Home Club',
		season: '2026/27',
		competition: 'Premier League'
	},
	{
		id: 'md-36',
		date: new Date('2026-08-22T18:30:00'),
		opponent: 'Sevilla FC',
		homeTeam: 'Home Club',
		season: '2026/27',
		competition: 'La Liga'
	},
	{
		id: 'md-37',
		date: new Date('2026-09-05T20:00:00'),
		opponent: 'RB Leipzig',
		homeTeam: 'Home Club',
		season: '2026/27',
		competition: 'Bundesliga'
	},
	{
		id: 'md-38',
		date: new Date('2026-09-12T15:00:00'),
		opponent: 'Napoli',
		homeTeam: 'Home Club',
		season: '2026/27',
		competition: 'Serie A'
	},
	{
		id: 'md-39',
		date: new Date('2026-09-19T18:30:00'),
		opponent: 'Manchester United',
		homeTeam: 'Home Club',
		season: '2026/27',
		competition: 'Premier League'
	}
];

// =============================================================================
// GENERATED TICKET ALLOCATIONS
// =============================================================================

/**
 * Seeded random number generator for consistent data generation
 * Uses a simple Linear Congruential Generator (LCG) algorithm
 */
class SeededRandom {
	private seed: number;

	constructor(seed: number) {
		this.seed = seed;
	}

	/**
	 * Generate a random number between 0 and 1
	 */
	random(): number {
		this.seed = (this.seed * 9301 + 49297) % 233280;
		return this.seed / 233280;
	}

	/**
	 * Generate a random integer between min (inclusive) and max (inclusive)
	 */
	randomInt(min: number, max: number): number {
		return Math.floor(this.random() * (max - min + 1)) + min;
	}
}

/**
 * Generate realistic ticket allocations
 *
 * Logic:
 * - Not all sponsors have tickets in all sections
 * - Ticket counts vary widely based on sponsor tier (premium, standard, minimal)
 * - Access levels match section type (VIP gets VIP access, etc.)
 * - Seat numbers are generated sequentially
 * - Gates are assigned randomly (but deterministically with seed)
 */
function generateTicketAllocations(): TicketAllocation[] {
	const allocations: TicketAllocation[] = [];
	const gates = ['A', 'B', 'C', 'D', 'E'];
	const rng = new SeededRandom(12345); // Fixed seed for consistent results

	// Define sponsor tiers for variety
	type SponsorTier = 'premium' | 'standard' | 'minimal';
	const sponsorTiers: Record<string, SponsorTier> = {
		munro: 'premium', // Gets many tickets
		techcorp: 'premium', // Gets many tickets
		brewco: 'standard', // Gets moderate tickets
		automax: 'standard', // Gets moderate tickets
		finserve: 'minimal', // Gets few tickets
		sportgear: 'minimal' // Gets few tickets
	};

	for (const section of stadiumSections) {
		// Determine which sponsors have tickets in this section
		// VIP sections: 2-3 sponsors, Others: 3-5 sponsors
		const sponsorCount =
			section.type === 'vip'
				? rng.randomInt(2, 3) // 2-3
				: rng.randomInt(3, 5); // 3-5

		const sponsorsInSection = sponsors.slice(0, sponsorCount);

		for (const sponsor of sponsorsInSection) {
			const sponsorTier = sponsorTiers[sponsor.id] || 'standard';

			for (const matchday of matchdays) {
				// Determine base ticket range by section type
				let minTickets: number;
				let maxTickets: number;

				switch (section.type) {
					case 'vip':
						minTickets = 3;
						maxTickets = 15;
						break;
					case 'business':
					case 'premium':
						minTickets = 5;
						maxTickets = 40;
						break;
					default:
						minTickets = 3;
						maxTickets = 25;
				}

				// Adjust range based on sponsor tier for more variety
				let ticketCount: number;
				switch (sponsorTier) {
					case 'premium':
						// Premium sponsors: 60-100% of max range
						ticketCount = rng.randomInt(Math.floor(maxTickets * 0.6), Math.floor(maxTickets * 1.0));
						break;
					case 'standard':
						// Standard sponsors: 30-60% of max range
						ticketCount = rng.randomInt(Math.floor(maxTickets * 0.3), Math.floor(maxTickets * 0.6));
						break;
					case 'minimal':
						// Minimal sponsors: 10-30% of max range
						ticketCount = rng.randomInt(Math.floor(maxTickets * 0.1), Math.floor(maxTickets * 0.3));
						break;
				}

				// Ensure we don't exceed section capacity
				ticketCount = Math.min(ticketCount, Math.floor(section.capacity * 0.4));
				ticketCount = Math.max(ticketCount, minTickets);

				// Generate seat numbers
				const seatStart = rng.randomInt(0, section.capacity - ticketCount - 1);
				const sectionPrefix = section.name.split(' ')[0][0]; // First letter of section name
				const seatNumbers = Array.from(
					{ length: ticketCount },
					(_, i) => `${sectionPrefix}${seatStart + i + 1}`
				);

				// Determine access level based on section type
				let accessLevel: TicketAllocation['accessLevel'];
				switch (section.type) {
					case 'vip':
						accessLevel = 'VIP';
						break;
					case 'premium':
						accessLevel = 'Premium';
						break;
					case 'business':
						accessLevel = 'Business';
						break;
					default:
						accessLevel = 'Standard';
				}

				allocations.push({
					sponsorId: sponsor.id,
					sectionId: section.id,
					matchdayId: matchday.id,
					ticketCount,
					seatNumbers,
					accessLevel,
					gate: gates[rng.randomInt(0, gates.length - 1)]
				});
			}
		}
	}

	return allocations;
}

/**
 * All ticket allocations (generated once)
 */
export const ticketAllocations = generateTicketAllocations();

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get ticket overview data grouped by stadium section
 *
 * This is the main data structure for the overview screen.
 * Returns an array of sections, each containing sponsors and their ticket summaries.
 *
 * @param season - Optional season filter (e.g., "2025/26")
 * @param sectionTypes - Optional section type filters (e.g., ["vip", "business"])
 * @returns Array of section overviews with sponsor summaries
 */
export function getSectionTicketOverview(
	season?: string,
	sectionTypes?: string[] | null
): SectionTicketOverview[] {
	// Filter matchdays by season if provided
	const seasonMatchdays = season ? matchdays.filter((m) => m.season === season) : matchdays;
	const seasonMatchdayIds = new Set(seasonMatchdays.map((m) => m.id));

	// Filter sections by types if provided
	const filteredSections =
		sectionTypes && sectionTypes.length > 0
			? stadiumSections.filter((s) => sectionTypes.includes(s.type))
			: stadiumSections;

	return filteredSections.map((section) => {
		// Get all allocations for this section and season
		const sectionAllocations = ticketAllocations.filter(
			(a) => a.sectionId === section.id && seasonMatchdayIds.has(a.matchdayId)
		);

		// Group allocations by sponsor
		const sponsorMap = new Map<string, SponsorTicketSummary>();

		for (const allocation of sectionAllocations) {
			const sponsor = sponsors.find((s) => s.id === allocation.sponsorId);
			if (!sponsor) continue;

			// Initialize sponsor summary if not exists
			if (!sponsorMap.has(sponsor.id)) {
				sponsorMap.set(sponsor.id, {
					sponsor,
					totalSeasonTickets: 0,
					matchdayAllocations: []
				});
			}

			const summary = sponsorMap.get(sponsor.id)!;

			// Add to total
			summary.totalSeasonTickets += allocation.ticketCount;

			// Add matchday allocation
			const matchday = matchdays.find((m) => m.id === allocation.matchdayId);
			if (matchday) {
				summary.matchdayAllocations.push({
					matchday,
					ticketCount: allocation.ticketCount
				});
			}
		}

		return {
			section,
			sponsors: Array.from(sponsorMap.values()),
			isExpanded: false // Initially collapsed
		};
	});
}

/**
 * Get detailed data for a specific section and matchday
 *
 * This is used for the detail modal/screen.
 * Shows all sponsor allocations for the selected section + matchday.
 *
 * @param sectionId - ID of the stadium section
 * @param matchdayId - ID of the matchday
 * @returns Detail data or null if not found
 */
export function getMatchdayDetailData(
	sectionId: string,
	matchdayId: string
): MatchdayDetailData | null {
	const section = stadiumSections.find((s) => s.id === sectionId);
	const matchday = matchdays.find((m) => m.id === matchdayId);

	if (!section || !matchday) {
		return null;
	}

	// Get all allocations for this section + matchday
	const allocations = ticketAllocations.filter(
		(a) => a.sectionId === sectionId && a.matchdayId === matchdayId
	);

	return {
		section,
		matchday,
		sponsorAllocations: allocations.map((allocation) => {
			const sponsor = sponsors.find((s) => s.id === allocation.sponsorId);
			return {
				sponsor: sponsor!,
				tickets: allocation
			};
		})
	};
}

/**
 * Get all upcoming matchdays (next N matches)
 *
 * @param count - Number of matches to return (default: 5)
 * @param season - Optional season filter (e.g., "2025/26")
 * @returns Array of upcoming matchdays
 */
export function getUpcomingMatchdays(count: number = 5, season?: string): Matchday[] {
	const now = new Date();
	const filtered = season
		? matchdays.filter((m) => m.season === season)
		: matchdays.filter((m) => m.date >= now);

	return filtered.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, count);
}

/**
 * Get sponsor by ID
 *
 * @param sponsorId - ID of the sponsor
 * @returns Sponsor or undefined
 */
export function getSponsorById(sponsorId: string): Sponsor | undefined {
	return sponsors.find((s) => s.id === sponsorId);
}

/**
 * Get section by ID
 *
 * @param sectionId - ID of the section
 * @returns Section or undefined
 */
export function getSectionById(sectionId: string): StadiumSection | undefined {
	return stadiumSections.find((s) => s.id === sectionId);
}

/**
 * Get matchday by ID
 *
 * @param matchdayId - ID of the matchday
 * @returns Matchday or undefined
 */
export function getMatchdayById(matchdayId: string): Matchday | undefined {
	return matchdays.find((m) => m.id === matchdayId);
}

export interface SeasonOption {
	label: string; // Display format: "2025/26"
	value: string | null; // URL-friendly format: "2025-26" or null for current
}

export interface SectionTypeOption {
	label: string; // Display format: "VIP", "Business", etc.
	value: string | null; // Section type or null for all
}

export type SectionType = 'vip' | 'business' | 'standard' | 'premium';

/**
 * Get the current season label based on the current date
 * Assumes football seasons run from August to May
 *
 * @returns Current season label (e.g., "2025/26")
 */
export function getCurrentSeasonLabel(): string {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1; // JavaScript months are 0-indexed

	// If we're in August (8) or later, the season is currentYear/nextYear
	// Otherwise, it's previousYear/currentYear
	return month >= 8
		? `${year}/${String(year + 1).slice(-2)}`
		: `${year - 1}/${String(year).slice(-2)}`;
}

/**
 * Convert season label to value format
 * @param label Season in "2025/26" format
 * @returns Season in "2025-26" format
 */
export function seasonLabelToValue(label: string): string {
	return label.replace('/', '-');
}

/**
 * Convert season value to label format
 * @param value Season in "2025-26" format or null for current season
 * @returns Season in "2025/26" format
 */
export function seasonValueToLabel(value: string | null): string {
	if (value === null) {
		return getCurrentSeasonLabel();
	}
	return value.replace('-', '/');
}

/**
 * Get all unique seasons as option objects
 *
 * @returns Array of season option objects with label and value
 * The current season will have value: null (no search param)
 */
export function getAllSeasons(): SeasonOption[] {
	const seasonLabels = new Set(matchdays.map((m) => m.season));
	const sortedLabels = Array.from(seasonLabels).sort().reverse(); // Most recent first
	const currentSeasonLabel = getCurrentSeasonLabel();

	return sortedLabels.map((label) => ({
		label,
		// Current season has null value (no search param needed)
		value: label === currentSeasonLabel ? null : seasonLabelToValue(label)
	}));
}

/**
 * Get all section type options
 *
 * @returns Array of section type option objects with label and value
 */
export function getAllSectionTypes(): SectionTypeOption[] {
	return [
		{ label: 'VIP', value: 'vip' },
		{ label: 'Business', value: 'business' },
		{ label: 'Premium', value: 'premium' },
		{ label: 'Standard', value: 'standard' }
	];
}

/**
 * Get the current season based on the current date
 * Assumes football seasons run from August to May
 *
 * @returns Current season value (null, representing "Current Season")
 */
export function getCurrentSeason(): null {
	return null;
}

// =============================================================================
// STATISTICS (optional - for future enhancements)
// =============================================================================

/**
 * Get total tickets across all sections for a sponsor
 */
export function getTotalTicketsForSponsor(sponsorId: string): number {
	return ticketAllocations
		.filter((a) => a.sponsorId === sponsorId)
		.reduce((sum, a) => sum + a.ticketCount, 0);
}

/**
 * Get total tickets for a specific matchday
 */
export function getTotalTicketsForMatchday(matchdayId: string): number {
	return ticketAllocations
		.filter((a) => a.matchdayId === matchdayId)
		.reduce((sum, a) => sum + a.ticketCount, 0);
}

/**
 * Get total tickets for a specific section
 */
export function getTotalTicketsForSection(sectionId: string): number {
	return ticketAllocations
		.filter((a) => a.sectionId === sectionId)
		.reduce((sum, a) => sum + a.ticketCount, 0);
}
