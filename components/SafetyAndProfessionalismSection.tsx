import { HiCheckCircle } from 'react-icons/hi2';

const cards = [
	{
		title: 'Field Standards',
		items: [
			'Our technicians are trained to follow OSHA-focused safety standards and professional field procedures.',
			'We emphasize clean worksites, safe job practices, respectful conduct, and careful workmanship.',
			'Our team is expected to protect the property, follow site requirements, and represent our company professionally at all times.',
		],
	},
	{
		title: 'Respect for People and Property',
		items: [
			'We proudly serve diverse communities and treat clients, residents, tenants, owners, and staff with fairness, dignity, and respect.',
			'We understand the importance of professionalism in occupied, vacant, residential, commercial, and multifamily environments.',
			'We work to build long-term vendor relationships through trust, consistency, and accountability.',
		],
	},
];

export default function SafetyAndProfessionalismSection() {
	return (
		<section
			className=' px-4 py-14 sm:px-6 sm:py-16 lg:py-20'
			aria-labelledby='safety-professionalism-heading'
		>
			<div className='mx-auto max-w-5xl'>
				<h2
					id='safety-professionalism-heading'
					className='font-sans text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl md:text-4xl'
				>
					Safety and Professionalism
				</h2>
				<p className='mt-4 max-w-3xl font-sans text-base leading-relaxed text-[#64748b] sm:text-lg'>
					Safety, professionalism, and respect are part of our company
					standards on every property we service and maintain.
				</p>

				<div className='mt-10 grid gap-6 sm:mt-12 md:grid-cols-2 md:gap-8'>
					{cards.map((card) => (
						<article
							key={card.title}
							className='rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.08)] ring-1 ring-[#f1f5f9] sm:p-8'
						>
							<h3 className='font-sans text-lg font-bold text-[#0f172a] sm:text-xl'>
								{card.title}
							</h3>
							<ul className='mt-5 space-y-4' role='list'>
								{card.items.map((item) => (
									<li key={item} className='flex gap-3'>
										<span
											className='mt-0.5 shrink-0 text-[#16a34a]'
											aria-hidden
										>
											<HiCheckCircle className='h-5 w-5 sm:h-6 sm:w-6' />
										</span>
										<span className='font-sans text-sm leading-relaxed text-[#475569] sm:text-base'>
											{item}
										</span>
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
