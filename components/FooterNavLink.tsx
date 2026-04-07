'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

function linkIsActive(pathname: string, href: string): boolean {
	if (!href || href.startsWith('#')) return false;
	if (href === '/') return pathname === '/';
	return pathname === href || pathname.startsWith(`${href}/`);
}

export default function FooterNavLink({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) {
	const pathname = usePathname();
	const active = linkIsActive(pathname, href);
	const className = active
		? 'font-semibold text-[#c1272d]'
		: 'text-[#334155] transition hover:text-[#c1272d]';

	return (
		<Link href={href} className={className} aria-current={active ? 'page' : undefined}>
			{children}
		</Link>
	);
}
