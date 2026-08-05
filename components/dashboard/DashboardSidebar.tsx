'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import {
	getDashboardNavSections,
	isDashboardNavItemActive,
	type DashboardNavItem,
	type DashboardNavSection,
} from '@/constants/dashboard-nav';
import { DASHBOARD_ACCENT, DASHBOARD_SIDEBAR } from '@/lib/dashboard-theme';

const sidebarClasses = {
	root: 'group sticky top-0 flex h-screen w-[72px] shrink-0 flex-col overflow-x-hidden overflow-y-auto py-5 transition-[width] duration-300 ease-in-out hover:w-[272px]',
	header: 'mb-6 flex items-center justify-center px-3 transition-all duration-200 group-hover:px-5',
	navItem: 'flex justify-center group-hover:justify-stretch',
	navLink: (isActive: boolean) =>
		[
			'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200',
			'group-hover:mx-3 group-hover:w-full group-hover:justify-start group-hover:gap-3 group-hover:px-3',
			isActive
				? 'bg-white shadow-sm'
				: 'text-white/90 hover:bg-white/10 hover:text-white',
		].join(' '),
	navLabel:
		'max-w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-full group-hover:opacity-100',
	sectionTitle: (isFirst: boolean) =>
		[
			'mb-2 max-h-0 overflow-hidden px-6 text-[11px] font-semibold tracking-[0.14em] text-white/45 uppercase opacity-0 transition-all duration-200',
			'group-hover:max-h-8 group-hover:opacity-100',
			isFirst ? '' : 'group-hover:mt-4',
		]
			.filter(Boolean)
			.join(' '),
	sectionDivider:
		'mx-auto my-3 h-px w-8 bg-white/15 transition-all duration-200 group-hover:mx-5 group-hover:w-auto',
	footer: 'mt-4 flex justify-center group-hover:justify-stretch',
	footerLink:
		'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white/90 transition-all duration-200 hover:bg-white/10 group-hover:mx-3 group-hover:w-full group-hover:justify-start group-hover:gap-3 group-hover:px-3',
	footerLabel:
		'max-w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-full group-hover:opacity-100 text-sm font-medium',
};

function getNavSections(): DashboardNavSection[] {
	const groupedSections = getDashboardNavSections();

	return [
		{
			title: 'Menu',
			items: groupedSections.flatMap((section) => section.items),
		},
	];
}

function NavLink({ item, isActive }: { item: DashboardNavItem; isActive: boolean }) {
	const Icon = item.icon;

	return (
		<li className={sidebarClasses.navItem}>
			<Link
				href={item.href}
				title={item.label}
				aria-current={isActive ? 'page' : undefined}
				className={sidebarClasses.navLink(isActive)}
				style={isActive ? { color: DASHBOARD_ACCENT } : undefined}
			>
				<Icon className='h-5 w-5 shrink-0' strokeWidth={1.75} />
				<span className={sidebarClasses.navLabel}>{item.label}</span>
			</Link>
		</li>
	);
}

function SectionHeader({
	title,
	isFirst = false,
}: {
	title: string;
	isFirst?: boolean;
}) {
	return <p className={sidebarClasses.sectionTitle(isFirst)}>{title}</p>;
}

function SidebarFooter() {
	return (
		<div className={sidebarClasses.footer}>
			<Link
				href='/'
				title='Back to website'
				className={sidebarClasses.footerLink}
				style={{ ['--hover-accent' as string]: DASHBOARD_ACCENT }}
			>
				<ArrowLeft className='h-5 w-5 shrink-0' strokeWidth={1.75} />
				<span className={sidebarClasses.footerLabel}>Back to website</span>
			</Link>
		</div>
	);
}

export function DashboardSidebar() {
	const pathname = usePathname();
	const navSections = getNavSections();

	return (
		<aside
			className={sidebarClasses.root}
			style={{ backgroundColor: DASHBOARD_SIDEBAR }}
		>
			<div className={sidebarClasses.header}>
				<Link
					href='/dashboard'
					className='flex min-w-0 items-center justify-center overflow-hidden'
				>
					<Image
						src='/images/logo.png'
						alt='Vertex Property Services'
						width={36}
						height={36}
						className='h-9 w-9 shrink-0 object-contain brightness-0 invert'
					/>
				</Link>
			</div>

			<nav className='flex flex-1 flex-col'>
				{navSections.map((section, index) => (
					<div key={section.title}>
						{index > 0 ? (
							<div className={sidebarClasses.sectionDivider} />
						) : null}

						<SectionHeader title={section.title} isFirst={index === 0} />

						<ul className='flex flex-col gap-1'>
							{section.items.map((item) => (
								<NavLink
									key={item.label}
									item={item}
									isActive={isDashboardNavItemActive(pathname, item)}
								/>
							))}
						</ul>
					</div>
				))}
			</nav>

			<SidebarFooter />
		</aside>
	);
}
