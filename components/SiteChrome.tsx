'use client';

import { usePathname } from 'next/navigation';

import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';

export function SiteChrome({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const hideChrome =
		pathname.startsWith('/dashboard') || pathname === '/login';

	return (
		<>
			{!hideChrome ? <Navbar /> : null}
			{children}
			{!hideChrome ? <SiteFooter /> : null}
		</>
	);
}
