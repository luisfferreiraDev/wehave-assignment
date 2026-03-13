import { getAllSeasons } from '$lib/data/mockTickets';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const seasons = getAllSeasons();

	return {
		seasons
	};
};
