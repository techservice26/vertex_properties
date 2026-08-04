import { apiFetch, apiFetchFormData } from '@/lib/api-client';
import type { Testimonial, TestimonialInput } from '@/types/testimonial';

const TESTIMONIALS_PATH = '/testimonial/';

export async function fetchTestimonials() {
	return apiFetch<Testimonial[]>(TESTIMONIALS_PATH);
}

function buildJsonPayload(input: TestimonialInput) {
	return {
		client_name: input.client_name.trim(),
		designation: input.designation?.trim() || null,
		company_name: input.company_name?.trim() || null,
		testimonial_text: input.testimonial_text.trim(),
		service_quality: input.service_quality,
		communication: input.communication,
		professionalism: input.professionalism,
		punctuality: input.punctuality,
		value_for_money: input.value_for_money,
		is_featured: Boolean(input.is_featured),
		display_order: Number(input.display_order ?? 0),
	};
}

export async function createTestimonial(input: TestimonialInput) {
	if (input.client_image) {
		return apiFetchFormData<Testimonial>(TESTIMONIALS_PATH, {
			method: 'POST',
			body: buildFormData(input),
		});
	}

	return apiFetch<Testimonial>(TESTIMONIALS_PATH, {
		method: 'POST',
		body: JSON.stringify(buildJsonPayload(input)),
	});
}

export async function updateTestimonial(id: number, input: TestimonialInput) {
	if (input.client_image) {
		return apiFetchFormData<Testimonial>(`${TESTIMONIALS_PATH}${id}/`, {
			method: 'PATCH',
			body: buildFormData(input),
		});
	}

	return apiFetch<Testimonial>(`${TESTIMONIALS_PATH}${id}/`, {
		method: 'PATCH',
		body: JSON.stringify(buildJsonPayload(input)),
	});
}

export async function deleteTestimonial(id: number) {
	return apiFetch<void>(`${TESTIMONIALS_PATH}${id}/`, {
		method: 'DELETE',
	});
}

export async function toggleTestimonialFeatured(id: number, isFeatured: boolean) {
	return apiFetch<Testimonial>(`${TESTIMONIALS_PATH}${id}/`, {
		method: 'PATCH',
		body: JSON.stringify({ is_featured: isFeatured }),
	});
}

function buildFormData(input: TestimonialInput) {
	const formData = new FormData();
	formData.append('client_name', input.client_name.trim());
	formData.append('testimonial_text', input.testimonial_text.trim());
	formData.append('service_quality', String(input.service_quality));
	formData.append('communication', String(input.communication));
	formData.append('professionalism', String(input.professionalism));
	formData.append('punctuality', String(input.punctuality));
	formData.append('value_for_money', String(input.value_for_money));
	formData.append('is_featured', String(Boolean(input.is_featured)));
	formData.append('display_order', String(Number(input.display_order ?? 0)));

	if (input.designation?.trim()) {
		formData.append('designation', input.designation.trim());
	}

	if (input.company_name?.trim()) {
		formData.append('company_name', input.company_name.trim());
	}

	if (input.client_image) {
		formData.append('client_image', input.client_image);
	}

	return formData;
}
