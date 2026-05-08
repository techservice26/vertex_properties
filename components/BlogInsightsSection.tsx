import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const posts = [
	{
		image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop',
		date: 'March 28, 2025',
		title: 'Smart Home Repair Solutions For Modern Living',
		description:
			'Professional home maintenance solutions designed to improve comfort, safety, and long-term value.',
	},
	{
		image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
		date: 'February 2, 2026',
		title: 'Advanced Plumbing Repairs Engineered to Last',
		description:
			'Professional plumbing services designed to ensure efficient flow, safety, and long-lasting system performance.',
	},
	{
		image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
		date: 'September 15, 2025',
		title: 'Kitchen Cabinet Installation Crafted with Precision',
		description:
			'Expert installation ensures perfectly aligned cabinets, smooth functionality, and a clean kitchen finish.',
	},
];

export default function BlogInsightsSection() {
	return (
		<section
			className='relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-20'
			aria-labelledby='blog-insights-heading'
		>
			<div
				className='pointer-events-none absolute -left-6 top-2 z-0 h-[min(42vw,200px)] w-[min(55vw,240px)] opacity-95 sm:left-0 sm:top-4'
				aria-hidden
			>
				<Image
					src='/images/blog_section_illustration.png'
					alt=''
					fill
					className='object-contain object-[left_top]'
					sizes='280px'
				/>
			</div>

			<div className='relative z-10 mx-auto max-w-5xl'>
				<header className='mx-auto max-w-3xl text-center'>
					<p className='text-xs font-bold uppercase tracking-[0.2em] text-[#c1272d] sm:text-sm'>
						Latest Blog Posts
					</p>
					<h2
						id='blog-insights-heading'
						className='mt-2 font-sans text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl md:text-4xl'
					>
						Vertex Insights &amp; Articles
					</h2>
				</header>

				<ul className='mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8'>
					{posts.map((p) => (
						<li key={p.title}>
							<article className='flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(15,23,42,0.08)] ring-1 ring-[#f1f5f9] transition hover:shadow-[0_8px_32px_rgba(15,23,42,0.1)]'>
								<div className='relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-2xl'>
									<Image
										src={p.image}
										alt=''
										fill
										className='object-cover'
										sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
									/>
								</div>
								<div className='flex flex-1 flex-col p-4 sm:p-5'>
									<p className='text-xs text-[#94a3b8]'>
										By admin · {p.date}
									</p>
									<h3 className='mt-2 font-sans text-base font-bold leading-snug text-[#0f172a] sm:text-[1.05rem]'>
										{p.title}
									</h3>
									<p className='mt-2 flex-1 font-sans text-sm leading-relaxed text-[#64748b]'>
										{p.description}
									</p>
									<Link
										href='#'
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

				<div className='mt-10 flex flex-col items-stretch gap-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-center sm:gap-6'>
					<Link
						href='#'
						className='inline-flex w-full items-center justify-center rounded-full bg-[#0f172a] px-10 py-3.5 text-center font-sans text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#1e293b] sm:w-auto sm:min-w-[260px] sm:px-12'
					>
						More blog posts
					</Link>
					<div
						className='inline-flex items-center gap-0 self-center rounded-xl border border-[#e8edf3] bg-white p-1 shadow-sm'
						role='group'
						aria-label='Blog posts navigation'
					>
						<button
							type='button'
							className='flex h-9 w-9 items-center justify-center rounded-lg text-[#c1272d] transition hover:bg-[#fef2f2]'
							aria-label='Previous posts'
						>
							<HiChevronLeft className='h-5 w-5' />
						</button>
						<span
							className='mx-0.5 h-5 w-px bg-[#d1d5db]'
							aria-hidden
						/>
						<button
							type='button'
							className='flex h-9 w-9 items-center justify-center rounded-lg text-[#c1272d] transition hover:bg-[#fef2f2]'
							aria-label='Next posts'
						>
							<HiChevronRight className='h-5 w-5' />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
