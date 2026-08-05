import { getApiBaseUrl } from '@/lib/api-client';
import type { Testimonial } from '@/types/testimonial';

function sortTestimonials(testimonials: Testimonial[]) {
	return [...testimonials].sort((a, b) => {
		if (a.display_order !== b.display_order) {
			return a.display_order - b.display_order;
		}

		return b.id - a.id;
	});
}

async function fetchTestimonialsFromApi() {
	const response = await fetch(`${getApiBaseUrl()}/testimonial/`, {
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to load testimonials.');
	}

	const testimonials = (await response.json()) as Testimonial[];
	return sortTestimonials(testimonials);
}

export async function fetchPublicTestimonials() {
	return fetchTestimonialsFromApi();
}

export async function fetchClientTestimonials() {
	return fetchTestimonialsFromApi();
}
