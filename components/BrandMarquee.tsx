import Image from 'next/image';

const REPEAT = 12;

function MarqueeUnit({ suffix }: { suffix: string }) {
	return (
		<>
			{Array.from({ length: REPEAT }, (_, i) => (
				<div
					key={`${suffix}-${i}`}
					className='inline-flex shrink-0 items-center gap-4 px-10 md:gap-5 md:px-12'
				>
					<Image
						src='/images/vertex_property_infinity_loop.svg'
						alt=''
						width={56}
						height={56}
						className='h-11 w-11 shrink-0 object-contain md:h-14 md:w-14'
					/>
					<span className='whitespace-nowrap font-sans text-base font-bold tracking-tight text-[#061a2f] md:text-lg'>
						Vertex Property Services Inc
					</span>
				</div>
			))}
		</>
	);
}

export default function BrandMarquee() {
	return (
		<div className='mt-10 w-full bg-white' aria-hidden>
			<div className='overflow-hidden py-4'>
				<div className='flex w-max animate-marquee-rtl motion-reduce:animate-none will-change-transform'>
					<div className='flex shrink-0'>
						<MarqueeUnit suffix='a' />
					</div>
					<div className='flex shrink-0'>
						<MarqueeUnit suffix='b' />
					</div>
				</div>
			</div>
			{/* Inset rule: centered, not edge-to-edge (matches design) */}
			<div className='mx-auto h-[1.5px] w-[95%] max-w-6xl bg-[#e5e7eb]' />
		</div>
	);
}
