'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { useAuth } from '@/contexts/AuthContext';

export function DashboardAuthGuard({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const { isAuthenticated, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.replace('/login');
		}
	}, [isAuthenticated, isLoading, router]);

	if (isLoading) {
		return (
			<div className='flex min-h-screen items-center justify-center bg-[#efefef] text-sm text-slate-600'>
				Checking session...
			</div>
		);
	}

	if (!isAuthenticated) {
		return (
			<div className='flex min-h-screen items-center justify-center bg-[#efefef] text-sm text-slate-600'>
				Redirecting to login...
			</div>
		);
	}

	return <DashboardShell>{children}</DashboardShell>;
}
