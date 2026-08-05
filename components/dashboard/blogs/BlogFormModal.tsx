'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

import { createBlog, updateBlog } from '@/lib/blog-api';
import { getBlogImageUrl } from '@/lib/blog-utils';
import { isRichTextEmpty, stripRichText } from '@/lib/rich-text-utils';
import { RichTextEditor } from '@/components/dashboard/RichTextEditor';
import type { Blog } from '@/types/blog';

type BlogFormModalProps = {
	blog?: Blog | null;
	onClose: () => void;
	onSaved: (blog: Blog) => void;
};

const inputClassName =
	'w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#c1272d] focus:ring-2 focus:ring-[#c1272d]/10';

export function BlogFormModal({ blog, onClose, onSaved }: BlogFormModalProps) {
	const isEditing = Boolean(blog);

	const [title, setTitle] = useState(blog?.title ?? '');
	const [description, setDescription] = useState(blog?.description ?? '');
	const [showOnHomepage, setShowOnHomepage] = useState(
		blog?.show_on_homepage ?? false,
	);
	const [image, setImage] = useState<File | null>(null);
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

		if (!title.trim()) {
			setError('Title is required.');
			return;
		}

		if (isRichTextEmpty(description)) {
			setError('Description is required.');
			return;
		}

		if (stripRichText(description).length > 4000) {
			setError('Description must be 4000 characters or fewer.');
			return;
		}

		setSaving(true);

		try {
			const payload = {
				title: title.trim(),
				description: description,
				show_on_homepage: showOnHomepage,
				image,
			};

			const saved = isEditing
				? await updateBlog(blog!.id, payload)
				: await createBlog(payload);

			onSaved(saved);
			onClose();
		} catch (submitError) {
			setError(
				submitError instanceof Error
					? submitError.message
					: 'Failed to save blog post.',
			);
		} finally {
			setSaving(false);
		}
	};

	const existingImageUrl = blog ? getBlogImageUrl(blog) : '';

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4'>
			<div className='max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl'>
				<div className='flex items-center justify-between border-b border-slate-200 px-6 py-4'>
					<h2 className='text-lg font-semibold text-slate-900'>
						{isEditing ? 'Edit blog post' : 'Add blog post'}
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
							htmlFor='blog_title'
							className='mb-1 block text-sm font-medium text-slate-700'
						>
							Title
						</label>
						<input
							id='blog_title'
							type='text'
							className={inputClassName}
							value={title}
							onChange={(event) => setTitle(event.target.value)}
							placeholder='Smart Home Repair Solutions For Modern Living'
							required
						/>
					</div>

					<RichTextEditor
						id='blog_description'
						label='Description'
						value={description}
						onChange={setDescription}
						placeholder='Short summary shown on the homepage and blog listing.'
						maxLength={4000}
						required
					/>

					<div>
						<label
							htmlFor='blog_image'
							className='mb-1 block text-sm font-medium text-slate-700'
						>
							Cover image
						</label>
						<label className='flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600 transition hover:border-[#c1272d]/40 hover:bg-[#c1272d]/5'>
							<Upload className='h-4 w-4' />
							{image ? image.name : 'Choose image (JPG, PNG, WebP)'}
							<input
								id='blog_image'
								type='file'
								accept='image/*'
								className='hidden'
								onChange={(event) => setImage(event.target.files?.[0] ?? null)}
							/>
						</label>
						{existingImageUrl && !image ? (
							<div className='mt-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-3'>
								<div className='relative aspect-[4/3] w-full max-w-xs'>
									<Image
										src={existingImageUrl}
										alt={blog?.title ?? title}
										fill
										className='object-cover'
										sizes='320px'
									/>
								</div>
							</div>
						) : null}
					</div>

					<label className='flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3'>
						<input
							type='checkbox'
							checked={showOnHomepage}
							onChange={(event) => setShowOnHomepage(event.target.checked)}
							className='h-4 w-4 rounded border-slate-300 text-[#c1272d] focus:ring-[#c1272d]'
						/>
						<span className='text-sm text-slate-700'>
							Show in Vertex Insights &amp; Articles on homepage
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
							{saving ? 'Saving...' : isEditing ? 'Save changes' : 'Add post'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
