'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { fetchClientOurPartners } from '@/lib/public-our-partner-api';
import { getOurPartnerLogoUrl, resolveOurPartners } from '@/lib/our-partner-utils';
import type { OurPartner } from '@/types/our-partner';

export default function PropertyManagementPartnersSection() {
	const [partners, setPartners] = useState<OurPartner[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;

		async function loadPartners() {
			setLoading(true);

			try {
				const data = await fetchClientOurPartners();

				if (!cancelled) {
					setPartners(resolveOurPartners(data));
				}
			} catch {
				if (!cancelled) {
					setPartners(resolveOurPartners([]));
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
			className='bg-[#f9f9f9] px-4 py-12 sm:px-6 sm:py-14 lg:py-16'
			aria-labelledby='partners-heading'
		>
			<div className='mx-auto max-w-4xl'>
				<div className='flex items-center gap-4 sm:gap-6'>
					<div className='h-px flex-1 bg-[#e2e8f0]' aria-hidden />
					<h2
						id='partners-heading'
						className='shrink-0 text-center font-sans text-lg font-bold leading-tight tracking-tight text-[#0f172a] sm:text-xl md:text-2xl'
					>
						Our Property Management Software Partners
					</h2>
					<div className='h-px flex-1 bg-[#e2e8f0]' aria-hidden />
				</div>

				{loading ? (
					<p className='mt-10 text-center text-sm text-[#64748b] sm:mt-12'>
						Loading partners...
					</p>
				) : null}

				{!loading && partners.length > 0 ? (
					<ul className='mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:mt-12 sm:gap-x-12 md:justify-between md:gap-x-8'>
						{partners.map((partner) => {
							const logoUrl = getOurPartnerLogoUrl(partner);

							return (
								<li key={partner.id}>
									{logoUrl ? (
										<Image
											src={logoUrl}
											alt={partner.company_name}
											width={180}
											height={56}
											className='h-10 w-auto max-w-[140px] object-contain object-center sm:h-12 sm:max-w-[160px] md:h-14 md:max-w-[180px]'
											sizes='(max-width: 768px) 140px, 180px'
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
		</section>
	);
}
