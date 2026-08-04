'use client';

import Link from 'next/link';
import {
	Bell,
	ChevronDown,
	Expand,
	LogOut,
	Mail,
	Search,
	Settings,
	UserCircle,
} from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { getUserInitials } from '@/lib/auth';
import { DASHBOARD_ACCENT } from '@/lib/dashboard-theme';

export function DashboardNavbar() {
	const { username, logout } = useAuth();
	const displayName = username ?? 'Admin';
	const initials = getUserInitials(displayName);

	return (
		<header className='flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6'>
			<div className='relative hidden max-w-md flex-1 sm:block'>
				<Search className='pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400' />
				<input
					type='search'
					placeholder='Search dashboard...'
					className='w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#c1272d]/30 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/10'
				/>
			</div>

			<div className='ml-auto flex items-center gap-5'>
				<div className='flex items-center gap-1 border-l border-slate-200 pl-5'>
					<button
						type='button'
						className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-50'
						style={{ ['--hover-color' as string]: DASHBOARD_ACCENT }}
						aria-label='Fullscreen'
					>
						<Expand className='h-4 w-4' />
					</button>
					<button
						type='button'
						className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-50'
						aria-label='Notifications'
					>
						<Bell className='h-4 w-4' />
					</button>
					<button
						type='button'
						className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-50'
						aria-label='Messages'
					>
						<Mail className='h-4 w-4' />
					</button>
				</div>

				<div className='group/profile relative border-l border-slate-200 pl-5'>
					<button
						type='button'
						className='flex items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors hover:bg-slate-50 focus:bg-slate-50 focus:outline-none'
						aria-label='Open profile menu'
					>
						<div
							className='flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white'
							style={{ backgroundColor: DASHBOARD_ACCENT }}
						>
							{initials}
						</div>
						<div className='hidden min-w-0 sm:block'>
							<p className='max-w-36 truncate text-sm font-semibold text-slate-900'>
								{displayName}
							</p>
							<p
								className='text-xs font-medium'
								style={{ color: DASHBOARD_ACCENT }}
							>
								Admin
							</p>
						</div>
						<ChevronDown className='hidden h-4 w-4 text-slate-400 transition-transform group-hover/profile:rotate-180 group-focus-within/profile:rotate-180 sm:block' />
					</button>

					<div className='invisible absolute top-full right-0 z-50 w-56 translate-y-1 pt-2 opacity-0 transition-all duration-150 group-hover/profile:visible group-hover/profile:translate-y-0 group-hover/profile:opacity-100 group-focus-within/profile:visible group-focus-within/profile:translate-y-0 group-focus-within/profile:opacity-100'>
						<div className='overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl'>
							<div className='border-b border-slate-100 px-4 py-3'>
								<p className='truncate text-sm font-semibold text-slate-900'>
									{displayName}
								</p>
								<p className='truncate text-xs text-slate-500'>
									{username}
								</p>
							</div>
							<Link
								href='/dashboard'
								className='flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50'
							>
								<UserCircle className='h-4 w-4' /> Dashboard
							</Link>
							<Link
								href='/dashboard'
								className='flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50'
							>
								<Settings className='h-4 w-4' /> Settings
							</Link>
							<div className='my-1 border-t border-slate-100' />
							<button
								type='button'
								onClick={logout}
								className='flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#c1272d]/5'
								style={{ color: DASHBOARD_ACCENT }}
							>
								<LogOut className='h-4 w-4' /> Sign out
							</button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
