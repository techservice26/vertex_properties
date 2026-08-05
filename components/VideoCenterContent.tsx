'use client';

import { useEffect, useMemo, useState } from 'react';

import { MaintenanceTutorialCard } from '@/components/MaintenanceTutorialCard';
import { resolveMaintenanceTutorialDisplays } from '@/lib/maintenance-video-utils';
import type { MaintenanceTutorial } from '@/types/maintenance';

const PER_PAGE = 6;

type VideoCenterContentProps = {
	maintenanceTutorials?: MaintenanceTutorial[];
};

export default function VideoCenterContent({
	maintenanceTutorials = [],
}: VideoCenterContentProps) {
	const [page, setPage] = useState(1);

	const displayTutorials = useMemo(
		() => resolveMaintenanceTutorialDisplays(maintenanceTutorials),
		[maintenanceTutorials],
	);

	const totalPages = Math.max(
		1,
		Math.ceil(displayTutorials.length / PER_PAGE),
	);

	useEffect(() => {
		if (page > totalPages) setPage(totalPages);
	}, [page, totalPages]);

	const effectivePage = Math.min(page, totalPages);
	const pageSlice = useMemo(() => {
		const start = (effectivePage - 1) * PER_PAGE;
		return displayTutorials.slice(start, start + PER_PAGE);
	}, [displayTutorials, effectivePage]);

	return (
		<div className='bg-white px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8'>
			<div className='mx-auto max-w-5xl'>
				<h2
					id='video-categories-heading'
					className='font-sans text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl md:text-4xl'
				>
					Maintenance Tutorials
				</h2>
				<p className='mt-3 max-w-2xl text-sm text-[#64748b] sm:text-base'>
					How-to guides and maintenance videos published by Vertex Property
					Services.
				</p>

				<ul className='mt-12 grid list-none grid-cols-1 gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10'>
					{pageSlice.map((tutorial) => (
						<li key={tutorial.id}>
							<MaintenanceTutorialCard tutorial={tutorial} variant='grid' />
						</li>
					))}
				</ul>

				{displayTutorials.length > PER_PAGE ? (
					<nav
						className='mt-14 flex flex-wrap items-center justify-center gap-2 sm:mt-16'
						aria-label='Pagination'
					>
						<button
							type='button'
							onClick={() => setPage((current) => Math.max(1, current - 1))}
							disabled={effectivePage <= 1}
							className='flex h-11 w-11 items-center justify-center rounded-full border border-[#1e293b] text-[#1e293b] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-40'
							aria-label='Previous page'
						>
							<span aria-hidden>‹</span>
						</button>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
							<button
								key={n}
								type='button'
								onClick={() => setPage(n)}
								className={`flex h-11 min-w-[2.75rem] items-center justify-center rounded-full border-2 bg-transparent px-3 font-sans text-sm font-semibold transition ${
									effectivePage === n
										? 'border-[#1e293b] text-[#1e293b]'
										: 'border-[#1e293b] text-[#1e293b] hover:bg-[#f8fafc]'
								} ${effectivePage === n ? 'ring-2 ring-[#1e293b]/20' : ''}`}
								aria-current={effectivePage === n ? 'page' : undefined}
							>
								{String(n).padStart(2, '0')}
							</button>
						))}
						<button
							type='button'
							onClick={() =>
								setPage((current) => Math.min(totalPages, current + 1))
							}
							disabled={effectivePage >= totalPages}
							className='flex h-11 w-11 items-center justify-center rounded-full border border-[#1e293b] text-[#1e293b] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-40'
							aria-label='Next page'
						>
							<span aria-hidden>›</span>
						</button>
					</nav>
				) : null}
			</div>
		</div>
	);
}
