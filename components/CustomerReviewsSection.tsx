'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

import { fetchClientTestimonials } from '@/lib/public-testimonial-api';
import { resolveMediaUrl } from '@/lib/media-url';
import type { Testimonial } from '@/types/testimonial';

type CustomerReviewsSectionProps = {
	testimonials?: Testimonial[];
};

function renderStars(rating: number) {
	const filled = Math.round(rating);

	return Array.from({ length: 5 }).map((_, index) => (
		<FaStar
			key={index}
			className={`h-5 w-5 sm:h-6 sm:w-6 ${
				index < filled ? 'text-[#facc15]' : 'text-[#e2e8f0]'
			}`}
		/>
	));
}

export default function CustomerReviewsSection({
	testimonials: initialTestimonials = [],
}: CustomerReviewsSectionProps) {
	const [testimonials, setTestimonials] = useState(initialTestimonials);
	const [loading, setLoading] = useState(initialTestimonials.length === 0);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (initialTestimonials.length > 0) {
			setTestimonials(initialTestimonials);
			setLoading(false);
			return;
		}

		void fetchClientTestimonials()
			.then((items) =>
				setTestimonials(items.filter((testimonial) => testimonial.is_featured)),
			)
			.finally(() => setLoading(false));
	}, [initialTestimonials]);

	const count = testimonials.length;

	const go = useCallback(
		(dir: -1 | 1) => {
			setIndex((current) => (current + dir + count) % count);
		},
		[count],
	);

	if (loading) {
		return (
			<section
				className='relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24'
				aria-label='Customer reviews'
			>
				<div className='mx-auto max-w-4xl text-center'>
					<p className='text-sm text-[#64748b]'>Loading reviews...</p>
				</div>
			</section>
		);
	}

	if (count === 0) {
		return (
			<section
				className='relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24'
				aria-label='Customer reviews'
			>
				<div className='mx-auto max-w-4xl text-center'>
					<p className='text-sm text-[#64748b]'>
						Customer reviews will appear here once testimonials are published
						from the dashboard.
					</p>
				</div>
			</section>
		);
	}

	const current = testimonials[index];
	const imageUrl = current.client_image
		? resolveMediaUrl(current.client_image)
		: null;

	return (
		<section
			className='relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24'
			aria-label='Customer reviews'
		>
			<div className='relative z-10 mx-auto flex max-w-4xl items-center gap-3 sm:gap-6 lg:gap-10'>
				<button
					type='button'
					onClick={() => go(-1)}
					className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-[#94a3b8] shadow-sm transition hover:bg-[#e2e8f0] hover:text-[#64748b] sm:h-12 sm:w-12'
					aria-label='Previous review'
				>
					<HiChevronLeft className='h-6 w-6' />
				</button>

				<div className='min-w-0 flex-1 text-center'>
					{imageUrl ? (
						<div className='relative mx-auto mb-5 h-16 w-16 overflow-hidden rounded-full ring-2 ring-[#c1272d]/20'>
							<Image
								src={imageUrl}
								alt=''
								fill
								className='object-cover'
								sizes='64px'
							/>
						</div>
					) : null}

					<div className='mb-6 flex justify-center gap-1' aria-hidden>
						{renderStars(current.overall_rating)}
					</div>
					<blockquote>
						<p className='font-sans text-base leading-relaxed text-[#334155] sm:text-lg md:leading-8'>
							{current.testimonial_text}
						</p>
						<footer className='mt-6'>
							<cite className='not-italic'>
								<span className='font-sans text-base font-bold text-[#0f172a] sm:text-lg'>
									{current.client_name}
								</span>
								{current.company_name || current.designation ? (
									<span className='mt-1 block text-sm font-normal text-[#64748b]'>
										{[current.designation, current.company_name]
											.filter(Boolean)
											.join(' · ')}
									</span>
								) : null}
							</cite>
						</footer>
					</blockquote>
					<div className='mt-8 flex justify-center gap-2' aria-hidden>
						{testimonials.map((testimonial, itemIndex) => (
							<span
								key={testimonial.id}
								className={
									itemIndex === index
										? 'h-2 w-2 rounded-full bg-[#c1272d]'
										: 'h-2 w-2 rounded-full bg-[#cbd5e1]'
								}
							/>
						))}
					</div>
				</div>

				<button
					type='button'
					onClick={() => go(1)}
					className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#e11d48] bg-white text-[#e11d48] shadow-sm transition hover:bg-[#fff1f2] sm:h-12 sm:w-12'
					aria-label='Next review'
				>
					<HiChevronRight className='h-6 w-6' />
				</button>
			</div>
		</section>
	);
}
