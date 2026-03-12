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
				icon: 'ticket',
				disabled: true
			},
			{
				id: 'stadiums',
				label: 'Stadiums',
				path: '/',
				icon: 'ticket',
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
				icon: 'ticket',
				disabled: true
			},
			{
				id: 'transportation',
				label: 'Transportation',
				path: '/',
				icon: 'ticket',
				disabled: true
			}
		]
	}
];
