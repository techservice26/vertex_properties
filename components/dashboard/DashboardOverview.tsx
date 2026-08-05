'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import {
	getDashboardNavSections,
	type DashboardNavItem,
} from '@/constants/dashboard-nav';
import { useAuth } from '@/contexts/AuthContext';
import { DASHBOARD_ACCENT } from '@/lib/dashboard-theme';

export function DashboardOverview() {
	const { username } = useAuth();
	const displayName = username ?? 'Admin';
	const sections = getDashboardNavSections();

	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-2xl font-bold tracking-wide text-slate-900'>
					Overview
				</h1>
				<p className='mt-1 text-sm text-slate-600'>
					Welcome back, {displayName}. Manage Vertex Property Services
					website content from here.
				</p>
				<p className='mt-2 text-xs font-medium tracking-wide text-slate-400 uppercase'>
					Admin · Development
				</p>
			</div>

			{sections.map((section) => (
				<section key={section.title} className='space-y-4'>
					<div>
						<h2 className='text-lg font-semibold text-slate-900'>
							{section.title}
						</h2>
						<p className='text-sm text-slate-500'>
							Quick access to {section.title.toLowerCase()} tools.
						</p>
					</div>

					<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
						{section.items.map((item) => (
							<QuickAccessCard key={item.href} item={item} />
						))}
					</div>
				</section>
			))}
		</div>
	);
}

function QuickAccessCard({ item }: { item: DashboardNavItem }) {
	const Icon = item.icon;

	return (
		<Link
			href={item.href}
			className='group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#c1272d]/25 hover:shadow-md'
		>
			<div className='flex items-start justify-between gap-3'>
				<div
					className='rounded-xl p-3 transition group-hover:text-white'
					style={{
						backgroundColor: `${DASHBOARD_ACCENT}1a`,
						color: DASHBOARD_ACCENT,
					}}
				>
					<Icon className='h-5 w-5 group-hover:text-white' />
				</div>
				<ArrowRight className='h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#c1272d]' />
			</div>
			<h3 className='mt-4 text-base font-semibold text-slate-900'>
				{item.label}
			</h3>
			<p className='mt-1 flex-1 text-sm leading-relaxed text-slate-500'>
				{item.description}
			</p>
		</Link>
	);
}
