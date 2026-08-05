import { getApiBaseUrl } from '@/lib/api-client';
import { sortPartnersNetwork } from '@/lib/partners-network-utils';
import type { PartnersNetworkPartner } from '@/types/partners-network';

async function fetchPartnersNetworkFromApi() {
	const response = await fetch(`${getApiBaseUrl()}/partners-network/`, {
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to load partners network.');
	}

	const partners = (await response.json()) as PartnersNetworkPartner[];
	return sortPartnersNetwork(partners);
}

export async function fetchClientPartnersNetwork() {
	return fetchPartnersNetworkFromApi();
}
