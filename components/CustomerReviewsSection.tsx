'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const reviews = [
	{
		name: 'Daisey H.',
		text: "I've used Vertex Property Services two times. They were friendly, clean, quick and efficient. They were able to successfully fix everything we needed help with. Their office staff was also professional and attentive.",
	},
	{
		name: 'Marcus T.',
		text: 'Our management company relies on Vertex for turnovers and emergency repairs. Response times are excellent, pricing is transparent, and the crews consistently leave units presentable for the next resident.',
	},
	{
		name: 'Jennifer L.',
		text: 'From a leaking water heater to exterior paint prep, they handled it all without me chasing them. Communication was clear, work was on schedule, and I would not hesitate to call them again.',
	},
];

export default function CustomerReviewsSection() {
	const [index, setIndex] = useState(0);
	const count = reviews.length;

	const go = useCallback(
		(dir: -1 | 1) => {
			setIndex((i) => (i + dir + count) % count);
		},
		[count],
	);

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
					<div
						className='mb-6 flex justify-center gap-1 text-[#facc15]'
						aria-hidden
					>
						{Array.from({ length: 5 }).map((_, i) => (
							<FaStar key={i} className='h-5 w-5 sm:h-6 sm:w-6' />
						))}
					</div>
					<blockquote>
						<p className='font-sans text-base leading-relaxed text-[#334155] sm:text-lg md:leading-8'>
							{reviews[index].text}
						</p>
						<footer className='mt-6'>
							<cite className='not-italic'>
								<span className='font-sans text-base font-bold text-[#0f172a] sm:text-lg'>
									{reviews[index].name}
								</span>
							</cite>
						</footer>
					</blockquote>
					<div className='mt-8 flex justify-center gap-2' aria-hidden>
						{reviews.map((_, i) => (
							<span
								key={i}
								className={
									i === index
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
