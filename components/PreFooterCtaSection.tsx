import Image from 'next/image';
import Link from 'next/link';
import { HiPhone } from 'react-icons/hi2';

const PHONE_DISPLAY = '(833) 763-5687';
const PHONE_RAW = '+18337635687';
const BG = '/images/professional_bg.png';
const OVERLAY = '/images/hero_overlay.png';

export default function PreFooterCtaSection() {
	return (
		<section
			className=' px-4 py-12 sm:px-6 sm:py-14 lg:py-16'
			aria-label='Contact and maintenance inquiry'
		>
			<div className='mx-auto max-w-6xl overflow-hidden rounded-3xl ring-1 ring-[#e8edf3]'>
				<div className='relative min-h-[520px] lg:min-h-[380px]'>
					<Image
						src={BG}
						alt=''
						fill
						className='object-cover object-center'
						sizes='(max-width: 1024px) 100vw, 1152px'
					/>
					<div className='absolute inset-0 z-[1]'>
						<Image
							src={OVERLAY}
							alt=''
							fill
							className='object-cover object-center'
							sizes='(max-width: 1024px) 100vw, 1152px'
						/>
					</div>
					<div
						className='absolute inset-0 z-[2] bg-gradient-to-r from-black/50 via-black/35 to-black/25'
						aria-hidden
					/>

					<div className='relative z-10 flex min-h-[520px] flex-col items-center gap-6 p-6 sm:p-8 lg:min-h-[380px] lg:flex-row lg:items-center lg:gap-4 lg:p-10'>
						<div className='w-full flex-1 lg:max-w-[min(100%,400px)]'>
							<div className='rounded-2xl bg-white p-6 shadow-lg sm:p-8'>
								<h2 className='font-sans text-xl font-bold leading-tight tracking-tight text-[#0f172a] sm:text-2xl'>
									Looking for a Reliable Property Maintenance
									Partner?
								</h2>
								<p className='mt-4 font-sans text-sm leading-relaxed text-[#64748b] sm:text-base'>
									We support property management portfolios
									with coordinated work orders, clear
									communication, and dependable maintenance—so
									you can focus on residents and owners while
									we keep every property running smoothly.
								</p>
								<Link
									href='mailto:info@vertexpropertyservices.com'
									className='mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#c1272d] px-6 py-3.5 font-sans text-sm font-bold text-white shadow-md transition hover:bg-[#a61f29] sm:w-auto'
								>
									Email Us
								</Link>
							</div>
						</div>

						<div className='relative z-20 flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-full border-4 border-white bg-white shadow-[0_8px_30px_rgba(15,23,42,0.15)] sm:h-[112px] sm:w-[112px] lg:h-[120px] lg:w-[120px] lg:border-[5px]'>
							<Image
								src='/images/vertex_property_infinity_loop.svg'
								alt='Vertex Property Services'
								width={72}
								height={72}
								className='h-14 w-14 object-contain sm:h-16 sm:w-16'
							/>
						</div>

						<div className='flex w-full flex-1 flex-col justify-center pb-2 text-center lg:pb-0 lg:text-left'>
							<p className='font-sans text-sm font-bold uppercase tracking-wide text-[#c1272d]'>
								Get In Touch
							</p>
							<h3 className='mt-2 font-sans text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.65rem] lg:leading-snug'>
								Need Help Right Now? Call Our Emergency Line.
							</h3>
							<div className='mt-6 flex justify-center lg:justify-start'>
								<a
									href={`tel:${PHONE_RAW}`}
									className='inline-flex items-center gap-3 rounded-full bg-white px-4 py-2.5 pr-5 font-sans text-sm font-bold text-[#0f172a] shadow-md transition hover:bg-[#f8fafc] sm:text-base'
								>
									<span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c1272d] text-white'>
										<HiPhone
											className='h-5 w-5'
											aria-hidden
										/>
									</span>
									Call: {PHONE_DISPLAY}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
