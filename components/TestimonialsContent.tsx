'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';

import { fetchClientTestimonials } from '@/lib/public-testimonial-api';
import { resolveMediaUrl } from '@/lib/media-url';
import type { Testimonial } from '@/types/testimonial';

function renderStars(rating: number) {
	const filled = Math.round(rating);

	return Array.from({ length: 5 }).map((_, index) => (
		<FaStar
			key={index}
			className={`h-4 w-4 ${
				index < filled ? 'text-[#facc15]' : 'text-[#e2e8f0]'
			}`}
		/>
	));
}

export default function TestimonialsContent() {
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		void fetchClientTestimonials()
			.then(setTestimonials)
			.catch((fetchError) => {
				setError(
					fetchError instanceof Error
						? fetchError.message
						: 'Failed to load testimonials.',
				);
			})
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<div className='bg-white px-4 py-16 sm:px-6 lg:px-8'>
				<div className='mx-auto max-w-5xl text-center'>
					<p className='text-sm text-[#64748b]'>Loading testimonials...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='bg-white px-4 py-16 sm:px-6 lg:px-8'>
				<div className='mx-auto max-w-5xl text-center'>
					<p className='text-sm text-[#c1272d]'>{error}</p>
				</div>
			</div>
		);
	}

	if (testimonials.length === 0) {
		return (
			<div className='bg-white px-4 py-16 sm:px-6 lg:px-8'>
				<div className='mx-auto max-w-5xl text-center'>
					<p className='text-sm text-[#64748b]'>
						No testimonials have been published yet.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
			<div className='mx-auto max-w-5xl'>
				<ul className='grid list-none grid-cols-1 gap-6 md:grid-cols-2'>
					{testimonials.map((testimonial) => {
						const imageUrl = testimonial.client_image
							? resolveMediaUrl(testimonial.client_image)
							: null;

						return (
							<li
								key={testimonial.id}
								className='rounded-2xl border border-[#e8edf3] bg-white p-6 shadow-sm'
							>
								<div className='flex items-start gap-4'>
									<div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200'>
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
										<p className='font-sans text-base font-bold text-[#0f172a]'>
											{testimonial.client_name}
										</p>
										{testimonial.company_name || testimonial.designation ? (
											<p className='mt-0.5 text-sm text-[#64748b]'>
												{[testimonial.designation, testimonial.company_name]
													.filter(Boolean)
													.join(' · ')}
											</p>
										) : null}
									</div>
								</div>

								<div className='mt-4 flex items-center gap-1'>
									{renderStars(testimonial.overall_rating)}
									<span className='ml-2 text-sm font-semibold text-[#c1272d]'>
										{testimonial.overall_rating}
									</span>
								</div>

								<p className='mt-4 text-sm leading-relaxed text-[#334155]'>
									{testimonial.testimonial_text}
								</p>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
