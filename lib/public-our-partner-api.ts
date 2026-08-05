import { getApiBaseUrl } from '@/lib/api-client';
import { sortOurPartners } from '@/lib/our-partner-utils';
import type { OurPartner } from '@/types/our-partner';

async function fetchOurPartnersFromApi() {
	const response = await fetch(`${getApiBaseUrl()}/partners/`, {
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to load property management partners.');
	}

	const partners = (await response.json()) as OurPartner[];
	return sortOurPartners(partners);
}

export async function fetchClientOurPartners() {
	return fetchOurPartnersFromApi();
}
