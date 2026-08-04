'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';

import { createTestimonial, updateTestimonial } from '@/lib/testimonial-api';
import { resolveMediaUrl } from '@/lib/media-url';
import type { Testimonial } from '@/types/testimonial';

type TestimonialFormModalProps = {
	testimonial?: Testimonial | null;
	onClose: () => void;
	onSaved: (testimonial: Testimonial) => void;
};

const inputClassName =
	'w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#c1272d] focus:ring-2 focus:ring-[#c1272d]/10';

const ratingFields = [
	{ key: 'service_quality', label: 'Service quality' },
	{ key: 'communication', label: 'Communication' },
	{ key: 'professionalism', label: 'Professionalism' },
	{ key: 'punctuality', label: 'Punctuality' },
	{ key: 'value_for_money', label: 'Value for money' },
] as const;

type RatingKey = (typeof ratingFields)[number]['key'];

function clampRating(value: number) {
	return Math.min(5, Math.max(1, value));
}

export function TestimonialFormModal({
	testimonial,
	onClose,
	onSaved,
}: TestimonialFormModalProps) {
	const isEditing = Boolean(testimonial);

	const [clientName, setClientName] = useState(testimonial?.client_name ?? '');
	const [designation, setDesignation] = useState(testimonial?.designation ?? '');
	const [companyName, setCompanyName] = useState(testimonial?.company_name ?? '');
	const [testimonialText, setTestimonialText] = useState(
		testimonial?.testimonial_text ?? '',
	);
	const [ratings, setRatings] = useState<Record<RatingKey, number>>({
		service_quality: testimonial?.service_quality ?? 5,
		communication: testimonial?.communication ?? 5,
		professionalism: testimonial?.professionalism ?? 5,
		punctuality: testimonial?.punctuality ?? 5,
		value_for_money: testimonial?.value_for_money ?? 5,
	});
	const [isFeatured, setIsFeatured] = useState(testimonial?.is_featured ?? false);
	const [displayOrder, setDisplayOrder] = useState(
		String(testimonial?.display_order ?? 0),
	);
	const [clientImage, setClientImage] = useState<File | null>(null);
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

		if (!clientName.trim()) {
			setError('Client name is required.');
			return;
		}

		if (!testimonialText.trim()) {
			setError('Testimonial text is required.');
			return;
		}

		setSaving(true);

		try {
			const payload = {
				client_name: clientName.trim(),
				designation: designation.trim(),
				company_name: companyName.trim(),
				testimonial_text: testimonialText.trim(),
				service_quality: ratings.service_quality,
				communication: ratings.communication,
				professionalism: ratings.professionalism,
				punctuality: ratings.punctuality,
				value_for_money: ratings.value_for_money,
				is_featured: isFeatured,
				display_order: Number(displayOrder) || 0,
				client_image: clientImage,
			};

			const saved = isEditing
				? await updateTestimonial(testimonial!.id, payload)
				: await createTestimonial(payload);

			onSaved(saved);
			onClose();
		} catch (submitError) {
			setError(
				submitError instanceof Error
					? submitError.message
					: 'Failed to save testimonial.',
			);
		} finally {
			setSaving(false);
		}
	};

	const existingImageUrl = testimonial?.client_image
		? resolveMediaUrl(testimonial.client_image)
		: null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4'>
			<div className='max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl'>
				<div className='flex items-center justify-between border-b border-slate-200 px-6 py-4'>
					<h2 className='text-lg font-semibold text-slate-900'>
						{isEditing ? 'Edit testimonial' : 'Add testimonial'}
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
					<div className='grid gap-4 sm:grid-cols-2'>
						<div>
							<label htmlFor='client_name' className='mb-1 block text-sm font-medium text-slate-700'>
								Client name
							</label>
							<input
								id='client_name'
								type='text'
								className={inputClassName}
								value={clientName}
								onChange={(event) => setClientName(event.target.value)}
								required
							/>
						</div>
						<div>
							<label htmlFor='company_name' className='mb-1 block text-sm font-medium text-slate-700'>
								Company
							</label>
							<input
								id='company_name'
								type='text'
								className={inputClassName}
								value={companyName}
								onChange={(event) => setCompanyName(event.target.value)}
							/>
						</div>
					</div>

					<div className='grid gap-4 sm:grid-cols-2'>
						<div>
							<label htmlFor='designation' className='mb-1 block text-sm font-medium text-slate-700'>
								Designation
							</label>
							<input
								id='designation'
								type='text'
								className={inputClassName}
								value={designation}
								onChange={(event) => setDesignation(event.target.value)}
							/>
						</div>
						<div>
							<label htmlFor='display_order' className='mb-1 block text-sm font-medium text-slate-700'>
								Display order
							</label>
							<input
								id='display_order'
								type='number'
								min={0}
								className={inputClassName}
								value={displayOrder}
								onChange={(event) => setDisplayOrder(event.target.value)}
							/>
						</div>
					</div>

					<div>
						<label htmlFor='testimonial_text' className='mb-1 block text-sm font-medium text-slate-700'>
							Review text
						</label>
						<textarea
							id='testimonial_text'
							rows={5}
							maxLength={2000}
							className={inputClassName}
							value={testimonialText}
							onChange={(event) => setTestimonialText(event.target.value)}
							required
						/>
						<p className='mt-1 text-xs text-slate-500'>
							{testimonialText.length}/2000 characters
						</p>
					</div>

					<div>
						<p className='mb-2 text-sm font-medium text-slate-700'>Ratings (1-5)</p>
						<div className='grid gap-3 sm:grid-cols-2'>
							{ratingFields.map(({ key, label }) => (
								<label key={key} className='block text-sm text-slate-600'>
									<span className='mb-1 block font-medium text-slate-700'>{label}</span>
									<select
										className={inputClassName}
										value={ratings[key]}
										onChange={(event) =>
											setRatings((current) => ({
												...current,
												[key]: clampRating(Number(event.target.value)),
											}))
										}
									>
										{[1, 2, 3, 4, 5].map((value) => (
											<option key={value} value={value}>
												{value}
											</option>
										))}
									</select>
								</label>
							))}
						</div>
					</div>

					<div>
						<label htmlFor='client_image' className='mb-1 block text-sm font-medium text-slate-700'>
							Client photo
						</label>
						<label className='flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600 transition hover:border-[#c1272d]/40 hover:bg-[#c1272d]/5'>
							<Upload className='h-4 w-4' />
							{clientImage ? clientImage.name : 'Choose image (JPG, PNG, WebP)'}
							<input
								id='client_image'
								type='file'
								accept='image/*'
								className='hidden'
								onChange={(event) =>
									setClientImage(event.target.files?.[0] ?? null)
								}
							/>
						</label>
						{existingImageUrl && !clientImage ? (
							<div className='mt-3 flex items-center gap-3'>
								<div className='relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-slate-200'>
									<Image
										src={existingImageUrl}
										alt='Current client photo'
										fill
										className='object-cover'
									/>
								</div>
								<p className='text-xs text-slate-500'>Current photo uploaded</p>
							</div>
						) : null}
					</div>

					<label className='flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3'>
						<input
							type='checkbox'
							checked={isFeatured}
							onChange={(event) => setIsFeatured(event.target.checked)}
							className='mt-0.5 h-4 w-4 rounded border-slate-300 text-[#c1272d] focus:ring-[#c1272d]/20'
						/>
						<span>
							<span className='block text-sm font-medium text-slate-800'>
								Featured testimonial
							</span>
							<span className='mt-0.5 block text-xs text-slate-500'>
								Highlight this review on the public website.
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
							{saving ? 'Saving...' : isEditing ? 'Save changes' : 'Add testimonial'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
