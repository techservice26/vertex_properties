import { apiFetch } from '@/lib/api-client';
import type { ContactMessage } from '@/types/contact-message';

const CONTACT_MESSAGES_PATH = '/contact-messages/';

export async function fetchContactMessages() {
	return apiFetch<ContactMessage[]>(CONTACT_MESSAGES_PATH);
}

export async function fetchContactMessage(id: number) {
	return apiFetch<ContactMessage>(`${CONTACT_MESSAGES_PATH}${id}/`);
}

export async function deleteContactMessage(id: number) {
	return apiFetch<void>(`${CONTACT_MESSAGES_PATH}${id}/`, {
		method: 'DELETE',
	});
}
