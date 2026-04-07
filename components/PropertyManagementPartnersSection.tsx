import Image from 'next/image';

const partners = [
	{
		name: 'AppFolio',
		src: '/images/propertyManagementPartner/ppfolio.png',
	},
	{
		name: 'Maintenance Care',
		src: '/images/propertyManagementPartner/maintenanceCare.png',
	},
	{
		name: 'Property Meld',
		src: '/images/propertyManagementPartner/propertyMeld.png',
	},
	{
		name: 'Rent Manager',
		src: '/images/propertyManagementPartner/rentManager.png',
	},
	{
		name: 'PPW',
		src: '/images/propertyManagementPartner/ppw.png',
	},
];

export default function PropertyManagementPartnersSection() {
	return (
		<section
			className='bg-[#f9f9f9] px-4 py-12 sm:px-6 sm:py-14 lg:py-16'
			aria-labelledby='partners-heading'
		>
			<div className='mx-auto max-w-4xl'>
				<div className='flex items-center gap-4 sm:gap-6'>
					<div className='h-px flex-1 bg-[#e2e8f0]' aria-hidden />
					<h2
						id='partners-heading'
						className='shrink-0 text-center font-sans text-lg font-bold leading-tight tracking-tight text-[#0f172a] sm:text-xl md:text-2xl'
					>
						Our Property Management Software Partners
					</h2>
					<div className='h-px flex-1 bg-[#e2e8f0]' aria-hidden />
				</div>

				<ul className='mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:mt-12 sm:gap-x-12 md:justify-between md:gap-x-8'>
					{partners.map((p) => (
						<li key={p.name}>
							<Image
								src={p.src}
								alt={p.name}
								width={180}
								height={56}
								className='h-10 w-auto max-w-[140px] object-contain object-center sm:h-12 sm:max-w-[160px] md:h-14 md:max-w-[180px]'
								sizes='(max-width: 768px) 140px, 180px'
							/>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
