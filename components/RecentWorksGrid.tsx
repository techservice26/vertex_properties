'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi2';

import { fetchClientRecentWorks } from '@/lib/public-recent-work-api';
import {
	formatDoneDate,
	getRecentWorkImageUrl,
	sortRecentWorks,
} from '@/lib/recent-work-utils';
import type { RecentWork } from '@/types/recent-work';

type Props = {
	limit?: number;
	showHeader?: boolean;
	gridClassName?: string;
	sectionClassName?: string;
	headingClassName?: string;
};

export default function RecentWorksGrid({
	limit,
	showHeader = true,
	gridClassName,
	sectionClassName = 'relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-20',
	headingClassName = 'mt-2 font-sans text-2xl font-bold tracking-tight text-[#1e3a5f] sm:text-3xl md:text-4xl',
}: Props) {
	const [works, setWorks] = useState<RecentWork[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		let cancelled = false;

		async function loadWorks() {
			setLoading(true);
			setError('');

			try {
				const data = await fetchClientRecentWorks();

				if (!cancelled) {
					const sorted = sortRecentWorks(data);
					setWorks(limit != null ? sorted.slice(0, limit) : sorted);
				}
			} catch (loadError) {
				if (!cancelled) {
					setError(
						loadError instanceof Error
							? loadError.message
							: 'Failed to load recent works.',
					);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		}

		void loadWorks();

		return () => {
			cancelled = true;
		};
	}, [limit]);

	const defaultGridClassName =
		limit != null
			? 'mt-10 grid list-none grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-5'
			: 'mt-10 grid list-none grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8';

	return (
		<section
			className={sectionClassName}
			aria-labelledby='recent-works-heading'
		>
			<div className='relative z-10 mx-auto max-w-6xl'>
				{showHeader ? (
					<header className='mx-auto max-w-3xl text-center'>
						<p className='text-xs font-bold uppercase tracking-[0.2em] text-[#c1272d] sm:text-sm'>
							Our Recent Projects
						</p>
						<h2
							id='recent-works-heading'
							className={headingClassName}
						>
							Recently Completed Works
						</h2>
					</header>
				) : null}

				{loading ? (
					<p className='mt-10 text-center text-sm text-[#64748b]'>
						Loading recent projects...
					</p>
				) : null}

				{error ? (
					<p className='mt-10 text-center text-sm text-[#c1272d]'>{error}</p>
				) : null}

				{!loading && !error && works.length === 0 ? (
					<p className='mt-10 text-center text-sm text-[#64748b]'>
						No completed projects to show yet.
					</p>
				) : null}

				{works.length > 0 ? (
					<ul className={gridClassName ?? defaultGridClassName}>
						{works.map((work) => (
							<li key={work.id}>
								<article className='flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(15,23,42,0.08)] ring-1 ring-[#f1f5f9] transition hover:shadow-[0_8px_32px_rgba(15,23,42,0.1)]'>
									<div className='relative aspect-[4/3] w-full shrink-0 overflow-hidden'>
										<Image
											src={getRecentWorkImageUrl(work)}
											alt=''
											fill
											className='object-cover'
											sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
										/>
									</div>
									<div className='flex flex-1 flex-col p-4 sm:p-5'>
										<time
											dateTime={work.done_date}
											className='text-xs text-[#94a3b8]'
										>
											{formatDoneDate(work.done_date)}
										</time>
										<h3 className='mt-2 font-sans text-base font-bold leading-snug text-[#1e3a5f] sm:text-[1.05rem]'>
											{work.project_title}
										</h3>
										<p className='mt-2 flex-1 font-sans text-sm leading-relaxed text-[#64748b]'>
											{work.description || 'Completed project by Vertex Property Services.'}
										</p>
										<Link
											href={`/projects/${work.id}`}
											className='mt-4 inline-flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#c1272d] transition hover:text-[#a61f29] sm:text-xs'
										>
											READ MORE
											<HiArrowRight
												className='h-4 w-4 shrink-0'
												aria-hidden
											/>
										</Link>
									</div>
								</article>
							</li>
						))}
					</ul>
				) : null}
			</div>
		</section>
	);
}
