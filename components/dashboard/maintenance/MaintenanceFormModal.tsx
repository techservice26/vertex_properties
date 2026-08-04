'use client';

import { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';

import {
	createMaintenanceTutorial,
	updateMaintenanceTutorial,
} from '@/lib/maintenance-api';
import { resolveMediaUrl } from '@/lib/media-url';
import type { MaintenanceTutorial } from '@/types/maintenance';

type MaintenanceFormModalProps = {
	tutorial?: MaintenanceTutorial | null;
	onClose: () => void;
	onSaved: (tutorial: MaintenanceTutorial) => void;
};

const inputClassName =
	'w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#c1272d] focus:ring-2 focus:ring-[#c1272d]/10';

export function MaintenanceFormModal({
	tutorial,
	onClose,
	onSaved,
}: MaintenanceFormModalProps) {
	const isEditing = Boolean(tutorial);

	const [title, setTitle] = useState(tutorial?.title ?? '');
	const [videoUrl, setVideoUrl] = useState(tutorial?.video_url ?? '');
	const [description, setDescription] = useState(tutorial?.description ?? '');
	const [showOnHomepage, setShowOnHomepage] = useState(
		tutorial?.show_on_homepage ?? false,
	);
	const [videoFile, setVideoFile] = useState<File | null>(null);
	const [error, setError] = useState('');
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [onClose]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError('');

		const trimmedTitle = title.trim();

		if (!trimmedTitle) {
			setError('Title is required.');
			return;
		}

		if (!isEditing && !videoUrl.trim() && !videoFile) {
			setError('Provide a video URL or upload a video file.');
			return;
		}

		setSaving(true);

		try {
			const payload = {
				title: trimmedTitle,
				video_url: videoUrl.trim(),
				description: description.trim(),
				video_file: videoFile,
				show_on_homepage: showOnHomepage,
			};

			const saved = isEditing
				? await updateMaintenanceTutorial(tutorial!.id, payload)
				: await createMaintenanceTutorial(payload);

			onSaved(saved);
			onClose();
		} catch (submitError) {
			setError(
				submitError instanceof Error
					? submitError.message
					: 'Failed to save tutorial.',
			);
		} finally {
			setSaving(false);
		}
	};

	const existingFileUrl = tutorial?.video_file
		? resolveMediaUrl(tutorial.video_file)
		: null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4'>
			<div className='max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl'>
				<div className='flex items-center justify-between border-b border-slate-200 px-6 py-4'>
					<h2 className='text-lg font-semibold text-slate-900'>
						{isEditing ? 'Edit maintenance tutorial' : 'Add maintenance tutorial'}
					</h2>
					<button
						type='button'
						onClick={onClose}
						className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'
						aria-label='Close'
					>
						<X className='h-5 w-5' />
					</button>
				</div>

				<form onSubmit={handleSubmit} className='space-y-5 px-6 py-5'>
					<div>
						<label
							htmlFor='title'
							className='mb-1 block text-sm font-medium text-slate-700'
						>
							Title
						</label>
						<input
							id='title'
							type='text'
							className={inputClassName}
							value={title}
							onChange={(event) => setTitle(event.target.value)}
							placeholder='How to replace a faucet'
							required
						/>
					</div>

					<div>
						<label
							htmlFor='video_url'
							className='mb-1 block text-sm font-medium text-slate-700'
						>
							Video URL
						</label>
						<input
							id='video_url'
							type='url'
							className={inputClassName}
							value={videoUrl}
							onChange={(event) => setVideoUrl(event.target.value)}
							placeholder='https://youtube.com/watch?v=...'
						/>
						<p className='mt-1 text-xs text-slate-500'>
							Optional if you upload a video file instead.
						</p>
					</div>

					<div>
						<label
							htmlFor='video_file'
							className='mb-1 block text-sm font-medium text-slate-700'
						>
							Video file
						</label>
						<label className='flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600 transition hover:border-[#c1272d]/40 hover:bg-[#c1272d]/5'>
							<Upload className='h-4 w-4' />
							{videoFile
								? videoFile.name
								: 'Choose video file (MP4, WebM, etc.)'}
							<input
								id='video_file'
								type='file'
								accept='video/*'
								className='hidden'
								onChange={(event) =>
									setVideoFile(event.target.files?.[0] ?? null)
								}
							/>
						</label>
						{existingFileUrl && !videoFile ? (
							<p className='mt-2 text-xs text-slate-500'>
								Current file:{' '}
								<a
									href={existingFileUrl}
									target='_blank'
									rel='noreferrer'
									className='font-medium text-[#c1272d] hover:underline'
								>
									View uploaded video
								</a>
							</p>
						) : null}
					</div>

					<div>
						<label
							htmlFor='description'
							className='mb-1 block text-sm font-medium text-slate-700'
						>
							Description
						</label>
						<textarea
							id='description'
							rows={4}
							maxLength={2000}
							className={inputClassName}
							value={description}
							onChange={(event) => setDescription(event.target.value)}
							placeholder='Brief summary of what this tutorial covers.'
						/>
						<p className='mt-1 text-xs text-slate-500'>
							{description.length}/2000 characters. Long descriptions scroll in
							the video player.
						</p>
					</div>

					<label className='flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3'>
						<input
							type='checkbox'
							checked={showOnHomepage}
							onChange={(event) => setShowOnHomepage(event.target.checked)}
							className='mt-0.5 h-4 w-4 rounded border-slate-300 text-[#c1272d] focus:ring-[#c1272d]/20'
						/>
						<span>
							<span className='block text-sm font-medium text-slate-800'>
								Show on homepage
							</span>
							<span className='mt-0.5 block text-xs text-slate-500'>
								Only tutorials with this enabled appear in the homepage
								maintenance section.
							</span>
						</span>
					</label>

					{error ? (
						<div className='rounded-lg border border-[#c1272d]/20 bg-[#c1272d]/5 px-3 py-2 text-sm text-[#c1272d]'>
							{error}
						</div>
					) : null}

					<div className='flex items-center justify-end gap-3 border-t border-slate-200 pt-4'>
						<button
							type='button'
							onClick={onClose}
							className='rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50'
						>
							Cancel
						</button>
						<button
							type='submit'
							disabled={saving}
							className='rounded-lg bg-[#c1272d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a01f24] disabled:cursor-not-allowed disabled:opacity-60'
						>
							{saving ? 'Saving...' : isEditing ? 'Save changes' : 'Add tutorial'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
