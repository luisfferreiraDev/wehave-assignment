import {
	getAllSeasons,
	getCurrentSeason,
	getSectionTicketOverview,
	getUpcomingMatchdays,
	seasonValueToLabel
} from '$lib/data/mockTickets';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const seasons = getAllSeasons();
	const currentSeason = getCurrentSeason();

	const seasonParam = url.searchParams.get('season');
	const seasonValue = seasonParam === null || seasonParam === '' ? null : seasonParam;

	const seasonLabel = seasonValueToLabel(seasonValue);

	const sectionOverviews = getSectionTicketOverview(seasonLabel);
	const upcomingMatches = getUpcomingMatchdays(5, seasonLabel);

	return {
		seasons,
		currentSeason,
		seasonValue,
		sectionOverviews,
		upcomingMatches
	};
};
