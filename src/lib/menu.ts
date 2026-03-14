import paths from './paths';

export const menuItems = [
	{
		id: 'tickets',
		items: [
			{
				id: 'tickets',
				label: 'Tickets',
				path: paths.tickets.home(),
				icon: 'ticket'
			},
			{
				id: 'sponsors',
				label: 'Sponsors',
				path: '/',
				icon: 'users',
				disabled: true
			}
		]
	},
	{
		id: 'services',
		items: [
			{
				id: 'restaurants',
				label: 'Restaurants',
				path: '/',
				icon: 'utensils-crossed',
				disabled: true
			},
			{
				id: 'hotels',
				label: 'Hotels',
				path: '/',
				icon: 'hotel',
				disabled: true
			},
			{
				id: 'transportation',
				label: 'Transportation',
				path: '/',
				icon: 'van',
				disabled: true
			}
		]
	}
];
