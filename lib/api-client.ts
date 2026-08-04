import { getAccessToken } from '@/lib/auth';

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8002/api';

export function getApiBaseUrl() {
	return API_BASE_URL;
}

type ApiFetchOptions = RequestInit & {
	params?: Record<string, string | number | boolean | undefined>;
};

export function buildUrl(path: string, params?: ApiFetchOptions['params']) {
	const url = new URL(
		path.startsWith('http') ? path : `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`,
	);

	if (params) {
		for (const [key, value] of Object.entries(params)) {
			if (value !== undefined) {
				url.searchParams.set(key, String(value));
			}
		}
	}

	return url.toString();
}

export async function apiFetch<T>(
	path: string,
	options: ApiFetchOptions = {},
): Promise<T> {
	const { params, headers, ...rest } = options;
	const token = getAccessToken();

	const response = await fetch(buildUrl(path, params), {
		...rest,
		headers: {
			'Content-Type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...headers,
		},
	});

	if (!response.ok) {
		let message = 'Request failed';

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

	if (response.status === 204) {
		return undefined as T;
	}

	return response.json() as Promise<T>;
}

export async function apiFetchFormData<T>(
	path: string,
	options: {
		method?: string;
		body: FormData;
		params?: ApiFetchOptions['params'];
	},
): Promise<T> {
	const token = getAccessToken();

	const response = await fetch(buildUrl(path, options.params), {
		method: options.method ?? 'POST',
		body: options.body,
		headers: {
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});

	if (!response.ok) {
		let message = 'Request failed';

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

	if (response.status === 204) {
		return undefined as T;
	}

	return response.json() as Promise<T>;
}

export async function loginRequest(username: string, password: string) {
	return apiFetch<{
		access: string;
		refresh: string;
		username: string;
	}>('/login/', {
		method: 'POST',
		body: JSON.stringify({ username, password }),
	});
}
