import Link from 'next/link';
import { HiMagnifyingGlass, HiPhone } from 'react-icons/hi2';
import { LuCalculator } from 'react-icons/lu';

const PHONE_DISPLAY = '(213) 444-4151';
const PHONE_RAW = '+12134444151';

export default function ProjectsPageCtaBar() {
	return (
		<div className='bg-white px-4 pb-16 pt-2 sm:px-6 sm:pb-20'>
			<div className='mx-auto grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4'>
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
	);
}
