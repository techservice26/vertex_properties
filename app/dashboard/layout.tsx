'use client';

import { DashboardAuthGuard } from '@/components/dashboard/DashboardAuthGuard';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <DashboardAuthGuard>{children}</DashboardAuthGuard>;
}
