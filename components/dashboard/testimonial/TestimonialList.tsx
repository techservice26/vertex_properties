'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { MessageSquareQuote, Pencil, Plus, RefreshCw, Star, Trash2 } from 'lucide-react';

import { DashboardToggle } from '@/components/dashboard/DashboardToggle';
import { TestimonialFormModal } from '@/components/dashboard/testimonial/TestimonialFormModal';
import {
	deleteTestimonial,
	fetchTestimonials,
	toggleTestimonialFeatured,
} from '@/lib/testimonial-api';
import { resolveMediaUrl } from '@/lib/media-url';
import type { Testimonial } from '@/types/testimonial';

function sortTestimonials(items: Testimonial[]) {
	return [...items].sort((a, b) => {
		if (a.display_order !== b.display_order) {
			return a.display_order - b.display_order;
		}

		return b.id - a.id;
	});
}

export function TestimonialList() {
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [formTestimonial, setFormTestimonial] = useState<
		Testimonial | null | undefined
	>(undefined);
	const [togglingId, setTogglingId] = useState<number | null>(null);

	const loadTestimonials = useCallback(async () => {
		setLoading(true);
		setError('');

		try {
			const data = await fetchTestimonials();
			setTestimonials(sortTestimonials(data));
		} catch (loadError) {
			setError(
				loadError instanceof Error
					? loadError.message
					: 'Failed to load testimonials.',
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void loadTestimonials();
	}, [loadTestimonials]);

	const handleDelete = async (testimonial: Testimonial) => {
		const confirmed = window.confirm(
			`Delete testimonial from "${testimonial.client_name}"? This action cannot be undone.`,
		);

		if (!confirmed) {
			return;
		}

		try {
			await deleteTestimonial(testimonial.id);
			setTestimonials((current) =>
				current.filter((item) => item.id !== testimonial.id),
			);
		} catch (deleteError) {
			window.alert(
				deleteError instanceof Error
					? deleteError.message
					: 'Failed to delete testimonial.',
			);
		}
	};

	const handleToggleFeatured = async (
		testimonial: Testimonial,
		isFeatured: boolean,
	) => {
		setTogglingId(testimonial.id);

		try {
			const updated = await toggleTestimonialFeatured(
				testimonial.id,
				isFeatured,
			);
			setTestimonials((current) =>
				sortTestimonials(
					current.map((item) => (item.id === testimonial.id ? updated : item)),
				),
			);
		} catch (toggleError) {
			window.alert(
				toggleError instanceof Error
					? toggleError.message
					: 'Failed to update featured status.',
			);
		} finally {
			setTogglingId(null);
		}
	};

	const handleSaved = (testimonial: Testimonial) => {
		setTestimonials((current) => {
			const existingIndex = current.findIndex((item) => item.id === testimonial.id);

			if (existingIndex === -1) {
				return sortTestimonials([testimonial, ...current]);
			}

			return sortTestimonials(
				current.map((item) => (item.id === testimonial.id ? testimonial : item)),
			);
		});
	};

	return (
		<div className='space-y-6'>
			<div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
				<div className='flex items-start gap-4'>
					<div className='rounded-2xl bg-[#c1272d]/10 p-4 text-[#c1272d]'>
						<MessageSquareQuote className='h-6 w-6' strokeWidth={1.75} />
					</div>
					<div>
						<h1 className='text-2xl font-bold tracking-wide text-slate-900'>
							Testimonials
						</h1>
						<p className='mt-1 max-w-2xl text-sm text-slate-600'>
							Manage customer reviews and ratings shown on the public website.
						</p>
					</div>
				</div>

				<div className='flex items-center gap-2 self-start'>
					<button
						type='button'
						onClick={() => void loadTestimonials()}
						disabled={loading}
						className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[#c1272d]/30 hover:text-[#c1272d] disabled:cursor-not-allowed disabled:opacity-60'
					>
						<RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
						Refresh
					</button>
					<button
						type='button'
						onClick={() => setFormTestimonial(null)}
						className='inline-flex items-center gap-2 rounded-lg bg-[#c1272d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a01f24]'
					>
						<Plus className='h-4 w-4' />
						Add testimonial
					</button>
				</div>
			</div>

			{error ? (
				<div className='rounded-xl border border-[#c1272d]/20 bg-[#c1272d]/5 px-4 py-3 text-sm text-[#c1272d]'>
					{error}
				</div>
			) : null}

			<div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
				<div className='hidden grid-cols-[minmax(0,1.1fr)_7rem_5rem_minmax(0,1.2fr)_4rem_7rem] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold tracking-wide text-slate-500 uppercase md:grid'>
					<span>Client</span>
					<span>Featured</span>
					<span>Rating</span>
					<span>Review</span>
					<span>Order</span>
					<span className='text-right'>Actions</span>
				</div>

				{loading ? (
					<div className='px-5 py-10 text-center text-sm text-slate-500'>
						Loading testimonials...
					</div>
				) : testimonials.length === 0 ? (
					<div className='px-5 py-10 text-center'>
						<p className='text-sm font-medium text-slate-700'>
							No testimonials yet.
						</p>
						<p className='mt-1 text-sm text-slate-500'>
							Add your first customer review to populate the homepage section.
						</p>
					</div>
				) : (
					<ul className='divide-y divide-slate-200'>
						{testimonials.map((testimonial) => {
							const imageUrl = testimonial.client_image
								? resolveMediaUrl(testimonial.client_image)
								: null;

							return (
								<li
									key={testimonial.id}
									className='grid gap-4 px-5 py-4 md:grid-cols-[minmax(0,1.1fr)_7rem_5rem_minmax(0,1.2fr)_4rem_7rem] md:items-center'
								>
									<div className='flex items-center gap-3'>
										<div className='relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200'>
											{imageUrl ? (
												<Image
													src={imageUrl}
													alt=''
													fill
													className='object-cover'
												/>
											) : (
												<div className='flex h-full w-full items-center justify-center text-xs font-semibold text-slate-500'>
													{testimonial.client_name.slice(0, 2).toUpperCase()}
												</div>
											)}
										</div>
										<div className='min-w-0'>
											<p className='truncate font-medium text-slate-900'>
												{testimonial.client_name}
											</p>
											<p className='truncate text-xs text-slate-500'>
												{[testimonial.designation, testimonial.company_name]
													.filter(Boolean)
													.join(' · ') || '—'}
											</p>
										</div>
									</div>

									<div className='flex items-center'>
										<DashboardToggle
											checked={testimonial.is_featured}
											disabled={togglingId === testimonial.id}
											label={`Feature ${testimonial.client_name}`}
											onChange={(checked) =>
												void handleToggleFeatured(testimonial, checked)
											}
										/>
									</div>

									<div className='inline-flex items-center gap-1 text-sm font-semibold text-[#c1272d]'>
										<Star className='h-4 w-4 fill-current' />
										{testimonial.overall_rating}
									</div>

									<p
										className='line-clamp-3 text-sm text-slate-600'
										title={testimonial.testimonial_text}
									>
										{testimonial.testimonial_text}
									</p>

									<p className='text-sm text-slate-600'>
										{testimonial.display_order}
									</p>

									<div className='flex items-center justify-start gap-2 md:justify-end'>
										<button
											type='button'
											onClick={() => setFormTestimonial(testimonial)}
											className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-[#c1272d]/30 hover:text-[#c1272d]'
											aria-label={`Edit ${testimonial.client_name}`}
										>
											<Pencil className='h-4 w-4' />
										</button>
										<button
											type='button'
											onClick={() => void handleDelete(testimonial)}
											className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-[#c1272d]/30 hover:text-[#c1272d]'
											aria-label={`Delete ${testimonial.client_name}`}
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

			{formTestimonial !== undefined ? (
				<TestimonialFormModal
					testimonial={formTestimonial}
					onClose={() => setFormTestimonial(undefined)}
					onSaved={handleSaved}
				/>
			) : null}
		</div>
	);
}
