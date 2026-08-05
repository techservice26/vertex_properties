import { getApiBaseUrl } from '@/lib/api-client';
import type { ContactMessage, ContactMessageInput } from '@/types/contact-message';

export async function submitContactMessage(input: ContactMessageInput) {
	const formData = new FormData();
	formData.append('first_name', input.first_name.trim());
	formData.append('last_name', input.last_name.trim());
	formData.append('email', input.email.trim());
	formData.append('phone', input.phone.trim());
	formData.append('address', input.address.trim());
	formData.append('city', input.city.trim());
	formData.append('description', input.description.trim());

	if (input.attachment) {
		formData.append('attachment', input.attachment);
	}

	const response = await fetch(`${getApiBaseUrl()}/contact-messages/`, {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		let message = 'Failed to submit contact message.';

		try {
			const data = await response.json();
			message =
				typeof data?.detail === 'string'
					? data.detail
					: JSON.stringify(data);
		} catch {
			message = response.statusText || message;
		}

		throw new Error(message);
	}

	return response.json() as Promise<ContactMessage>;
}
