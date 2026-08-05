import { apiFetch, apiFetchFormData } from '@/lib/api-client';
import type { OurPartner, OurPartnerInput } from '@/types/our-partner';

const OUR_PARTNERS_PATH = '/partners/';

export async function fetchOurPartners() {
	return apiFetch<OurPartner[]>(OUR_PARTNERS_PATH);
}

export async function createOurPartner(input: OurPartnerInput) {
	if (input.partner_logo) {
		return apiFetchFormData<OurPartner>(OUR_PARTNERS_PATH, {
			method: 'POST',
			body: buildFormData(input),
		});
	}

	return apiFetch<OurPartner>(OUR_PARTNERS_PATH, {
		method: 'POST',
		body: JSON.stringify({
			company_name: input.company_name.trim(),
		}),
	});
}

export async function updateOurPartner(id: number, input: OurPartnerInput) {
	if (input.partner_logo) {
		return apiFetchFormData<OurPartner>(`${OUR_PARTNERS_PATH}${id}/`, {
			method: 'PATCH',
			body: buildFormData(input),
		});
	}

	return apiFetch<OurPartner>(`${OUR_PARTNERS_PATH}${id}/`, {
		method: 'PATCH',
		body: JSON.stringify({
			company_name: input.company_name.trim(),
		}),
	});
}

export async function deleteOurPartner(id: number) {
	return apiFetch<void>(`${OUR_PARTNERS_PATH}${id}/`, {
		method: 'DELETE',
	});
}

function buildFormData(input: OurPartnerInput) {
	const formData = new FormData();
	formData.append('company_name', input.company_name.trim());

	if (input.partner_logo) {
		formData.append('partner_logo', input.partner_logo);
	}

	return formData;
}
