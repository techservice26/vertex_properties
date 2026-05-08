import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
const PHONE_DISPLAY = '(213) 444-4151';
const PHONE_RAW = '+12134444151';

function BadgeIcon({ children }: { children: ReactNode }) {
	return (
		<span className='inline-flex h-4 w-4 shrink-0 items-center justify-center text-[#facc15]'>
			{children}
		</span>
	);
}

export default function HeroSection() {
	return (
		<>
			<section
				className='relative min-h-[280px] w-full overflow-hidden sm:min-h-[360px] md:min-h-[440px] lg:min-h-[620px]'
				aria-label='Hero'
			>
				{/* Base photo */}
				<div
					className='absolute inset-0 bg-cover bg-center bg-no-repeat'
					style={{ backgroundImage: 'url(/images/hero_bg.png)' }}
					aria-hidden
				/>

				{/* Full-bleed overlay art */}
				<div className='absolute inset-0 z-[2]'>
					<Image
						src='/images/hero_overlay.png'
						alt=''
						fill
						priority
						sizes='100vw'
						className='object-cover object-center'
					/>
				</div>

				{/* Content */}
				<div className='relative z-10 mx-auto flex min-h-[280px] w-full max-w-[1400px] flex-col justify-center px-6 py-10 sm:min-h-[360px] sm:px-8 sm:py-12 md:min-h-[440px] md:py-14 lg:min-h-[620px] lg:px-10'>
					<div className='max-w-2xl'>
						<p className='mb-4 flex items-center gap-2 text-sm font-medium text-white md:text-base'>
							<span
								className='inline-flex text-[#facc15]'
								aria-hidden
							>
								<svg
									className='h-4 w-4 md:h-5 md:w-5'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
								>
									<rect
										x='3'
										y='4'
										width='18'
										height='18'
										rx='2'
									/>
									<path d='M16 2v4M8 2v4M3 10h18' />
								</svg>
							</span>
							Local Handy Man Services Since 2010
						</p>

						<h1 className='text-left text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.4rem] lg:leading-tight'>
							Trusted One-Stop Property Maintenance Partner for
							Property Managers, Homeowners, and Management
							Companies
						</h1>

						<ul className='mt-5 flex flex-col gap-2.5 text-sm text-white sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-1 md:text-[0.8125rem] lg:text-sm'>
							<li className='flex items-center gap-2'>
								<BadgeIcon>
									<svg
										viewBox='0 0 24 24'
										fill='currentColor'
										className='h-4 w-4'
									>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
								</BadgeIcon>
								<span className='font-medium'>
									4.8 Star Rated
								</span>
							</li>
							<li className='flex items-center gap-2'>
								<BadgeIcon>
									<svg
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										className='h-4 w-4'
									>
										<path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z' />
									</svg>
								</BadgeIcon>
								<span className='font-medium'>
									Licensed & Insured
								</span>
							</li>
							<li className='flex items-center gap-2'>
								<BadgeIcon>
									<svg
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										className='h-4 w-4'
									>
										<path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
										<circle cx='12' cy='7' r='4' />
									</svg>
								</BadgeIcon>
								<span className='font-medium'>
									Satisfaction Guaranteed
								</span>
							</li>
						</ul>

						<div className='mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap'>
							<Link
								href='/contact'
								className='group inline-flex w-full items-center justify-between gap-3 rounded-full bg-white py-2.5 pl-6 pr-2 text-left text-sm font-bold text-[#0f172a] shadow-sm transition hover:bg-white/95 sm:w-auto'
							>
								<span>Get A Free Estimate</span>
								<span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c1272d] text-white transition group-hover:bg-[#a61f29]'>
									<svg
										viewBox='0 0 24 24'
										className='h-5 w-5'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
									>
										<rect
											x='4'
											y='4'
											width='16'
											height='16'
											rx='2'
										/>
										<path d='M8 10h8M8 14h5' />
									</svg>
								</span>
							</Link>

							<a
								href={`tel:${PHONE_RAW}`}
								className='group inline-flex w-full items-center justify-between gap-3 rounded-full bg-white py-2.5 pl-6 pr-2 text-left text-sm font-bold text-[#0f172a] shadow-sm transition hover:bg-white/95 sm:w-auto'
							>
								<span>Call: {PHONE_DISPLAY}</span>
								<span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c1272d] text-white transition group-hover:bg-[#a61f29]'>
									<svg
										viewBox='0 0 24 24'
										className='h-5 w-5'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
									>
										<path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
									</svg>
								</span>
							</a>
						</div>
					</div>
				</div>

				{/* Slider-style control */}
				<div
					className='absolute bottom-20 right-3 z-20 hidden flex-col rounded-full border border-white/30 bg-white/95 py-2 shadow-md md:flex lg:bottom-28 lg:right-5'
					aria-hidden
				>
					<span className='flex h-9 w-9 items-center justify-center text-[#0f172a]'>
						<svg
							className='h-4 w-4'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
						>
							<path d='M18 15l-6-6-6 6' />
						</svg>
					</span>
					<span className='flex h-9 w-9 items-center justify-center text-[#c1272d]'>
						<svg
							className='h-4 w-4'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
						>
							<path d='M6 9l6 6 6-6' />
						</svg>
					</span>
				</div>
			</section>
		</>
	);
}
