import {
	getAllSeasons,
	getCurrentSeason,
	getAllSectionTypes,
	getSectionTicketOverview,
	getUpcomingMatchdays,
	seasonValueToLabel
} from '$lib/data/mockTickets';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const seasons = getAllSeasons();
	const sectionTypes = getAllSectionTypes();
	const currentSeason = getCurrentSeason();

	const seasonParam = url.searchParams.get('season');
	const seasonValue = seasonParam === null || seasonParam === '' ? null : seasonParam;
	const seasonLabel = seasonValueToLabel(seasonValue);

	const sectionTypeParam = url.searchParams.get('sectionType');
	let sectionTypeValues: string[] = [];

	if (sectionTypeParam) {
		try {
			const parsed = JSON.parse(sectionTypeParam);
			sectionTypeValues = Array.isArray(parsed) ? parsed : [];
		} catch {
			sectionTypeValues = [sectionTypeParam];
		}
	}

	const searchQuery = url.searchParams.get('q');
	const searchValue = searchQuery && searchQuery.trim() !== '' ? searchQuery : null;

	const sectionOverviews = getSectionTicketOverview(
		seasonLabel,
		sectionTypeValues.length > 0 ? sectionTypeValues : null,
		searchValue
	);
	const upcomingMatches = getUpcomingMatchdays(20, seasonLabel);

	return {
		seasons,
		sectionTypes,
		currentSeason,
		seasonValue,
		sectionTypeValues,
		searchValue,
		sectionOverviews,
		upcomingMatches
	};
};
