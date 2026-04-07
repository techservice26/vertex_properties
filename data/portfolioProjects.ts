export type PortfolioProject = {
	slug: string;
	image: string;
	tag: string;
	date: string;
	title: string;
	description: string;
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
	{
		slug: 'kitchen-bathroom-remodel-staten-island',
		image:
			'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=900&auto=format&fit=crop',
		tag: 'Bathroom Remodeling',
		date: 'February 2, 2023',
		title: 'Kitchen and Bathroom Remodel in Staten Island.',
		description:
			'From drab to fab, see how we turned a dated kitchen and bathroom into modern masterpieces.',
	},
	{
		slug: 'basement-bathroom-renovation-staten-island',
		image:
			'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=900&auto=format&fit=crop',
		tag: 'Kitchen Projects',
		date: 'September 15, 2024',
		title: 'Basement Bathroom Renovation in Staten Island.',
		description:
			"From drab to fab, check out the basement bathroom revamp that's wowing the neighborhood.",
	},
	{
		slug: 'bathroom-plumbing-service-staten-island',
		image:
			'https://images.unsplash.com/photo-1585704032915-cbd0c7dfef36?q=80&w=900&auto=format&fit=crop',
		tag: 'Plumbing',
		date: 'April 1, 2025',
		title: 'Bathroom Plumbing Service in Staten Island.',
		description:
			'Discover how a complete bathroom plumbing service can rejuvenate your space and prevent potential water damage.',
	},
	{
		slug: 'bathroom-kitchen-renovation-staten-island',
		image:
			'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=900&auto=format&fit=crop',
		tag: 'Painting',
		date: 'March 28, 2025',
		title: 'Bathroom And Kitchen Renovation in Staten Island.',
		description:
			'We transformed an outdated property into a comfortable, stylish haven through coordinated bathroom and kitchen upgrades.',
	},
	{
		slug: 'deck-refinish-rail-replacement-queens',
		image:
			'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop',
		tag: 'Outdoor / Deck',
		date: 'June 10, 2025',
		title: 'Deck Refinish & Rail Replacement in Queens.',
		description:
			'Surface prep, stain, and new railings for a safer, weather-ready outdoor space for residents.',
	},
	{
		slug: 'lot-clearing-tree-trimming-commercial',
		image:
			'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=900&auto=format&fit=crop',
		tag: 'Tree Trimming',
		date: 'August 3, 2025',
		title: 'Lot Clearing & Tree Trimming — Commercial Site.',
		description:
			'Controlled trimming and debris removal to improve sight lines and reduce liability near parking lots.',
	},
];

export function getPortfolioProjectBySlug(slug: string): PortfolioProject | undefined {
	return PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
}
