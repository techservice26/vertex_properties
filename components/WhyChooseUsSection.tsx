'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const features = [
	{
		title: 'In-House Technicians',
		description:
			'We have certified, skilled, and licensed in-house technicians in the states where we work, helping us maintain high consistency, accountability, and reliable service quality across every assignment.',
		imageSrc: '/images/whyChooseUs/in_house_techs.png',
		imageAlt: 'In-house technician with tools',
	},
	{
		title: 'Trusted Vertex Partner',
		description:
			"We are licensed, bonded, and insured, and we carry General Liability, Professional Liability, and Workers' Compensation insurance for added protection, security, and long term peace of mind.",
		imageSrc: '/images/whyChooseUs/trusted_vertex_partner.png',
		imageAlt: 'Handshake partnership illustration',
	},
	{
		title: 'Property Support',
		description:
			'Our work is built around the priorities of property management teams: fast response, professional communication, clean execution, vendor reliability, and keeping properties ready for residents, owners, and inspections.',
		imageSrc: '/images/whyChooseUs/property_support.png',
		imageAlt: 'Property support headset illustration',
	},
];

export default function WhyChooseUsSection() {
	const scrollerRef = useRef<HTMLDivElement>(null);

	const scrollByCard = (dir: -1 | 1) => {
		const el = scrollerRef.current;
		if (!el) return;
		const card = el.querySelector<HTMLElement>('[data-why-card]');
		const w = card?.offsetWidth ?? 280;
		el.scrollBy({ left: dir * (w + 24), behavior: 'smooth' });
	};

	return (
		<section
			className='bg-[#f9f9f9] px-4 py-14 sm:px-6 sm:py-16 lg:py-20'
			aria-labelledby='why-choose-heading'
		>
			<div className='mx-auto max-w-5xl'>
				<div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
					<div className='text-center sm:text-left'>
						<p className='text-xs font-bold uppercase tracking-[0.2em] text-[#c1272d] sm:text-sm'>
							Why choose us
						</p>
						<h2
							id='why-choose-heading'
							className='mt-2 max-w-xl font-sans text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl md:text-4xl'
						>
							Why Choose Vertex Property Maintenance
						</h2>
					</div>

					<div
						className='flex justify-center sm:justify-end'
						role='group'
						aria-label='Scroll feature cards'
					>
						<div className='inline-flex items-center gap-0 rounded-full border border-[#e8edf3] bg-[#f9f9f9] p-1 shadow-sm'>
							<button
								type='button'
								onClick={() => scrollByCard(-1)}
								className='flex h-9 w-9 items-center justify-center rounded-full text-[#c1272d] transition hover:bg-[#fef2f2]'
								aria-label='Scroll left'
							>
								<HiChevronLeft className='h-5 w-5' />
							</button>
							<span
								className='mx-0.5 h-5 w-px bg-[#d1d5db]'
								aria-hidden
							/>
							<button
								type='button'
								onClick={() => scrollByCard(1)}
								className='flex h-9 w-9 items-center justify-center rounded-full text-[#c1272d] transition hover:bg-[#fef2f2]'
								aria-label='Scroll right'
							>
								<HiChevronRight className='h-5 w-5' />
							</button>
						</div>
					</div>
				</div>

				<div
					ref={scrollerRef}
					className='-mx-4 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 scrollbar-none sm:-mx-0 sm:mt-12 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 md:gap-8'
					style={{ scrollbarWidth: 'none' }}
				>
					{features.map((f) => (
						<article
							key={f.title}
							data-why-card
							className='w-[min(100%,320px)] shrink-0 snap-center rounded-2xl bg-white p-6 text-center shadow-[0_4px_24px_rgba(15,23,42,0.08)] ring-1 ring-[#f1f5f9] sm:w-auto sm:snap-none sm:p-7'
						>
							<div className='mb-5 flex min-h-[120px] items-center justify-center'>
								<Image
									src={f.imageSrc}
									alt={f.imageAlt}
									width={160}
									height={160}
									className='h-[80px] w-auto max-w-full object-contain'
									sizes='(max-width: 640px) 200px, 180px'
								/>
							</div>
							<h3 className='font-sans text-lg font-bold text-[#0f172a] sm:text-xl'>
								{f.title}
							</h3>
							<p className='mt-3 font-sans text-sm leading-relaxed text-[#64748b]'>
								{f.description}
							</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
