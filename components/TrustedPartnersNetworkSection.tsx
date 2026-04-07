import Image from 'next/image';

/** Hollow headline stroke (same pattern as Areas We Serve). */
const OUTLINE_NAVY =
	'-1px -1px 0 #0f172a, 1px -1px 0 #0f172a, -1px 1px 0 #0f172a, 1px 1px 0 #0f172a';

const partners = [
	{
		name: 'The Home Depot Pro',
		src: '/images/trusted_network_partners/home_depot.png',
	},
	{
		name: 'NARPM',
		src: '/images/trusted_network_partners/narpm.png',
	},
	{
		name: "Lowe's PRO",
		src: '/images/trusted_network_partners/lowes.png',
	},
	{
		name: 'The Home Depot Pro',
		src: '/images/trusted_network_partners/home_depot.png',
	},
	{
		name: 'BOMA International',
		src: '/images/trusted_network_partners/boma.png',
	},
] as const;

const MARQUEE_REPEAT = 8;

function MarqueeStrip({ suffix }: { suffix: string }) {
	return (
		<>
			{Array.from({ length: MARQUEE_REPEAT }, (_, i) => (
				<span
					key={`${suffix}-${i}`}
					className='inline-flex shrink-0 items-center px-6 sm:px-10 md:px-14'
				>
					<span
						className='whitespace-nowrap font-sans text-[clamp(1.75rem,6vw,4rem)] font-black uppercase leading-none tracking-tight text-white sm:text-[clamp(2rem,5.5vw,4.5rem)]'
						style={{ textShadow: OUTLINE_NAVY }}
					>
						Trusted Partners Network <span aria-hidden>❄</span>{' '}
						Vertex Property Services <span aria-hidden>❄</span>
					</span>
				</span>
			))}
		</>
	);
}

export default function TrustedPartnersNetworkSection() {
	return (
		<section
			className='bg-white px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-6'
			aria-labelledby='trusted-partners-network-heading'
		>
			<div className='mx-auto max-w-5xl'>
				<div className='flex items-center gap-3 sm:gap-6'>
					<div className='h-px flex-1 bg-[#e2e8f0]' aria-hidden />
					<h2
						id='trusted-partners-network-heading'
						className='shrink-0 text-center font-sans text-sm font-bold leading-tight tracking-tight text-[#0f172a] sm:text-base md:text-lg'
					>
						Our Trusted Partners Network
					</h2>
					<div className='h-px flex-1 bg-[#e2e8f0]' aria-hidden />
				</div>

				<ul className='mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:mt-10 sm:gap-x-10 md:justify-between md:gap-x-6'>
					{partners.map((p, i) => (
						<li key={`${p.name}-${i}`}>
							<Image
								src={p.src}
								alt={p.name}
								width={180}
								height={64}
								className='h-9 w-auto max-w-[120px] object-contain object-center sm:h-11 sm:max-w-[140px] md:h-12 md:max-w-[160px]'
								sizes='(max-width: 768px) 120px, 160px'
							/>
						</li>
					))}
				</ul>
			</div>

			<div
				className='mt-10 w-full overflow-hidden py-6 sm:mt-12 sm:py-8'
				aria-hidden
			>
				<div className='flex w-max animate-marquee-partners motion-reduce:animate-none will-change-transform'>
					<div className='flex shrink-0'>
						<MarqueeStrip suffix='a' />
					</div>
					<div className='flex shrink-0'>
						<MarqueeStrip suffix='b' />
					</div>
				</div>
			</div>
		</section>
	);
}
