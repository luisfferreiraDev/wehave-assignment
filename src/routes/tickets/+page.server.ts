import { getSectionTicketOverview, getUpcomingMatchdays } from '$lib/data/mockTickets';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const sectionOverviews = getSectionTicketOverview();
	const upcomingMatches = getUpcomingMatchdays(5);

	return {
		sectionOverviews,
		upcomingMatches
	};
};
