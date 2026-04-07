import Link from 'next/link';

export type EmergencyServiceBannerProps = {
	/** Extra classes on the outer bar (e.g. margin-top). */
	className?: string;
	/** Defaults to `/contact`. Use e.g. `tel:+1…` on the contact page. */
	requestHref?: string;
};

/**
 * Emergency CTA bar: 24/7 messaging with bell icon and request action.
 */
export default function EmergencyServiceBanner({
	className = '',
	requestHref = '/contact',
}: EmergencyServiceBannerProps) {
	return (
		<div
			className={[
				'flex flex-col gap-6 rounded-2xl bg-[#061a2f] px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-7 lg:px-10',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			role='region'
			aria-label='Emergency service'
		>
			<div className='flex flex-1 items-start gap-4 sm:items-center'>
				<div
					className='relative flex h-14 w-14 shrink-0 items-center justify-center'
					aria-hidden
				>
					<svg
						className='h-full w-full text-[#c1272d]'
						viewBox='0 0 24 24'
						fill='currentColor'
					>
						<path d='M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z' />
					</svg>
					<span className='pointer-events-none absolute inset-0 flex items-center justify-center pb-0.5 text-[11px] font-bold leading-none text-white drop-shadow'>
						!
					</span>
				</div>
				<div>
					<p className='font-sans text-lg font-bold text-white sm:text-xl'>
						Emergency Service 24 Hours / 7 Days
					</p>
					<p className='mt-1 max-w-xl font-sans text-sm leading-relaxed text-white/85'>
						Available 365 days a year for urgent plumbing failures
					</p>
				</div>
			</div>
			<Link
				href={requestHref}
				className='shrink-0 text-center font-sans text-sm font-bold uppercase tracking-widest text-[#d4a574] transition hover:text-[#e8c08c] sm:text-right'
			>
				Request
			</Link>
		</div>
	);
}
