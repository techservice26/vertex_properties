'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi2';
import FaqAccordion from '@/components/FaqAccordion';
import { FAQ_ITEMS } from '@/data/faqContent';

const stats = [
	{ value: '24/7', label: 'Emergency Support' },
	{ value: '85+', label: 'Active Projects' },
	{ value: '4.8', label: 'Rated Trusted Service' },
	{ value: '4162', label: 'Projects Completed' },
];

const FAQ_ILLUSTRATION = '/images/frequently_asked_questions_illustration.png';

/** Home page: subset of FAQs in the curved section + stats. */
const HOME_FAQ_PREVIEW_COUNT = 6;

export default function FaqAndStatsSection() {
	const previewItems = FAQ_ITEMS.slice(0, HOME_FAQ_PREVIEW_COUNT);

	return (
		<section className='relative' aria-labelledby='faq-heading'>
			<div className='relative z-10 mx-auto '>
				<div className='relative overflow-visible rounded-t-[400px] bg-[#f9f9f9] px-5 pb-12 pt-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:px-8 sm:pb-14 lg:px-12 lg:pb-16'>
					<div
						className='pointer-events-none absolute -bottom-8 left-[-6%] z-0 text-[clamp(8rem,22vw,14rem)] font-serif font-bold leading-none text-white/25'
						aria-hidden
					>
						?
					</div>
					<div
						className='pointer-events-none absolute right-[8%] top-1/2 z-0 -translate-y-1/2 text-[clamp(6rem,18vw,11rem)] font-serif font-bold leading-none text-white/20'
						aria-hidden
					>
						?
					</div>

					<div
						className='pointer-events-none absolute -right-4 top-4 z-[1] h-[min(52vw,220px)] w-[min(92vw,360px)] sm:h-[280px] sm:w-[400px] lg:h-[320px] lg:w-[460px]'
						aria-hidden
					>
						<Image
							src={FAQ_ILLUSTRATION}
							alt=''
							fill
							className='object-contain object-[right_bottom]'
							sizes='(max-width: 640px) 360px, 460px'
						/>
					</div>

					<div className='relative z-10 mx-auto max-w-2xl px-1 pt-2 text-center sm:px-2 sm:pr-[min(42%,220px)] md:pr-[240px] lg:pr-64'>
						<p className='text-xs font-bold uppercase tracking-[0.2em] text-[#c1272d] sm:text-sm'>
							Got Questions?
						</p>
						<h2
							id='faq-heading'
							className='mt-2 font-sans text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl md:text-4xl'
						>
							Frequently Asked Questions
						</h2>
					</div>

					<div className='relative z-10 mx-auto mt-10 max-w-3xl sm:mt-12'>
						<FaqAccordion items={previewItems} defaultOpenIndex={1} />
					</div>

					<div className='relative z-10 mx-auto mt-8 max-w-3xl sm:mt-10'>
						<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4'>
							<Link
								href='/faq'
								className='inline-flex shrink-0 items-center gap-2 font-sans text-sm font-bold text-[#0f172a] transition hover:text-[#c1272d] sm:text-base'
							>
								View All FAQ&apos;s
								<HiArrowRight className='h-5 w-5' />
							</Link>
							<div
								className='h-px flex-1 bg-[#d1d5db]'
								aria-hidden
							/>
						</div>
					</div>

					<div className='relative z-10 mx-auto mt-14 max-w-4xl sm:mt-16'>
						<div className='flex flex-wrap sm:flex-nowrap'>
							{stats.map((s, i) => (
								<div
									key={`${s.label}-${i}`}
									className={`relative flex w-1/2 flex-col items-center px-3 py-8 text-center sm:w-0 sm:flex-1 sm:py-6 ${
										i % 2 === 1
											? 'border-l border-dotted border-[#cbd5e1]'
											: ''
									} ${
										i >= 2
											? 'border-t border-dotted border-[#cbd5e1]'
											: ''
									} ${
										i > 0
											? 'sm:border-l sm:border-dotted sm:border-[#cbd5e1] sm:border-t-0'
											: 'sm:border-t-0'
									}`}
								>
									{i % 2 === 1 ? (
										<span
											className='absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c1272d] sm:hidden'
											aria-hidden
										/>
									) : null}
									{i > 0 ? (
										<span
											className='absolute left-0 top-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c1272d] sm:block'
											aria-hidden
										/>
									) : null}
									<p className='inline-block rounded-md border-2 border-[#c1272d] px-3 py-1 font-sans text-3xl font-bold tabular-nums text-[#c1272d] sm:px-4 sm:text-4xl'>
										{s.value}
									</p>
									<p className='mt-2 max-w-[10rem] font-sans text-xs font-bold leading-snug text-[#0f172a] sm:max-w-[9rem] sm:text-sm'>
										{s.label}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
