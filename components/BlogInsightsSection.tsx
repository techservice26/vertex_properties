'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

import { fetchClientBlogs } from '@/lib/public-blog-api';
import { getHomepageBlogPosts } from '@/lib/blog-utils';
import type { BlogPost } from '@/types/blog';

export default function BlogInsightsSection() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;

		async function loadPosts() {
			setLoading(true);

			try {
				const blogs = await fetchClientBlogs();

				if (!cancelled) {
					setPosts(getHomepageBlogPosts(blogs, 3));
				}
			} catch {
				if (!cancelled) {
					setPosts(getHomepageBlogPosts([], 3));
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

	return (
		<section
			className='relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-20'
			aria-labelledby='blog-insights-heading'
		>
			<div
				className='pointer-events-none absolute -left-6 top-2 z-0 h-[min(42vw,200px)] w-[min(55vw,240px)] opacity-95 sm:left-0 sm:top-4'
				aria-hidden
			>
				<Image
					src='/images/blog_section_illustration.png'
					alt=''
					fill
					className='object-contain object-[left_top]'
					sizes='280px'
				/>
			</div>

			<div className='relative z-10 mx-auto max-w-5xl'>
				<header className='mx-auto max-w-3xl text-center'>
					<p className='text-xs font-bold uppercase tracking-[0.2em] text-[#c1272d] sm:text-sm'>
						Latest Blog Posts
					</p>
					<h2
						id='blog-insights-heading'
						className='mt-2 font-sans text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl md:text-4xl'
					>
						Vertex Insights &amp; Articles
					</h2>
				</header>

				{loading ? (
					<p className='mt-10 text-center text-sm text-[#64748b] sm:mt-12'>
						Loading blog posts...
					</p>
				) : null}

				<ul className='mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8'>
					{posts.map((post) => (
						<li key={post.id}>
							<article className='flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(15,23,42,0.08)] ring-1 ring-[#f1f5f9] transition hover:shadow-[0_8px_32px_rgba(15,23,42,0.1)]'>
								<div className='relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-2xl'>
									<Image
										src={post.imageSrc}
										alt=''
										fill
										className='object-cover'
										sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
									/>
								</div>
								<div className='flex flex-1 flex-col p-4 sm:p-5'>
									<p className='text-xs text-[#94a3b8]'>
										By admin · {post.date}
									</p>
									<h3 className='mt-2 font-sans text-base font-bold leading-snug text-[#0f172a] sm:text-[1.05rem]'>
										{post.title}
									</h3>
									<p className='mt-2 flex-1 font-sans text-sm leading-relaxed text-[#64748b]'>
										{post.excerpt}
									</p>
									<Link
										href={`/blog/${post.slug}`}
										className='mt-4 inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#c1272d] transition hover:text-[#a61f29]'
									>
										Read more
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

				<div className='mt-10 flex flex-col items-stretch gap-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-center sm:gap-6'>
					<Link
						href='/blog'
						className='inline-flex w-full items-center justify-center rounded-full bg-[#0f172a] px-10 py-3.5 text-center font-sans text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#1e293b] sm:w-auto sm:min-w-[260px] sm:px-12'
					>
						More blog posts
					</Link>
					<div
						className='inline-flex items-center gap-0 self-center rounded-xl border border-[#e8edf3] bg-white p-1 shadow-sm'
						role='group'
						aria-label='Blog posts navigation'
					>
						<button
							type='button'
							className='flex h-9 w-9 items-center justify-center rounded-lg text-[#c1272d] transition hover:bg-[#fef2f2]'
							aria-label='Previous posts'
						>
							<HiChevronLeft className='h-5 w-5' />
						</button>
						<span
							className='mx-0.5 h-5 w-px bg-[#d1d5db]'
							aria-hidden
						/>
						<button
							type='button'
							className='flex h-9 w-9 items-center justify-center rounded-lg text-[#c1272d] transition hover:bg-[#fef2f2]'
							aria-label='Next posts'
						>
							<HiChevronRight className='h-5 w-5' />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
