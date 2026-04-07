import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

export type PageHeroBreadcrumb = {
	label: string;
	href?: string;
	/** Red link (default). Set false for a secondary navy link (e.g. “Our Services”). */
	emphasize?: boolean;
};

export type PageHeroProps = {
	title: string;
	breadcrumbs: PageHeroBreadcrumb[];
};

export default function PageHero({ title, breadcrumbs }: PageHeroProps) {
	return (
		<section
			className='relative w-full overflow-hidden bg-[#f4f4f2] bg-cover bg-center bg-no-repeat'
			style={{
				backgroundImage: 'url(/images/services-hero-background.png)',
			}}
			aria-label={title}
		>
			<div className='flex min-h-[200px] w-full items-stretch justify-between gap-4 pb-0 pl-6 pr-0 pt-8 sm:min-h-[260px] sm:pl-10 sm:pt-10 md:min-h-[300px] md:pt-12 lg:gap-6'>
				<div className='hidden w-[min(26%,220px)] shrink-0 flex-col justify-end sm:flex md:w-[min(28%,280px)]'>
					<Image
						src='/images/services-hero-illustration-left.svg'
						alt=''
						width={280}
						height={280}
						className='block h-auto w-full object-contain object-bottom object-left'
						priority
					/>
				</div>

				<div className='flex min-w-0 flex-1 flex-col items-center justify-center self-center px-2 py-8 text-center sm:px-4 sm:py-10 md:py-12'>
					<h1 className='text-balance font-sans text-2xl font-bold tracking-tight text-[#1e293b] sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight'>
						{title}
					</h1>
					<p className='mt-3 font-sans text-sm text-[#1e293b] sm:text-base md:text-lg'>
						{breadcrumbs.map((crumb, i) => {
							const isLast = i === breadcrumbs.length - 1;
							return (
								<Fragment key={`${crumb.label}-${i}`}>
									{crumb.href ? (
										<Link
											href={crumb.href}
											className={
												crumb.emphasize === false
													? 'font-medium text-[#1e293b] transition hover:text-[#9b2335]'
													: 'font-semibold text-[#9b2335] underline-offset-2 hover:underline'
											}
										>
											{crumb.label}
										</Link>
									) : (
										<span className='font-medium'>
											{crumb.label}
										</span>
									)}
									{crumb.href && !isLast ? ':' : null}
									{!isLast ? ' ' : null}
								</Fragment>
							);
						})}
					</p>
				</div>

				<div className='hidden w-[min(28%,280px)] shrink-0 flex-col items-end justify-end sm:flex md:w-[min(30%,320px)]'>
					<Image
						src='/images/services-hero-illustration-right.svg'
						alt=''
						width={280}
						height={280}
						className='block h-auto max-h-[min(40vw,320px)] w-auto max-w-none object-contain object-bottom object-right'
						priority
					/>
				</div>
			</div>
		</section>
	);
}
