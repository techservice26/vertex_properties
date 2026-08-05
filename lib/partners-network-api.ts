import { apiFetch, apiFetchFormData } from '@/lib/api-client';
import type {
	PartnersNetworkPartner,
	PartnersNetworkPartnerInput,
} from '@/types/partners-network';

const PARTNERS_NETWORK_PATH = '/partners-network/';

export async function fetchPartnersNetwork() {
	return apiFetch<PartnersNetworkPartner[]>(PARTNERS_NETWORK_PATH);
}

export async function createPartnersNetworkPartner(
	input: PartnersNetworkPartnerInput,
) {
	if (input.partner_logo) {
		return apiFetchFormData<PartnersNetworkPartner>(PARTNERS_NETWORK_PATH, {
			method: 'POST',
			body: buildFormData(input),
		});
	}

	return apiFetch<PartnersNetworkPartner>(PARTNERS_NETWORK_PATH, {
		method: 'POST',
		body: JSON.stringify({
			company_name: input.company_name.trim(),
		}),
	});
}

export async function updatePartnersNetworkPartner(
	id: number,
	input: PartnersNetworkPartnerInput,
) {
	if (input.partner_logo) {
		return apiFetchFormData<PartnersNetworkPartner>(
			`${PARTNERS_NETWORK_PATH}${id}/`,
			{
				method: 'PATCH',
				body: buildFormData(input),
			},
		);
	}

	return apiFetch<PartnersNetworkPartner>(`${PARTNERS_NETWORK_PATH}${id}/`, {
		method: 'PATCH',
		body: JSON.stringify({
			company_name: input.company_name.trim(),
		}),
	});
}

export async function deletePartnersNetworkPartner(id: number) {
	return apiFetch<void>(`${PARTNERS_NETWORK_PATH}${id}/`, {
		method: 'DELETE',
	});
}

function buildFormData(input: PartnersNetworkPartnerInput) {
	const formData = new FormData();
	formData.append('company_name', input.company_name.trim());

	if (input.partner_logo) {
		formData.append('partner_logo', input.partner_logo);
	}

	return formData;
}
