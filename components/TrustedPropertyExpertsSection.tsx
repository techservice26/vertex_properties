import Image from 'next/image';
import Link from 'next/link';
import EmergencyServiceBanner from '@/components/EmergencyServiceBanner';

const PHONE_DISPLAY = '(833) 763-5687';
const PHONE_RAW = '+18337635687';

export default function TrustedPropertyExpertsSection() {
	return (
		<section className='relative w-full overflow-visible bg-white pt-8 sm:pt-10  lg:pt-12'>
			<div className='relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
				<div
					className='pointer-events-none absolute right-0 top-0 z-[1] select-none'
					aria-hidden
				>
					<Image
						src='/images/trusted_property_top_right.png'
						alt=''
						width={200}
						height={200}
						className='h-auto w-[min(42vw,200px)] sm:w-[200px]'
					/>
				</div>
				<div
					className='pointer-events-none absolute bottom-40 left-0 z-[1] select-none sm:bottom-44'
					aria-hidden
				>
					<Image
						src='/images/trusted_property_bottom_left.png'
						alt=''
						width={200}
						height={200}
						className='h-auto w-[min(42vw,200px)] sm:w-[200px]'
					/>
				</div>

				<div className='relative z-10'>
					<div className='grid items-center gap-10 lg:grid-cols-2 lg:gap-14'>
						<div className='overflow-hidden rounded-2xl lg:order-1'>
							<Image
								src='/images/trusted_property_expert.png'
								alt='Vertex Property Services team at work on residential projects'
								width={960}
								height={720}
								className='h-auto w-full object-cover'
								sizes='(max-width: 1024px) 100vw, 50vw'
								priority
							/>
						</div>

						<div className='lg:order-2'>
							<p className='text-sm font-bold uppercase tracking-wide text-[#c1272d]'>
								Trusted Property Experts
							</p>
							<h2 className='mt-3 font-sans text-3xl font-bold leading-tight tracking-tight text-[#061a2f] md:text-4xl md:leading-tight'>
								Safety for Homes, Families & Businesses.
							</h2>
							<p className='mt-5 max-w-xl font-sans text-base leading-relaxed text-[#64748b]'>
								Vertex Property Services Inc provides reliable
								property maintenance, repair, and renovation
								services for residential and commercial
								properties. We are committed to delivering
								quality workmanship, timely service, and
								dependable solutions you can count on.
							</p>

							<div className='mt-10 flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-12'>
								<div className='relative flex shrink-0 justify-center sm:justify-start'>
									<div className='relative pt-4'>
										<div className='absolute -top-1 left-1/2 z-10 -translate-x-1/2 rotate-[-6deg] whitespace-nowrap rounded-md bg-gradient-to-r from-[#c1272d] to-[#061a2f] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow sm:text-[11px]'>
											Years Of Experience
										</div>
										<div className='flex h-[7.5rem] w-[7.5rem] items-center justify-center rounded-full border-2 border-dashed border-[#c1272d] bg-white sm:h-[8.5rem] sm:w-[8.5rem]'>
											<span className='font-sans text-4xl font-bold text-[#061a2f] sm:text-5xl'>
												10+
											</span>
										</div>
									</div>
								</div>

								<div className='flex items-center gap-4'>
									<div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#c1272d] text-[#c1272d]'>
										<svg
											viewBox='0 0 24 24'
											className='h-6 w-6'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											aria-hidden
										>
											<path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.31 1.6.53 2.37a2 2 0 0 1-.47 2.05L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.05-.47c.77.22 1.56.4 2.37.53A2 2 0 0 1 22 16.92z' />
										</svg>
									</div>
									<div>
										<p className='font-sans text-sm font-semibold text-[#c1272d]'>
											To More Inquiry
										</p>
										<a
											href={`tel:${PHONE_RAW}`}
											className='font-sans text-lg font-bold text-[#061a2f] transition hover:text-[#c1272d] md:text-xl'
										>
											{PHONE_DISPLAY}
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<EmergencyServiceBanner className='mt-14 sm:mt-16' />
				</div>
			</div>
		</section>
	);
}
