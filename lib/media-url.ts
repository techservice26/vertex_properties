export function resolveMediaUrl(url: string | null | undefined): string {
	if (!url?.trim()) {
		return '';
	}

	if (url.startsWith('http://') || url.startsWith('https://')) {
		return url;
	}

	const apiBase =
		process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8002/api';
	const origin = apiBase.replace(/\/api\/?$/, '');

	if (url.startsWith('/')) {
		return `${origin}${url}`;
	}

	return `${origin}/${url}`;
}
