'use client';

import { useId, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi2';
import type { FaqItem } from '@/data/faqContent';

export type FaqAccordionProps = {
	items: FaqItem[];
	/** Initial open panel index, or null for all closed. */
	defaultOpenIndex?: number | null;
	className?: string;
	listClassName?: string;
	/** Show "Q1." prefix before each question. */
	showQuestionNumbers?: boolean;
};

export default function FaqAccordion({
	items,
	defaultOpenIndex = null,
	className = '',
	listClassName = '',
	showQuestionNumbers = true,
}: FaqAccordionProps) {
	const reactId = useId().replace(/:/g, '');
	const [openIndex, setOpenIndex] = useState<number | null>(
		defaultOpenIndex ?? null,
	);

	const toggle = (i: number) => {
		setOpenIndex((prev) => (prev === i ? null : i));
	};

	return (
		<div className={className}>
			<ul className={`space-y-3 ${listClassName}`}>
				{items.map((item, i) => {
					const open = openIndex === i;
					const qId = `faq-${reactId}-q-${i}`;
					const aId = `faq-${reactId}-a-${i}`;
					return (
						<li key={`${item.q}-${i}`}>
							<div
								className={`rounded-xl border border-[#e8edf3] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)] ${
									open ? 'ring-1 ring-[#fecaca]/80' : ''
								}`}
							>
								<button
									type='button'
									onClick={() => toggle(i)}
									className='flex w-full items-start justify-between gap-3 px-4 py-3 text-left sm:gap-4 sm:px-5 sm:py-4'
									aria-expanded={open}
									aria-controls={aId}
									id={qId}
								>
									<span
										className={`min-w-0 font-sans text-sm font-bold leading-snug sm:text-base ${
											open ? 'text-[#c1272d]' : 'text-[#0f172a]'
										}`}
									>
										{showQuestionNumbers ? `Q${i + 1}. ` : null}
										{item.q}
									</span>
									<span
										className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-white sm:h-10 sm:w-10 ${
											open ? 'bg-[#c1272d]' : 'bg-[#0f172a]'
										}`}
										aria-hidden
									>
										{open ? (
											<HiMinus className='h-5 w-5' />
										) : (
											<HiPlus className='h-5 w-5' />
										)}
									</span>
								</button>
								{open ? (
									<div
										id={aId}
										role='region'
										aria-labelledby={qId}
										className='border-t border-[#fecaca] px-4 pb-4 pt-3 sm:px-5'
									>
										<p className='text-left font-sans text-sm leading-relaxed text-[#64748b] sm:text-[0.9375rem]'>
											{item.a}
										</p>
									</div>
								) : null}
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
