import { US_STATES } from '@/data/usStates';

export type OpenJob = {
	id: string;
	title: string;
	location: string;
	state: string;
	city: string;
};

const TITLE_VARIANTS = [
	'Residential & Commercial Property Maintenance Technician',
	'All Appliances Repair Service Technician',
	'HVAC Service & Light Commercial Maintenance Tech',
	'Plumbing Service Technician – Multi-Site',
	'Electrical Troubleshooting & Minor Install Tech',
	'Carpentry & Drywall Repair Specialist',
	'Painter – Interior / Exterior Turnovers',
	'General Handyman – Property Preservation',
] as const;

function pickState(index: number): string {
	return US_STATES[index % US_STATES.length];
}

function pickCity(index: number): string {
	const cities = [
		'New York',
		'Los Angeles',
		'Chicago',
		'Houston',
		'Philadelphia',
		'Phoenix',
		'San Antonio',
		'San Diego',
	];
	return cities[index % cities.length];
}

/** Stable demo list: 46 roles. */
export const OPEN_JOBS: OpenJob[] = Array.from({ length: 46 }, (_, i) => {
	const state = pickState(i * 3);
	const city = pickCity(i * 5);
	return {
		id: String(i + 1),
		title: TITLE_VARIANTS[i % TITLE_VARIANTS.length],
		location: 'United States / USA',
		state,
		city,
	};
});

export const OPEN_JOBS_UNIQUE_STATES = Array.from(
	new Set(OPEN_JOBS.map((j) => j.state)),
).sort((a, b) => a.localeCompare(b));
