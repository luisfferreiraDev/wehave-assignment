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
 * Generate realistic ticket allocations
 *
 * Logic:
 * - Not all sponsors have tickets in all sections
 * - Ticket counts vary widely based on sponsor tier (premium, standard, minimal)
 * - Access levels match section type (VIP gets VIP access, etc.)
 * - Seat numbers are generated sequentially
 * - Gates are assigned randomly
 */
function generateTicketAllocations(): TicketAllocation[] {
	const allocations: TicketAllocation[] = [];
	const gates = ['A', 'B', 'C', 'D', 'E'];

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
				? Math.floor(Math.random() * 2) + 2 // 2-3
				: Math.floor(Math.random() * 3) + 3; // 3-5

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
						ticketCount =
							Math.floor(Math.random() * (maxTickets * 0.4)) + Math.floor(maxTickets * 0.6);
						break;
					case 'standard':
						// Standard sponsors: 30-60% of max range
						ticketCount =
							Math.floor(Math.random() * (maxTickets * 0.3)) + Math.floor(maxTickets * 0.3);
						break;
					case 'minimal':
						// Minimal sponsors: 10-30% of max range
						ticketCount =
							Math.floor(Math.random() * (maxTickets * 0.2)) + Math.floor(maxTickets * 0.1);
						break;
				}

				// Ensure we don't exceed section capacity
				ticketCount = Math.min(ticketCount, Math.floor(section.capacity * 0.4));
				ticketCount = Math.max(ticketCount, minTickets);

				// Generate seat numbers
				const seatStart = Math.floor(Math.random() * (section.capacity - ticketCount));
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
					gate: gates[Math.floor(Math.random() * gates.length)]
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
 * @returns Array of section overviews with sponsor summaries
 */
export function getSectionTicketOverview(season?: string): SectionTicketOverview[] {
	// Filter matchdays by season if provided
	const seasonMatchdays = season ? matchdays.filter((m) => m.season === season) : matchdays;
	const seasonMatchdayIds = new Set(seasonMatchdays.map((m) => m.id));

	return stadiumSections.map((section) => {
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

/**
 * Get all unique seasons
 *
 * @returns Array of unique season strings
 */
export function getAllSeasons(): string[] {
	const seasons = new Set(matchdays.map((m) => m.season));
	return Array.from(seasons).sort().reverse(); // Most recent first
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
