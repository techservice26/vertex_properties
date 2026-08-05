import Image from 'next/image';

import RecentWorksGrid from '@/components/RecentWorksGrid';

export default function RecentlyCompletedWorksSection() {
	return (
		<div className='relative overflow-hidden bg-[#f9f9f9]'>
			<div
				className='pointer-events-none absolute -right-4 top-0 z-0 h-[min(28vw,140px)] w-[min(48vw,200px)] sm:-right-2 sm:h-[min(24vw,160px)] sm:w-[min(36vw,200px)] lg:h-[180px] lg:w-[220px]'
				aria-hidden
			>
				<Image
					src='/images/trusted_property_top_right.png'
					alt=''
					fill
					className='object-contain object-[top_right]'
					sizes='(max-width: 640px) 160px, 220px'
				/>
			</div>

			<RecentWorksGrid
				limit={4}
				sectionClassName='relative z-10 overflow-hidden bg-transparent px-4 py-14 sm:px-6 sm:py-16 lg:py-20'
				headingClassName='mt-2 font-sans text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl md:text-4xl'
				gridClassName='mt-10 grid list-none grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5'
			/>
		</div>
	);
}
