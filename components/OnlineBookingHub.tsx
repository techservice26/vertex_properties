import Image from 'next/image';
import Link from 'next/link';
import { MdOutlinePolicy } from 'react-icons/md';

const NAVY = '#283354';
const RED = '#e30613';
const CARD_BG = '#f2f2f2';
const TEXT = '#4a4a4a';

const intro =
	'We provide you with a quote based on time and materials. Our pricing for services is competitive and clear – just pay for what you need. Any services that are not covered under our home improvement license are performed by a licensed and insured subcontractor.';

const footerNote =
	'We provide you with a quote based on time and materials. Our pricing for services is competitive and clear – just pay for what you need.';

const btnClass =
	'flex w-full items-center justify-center rounded-full px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.08em] text-white shadow-md transition hover:brightness-95 sm:py-[1.125rem] sm:text-base';

export default function OnlineBookingHub() {
	return (
		<div className='min-h-screen bg-white px-4 py-10 sm:px-6 sm:py-14'>
			<div className='mx-auto w-full max-w-5xl'>
				<div className='overflow-hidden rounded-[1.25rem] shadow-[0_12px_48px_rgba(40,51,84,0.12)] ring-1 ring-black/[0.06] sm:rounded-3xl'>
					<header
						className='px-4 py-6 sm:py-8'
						style={{ backgroundColor: NAVY }}
					>
						<div className='mx-auto flex justify-center'>
							<Link
								href='/'
								className='relative block h-11 w-[180px] sm:h-[3.25rem] sm:w-[200px]'
							>
								<Image
									src='/images/logo.png'
									alt='Vertex Property Services home'
									fill
									className='object-contain object-center'
									sizes='200px'
									priority
								/>
							</Link>
						</div>
					</header>

					<div
						className='px-5 py-10 text-center sm:px-10 sm:py-12 lg:px-14 lg:py-14'
						style={{ backgroundColor: CARD_BG }}
					>
						<p
							className='mx-auto max-w-3xl text-sm leading-relaxed sm:text-[15px] sm:leading-[1.65]'
							style={{ color: TEXT }}
						>
							{intro}
						</p>

						<nav
							className='mx-auto mt-10 flex w-full max-w-md flex-col gap-5 sm:mt-12 sm:gap-6'
							aria-label='Booking options'
						>
							<Link
								href='/schedule-visit'
								className={btnClass}
								style={{ backgroundColor: RED }}
							>
								SITE VISIT / DEPOSIT
							</Link>
							<Link
								href='/free-video-walk-through'
								className={btnClass}
								style={{ backgroundColor: RED }}
							>
								FREE VIDEO WALK THROUGH
							</Link>
							<Link
								href='/schedule-visit#schedule-payment'
								className={btnClass}
								style={{ backgroundColor: RED }}
							>
								PAYMENTS
							</Link>
						</nav>

						<footer className='mx-auto mt-14 max-w-2xl border-t border-[#d6d6d6] pt-10 sm:mt-16'>
							<div className='flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4'>
								<MdOutlinePolicy
									className='h-12 w-12 shrink-0 text-sky-500 sm:h-14 sm:w-14'
									aria-hidden
								/>
								<p
									className='text-base font-semibold sm:text-lg'
									style={{ color: RED }}
								>
									Licensed &amp; Insured
								</p>
							</div>
							<p
								className='mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed sm:text-[15px]'
								style={{ color: TEXT }}
							>
								{footerNote}
							</p>
						</footer>
					</div>
				</div>
			</div>
		</div>
	);
}
