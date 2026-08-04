'use client';

import { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';

import { createRecentWork, updateRecentWork } from '@/lib/recent-work-api';
import { resolveMediaUrl } from '@/lib/media-url';
import type { RecentWork } from '@/types/recent-work';

type RecentWorksFormModalProps = {
	work?: RecentWork | null;
	onClose: () => void;
	onSaved: (work: RecentWork) => void;
};

const inputClassName =
	'w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#c1272d] focus:ring-2 focus:ring-[#c1272d]/10';

export function RecentWorksFormModal({
	work,
	onClose,
	onSaved,
}: RecentWorksFormModalProps) {
	const isEditing = Boolean(work);

	const [projectTitle, setProjectTitle] = useState(work?.project_title ?? '');
	const [doneDate, setDoneDate] = useState(work?.done_date ?? '');
	const [description, setDescription] = useState(work?.description ?? '');
	const [projectImage, setProjectImage] = useState<File | null>(null);
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

		if (!projectTitle.trim()) {
			setError('Project title is required.');
			return;
		}

		if (!doneDate) {
			setError('Completion date is required.');
			return;
		}

		if (!isEditing && !projectImage) {
			setError('Project image is required.');
			return;
		}

		setSaving(true);

		try {
			const payload = {
				project_title: projectTitle.trim(),
				done_date: doneDate,
				description: description.trim(),
				project_image: projectImage,
			};

			const saved = isEditing
				? await updateRecentWork(work!.id, payload)
				: await createRecentWork(payload);

			onSaved(saved);
			onClose();
		} catch (submitError) {
			setError(
				submitError instanceof Error
					? submitError.message
					: 'Failed to save recent work.',
			);
		} finally {
			setSaving(false);
		}
	};

	const existingImageUrl = work?.project_image
		? resolveMediaUrl(work.project_image)
		: null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4'>
			<div className='max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl'>
				<div className='flex items-center justify-between border-b border-slate-200 px-6 py-4'>
					<h2 className='text-lg font-semibold text-slate-900'>
						{isEditing ? 'Edit recent work' : 'Add recent work'}
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
							htmlFor='project_title'
							className='mb-1 block text-sm font-medium text-slate-700'
						>
							Project title
						</label>
						<input
							id='project_title'
							type='text'
							className={inputClassName}
							value={projectTitle}
							onChange={(event) => setProjectTitle(event.target.value)}
							placeholder='Kitchen and bathroom remodel in Staten Island'
							required
						/>
					</div>

					<div>
						<label
							htmlFor='done_date'
							className='mb-1 block text-sm font-medium text-slate-700'
						>
							Completion date
						</label>
						<input
							id='done_date'
							type='date'
							className={inputClassName}
							value={doneDate}
							onChange={(event) => setDoneDate(event.target.value)}
							required
						/>
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
							placeholder='Brief summary of the completed project.'
						/>
						<p className='mt-1 text-xs text-slate-500'>
							{description.length}/2000 characters
						</p>
					</div>

					<div>
						<label
							htmlFor='project_image'
							className='mb-1 block text-sm font-medium text-slate-700'
						>
							Project image
						</label>
						<label className='flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600 transition hover:border-[#c1272d]/40 hover:bg-[#c1272d]/5'>
							<Upload className='h-4 w-4' />
							{projectImage
								? projectImage.name
								: 'Choose image (JPG, PNG, WebP)'}
							<input
								id='project_image'
								type='file'
								accept='image/*'
								className='hidden'
								onChange={(event) =>
									setProjectImage(event.target.files?.[0] ?? null)
								}
							/>
						</label>
						{existingImageUrl && !projectImage ? (
							<p className='mt-2 text-xs text-slate-500'>
								Current image uploaded. Choose a new file to replace it.
							</p>
						) : null}
					</div>

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
							{saving ? 'Saving...' : isEditing ? 'Save changes' : 'Add project'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
