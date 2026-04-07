import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi2';
import { PORTFOLIO_PROJECTS } from '@/data/portfolioProjects';

type Props = {
	/** If set, only show first N (e.g. home page). */
	limit?: number;
};

export default function PortfolioProjectsGrid({ limit }: Props) {
	const list = limit != null ? PORTFOLIO_PROJECTS.slice(0, limit) : PORTFOLIO_PROJECTS;

	return (
		<section
			className='relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-20'
			aria-labelledby='portfolio-projects-heading'
		>
			<div className='relative z-10 mx-auto max-w-6xl'>
				<header className='mx-auto max-w-3xl text-center'>
					<p className='text-xs font-bold uppercase tracking-[0.2em] text-[#c1272d] sm:text-sm'>
						Our Recent Projects
					</p>
					<h2
						id='portfolio-projects-heading'
						className='mt-2 font-sans text-2xl font-bold tracking-tight text-[#1e3a5f] sm:text-3xl md:text-4xl'
					>
						Recently Completed Works
					</h2>
				</header>

				<ul
					className={`mt-10 grid list-none grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 ${limit != null ? 'lg:grid-cols-4 lg:gap-5' : 'lg:grid-cols-3 lg:gap-8'}`}
				>
					{list.map((p) => (
						<li key={p.slug}>
							<article className='flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(15,23,42,0.08)] ring-1 ring-[#f1f5f9] transition hover:shadow-[0_8px_32px_rgba(15,23,42,0.1)]'>
								<div className='relative aspect-[4/3] w-full shrink-0 overflow-hidden'>
									<Image
										src={p.image}
										alt=''
										fill
										className='object-cover'
										sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
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
									<h3 className='mt-2 font-sans text-base font-bold leading-snug text-[#1e3a5f] sm:text-[1.05rem]'>
										{p.title}
									</h3>
									<p className='mt-2 flex-1 font-sans text-sm leading-relaxed text-[#64748b]'>
										{p.description}
									</p>
									<Link
										href={`/projects/${p.slug}`}
										className='mt-4 inline-flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#c1272d] transition hover:text-[#a61f29] sm:text-xs'
									>
										READ MORE
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
