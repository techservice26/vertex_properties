'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import { RecentWorksFormModal } from '@/components/dashboard/recent-works/RecentWorksFormModal';
import { deleteRecentWork, fetchRecentWorks } from '@/lib/recent-work-api';
import {
	formatDoneDate,
	getRecentWorkImageUrl,
	sortRecentWorks,
} from '@/lib/recent-work-utils';
import { getRichTextPlainText } from '@/lib/rich-text-utils';
import type { RecentWork } from '@/types/recent-work';

export function RecentWorksList() {
	const [works, setWorks] = useState<RecentWork[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [modalWork, setModalWork] = useState<RecentWork | null | undefined>(
		undefined,
	);

	const loadWorks = useCallback(async () => {
		setLoading(true);
		setError('');

		try {
			const data = await fetchRecentWorks();
			setWorks(sortRecentWorks(data));
		} catch (loadError) {
			setError(
				loadError instanceof Error
					? loadError.message
					: 'Failed to load recent works.',
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void loadWorks();
	}, [loadWorks]);

	const handleDelete = async (work: RecentWork) => {
		const confirmed = window.confirm(
			`Delete "${work.project_title}"? This cannot be undone.`,
		);

		if (!confirmed) {
			return;
		}

		try {
			await deleteRecentWork(work.id);
			setWorks((current) => current.filter((item) => item.id !== work.id));
		} catch (deleteError) {
			window.alert(
				deleteError instanceof Error
					? deleteError.message
					: 'Failed to delete recent work.',
			);
		}
	};

	const handleSaved = (saved: RecentWork) => {
		setWorks((current) => {
			const existingIndex = current.findIndex((item) => item.id === saved.id);

			if (existingIndex === -1) {
				return sortRecentWorks([saved, ...current]);
			}

			const next = [...current];
			next[existingIndex] = saved;
			return sortRecentWorks(next);
		});
	};

	return (
		<div className='space-y-6'>
			<div className='flex flex-wrap items-center justify-between gap-3'>
				<div>
					<h1 className='text-2xl font-bold text-slate-900'>Recent works</h1>
					<p className='mt-1 text-sm text-slate-600'>
						Manage completed projects shown on the homepage and projects page.
					</p>
				</div>
				<button
					type='button'
					onClick={() => setModalWork(null)}
					className='inline-flex items-center gap-2 rounded-lg bg-[#c1272d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a01f24]'
				>
					<Plus className='h-4 w-4' />
					Add project
				</button>
			</div>

			{loading ? (
				<p className='text-sm text-slate-500'>Loading recent works...</p>
			) : null}

			{error ? (
				<div className='rounded-lg border border-[#c1272d]/20 bg-[#c1272d]/5 px-4 py-3 text-sm text-[#c1272d]'>
					{error}
				</div>
			) : null}

			{!loading && !error && works.length === 0 ? (
				<div className='rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center'>
					<p className='text-sm text-slate-600'>
						No recent works yet. Add your first completed project.
					</p>
				</div>
			) : null}

			{works.length > 0 ? (
				<div className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm'>
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-slate-200 text-sm'>
							<thead className='bg-slate-50'>
								<tr>
									<th className='px-4 py-3 text-left font-semibold text-slate-700'>
										Project
									</th>
									<th className='px-4 py-3 text-left font-semibold text-slate-700'>
										Completed
									</th>
									<th className='px-4 py-3 text-left font-semibold text-slate-700'>
										Description
									</th>
									<th className='px-4 py-3 text-right font-semibold text-slate-700'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-slate-100'>
								{works.map((work) => (
									<tr key={work.id} className='hover:bg-slate-50/80'>
										<td className='px-4 py-3'>
											<div className='flex items-center gap-3'>
												<div className='relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100'>
													<Image
														src={getRecentWorkImageUrl(work)}
														alt=''
														fill
														className='object-cover'
														sizes='80px'
													/>
												</div>
												<p className='max-w-[220px] font-medium text-slate-900'>
													{work.project_title}
												</p>
											</div>
										</td>
										<td className='whitespace-nowrap px-4 py-3 text-slate-600'>
											{formatDoneDate(work.done_date)}
										</td>
										<td className='max-w-xs px-4 py-3 text-slate-600'>
											<p className='line-clamp-2'>
												{work.description
													? getRichTextPlainText(work.description, 160)
													: '—'}
											</p>
										</td>
										<td className='px-4 py-3'>
											<div className='flex items-center justify-end gap-2'>
												<button
													type='button'
													onClick={() => setModalWork(work)}
													className='rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-slate-300 hover:text-slate-900'
													aria-label={`Edit ${work.project_title}`}
												>
													<Pencil className='h-4 w-4' />
												</button>
												<button
													type='button'
													onClick={() => void handleDelete(work)}
													className='rounded-lg border border-slate-200 p-2 text-[#c1272d] transition hover:border-[#c1272d]/30 hover:bg-[#c1272d]/5'
													aria-label={`Delete ${work.project_title}`}
												>
													<Trash2 className='h-4 w-4' />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			) : null}

			{modalWork !== undefined ? (
				<RecentWorksFormModal
					work={modalWork}
					onClose={() => setModalWork(undefined)}
					onSaved={handleSaved}
				/>
			) : null}
		</div>
	);
}
