export type StaticRecentWork = {
	id: number;
	project_title: string;
	done_date: string;
	description: string;
	imageSrc: string;
};

export const RECENT_WORKS: StaticRecentWork[] = [
	{
		id: 1,
		project_title: 'Kitchen and Bathroom Remodel in Staten Island',
		done_date: '2023-02-02',
		description:
			'From drab to fab, see how we turned a dated kitchen and bathroom into modern masterpieces.',
		imageSrc:
			'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80',
	},
	{
		id: 2,
		project_title: 'Basement Bathroom Renovation in Staten Island',
		done_date: '2024-09-15',
		description:
			'A full basement bathroom revamp with updated fixtures, tile work, and improved ventilation.',
		imageSrc:
			'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=900&q=80',
	},
	{
		id: 3,
		project_title: 'Bathroom Plumbing Service in Staten Island',
		done_date: '2025-04-01',
		description:
			'Professional plumbing repairs and fixture upgrades to restore reliable daily use.',
		imageSrc:
			'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=80',
	},
	{
		id: 4,
		project_title: 'Outdoor Deck and Patio Refresh in Brooklyn',
		done_date: '2025-06-18',
		description:
			'Structural repairs, surface refinishing, and layout improvements for outdoor living.',
		imageSrc:
			'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
	},
	{
		id: 5,
		project_title: 'Multi-Unit HVAC Maintenance in Queens',
		done_date: '2025-07-10',
		description:
			'Seasonal HVAC servicing across multiple units to improve efficiency and comfort.',
		imageSrc:
			'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
	},
];
