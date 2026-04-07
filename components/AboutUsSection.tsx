import Image from 'next/image';

const highlightCards = [
	{
		title: 'All Property Types',
		sub: 'Vendor coverage and support',
	},
	{
		title: 'In-House Techs',
		sub: 'Skilled field teams where we operate',
	},
	{
		title: 'All Property Types',
		sub: 'Residential, commercial, REO, multifamily',
	},
	{
		title: 'One Vendor',
		sub: 'Multiple trades and services',
	},
];

export default function AboutUsSection() {
	return (
		<section className='relative overflow-visible bg-white py-14 sm:py-16 lg:py-20'>
			<div className='relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
				<h2 className='font-sans text-3xl font-bold tracking-tight text-[#061a2f] md:text-4xl'>
					About Us
				</h2>
				<p className='mt-5 font-sans text-base leading-relaxed text-[#475569] md:text-lg'>
					Vertex Property Services Inc focuses on property
					preservation and maintenance so owners and managers can
					protect value, stay compliant, and keep buildings running
					without juggling dozens of contractors. We combine field
					experience with clear communication—whether you need a
					single repair or ongoing coverage across a portfolio.
				</p>

				<div className='relative z-10 mt-10 space-y-6 pb-20 sm:pb-24 md:mt-12 md:space-y-8'>
					<div className='grid gap-6 md:grid-cols-2 md:gap-8'>
						<article className='rounded-2xl border border-[#e8edf3] bg-white p-6 shadow-sm md:p-8'>
							<h3 className='font-sans text-xl font-bold text-[#061a2f]'>
								What We Do
							</h3>
							<p className='mt-3 font-sans text-sm leading-relaxed text-[#64748b] md:text-base'>
								We deliver landscaping, plumbing, electrical,
								HVAC, lock changes, debris removal,
								winterization, and general repairs— coordinated
								under one workflow so work orders, photos, and
								status updates stay in one place.
							</p>
						</article>
						<article className='rounded-2xl border border-[#e8edf3] bg-white p-6 shadow-sm md:p-8'>
							<h3 className='font-sans text-xl font-bold text-[#061a2f]'>
								Our Promise
							</h3>
							<p className='mt-3 font-sans text-sm leading-relaxed text-[#64748b] md:text-base'>
								Our motto is simple:{' '}
								<span className='font-semibold text-[#061a2f]'>
									Your Property, Our Responsibility.
								</span>{' '}
								We show up on time, document the work, and stand
								behind quality you can defend to lenders,
								insurers, and residents.
							</p>
						</article>
					</div>

					<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
						{highlightCards.map((item) => (
							<article
								key={`${item.title}-${item.sub}`}
								className='rounded-2xl border border-[#e8edf3] bg-[#fafbfc] p-5 shadow-sm md:p-6'
							>
								<h4 className='font-sans text-base font-bold text-[#061a2f] md:text-lg'>
									{item.title}
								</h4>
								<p className='mt-2 font-sans text-sm leading-relaxed text-[#64748b]'>
									{item.sub}
								</p>
							</article>
						))}
					</div>
				</div>

				{/* Decorative hard hat — bottom right */}
				<div
					className='absolute bottom-20 -right-[150px] z-0'
					aria-hidden
				>
					<Image
						src='/images/hat.png'
						alt=''
						width={400}
						height={400}
						className='h-auto w-[150px]'
					/>
				</div>
			</div>
		</section>
	);
}
