'use client';

import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DASHBOARD_BG } from '@/lib/dashboard-theme';

export function DashboardShell({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex min-h-screen' style={{ backgroundColor: DASHBOARD_BG }}>
			<DashboardSidebar />

			<div className='flex min-h-screen min-w-0 flex-1 flex-col'>
				<DashboardNavbar />
				<main className='flex-1 overflow-auto p-6'>{children}</main>
			</div>
		</div>
	);
}
