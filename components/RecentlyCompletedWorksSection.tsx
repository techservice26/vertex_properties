import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi2';
import { PORTFOLIO_PROJECTS } from '@/data/portfolioProjects';

const HOME_PROJECTS = PORTFOLIO_PROJECTS.slice(0, 4);

export default function RecentlyCompletedWorksSection() {
	return (
		<section
			className='relative overflow-hidden bg-[#f9f9f9] px-4 py-14 sm:px-6 sm:py-16 lg:py-20'
			aria-labelledby='recent-works-heading'
		>
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

			<div className='relative z-10 mx-auto max-w-6xl'>
				<header className='mx-auto max-w-3xl text-center'>
					<p className='text-xs font-bold uppercase tracking-[0.2em] text-[#c1272d] sm:text-sm'>
						Our Recent Projects
					</p>
					<h2
						id='recent-works-heading'
						className='mt-2 font-sans text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl md:text-4xl'
					>
						Recently Completed Works
					</h2>
				</header>

				<ul className='mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5'>
					{HOME_PROJECTS.map((p) => (
						<li key={p.slug}>
							<article className='flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(15,23,42,0.08)] ring-1 ring-[#f1f5f9] transition hover:shadow-[0_8px_32px_rgba(15,23,42,0.1)]'>
								<div className='relative aspect-[4/3] w-full shrink-0 overflow-hidden'>
									<Image
										src={p.image}
										alt=''
										fill
										className='object-cover'
										sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
									/>
									<span className='absolute right-3 top-3 rounded-full border border-[#e2e8f0] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#0f172a] shadow-sm sm:text-xs'>
										{p.tag}
									</span>
								</div>
								<div className='flex flex-1 flex-col p-4 sm:p-5'>
									<time
										dateTime={p.date}
										className='text-xs text-[#94a3b8]'
									>
										{p.date}
									</time>
									<h3 className='mt-2 font-sans text-base font-bold leading-snug text-[#0f172a] sm:text-[1.05rem]'>
										{p.title}
									</h3>
									<p className='mt-2 flex-1 font-sans text-sm leading-relaxed text-[#64748b]'>
										{p.description}
									</p>
									<Link
										href={`/projects/${p.slug}`}
										className='mt-4 inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#c1272d] transition hover:text-[#a61f29]'
									>
										Read more
										<HiArrowRight
											className='h-4 w-4 shrink-0'
											aria-hidden
										/>
									</Link>
								</div>
							</article>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
