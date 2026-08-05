const ACCESS_TOKEN_KEY = 'vertex_access_token';
const REFRESH_TOKEN_KEY = 'vertex_refresh_token';
const USERNAME_KEY = 'vertex_username';

export type AuthSession = {
	accessToken: string;
	refreshToken: string;
	username: string;
};

export function getAccessToken(): string | null {
	if (typeof window === 'undefined') {
		return null;
	}

	return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredUsername(): string | null {
	if (typeof window === 'undefined') {
		return null;
	}

	return localStorage.getItem(USERNAME_KEY);
}

export function getAuthSession(): AuthSession | null {
	const accessToken = getAccessToken();
	const refreshToken =
		typeof window !== 'undefined'
			? localStorage.getItem(REFRESH_TOKEN_KEY)
			: null;
	const username = getStoredUsername();

	if (!accessToken || !refreshToken || !username) {
		return null;
	}

	return { accessToken, refreshToken, username };
}

export function saveAuthSession(session: AuthSession) {
	localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
	localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
	localStorage.setItem(USERNAME_KEY, session.username);
}

export function clearAuthSession() {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
	localStorage.removeItem(REFRESH_TOKEN_KEY);
	localStorage.removeItem(USERNAME_KEY);
}

export function getUserInitials(username: string) {
	const parts = username.trim().split(/\s+/);

	if (parts.length >= 2) {
		return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
	}

	return username.slice(0, 2).toUpperCase();
}
