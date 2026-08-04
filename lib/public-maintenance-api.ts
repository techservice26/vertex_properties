import { getApiBaseUrl } from '@/lib/api-client';
import type { MaintenanceTutorial } from '@/types/maintenance';

type FetchPublicMaintenanceOptions = {
	showOnHomepage?: boolean;
};

export async function fetchPublicMaintenanceTutorials(
	options: FetchPublicMaintenanceOptions = {},
) {
	const params = new URLSearchParams();

	if (options.showOnHomepage) {
		params.set('show_on_homepage', 'true');
	}

	const query = params.toString();
	const response = await fetch(
		`${getApiBaseUrl()}/tutorials/${query ? `?${query}` : ''}`,
		{
			next: { revalidate: 60 },
		},
	);

	if (!response.ok) {
		throw new Error('Failed to load maintenance tutorials.');
	}

	return response.json() as Promise<MaintenanceTutorial[]>;
}
