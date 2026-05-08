import Image from 'next/image';
import Link from 'next/link';
import {
	HiMagnifyingGlass,
	HiPhone,
	HiPlay,
} from 'react-icons/hi2';
import { LuCalculator } from 'react-icons/lu';

const PHONE_DISPLAY = '(213) 444-4151';
const PHONE_RAW = '+12134444151';

const PROFESSIONAL_BG = '/images/professional_bg.png';

export default function ProfessionalCtaSection() {
	return (
		<section
			className='bg-[#f9f9f9] px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:pb-24'
			aria-label='Professional services call to action'
		>
			<div className='mx-auto max-w-6xl overflow-hidden rounded-3xl shadow-[0_8px_40px_rgba(15,23,42,0.12)]'>
				<div className='relative min-h-[min(72vw,420px)] sm:min-h-[440px] lg:min-h-[480px]'>
					<Image
						src={PROFESSIONAL_BG}
						alt=''
						fill
						className='object-cover object-center'
						sizes='(max-width: 768px) 100vw, 1152px'
					/>
					<div
						className='absolute inset-0 bg-gradient-to-t from-[#0f172a]/75 via-[#0f172a]/45 to-[#0f172a]/35'
						aria-hidden
					/>

					<div className='relative z-10 flex min-h-[min(72vw,420px)] flex-col items-center justify-center px-5 py-12 text-center sm:min-h-[440px] sm:px-10 sm:py-14 lg:min-h-[480px]'>
						<h2 className='max-w-4xl font-sans text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-[1.75rem] md:leading-snug lg:text-4xl lg:leading-tight'>
							Professional and dependable property services with
							guaranteed quality workmanship.
						</h2>
						<p className='mt-4 max-w-2xl font-sans text-sm leading-relaxed text-white/95 sm:text-base md:text-lg'>
							Welcome to Vertex Property Services, Inc. — your
							trusted partner in quality craftsmanship. Get your
							free estimate today!
						</p>

						<div className='mt-8 flex flex-col items-center gap-5 sm:mt-10 sm:flex-row sm:items-center sm:gap-6'>
							<Link
								href='/contact'
								className='inline-flex items-center justify-center rounded-full bg-[#c1272d] px-8 py-3.5 font-sans text-sm font-bold text-white shadow-md transition hover:bg-[#a61f29] sm:text-base'
							>
								Request a Free Estimate
							</Link>
							<div
								className='hidden h-10 w-px shrink-0 bg-white/40 sm:block'
								aria-hidden
							/>
							<Link
								href='#'
								className='inline-flex items-center gap-3 font-sans text-sm font-semibold text-white transition hover:text-white/90 sm:text-base'
							>
								Watch Our Video
								<span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white bg-white/10 text-white backdrop-blur-sm'>
									<HiPlay className='ml-0.5 h-5 w-5' />
								</span>
							</Link>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-1 gap-3 bg-[#f9f9f9] p-4 sm:grid-cols-3 sm:gap-4 sm:p-5'>
					<Link
						href='/contact'
						className='flex items-center justify-center gap-3 rounded-2xl bg-[#0f172a] px-5 py-4 font-sans text-sm font-bold text-white shadow-sm transition hover:bg-[#1e293b] sm:py-5 sm:text-base'
					>
						<span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10'>
							<LuCalculator className='h-5 w-5' aria-hidden />
						</span>
						Get A Free Estimate
					</Link>
					<a
						href={`tel:${PHONE_RAW}`}
						className='flex items-center justify-center gap-3 rounded-2xl bg-[#c1272d] px-5 py-4 font-sans text-sm font-bold text-white shadow-sm transition hover:bg-[#a61f29] sm:py-5 sm:text-base'
					>
						<span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15'>
							<HiPhone className='h-5 w-5' aria-hidden />
						</span>
						Call: {PHONE_DISPLAY}
					</a>
					<Link
						href='/open-jobs'
						className='flex items-center justify-center gap-3 rounded-2xl bg-[#0f172a] px-5 py-4 font-sans text-sm font-bold text-white shadow-sm transition hover:bg-[#1e293b] sm:py-5 sm:text-base'
					>
						<span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10'>
							<HiMagnifyingGlass className='h-5 w-5' aria-hidden />
						</span>
						Search All Jobs
					</Link>
				</div>
			</div>
		</section>
	);
}
