export type NewsArticle = {
	id: string;
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	imageSrc: string;
};

export const NEWS_ARTICLES: NewsArticle[] = [
	{
		id: '1',
		slug: 'smart-home-repair-solutions',
		title: 'Smart Home Repair Solutions For Modern Living',
		date: 'March 28, 2025',
		excerpt:
			'Professional home maintenance solutions designed to improve comfort, safety, and long-term value.',
		imageSrc:
			'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
	},
	{
		id: '2',
		slug: 'advanced-plumbing-repairs',
		title: 'Advanced Plumbing Repairs Engineered to Last',
		date: 'February 2, 2026',
		excerpt:
			'Professional plumbing services designed to ensure efficient flow, safety, and long-lasting system performance.',
		imageSrc:
			'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
	},
	{
		id: '3',
		slug: 'kitchen-cabinet-installation',
		title: 'Kitchen Cabinet Installation Crafted with Precision',
		date: 'September 15, 2025',
		excerpt:
			'Expert installation ensures perfectly aligned cabinets, smooth functionality, and a clean kitchen finish.',
		imageSrc:
			'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
	},
	{
		id: '4',
		slug: 'protecting-outdoor-space-fence',
		title: 'Protecting and Refreshing Your Outdoor Space',
		date: 'April 06, 2025',
		excerpt:
			'Professional fence painting services designed to restore appearance, protect wood surfaces, and improve long-lasting outdoor durability.',
		imageSrc:
			'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80',
	},
	{
		id: '5',
		slug: 'electrical-safety-upgrades',
		title: 'Electrical Safety Upgrades Every Property Manager Should Plan',
		date: 'January 10, 2026',
		excerpt:
			'From panel assessments to GFCI coverage, learn how proactive electrical work reduces risk and costly downtime.',
		imageSrc:
			'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
	},
	{
		id: '6',
		slug: 'hvac-filter-maintenance',
		title: 'HVAC Filter Schedules That Keep Systems Efficient',
		date: 'November 22, 2025',
		excerpt:
			'Simple maintenance routines that extend equipment life and keep residents comfortable year-round.',
		imageSrc:
			'https://images.unsplash.com/photo-1631545842228-4c95ff62b52d?w=800&q=80',
	},
	{
		id: '7',
		slug: 'turnover-paint-best-practices',
		title: 'Turnover Paint Best Practices for Multi-Family Units',
		date: 'August 08, 2025',
		excerpt:
			'How to balance speed, durability, and appearance between tenants without sacrificing quality.',
		imageSrc:
			'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80',
	},
	{
		id: '8',
		slug: 'water-damage-response',
		title: 'Fast Water Damage Response: What to Do First',
		date: 'July 19, 2025',
		excerpt:
			'Containing moisture quickly limits mold risk and repair scope—here is a practical checklist.',
		imageSrc:
			'https://images.unsplash.com/photo-1585704032919-ce89fadfdc8c?w=800&q=80',
	},
	{
		id: '9',
		slug: 'deck-inspection-seasonal',
		title: 'Seasonal Deck Inspection for Safe Common Areas',
		date: 'May 30, 2025',
		excerpt:
			'Rails, fasteners, and surfacing wear patterns to watch before peak outdoor season.',
		imageSrc:
			'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
	},
	{
		id: '10',
		slug: 'drywall-repair-matching-texture',
		title: 'Drywall Repair and Texture Matching After Service Calls',
		date: 'April 14, 2025',
		excerpt:
			'Techniques that help patches disappear so walls stay camera-ready for listings.',
		imageSrc:
			'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
	},
	{
		id: '11',
		slug: 'bathroom-caulk-refresh',
		title: 'When to Refresh Caulk in High-Traffic Bathrooms',
		date: 'March 03, 2025',
		excerpt:
			'Spotting early failure signs prevents grout damage and costly secondary repairs.',
		imageSrc:
			'https://images.unsplash.com/photo-1552321554-5fefe1c9a5d7?w=800&q=80',
	},
	{
		id: '12',
		slug: 'winterization-checklist',
		title: 'Winterization Checklist for Northern Climate Portfolios',
		date: 'December 01, 2025',
		excerpt:
			'Freeze protection, hose bibs, and insulation touches that reduce emergency calls.',
		imageSrc:
			'https://images.unsplash.com/photo-1513467535987-49cc0ad77cb8?w=800&q=80',
	},
	{
		id: '13',
		slug: 'certified-technicians-matter',
		title: 'Why Licensed Technicians Matter for Insurance Compliance',
		date: 'October 05, 2025',
		excerpt:
			'Documentation, permits, and workmanship standards that satisfy carriers and owners.',
		imageSrc:
			'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80',
	},
	{
		id: '14',
		slug: 'smart-locks-access',
		title: 'Smart Lock Installations Without Voiding Warranties',
		date: 'September 01, 2025',
		excerpt:
			'Mounting, strike alignment, and power options for reliable access control.',
		imageSrc:
			'https://images.unsplash.com/photo-1558002032-6914bcada0d0?w=800&q=80',
	},
	{
		id: '15',
		slug: 'roof-leak-triage',
		title: 'Roof Leak Triage Before the Crew Arrives',
		date: 'June 18, 2025',
		excerpt:
			'Interior containment steps that protect ceilings and flooring on busy schedules.',
		imageSrc:
			'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&q=80',
	},
	{
		id: '16',
		slug: 'flooring-scratch-repair',
		title: 'Hardwood and LVP Scratch Repair for Quick Turns',
		date: 'February 28, 2026',
		excerpt:
			'Blending finishes so minor wear does not turn into full-room replacements.',
		imageSrc:
			'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=800&q=80',
	},
	{
		id: '17',
		slug: 'exterior-pressure-washing',
		title: 'Exterior Pressure Washing Without Damaging Siding',
		date: 'July 07, 2025',
		excerpt:
			'PSI, nozzle choice, and detergent timing for vinyl, brick, and composite surfaces.',
		imageSrc:
			'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
	},
	{
		id: '18',
		slug: 'work-order-photography',
		title: 'Work Order Photography That Speeds Approvals',
		date: 'August 27, 2025',
		excerpt:
			'Angles and captions that help home offices approve scopes on the first pass.',
		imageSrc:
			'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
	},
	{
		id: '19',
		slug: 'commercial-lighting-retrofits',
		title: 'Commercial Lighting Retrofits That Cut Energy Spend',
		date: 'January 20, 2026',
		excerpt:
			'LED swaps, controls, and incentive paperwork simplified for busy facilities.',
		imageSrc:
			'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
	},
	{
		id: '20',
		slug: 'tenant-maintenance-requests',
		title: 'Triaging Tenant Maintenance Requests at Scale',
		date: 'March 15, 2025',
		excerpt:
			'Prioritization tags that keep urgent plumbing and safety items at the top of the queue.',
		imageSrc:
			'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80',
	},
	{
		id: '21',
		slug: 'snow-removal-contracts',
		title: 'Snow Removal SLAs Your Properties Can Rely On',
		date: 'December 15, 2025',
		excerpt:
			'Trigger depths, de-icing scope, and documentation that reduce slip claims.',
		imageSrc:
			'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&q=80',
	},
	{
		id: '22',
		slug: 'mold-prevention-humidity',
		title: 'Mold Prevention Through Humidity and Ventilation',
		date: 'April 22, 2025',
		excerpt:
			'Bathroom fans, dryer vents, and minor envelope fixes that stop problems early.',
		imageSrc:
			'https://images.unsplash.com/photo-1585421514738-01798e077b44?w=800&q=80',
	},
	{
		id: '23',
		slug: 'garage-door-safety',
		title: 'Garage Door Spring and Sensor Safety Checks',
		date: 'May 11, 2025',
		excerpt:
			'When to test auto-reverse and why pros should handle high-tension hardware.',
		imageSrc:
			'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
	},
	{
		id: '24',
		slug: 'landscape-irrigation-starts',
		title: 'Spring Start-Up for Irrigation Systems',
		date: 'March 30, 2025',
		excerpt:
			'Pressure checks, head alignment, and leak sweeps before opening the main valve.',
		imageSrc:
			'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
	},
	{
		id: '25',
		slug: 'asbestos-awareness',
		title: 'Maintenance Triggers That Require Asbestos Awareness',
		date: 'November 08, 2025',
		excerpt:
			'Age-of-building cues and containment steps before cutting or demo work.',
		imageSrc:
			'https://images.unsplash.com/photo-1505765050516-f72dcac9d60e?w=800&q=80',
	},
	{
		id: '26',
		slug: 'resident-communication',
		title: 'Clear Resident Communication During Multi-Day Repairs',
		date: 'June 02, 2025',
		excerpt:
			'Notices, access windows, and noise expectations that reduce friction on site.',
		imageSrc:
			'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
	},
	{
		id: '27',
		slug: 'capital-planning-milestones',
		title: 'Capital Planning Milestones for Aging Building Envelopes',
		date: 'September 28, 2025',
		excerpt:
			'Roof, facade, and parking deck timelines that spread spend across fiscal years.',
		imageSrc:
			'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
	},
];
