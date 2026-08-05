'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

import { fetchClientBlogs } from '@/lib/public-blog-api';
import { resolveBlogPosts } from '@/lib/blog-utils';
import type { BlogPost } from '@/types/blog';

const PER_PAGE = 9;

export default function NewsArticlesGrid() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	useEffect(() => {
		let cancelled = false;

		async function loadPosts() {
			setLoading(true);

			try {
				const blogs = await fetchClientBlogs();

				if (!cancelled) {
					setPosts(resolveBlogPosts(blogs));
				}
			} catch {
				if (!cancelled) {
					setPosts(resolveBlogPosts([]));
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		}

		void loadPosts();

		return () => {
			cancelled = true;
		};
	}, []);

	const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));

	useEffect(() => {
		if (page > totalPages) {
			setPage(totalPages);
		}
	}, [page, totalPages]);

	const effectivePage = Math.min(page, totalPages);
	const slice = useMemo(() => {
		const start = (effectivePage - 1) * PER_PAGE;
		return posts.slice(start, start + PER_PAGE);
	}, [effectivePage, posts]);

	if (loading) {
		return (
			<div className='bg-white px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8'>
				<div className='mx-auto max-w-6xl py-12 text-center text-sm text-[#64748b]'>
					Loading articles...
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8'>
			<div className='mx-auto max-w-6xl'>
				<ul className='grid list-none grid-cols-1 gap-8 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8'>
					{slice.map((article) => (
						<li key={article.id}>
							<article className='flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_4px_20px_rgba(15,23,42,0.07)] ring-1 ring-[#eef2f7] transition hover:shadow-[0_8px_28px_rgba(15,23,42,0.09)]'>
								<Link
									href={`/blog/${article.slug}`}
									className='relative aspect-[4/3] w-full shrink-0 overflow-hidden'
								>
									<Image
										src={article.imageSrc}
										alt=''
										fill
										className='object-cover transition duration-300 hover:scale-[1.02]'
										sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
									/>
								</Link>
								<div className='flex flex-1 flex-col p-4 sm:p-5'>
									<p className='text-xs text-[#94a3b8] sm:text-[13px]'>
										By admin – {article.date}
									</p>
									<h2 className='mt-2 font-sans text-base font-bold leading-snug text-[#0f172a] sm:text-[1.05rem]'>
										<Link
											href={`/blog/${article.slug}`}
											className='transition hover:text-[#c1272d]'
										>
											{article.title}
										</Link>
									</h2>
									<p className='mt-2 flex-1 text-sm leading-relaxed text-[#64748b]'>
										{article.excerpt}
									</p>
									<Link
										href={`/blog/${article.slug}`}
										className='mt-4 inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-[0.08em] text-[#c1272d] transition hover:text-[#a61f29] sm:text-sm'
									>
										READ MORE
										<HiArrowRight className='h-4 w-4' aria-hidden />
									</Link>
								</div>
							</article>
						</li>
					))}
				</ul>

				<nav
					className='mt-14 flex flex-wrap items-center justify-center gap-2 sm:mt-16'
					aria-label='Articles pagination'
				>
					<button
						type='button'
						onClick={() => setPage((current) => Math.max(1, current - 1))}
						disabled={effectivePage <= 1}
						className='flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#c1272d] text-[#c1272d] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-35'
						aria-label='Previous page'
					>
						<HiChevronLeft className='h-5 w-5' aria-hidden />
					</button>
					{Array.from({ length: totalPages }, (_, index) => index + 1).map(
						(pageNumber) => (
							<button
								key={pageNumber}
								type='button'
								onClick={() => setPage(pageNumber)}
								className={`flex h-11 min-w-[2.75rem] items-center justify-center rounded-full border-2 bg-transparent px-3 font-sans text-sm font-semibold text-[#1e293b] transition hover:bg-[#f8fafc] ${
									effectivePage === pageNumber
										? 'border-[#1e293b] ring-2 ring-[#1e293b]/15'
										: 'border-[#1e293b]'
								}`}
								aria-current={effectivePage === pageNumber ? 'page' : undefined}
							>
								{String(pageNumber).padStart(2, '0')}
							</button>
						),
					)}
					<button
						type='button'
						onClick={() =>
							setPage((current) => Math.min(totalPages, current + 1))
						}
						disabled={effectivePage >= totalPages}
						className='flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1e293b] text-[#1e293b] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-35'
						aria-label='Next page'
					>
						<HiChevronRight className='h-5 w-5' aria-hidden />
					</button>
				</nav>
			</div>
		</div>
	);
}
