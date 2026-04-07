import EmergencyServiceBanner from '@/components/EmergencyServiceBanner';

const whyChoose = [
	{
		lead: 'Experienced professionals:',
		text: 'Our skilled technicians are trained, insured, and dedicated to delivering dependable workmanship.',
	},
	{
		lead: 'Convenient scheduling:',
		text: 'We make it easy to book services that fit your property’s timeline and tenant needs.',
	},
	{
		lead: 'Transparent pricing:',
		text: 'Know what to expect with clear, upfront pricing—no surprises.',
	},
	{
		lead: 'Local expertise:',
		text: 'Proudly serving our communities, we understand local needs and building standards.',
	},
];

export default function ServicesPageContentSection() {
	return (
		<section
			className='bg-white px-4 py-12 sm:px-6 sm:py-14 lg:py-16'
			aria-labelledby='services-intro-heading'
		>
			<div className='mx-auto max-w-3xl'>
				<div className='font-sans text-[#334155]'>
					<p className='text-base leading-relaxed md:text-lg'>
						Every homeowner and business owner has a list of repair,
						maintenance, and improvement projects that need
						attention—whether inside or outside. With today&apos;s
						fast-paced schedules, finding the time or energy to
						tackle these tasks yourself can be challenging.
						That&apos;s where Vertex Property Services comes in.
					</p>
					<p className='mt-5 text-base leading-relaxed md:text-lg'>
						We proudly serve both residential and commercial
						clients, offering a comprehensive range of services to
						keep your property in top shape. From minor repairs and
						routine maintenance to major improvements and
						coordinated projects, our skilled teams are ready to
						help.
					</p>

					<h2
						id='services-intro-heading'
						className='mt-10 font-sans text-xl font-bold text-[#061a2f] md:text-2xl'
					>
						Why choose Vertex Property Services?
					</h2>
					<ul className='mt-5 list-none space-y-4 text-base leading-relaxed md:text-lg'>
						{whyChoose.map((item) => (
							<li key={item.lead}>
								<strong className='font-semibold text-[#0f172a]'>
									{item.lead}
								</strong>{' '}
								{item.text}
							</li>
						))}
					</ul>

					<p className='mt-8 text-base leading-relaxed md:text-lg'>
						Let Vertex Property Services take care of your to-do
						list so you can focus on what matters most. Contact us
						today and see the difference expert service can make for
						your home or business.
					</p>
				</div>

				<EmergencyServiceBanner className='mt-10 sm:mt-12' />
			</div>
		</section>
	);
}
