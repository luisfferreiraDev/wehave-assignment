// Database Schema / TypeScript Interfaces for Ticketing System

/**
 * Represents a sponsor organization
 */
export interface Sponsor {
	id: string;
	name: string;
	logoUrl?: string; // Optional: for future enhancement
	contactEmail?: string; // Optional: for future enhancement
}

/**
 * Represents a matchday/game
 */
export interface Matchday {
	id: string;
	date: Date;
	opponent: string;
	homeTeam: string;
	season: string; // e.g., "2025/26"
	venue?: string; // Optional: stadium name
	competition?: string; // Optional: e.g., "Premier League", "Champions League"
}

/**
 * Represents a stadium section
 */
export interface StadiumSection {
	id: string;
	name: string;
	capacity: number;
	type?: 'vip' | 'business' | 'standard' | 'premium'; // Optional: section type
}

/**
 * Represents ticket allocation for a specific sponsor, section, and matchday
 */
export interface TicketAllocation {
	sponsorId: string;
	sectionId: string;
	matchdayId: string;
	ticketCount: number;

	// Detailed ticket information (for bonus detail screen)
	seatNumbers?: string[]; // e.g., ["A1", "A2", "A3"]
	accessLevel?: 'VIP' | 'Premium' | 'Business' | 'Standard';
	gate?: string; // e.g., "A", "B", "C"
	specialAccess?: string[]; // e.g., ["Lounge Access", "Parking"]
}

/**
 * Summary of tickets for a sponsor within a section
 * Includes total for season + breakdown by matchday
 */
export interface SponsorTicketSummary {
	sponsor: Sponsor;
	totalSeasonTickets: number;
	matchdayAllocations: {
		matchday: Matchday;
		ticketCount: number;
	}[];
}

/**
 * Overview data for a stadium section
 * Groups all sponsors and their tickets for that section
 */
export interface SectionTicketOverview {
	section: StadiumSection;
	sponsors: SponsorTicketSummary[];
	isExpanded?: boolean; // UI state for expand/collapse
}

/**
 * Detailed data for a specific section + matchday combination
 * Used in the detail modal/screen
 */
export interface MatchdayDetailData {
	section: StadiumSection;
	matchday: Matchday;
	sponsorAllocations: {
		sponsor: Sponsor;
		tickets: TicketAllocation;
	}[];
}

/**
 * Optional: Filter/Search state
 */
export interface TicketFilters {
	searchQuery?: string;
	selectedSections?: string[];
	selectedSponsors?: string[];
	dateRange?: {
		start: Date;
		end: Date;
	};
	accessLevel?: string[];
}
