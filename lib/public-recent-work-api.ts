import { getApiBaseUrl } from '@/lib/api-client';
import { sortRecentWorks } from '@/lib/recent-work-utils';
import type { RecentWork } from '@/types/recent-work';

async function fetchRecentWorksFromApi() {
	const response = await fetch(`${getApiBaseUrl()}/recent-work/`, {
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to load recent works.');
	}

	const works = (await response.json()) as RecentWork[];
	return sortRecentWorks(works);
}

export async function fetchPublicRecentWorks() {
	return fetchRecentWorksFromApi();
}

export async function fetchClientRecentWorks() {
	return fetchRecentWorksFromApi();
}

export async function fetchClientRecentWork(id: number) {
	const response = await fetch(`${getApiBaseUrl()}/recent-work/${id}/`, {
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to load project.');
	}

	return response.json() as Promise<RecentWork>;
}
