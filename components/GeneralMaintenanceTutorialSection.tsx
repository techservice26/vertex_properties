'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
	HiChevronLeft,
	HiChevronRight,
} from 'react-icons/hi2';
import {
	MdOutlineHandyman,
	MdOutlineHome,
	MdOutlinePlumbing,
} from 'react-icons/md';
import { TbHammer } from 'react-icons/tb';

import { MaintenanceTutorialCard } from '@/components/MaintenanceTutorialCard';
import {
	mapMaintenanceTutorialsToDisplay,
} from '@/lib/maintenance-video-utils';
import type { MaintenanceTutorial } from '@/types/maintenance';

const PAGE_SIZE = 4;

type GeneralMaintenanceTutorialSectionProps = {
	tutorials: MaintenanceTutorial[];
};

export default function GeneralMaintenanceTutorialSection({
	tutorials,
}: GeneralMaintenanceTutorialSectionProps) {
	const displayTutorials = useMemo(
		() => mapMaintenanceTutorialsToDisplay(tutorials),
		[tutorials],
	);
	const [page, setPage] = useState(0);

	const totalPages = Math.max(1, Math.ceil(displayTutorials.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages - 1);
	const visibleTutorials = displayTutorials.slice(
		currentPage * PAGE_SIZE,
		currentPage * PAGE_SIZE + PAGE_SIZE,
	);

	const canGoBack = currentPage > 0;
	const canGoForward = currentPage < totalPages - 1;

	return (
		<section
			className='relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-20'
			aria-labelledby='maintenance-tutorial-heading'
		>
			<div
				className='pointer-events-none absolute inset-0 overflow-hidden'
				aria-hidden
			>
				<MdOutlinePlumbing className='absolute left-[6%] top-[18%] h-28 w-28 -rotate-12 text-slate-200/55 sm:h-36 sm:w-36' />
				<TbHammer className='absolute right-[8%] top-[12%] h-24 w-24 rotate-6 text-slate-200/50 sm:h-32 sm:w-32' />
				<MdOutlineHandyman className='absolute bottom-[22%] left-[12%] h-20 w-20 text-slate-200/45 sm:h-28 sm:w-28' />
				<MdOutlinePlumbing className='absolute bottom-[15%] right-[15%] h-24 w-24 rotate-12 text-slate-200/50' />
			</div>

			<div className='relative z-10 mx-auto max-w-5xl'>
				<header className='mx-auto max-w-2xl text-center'>
					<div className='mb-3 flex flex-col items-center gap-1.5'>
						<MdOutlineHome
							className='h-5 w-5 text-[#c1272d] sm:h-6 sm:w-6'
							aria-hidden
						/>
						<p className='text-xs font-bold uppercase tracking-[0.2em] text-[#c1272d] sm:text-sm'>
							How To Do
						</p>
					</div>
					<h2
						id='maintenance-tutorial-heading'
						className='font-sans text-2xl font-bold tracking-tight text-[#1e293b] sm:text-3xl md:text-4xl'
					>
						General Maintenance Tutorial
					</h2>
				</header>

				{displayTutorials.length === 0 ? (
					<p className='mt-10 text-center text-sm text-[#64748b]'>
						Maintenance tutorials will appear here once they are published from
						the dashboard.
					</p>
				) : (
					<ul className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-7 lg:mt-12 lg:gap-8'>
						{visibleTutorials.map((tutorial) => (
							<li key={tutorial.id}>
								<MaintenanceTutorialCard tutorial={tutorial} variant='home' />
							</li>
						))}
					</ul>
				)}

				<div className='mt-10 flex flex-col items-stretch gap-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between lg:mt-14'>
					<Link
						href='/video-center'
						className='inline-flex w-full items-center justify-center rounded-full bg-[#1e293b] px-8 py-3.5 text-center font-sans text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#0f172a] sm:w-auto sm:min-w-[200px]'
					>
						More video
					</Link>

					{displayTutorials.length > PAGE_SIZE ? (
						<div
							className='inline-flex items-center gap-1 self-center rounded-full border border-[#e5e7eb] bg-white px-1 py-1 shadow-sm sm:self-auto'
							role='group'
							aria-label='Tutorial carousel'
						>
							<button
								type='button'
								onClick={() => setPage((current) => Math.max(0, current - 1))}
								disabled={!canGoBack}
								className='flex h-9 w-9 items-center justify-center rounded-full text-[#9ca3af] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
								aria-label='Previous tutorials'
							>
								<HiChevronLeft className='h-5 w-5' />
							</button>
							<span className='mx-0.5 h-5 w-px bg-[#d1d5db]' aria-hidden />
							<button
								type='button'
								onClick={() =>
									setPage((current) => Math.min(totalPages - 1, current + 1))
								}
								disabled={!canGoForward}
								className='flex h-9 w-9 items-center justify-center rounded-full text-[#c1272d] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40'
								aria-label='Next tutorials'
							>
								<HiChevronRight className='h-5 w-5' />
							</button>
						</div>
					) : null}
				</div>
			</div>
		</section>
	);
}
