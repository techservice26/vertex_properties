export const VIDEO_CATEGORIES = [
	{ slug: 'all', label: 'All Videos' },
	{ slug: 'about-vertex', label: 'About Vertex' },
	{ slug: 'home-repair', label: 'Home Repair Tips' },
	{ slug: 'plumbing', label: 'Plumbing Projects' },
	{ slug: 'electrical', label: 'Electrical DIY' },
	{ slug: 'painting', label: 'Painting Projects' },
	{ slug: 'installation', label: 'Installation Guides' },
	{ slug: 'kitchen', label: 'Kitchen Projects' },
	{ slug: 'before-after', label: 'Before & After Projects' },
	{ slug: 'bathroom', label: 'Bathroom Projects' },
	{ slug: 'outdoor', label: 'Outdoor Projects' },
	{ slug: 'maintenance', label: 'Maintenance Tips' },
	{ slug: 'tools', label: 'Tools & Equipment' },
	{ slug: 'quick-fix', label: 'Quick Fix Tutorials' },
	{ slug: 'how-to', label: 'How To Guides' },
	{ slug: 'cleaning', label: 'Cleaning & Care' },
	{ slug: 'diy', label: 'DIY Projects' },
	{ slug: 'safety', label: 'Safety Tips' },
] as const;

export type VideoCategorySlug = (typeof VIDEO_CATEGORIES)[number]['slug'];

export type VideoEntry = {
	id: string;
	title: string;
	categorySlug: Exclude<VideoCategorySlug, 'all'>;
	thumbnailSrc: string;
	href: string;
};

export const VIDEO_ENTRIES: VideoEntry[] = [
	{
		id: '1',
		categorySlug: 'plumbing',
		title: 'How to Install a Faucet | Workshop Tutorial',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1585704032919-ce89fadfdc8c?w=800&q=80',
		href: 'https://www.youtube.com/results?search_query=install+faucet',
	},
	{
		id: '2',
		categorySlug: 'electrical',
		title: 'Replacing a Light Switch Safely | Step-by-Step',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '3',
		categorySlug: 'painting',
		title: 'Interior Painting Prep for Rental Turns',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '4',
		categorySlug: 'kitchen',
		title: 'Cabinet Hardware Refresh in Under an Hour',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '5',
		categorySlug: 'bathroom',
		title: 'Caulking a Tub Surround the Right Way',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1552321554-5fefe1c9a5d7?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '6',
		categorySlug: 'outdoor',
		title: 'Deck Board Replacement and Fastening Tips',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '7',
		categorySlug: 'maintenance',
		title: 'Seasonal HVAC Filter Change Checklist',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1631545842228-4c95ff62b52d?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '8',
		categorySlug: 'about-vertex',
		title: 'Meet Vertex Property Services | Who We Are',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '9',
		categorySlug: 'installation',
		title: 'Mounting Shelves on Drywall Without Studs',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '10',
		categorySlug: 'safety',
		title: 'GFCI Testing and When to Call a Pro',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '11',
		categorySlug: 'diy',
		title: 'Drywall Patch and Texture Basics',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '12',
		categorySlug: 'how-to',
		title: 'Reading an Estimate | What Property Managers Should Know',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '13',
		categorySlug: 'home-repair',
		title: 'Fixing Squeaky Floors Without Removing Finish',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1513467535987-49cc0ad77cb8?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '14',
		categorySlug: 'before-after',
		title: 'Turnover Paint Refresh | Before & After Walkthrough',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1565182999561-18d7dc403d63?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '15',
		categorySlug: 'cleaning',
		title: 'Post-Construction Dust Control for Units',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1585421514738-01798e077b44?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '16',
		categorySlug: 'tools',
		title: 'Essential Tools for Property Maintenance Kits',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
	{
		id: '17',
		categorySlug: 'quick-fix',
		title: 'Stopping a Running Toilet in Five Minutes',
		thumbnailSrc:
			'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=800&q=80',
		href: 'https://www.youtube.com/',
	},
];
