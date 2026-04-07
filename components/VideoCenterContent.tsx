'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { HiPlay } from 'react-icons/hi2';
import {
	VIDEO_CATEGORIES,
	VIDEO_ENTRIES,
	type VideoCategorySlug,
} from '@/data/videoCenter';

const PER_PAGE = 6;

function filterVideos(category: VideoCategorySlug) {
	if (category === 'all') return VIDEO_ENTRIES;
	return VIDEO_ENTRIES.filter((v) => v.categorySlug === category);
}

export default function VideoCenterContent() {
	const [category, setCategory] = useState<VideoCategorySlug>('all');
	const [page, setPage] = useState(1);

	const filtered = useMemo(() => filterVideos(category), [category]);
	const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

	useEffect(() => {
		if (page > totalPages) setPage(totalPages);
	}, [page, totalPages]);

	const effectivePage = Math.min(page, totalPages);
	const pageSlice = useMemo(() => {
		const start = (effectivePage - 1) * PER_PAGE;
		return filtered.slice(start, start + PER_PAGE);
	}, [filtered, effectivePage]);

	function selectCategory(slug: VideoCategorySlug) {
		setCategory(slug);
		setPage(1);
	}

	return (
		<div className='bg-white px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8'>
			<div className='mx-auto max-w-5xl'>
				<h2
					id='video-categories-heading'
					className='font-sans text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl md:text-4xl'
				>
					Video Categories
				</h2>

				<nav
					className='mt-6 flex flex-wrap items-center gap-x-0 gap-y-2 text-sm sm:text-[15px]'
					aria-label='Filter videos by category'
				>
					{VIDEO_CATEGORIES.map((cat, i) => (
						<Fragment key={cat.slug}>
							{i > 0 ? (
								<span className='mx-1.5 text-[#c1272d]' aria-hidden>
									·
								</span>
							) : null}
							<button
								type='button'
								onClick={() => selectCategory(cat.slug)}
								className={`font-medium transition hover:text-[#c1272d] ${
									category === cat.slug
										? 'font-bold text-[#c1272d]'
										: 'text-[#1e293b]'
								}`}
							>
								{cat.label}
							</button>
						</Fragment>
					))}
				</nav>

				<ul className='mt-12 grid list-none grid-cols-1 gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10'>
					{pageSlice.map((video) => (
						<li key={video.id}>
							<article>
								<Link
									href={video.href}
									target='_blank'
									rel='noopener noreferrer'
									className='group relative block aspect-video overflow-hidden rounded-2xl bg-[#0f172a] shadow-md ring-1 ring-black/5'
								>
									<Image
										src={video.thumbnailSrc}
										alt={video.title}
										fill
										className='object-cover transition duration-300 group-hover:scale-[1.03]'
										sizes='(max-width: 640px) 100vw, 50vw'
									/>
									<div
										className='absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent'
										aria-hidden
									/>
									<span className='pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0f172a] shadow-lg ring-2 ring-white/40'>
										<HiPlay className='ml-0.5 h-7 w-7' aria-hidden />
									</span>
								</Link>
								<h3 className='mt-4 text-center font-sans text-sm font-bold leading-snug text-[#0f172a] sm:text-base'>
									{video.title}
								</h3>
							</article>
						</li>
					))}
				</ul>

				{filtered.length === 0 ? (
					<p className='mt-12 text-center text-[#64748b]'>
						No videos in this category yet. Try &ldquo;All Videos.&rdquo;
					</p>
				) : null}

				<nav
					className='mt-14 flex flex-wrap items-center justify-center gap-2 sm:mt-16'
					aria-label='Pagination'
				>
					<button
						type='button'
						onClick={() => setPage((p) => Math.max(1, p - 1))}
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
						onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
						disabled={effectivePage >= totalPages}
						className='flex h-11 w-11 items-center justify-center rounded-full border border-[#1e293b] text-[#1e293b] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-40'
						aria-label='Next page'
					>
						<span aria-hidden>›</span>
					</button>
				</nav>
			</div>
		</div>
	);
}
