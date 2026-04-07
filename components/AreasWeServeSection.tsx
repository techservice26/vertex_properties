import Image from 'next/image';

/** Hollow / outlined headline: fill + diagonal text-shadow stroke (see .strokeme pattern). */
const OUTLINE_NAVY =
	'-1px -1px 0 #0f172a, 1px -1px 0 #0f172a, -1px 1px 0 #0f172a, 1px 1px 0 #0f172a';

export default function AreasWeServeSection() {
	return (
		<section
			className='mb-10 bg-white pb-6 sm:pb-8'
			aria-labelledby='areas-we-serve-heading'
		>
			<div className='relative mx-auto overflow-hidden rounded-b-[300px] bg-[#f9f9f9]'>
				<div
					className='pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.2]'
					style={{
						backgroundImage: 'url(/images/all_service_bg.png)',
					}}
					aria-hidden
				/>

				<div className='relative z-10 px-5 py-10 sm:px-8 sm:py-12 md:py-14'>
					<h2
						id='areas-we-serve-heading'
						className='flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center font-sans text-7xl font-black uppercase leading-none tracking-tight sm:gap-x-4 '
					>
						<span
							className='bg-transparent text-white'
							style={{ textShadow: OUTLINE_NAVY }}
						>
							Areas We Serve
						</span>
						<span
							className='select-none text-[0.5em] leading-none text-[#0f172a]'
							aria-hidden
						>
							✦
						</span>
						<span
							className='bg-transparent text-white'
							style={{ textShadow: OUTLINE_NAVY }}
						>
							United States
						</span>
						<span
							className='select-none text-[0.5em] leading-none text-[#0f172a]'
							aria-hidden
						>
							✦
						</span>
					</h2>

					<div className='mt-8 flex justify-center sm:mt-10 md:mt-12'>
						<div className='relative w-full max-w-5xl shadow-none'>
							<Image
								src='/images/map.png'
								alt='Map of the United States showing service areas'
								width={1200}
								height={720}
								className='h-auto w-full object-contain'
								sizes='(max-width: 768px) 100vw, 1024px'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
