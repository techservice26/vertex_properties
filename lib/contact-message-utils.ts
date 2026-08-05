import { formatBlogDate } from '@/lib/blog-utils';
import { resolveMediaUrl } from '@/lib/media-url';
import type { ContactMessage } from '@/types/contact-message';

export function getContactMessageFullName(message: ContactMessage) {
	return `${message.first_name} ${message.last_name}`.trim();
}

export function formatContactMessageDate(value: string) {
	return formatBlogDate(value);
}

export function getContactMessageAttachmentUrl(message: ContactMessage) {
	if (!message.attachment) {
		return '';
	}

	return resolveMediaUrl(message.attachment);
}

export function getContactMessageAttachmentName(message: ContactMessage) {
	if (!message.attachment) {
		return '';
	}

	const url = message.attachment.split('?')[0];
	const segments = url.split('/');
	return decodeURIComponent(segments[segments.length - 1] || 'attachment');
}

export function isContactMessageImageAttachment(message: ContactMessage) {
	const attachment = message.attachment?.toLowerCase() ?? '';

	return /\.(jpg|jpeg|png|gif|webp)(\?|$)/i.test(attachment);
}

export function isContactMessagePdfAttachment(message: ContactMessage) {
	const attachment = message.attachment?.toLowerCase() ?? '';

	return /\.pdf(\?|$)/i.test(attachment);
}

export function sortContactMessages(messages: ContactMessage[]) {
	return [...messages].sort((a, b) => b.id - a.id);
}
