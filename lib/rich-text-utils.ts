export function stripRichText(html: string) {
	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

export function isRichTextEmpty(html: string) {
	return stripRichText(html).length === 0;
}

export function getRichTextPlainText(html: string, maxLength?: number) {
	const plainText = stripRichText(html);

	if (maxLength != null && plainText.length > maxLength) {
		return `${plainText.slice(0, maxLength).trim()}…`;
	}

	return plainText;
}

export function normalizeRichTextContent(value: string | null | undefined) {
	if (!value?.trim()) {
		return '';
	}

	if (/<[a-z][\s\S]*>/i.test(value)) {
		return value;
	}

	return `<p>${value.replace(/\n/g, '<br />')}</p>`;
}
