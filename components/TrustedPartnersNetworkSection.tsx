'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { fetchClientPartnersNetwork } from '@/lib/public-partners-network-api';
import { getPartnersNetworkLogoUrl } from '@/lib/partners-network-utils';
import type { PartnersNetworkPartner } from '@/types/partners-network';

/** Hollow headline stroke (same pattern as Areas We Serve). */
const OUTLINE_NAVY =
	'-1px -1px 0 #0f172a, 1px -1px 0 #0f172a, -1px 1px 0 #0f172a, 1px 1px 0 #0f172a';

const MARQUEE_REPEAT = 8;

function MarqueeStrip({ suffix }: { suffix: string }) {
	return (
		<>
			{Array.from({ length: MARQUEE_REPEAT }, (_, i) => (
				<span
					key={`${suffix}-${i}`}
					className='inline-flex shrink-0 items-center px-6 sm:px-10 md:px-14'
				>
					<span
						className='whitespace-nowrap font-sans text-[clamp(1.75rem,6vw,4rem)] font-black uppercase leading-none tracking-tight text-white sm:text-[clamp(2rem,5.5vw,4.5rem)]'
						style={{ textShadow: OUTLINE_NAVY }}
					>
						Trusted Partners Network <span aria-hidden>❄</span>{' '}
						Vertex Property Services <span aria-hidden>❄</span>
					</span>
				</span>
			))}
		</>
	);
}

export default function TrustedPartnersNetworkSection() {
	const [partners, setPartners] = useState<PartnersNetworkPartner[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		let cancelled = false;

		async function loadPartners() {
			setLoading(true);
			setError('');

			try {
				const data = await fetchClientPartnersNetwork();

				if (!cancelled) {
					setPartners(data);
				}
			} catch (loadError) {
				if (!cancelled) {
					setError(
						loadError instanceof Error
							? loadError.message
							: 'Failed to load partners network.',
					);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		}

		void loadPartners();

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<section
			className='bg-white px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-6'
			aria-labelledby='trusted-partners-network-heading'
		>
			<div className='mx-auto max-w-5xl'>
				<div className='flex items-center gap-3 sm:gap-6'>
					<div className='h-px flex-1 bg-[#e2e8f0]' aria-hidden />
					<h2
						id='trusted-partners-network-heading'
						className='shrink-0 text-center font-sans text-sm font-bold leading-tight tracking-tight text-[#0f172a] sm:text-base md:text-lg'
					>
						Our Trusted Partners Network
					</h2>
					<div className='h-px flex-1 bg-[#e2e8f0]' aria-hidden />
				</div>

				{loading ? (
					<p className='mt-8 text-center text-sm text-[#64748b] sm:mt-10'>
						Loading partners network...
					</p>
				) : null}

				{error ? (
					<p className='mt-8 text-center text-sm text-[#c1272d] sm:mt-10'>
						{error}
					</p>
				) : null}

				{!loading && !error && partners.length === 0 ? (
					<p className='mt-8 text-center text-sm text-[#64748b] sm:mt-10'>
						No network partners to show yet.
					</p>
				) : null}

				{partners.length > 0 ? (
					<ul className='mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:mt-10 sm:gap-x-10 md:justify-between md:gap-x-6'>
						{partners.map((partner) => {
							const logoUrl = getPartnersNetworkLogoUrl(partner);

							return (
								<li key={partner.id}>
									{logoUrl ? (
										<Image
											src={logoUrl}
											alt={partner.company_name}
											width={180}
											height={64}
											className='h-9 w-auto max-w-[120px] object-contain object-center sm:h-11 sm:max-w-[140px] md:h-12 md:max-w-[160px]'
											sizes='(max-width: 768px) 120px, 160px'
										/>
									) : (
										<span className='font-sans text-sm font-semibold text-[#0f172a] sm:text-base'>
											{partner.company_name}
										</span>
									)}
								</li>
							);
						})}
					</ul>
				) : null}
			</div>

			<div
				className='mt-10 w-full overflow-hidden py-6 sm:mt-12 sm:py-8'
				aria-hidden
			>
				<div className='flex w-max animate-marquee-partners motion-reduce:animate-none will-change-transform'>
					<div className='flex shrink-0'>
						<MarqueeStrip suffix='a' />
					</div>
					<div className='flex shrink-0'>
						<MarqueeStrip suffix='b' />
					</div>
				</div>
			</div>
		</section>
	);
}
