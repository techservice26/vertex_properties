'use client';

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useRouter } from 'next/navigation';

import { loginRequest } from '@/lib/api-client';
import {
	clearAuthSession,
	getAuthSession,
	getStoredUsername,
	saveAuthSession,
	type AuthSession,
} from '@/lib/auth';

type AuthContextValue = {
	username: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const [session, setSession] = useState<AuthSession | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setSession(getAuthSession());
		setIsLoading(false);
	}, []);

	const login = useCallback(async (username: string, password: string) => {
		const data = await loginRequest(username, password);
		const nextSession: AuthSession = {
			accessToken: data.access,
			refreshToken: data.refresh,
			username: data.username,
		};

		saveAuthSession(nextSession);
		setSession(nextSession);
	}, []);

	const logout = useCallback(() => {
		clearAuthSession();
		setSession(null);
		router.push('/login');
	}, [router]);

	const value = useMemo<AuthContextValue>(
		() => ({
			username: session?.username ?? getStoredUsername(),
			isAuthenticated: Boolean(session?.accessToken),
			isLoading,
			login,
			logout,
		}),
		[session, isLoading, login, logout],
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}

	return context;
}
