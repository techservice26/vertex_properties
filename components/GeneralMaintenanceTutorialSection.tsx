import Image from 'next/image';
import Link from 'next/link';
import {
	HiChevronLeft,
	HiChevronRight,
	HiPlay,
} from 'react-icons/hi2';
import {
	MdOutlineHandyman,
	MdOutlineHome,
	MdOutlinePlumbing,
} from 'react-icons/md';
import { TbHammer } from 'react-icons/tb';

const VIDEO_THUMB =
	'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=960&auto=format&fit=crop';

const VIDEO_TITLE =
	'How-To Workshops - How to Install a Faucet | The Home Depot';

const cards = [0, 1, 2, 3];

export default function GeneralMaintenanceTutorialSection() {
	return (
		<section
			className='relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-20'
			aria-labelledby='maintenance-tutorial-heading'
		>
			<div
				className='pointer-events-none absolute inset-0 overflow-hidden'
				aria-hidden
			>
				<MdOutlinePlumbing className='absolute left-[6%] top-[18%] h-28 w-28 -rotate-12 text-slate-200/55 sm:h-36 sm:w-36' />
				<TbHammer className='absolute right-[8%] top-[12%] h-24 w-24 rotate-6 text-slate-200/50 sm:h-32 sm:w-32' />
				<MdOutlineHandyman className='absolute bottom-[22%] left-[12%] h-20 w-20 text-slate-200/45 sm:h-28 sm:w-28' />
				<MdOutlinePlumbing className='absolute bottom-[15%] right-[15%] h-24 w-24 rotate-12 text-slate-200/50' />
			</div>

			<div className='relative z-10 mx-auto max-w-5xl'>
				<header className='mx-auto max-w-2xl text-center'>
					<div className='mb-3 flex flex-col items-center gap-1.5'>
						<MdOutlineHome
							className='h-5 w-5 text-[#c1272d] sm:h-6 sm:w-6'
							aria-hidden
						/>
						<p className='text-xs font-bold uppercase tracking-[0.2em] text-[#c1272d] sm:text-sm'>
							How To Do
						</p>
					</div>
					<h2
						id='maintenance-tutorial-heading'
						className='font-sans text-2xl font-bold tracking-tight text-[#1e293b] sm:text-3xl md:text-4xl'
					>
						General Maintenance Tutorial
					</h2>
				</header>

				<ul className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-7 lg:mt-12 lg:gap-8'>
					{cards.map((i) => (
						<li key={i}>
							<article>
								<Link
									href='#'
									className='group relative block overflow-hidden rounded-2xl ring-2 ring-[#c1272d] shadow-[0_0_16px_-4px_rgba(193,39,45,0.55)] transition hover:opacity-[0.98]'
									aria-label={`Play video: ${VIDEO_TITLE}`}
								>
									<div className='aspect-video bg-slate-200'>
										<Image
											src={VIDEO_THUMB}
											alt=''
											width={960}
											height={540}
											className='h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]'
											sizes='(max-width: 640px) 100vw, 50vw'
										/>
									</div>
									<div className='absolute inset-0 flex items-center justify-center bg-[#0f172a]/10 transition group-hover:bg-[#0f172a]/15'>
										<span className='flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white/95 text-[#0f172a] shadow-lg sm:h-16 sm:w-16'>
											<HiPlay className='ml-1 h-7 w-7 sm:h-8 sm:w-8' />
										</span>
									</div>
								</Link>
								<p className='mt-3 text-center font-sans text-sm font-semibold leading-snug text-[#1e293b] sm:text-[0.95rem]'>
									{VIDEO_TITLE}
								</p>
							</article>
						</li>
					))}
				</ul>

				<div className='mt-10 flex flex-col items-stretch gap-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between lg:mt-14'>
					<Link
						href='/video-center'
						className='inline-flex w-full items-center justify-center rounded-full bg-[#1e293b] px-8 py-3.5 text-center font-sans text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#0f172a] sm:w-auto sm:min-w-[200px]'
					>
						More video
					</Link>

					<div
						className='inline-flex items-center gap-1 self-center rounded-full border border-[#e5e7eb] bg-white px-1 py-1 shadow-sm sm:self-auto'
						role='group'
						aria-label='Video carousel'
					>
						<button
							type='button'
							className='flex h-9 w-9 items-center justify-center rounded-full text-[#9ca3af] transition hover:bg-slate-50'
							aria-label='Previous videos'
						>
							<HiChevronLeft className='h-5 w-5' />
						</button>
						<span
							className='mx-0.5 h-5 w-px bg-[#d1d5db]'
							aria-hidden
						/>
						<button
							type='button'
							className='flex h-9 w-9 items-center justify-center rounded-full text-[#c1272d] transition hover:bg-red-50'
							aria-label='Next videos'
						>
							<HiChevronRight className='h-5 w-5' />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
