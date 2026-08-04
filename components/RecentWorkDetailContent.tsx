'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageHero from '@/components/PageHero';
import { fetchClientRecentWork } from '@/lib/public-recent-work-api';
import {
	formatDoneDate,
	getRecentWorkImageUrl,
} from '@/lib/recent-work-utils';
import type { RecentWork } from '@/types/recent-work';

type Props = {
	id: string;
};

export default function RecentWorkDetailContent({ id }: Props) {
	const [work, setWork] = useState<RecentWork | null>(null);
	const [loading, setLoading] = useState(true);
	const [notFoundState, setNotFoundState] = useState(false);

	useEffect(() => {
		const numericId = Number(id);

		if (!Number.isInteger(numericId) || numericId <= 0) {
			setNotFoundState(true);
			setLoading(false);
			return;
		}

		let cancelled = false;

		async function loadWork() {
			setLoading(true);

			try {
				const data = await fetchClientRecentWork(numericId);

				if (!cancelled) {
					setWork(data);
				}
			} catch {
				if (!cancelled) {
					setNotFoundState(true);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		}

		void loadWork();

		return () => {
			cancelled = true;
		};
	}, [id]);

	if (loading) {
		return (
			<div className='min-h-screen bg-white'>
				<div className='mx-auto max-w-3xl px-4 py-20 text-center text-sm text-[#64748b]'>
					Loading project...
				</div>
			</div>
		);
	}

	if (notFoundState || !work) {
		notFound();
	}

	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title={work.project_title}
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{
						label: 'Projects / Portfolio',
						emphasize: false,
						href: '/projects',
					},
					{ label: work.project_title },
				]}
			/>
			<article className='mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14'>
				<div className='relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#f1f5f9] ring-1 ring-[#e2e8f0]'>
					<Image
						src={getRecentWorkImageUrl(work)}
						alt=''
						fill
						className='object-cover'
						sizes='(max-width: 768px) 100vw, 768px'
						priority
					/>
				</div>
				<p className='mt-6 text-sm text-[#94a3b8]'>
					<time dateTime={work.done_date}>
						{formatDoneDate(work.done_date)}
					</time>
				</p>
				<p className='mt-4 text-base leading-relaxed text-[#475569]'>
					{work.description || 'Completed project by Vertex Property Services.'}
				</p>
				<p className='mt-8 text-sm text-[#64748b]'>
					Interested in a similar project? We&apos;d love to hear about your
					space—reach out for a free estimate.
				</p>
				<div className='mt-10 flex flex-wrap gap-4'>
					<Link
						href='/projects'
						className='font-semibold text-[#c1272d] transition hover:text-[#a61f29]'
					>
						← Back to Projects / Portfolio
					</Link>
					<Link
						href='/contact'
						className='font-semibold text-[#1e3a5f] underline-offset-2 transition hover:text-[#c1272d] hover:underline'
					>
						Contact us
					</Link>
				</div>
			</article>
		</div>
	);
}
