'use client';

import { useCallback, useEffect, useState } from 'react';
import { ExternalLink, Pencil, Plus, RefreshCw, Trash2, Wrench } from 'lucide-react';

import { MaintenanceFormModal } from '@/components/dashboard/maintenance/MaintenanceFormModal';
import { DashboardToggle } from '@/components/dashboard/DashboardToggle';
import {
	deleteMaintenanceTutorial,
	fetchMaintenanceTutorials,
	toggleMaintenanceTutorialHomepage,
} from '@/lib/maintenance-api';
import { resolveMediaUrl } from '@/lib/media-url';
import type { MaintenanceTutorial } from '@/types/maintenance';

function getVideoLabel(tutorial: MaintenanceTutorial) {
	if (tutorial.video_url) {
		return 'External URL';
	}

	if (tutorial.video_file) {
		return 'Uploaded file';
	}

	return 'No video';
}

function getVideoHref(tutorial: MaintenanceTutorial) {
	if (tutorial.video_url) {
		return tutorial.video_url;
	}

	if (tutorial.video_file) {
		return resolveMediaUrl(tutorial.video_file);
	}

	return null;
}

export function MaintenanceList() {
	const [tutorials, setTutorials] = useState<MaintenanceTutorial[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [formTutorial, setFormTutorial] = useState<
		MaintenanceTutorial | null | undefined
	>(undefined);
	const [togglingId, setTogglingId] = useState<number | null>(null);

	const loadTutorials = useCallback(async () => {
		setLoading(true);
		setError('');

		try {
			const data = await fetchMaintenanceTutorials();
			setTutorials(data);
		} catch (loadError) {
			setError(
				loadError instanceof Error
					? loadError.message
					: 'Failed to load maintenance tutorials.',
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void loadTutorials();
	}, [loadTutorials]);

	const handleDelete = async (tutorial: MaintenanceTutorial) => {
		const confirmed = window.confirm(
			`Delete "${tutorial.title}"? This action cannot be undone.`,
		);

		if (!confirmed) {
			return;
		}

		try {
			await deleteMaintenanceTutorial(tutorial.id);
			setTutorials((current) =>
				current.filter((item) => item.id !== tutorial.id),
			);
		} catch (deleteError) {
			window.alert(
				deleteError instanceof Error
					? deleteError.message
					: 'Failed to delete tutorial.',
			);
		}
	};

	const handleToggleHomepage = async (
		tutorial: MaintenanceTutorial,
		showOnHomepage: boolean,
	) => {
		setTogglingId(tutorial.id);

		try {
			const updated = await toggleMaintenanceTutorialHomepage(
				tutorial.id,
				showOnHomepage,
			);
			setTutorials((current) =>
				current.map((item) => (item.id === tutorial.id ? updated : item)),
			);
		} catch (toggleError) {
			window.alert(
				toggleError instanceof Error
					? toggleError.message
					: 'Failed to update homepage visibility.',
			);
		} finally {
			setTogglingId(null);
		}
	};

	const handleSaved = (tutorial: MaintenanceTutorial) => {
		setTutorials((current) => {
			const existingIndex = current.findIndex((item) => item.id === tutorial.id);

			if (existingIndex === -1) {
				return [tutorial, ...current];
			}

			return current.map((item) =>
				item.id === tutorial.id ? tutorial : item,
			);
		});
	};

	return (
		<div className='space-y-6'>
			<div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
				<div className='flex items-start gap-4'>
					<div className='rounded-2xl bg-[#c1272d]/10 p-4 text-[#c1272d]'>
						<Wrench className='h-6 w-6' strokeWidth={1.75} />
					</div>
					<div>
						<h1 className='text-2xl font-bold tracking-wide text-slate-900'>
							Maintenance
						</h1>
						<p className='mt-1 max-w-2xl text-sm text-slate-600'>
							Manage maintenance tutorials and how-to videos shown on the
							public website.
						</p>
					</div>
				</div>

				<div className='flex items-center gap-2 self-start'>
					<button
						type='button'
						onClick={() => void loadTutorials()}
						disabled={loading}
						className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[#c1272d]/30 hover:text-[#c1272d] disabled:cursor-not-allowed disabled:opacity-60'
					>
						<RefreshCw
							className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
						/>
						Refresh
					</button>
					<button
						type='button'
						onClick={() => setFormTutorial(null)}
						className='inline-flex items-center gap-2 rounded-lg bg-[#c1272d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a01f24]'
					>
						<Plus className='h-4 w-4' />
						Add tutorial
					</button>
				</div>
			</div>

			{error ? (
				<div className='rounded-xl border border-[#c1272d]/20 bg-[#c1272d]/5 px-4 py-3 text-sm text-[#c1272d]'>
					{error}
				</div>
			) : null}

			<div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
				<div className='hidden grid-cols-[minmax(0,1.2fr)_7rem_10rem_minmax(0,1fr)_7rem] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold tracking-wide text-slate-500 uppercase md:grid'>
					<span>Title</span>
					<span>Homepage</span>
					<span>Video</span>
					<span>Description</span>
					<span className='text-right'>Actions</span>
				</div>

				{loading ? (
					<div className='px-5 py-10 text-center text-sm text-slate-500'>
						Loading tutorials...
					</div>
				) : tutorials.length === 0 ? (
					<div className='px-5 py-10 text-center'>
						<p className='text-sm font-medium text-slate-700'>
							No maintenance tutorials yet.
						</p>
						<p className='mt-1 text-sm text-slate-500'>
							Add your first tutorial to populate the public site.
						</p>
					</div>
				) : (
					<ul className='divide-y divide-slate-200'>
						{tutorials.map((tutorial) => {
							const videoHref = getVideoHref(tutorial);

							return (
								<li
									key={tutorial.id}
									className='grid gap-4 px-5 py-4 md:grid-cols-[minmax(0,1.2fr)_7rem_10rem_minmax(0,1fr)_7rem] md:items-center'
								>
									<div>
										<p className='font-medium text-slate-900'>
											{tutorial.title}
										</p>
									</div>

									<div className='flex items-center'>
										<DashboardToggle
											checked={tutorial.show_on_homepage}
											disabled={togglingId === tutorial.id}
											label={`Show ${tutorial.title} on homepage`}
											onChange={(checked) =>
												void handleToggleHomepage(tutorial, checked)
											}
										/>
									</div>

									<div>
										<p className='text-sm text-slate-600'>
											{getVideoLabel(tutorial)}
										</p>
										{videoHref ? (
											<a
												href={videoHref}
												target='_blank'
												rel='noreferrer'
												className='mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#c1272d] hover:underline'
											>
												Open
												<ExternalLink className='h-3 w-3' />
											</a>
										) : null}
									</div>

									<p
										className='line-clamp-3 text-sm text-slate-600'
										title={tutorial.description || undefined}
									>
										{tutorial.description || '—'}
									</p>

									<div className='flex items-center justify-start gap-2 md:justify-end'>
										<button
											type='button'
											onClick={() => setFormTutorial(tutorial)}
											className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-[#c1272d]/30 hover:text-[#c1272d]'
											aria-label={`Edit ${tutorial.title}`}
										>
											<Pencil className='h-4 w-4' />
										</button>
										<button
											type='button'
											onClick={() => void handleDelete(tutorial)}
											className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-[#c1272d]/30 hover:text-[#c1272d]'
											aria-label={`Delete ${tutorial.title}`}
										>
											<Trash2 className='h-4 w-4' />
										</button>
									</div>
								</li>
							);
						})}
					</ul>
				)}
			</div>

			{formTutorial !== undefined ? (
				<MaintenanceFormModal
					tutorial={formTutorial}
					onClose={() => setFormTutorial(undefined)}
					onSaved={handleSaved}
				/>
			) : null}
		</div>
	);
}
