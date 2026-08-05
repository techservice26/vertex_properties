'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import { PartnersNetworkFormModal } from '@/components/dashboard/partners-network/PartnersNetworkFormModal';
import {
	deletePartnersNetworkPartner,
	fetchPartnersNetwork,
} from '@/lib/partners-network-api';
import {
	getPartnersNetworkLogoUrl,
	isUsingFrontendPartnersNetworkLogo,
	sortPartnersNetwork,
} from '@/lib/partners-network-utils';
import type { PartnersNetworkPartner } from '@/types/partners-network';

export function PartnersNetworkList() {
	const [partners, setPartners] = useState<PartnersNetworkPartner[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [modalPartner, setModalPartner] = useState<
		PartnersNetworkPartner | null | undefined
	>(undefined);

	const loadPartners = useCallback(async () => {
		setLoading(true);
		setError('');

		try {
			const data = await fetchPartnersNetwork();
			setPartners(sortPartnersNetwork(data));
		} catch (loadError) {
			setError(
				loadError instanceof Error
					? loadError.message
					: 'Failed to load partners network.',
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void loadPartners();
	}, [loadPartners]);

	const handleDelete = async (partner: PartnersNetworkPartner) => {
		const confirmed = window.confirm(
			`Delete "${partner.company_name}"? This cannot be undone.`,
		);

		if (!confirmed) {
			return;
		}

		try {
			await deletePartnersNetworkPartner(partner.id);
			setPartners((current) =>
				current.filter((item) => item.id !== partner.id),
			);
		} catch (deleteError) {
			window.alert(
				deleteError instanceof Error
					? deleteError.message
					: 'Failed to delete network partner.',
			);
		}
	};

	const handleSaved = (saved: PartnersNetworkPartner) => {
		setPartners((current) => {
			const existingIndex = current.findIndex((item) => item.id === saved.id);

			if (existingIndex === -1) {
				return sortPartnersNetwork([...current, saved]);
			}

			const next = [...current];
			next[existingIndex] = saved;
			return sortPartnersNetwork(next);
		});
	};

	return (
		<div className='space-y-6'>
			<div className='flex flex-wrap items-center justify-between gap-3'>
				<div>
					<h1 className='text-2xl font-bold text-slate-900'>Partners network</h1>
					<p className='mt-1 text-sm text-slate-600'>
						Manage trusted network partner logos shown in the &quot;Our Trusted
						Partners Network&quot; section.
					</p>
					<p className='mt-1 text-xs text-slate-500'>
						This is separate from Our partners (AppFolio, Rent Manager, etc.).
					</p>
				</div>
				<button
					type='button'
					onClick={() => setModalPartner(null)}
					className='inline-flex items-center gap-2 rounded-lg bg-[#c1272d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a01f24]'
				>
					<Plus className='h-4 w-4' />
					Add partner
				</button>
			</div>

			{loading ? (
				<p className='text-sm text-slate-500'>Loading partners network...</p>
			) : null}

			{error ? (
				<div className='rounded-lg border border-[#c1272d]/20 bg-[#c1272d]/5 px-4 py-3 text-sm text-[#c1272d]'>
					{error}
				</div>
			) : null}

			{!loading && !error && partners.length === 0 ? (
				<div className='rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center'>
					<p className='text-sm text-slate-600'>
						No network partners yet. Add your first partner logo.
					</p>
				</div>
			) : null}

			{partners.length > 0 ? (
				<div className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm'>
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-slate-200 text-sm'>
							<thead className='bg-slate-50'>
								<tr>
									<th className='px-4 py-3 text-left font-semibold text-slate-700'>
										Logo
									</th>
									<th className='px-4 py-3 text-left font-semibold text-slate-700'>
										Company
									</th>
									<th className='px-4 py-3 text-right font-semibold text-slate-700'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-slate-100'>
								{partners.map((partner) => {
									const logoUrl = getPartnersNetworkLogoUrl(partner);
									const usingFrontendFallback =
										isUsingFrontendPartnersNetworkLogo(partner);

									return (
										<tr key={partner.id} className='hover:bg-slate-50/80'>
											<td className='px-4 py-3'>
												{logoUrl ? (
													<div className='space-y-1'>
														<div className='relative h-10 w-28'>
															<Image
																src={logoUrl}
																alt=''
																fill
																className='object-contain object-left'
																sizes='112px'
															/>
														</div>
														{usingFrontendFallback ? (
															<p className='text-[10px] text-slate-500'>
																Frontend fallback
															</p>
														) : null}
													</div>
												) : (
													<span className='text-slate-400'>No logo</span>
												)}
											</td>
											<td className='px-4 py-3 font-medium text-slate-900'>
												{partner.company_name}
											</td>
											<td className='px-4 py-3'>
												<div className='flex items-center justify-end gap-2'>
													<button
														type='button'
														onClick={() => setModalPartner(partner)}
														className='rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-slate-300 hover:text-slate-900'
														aria-label={`Edit ${partner.company_name}`}
													>
														<Pencil className='h-4 w-4' />
													</button>
													<button
														type='button'
														onClick={() => void handleDelete(partner)}
														className='rounded-lg border border-slate-200 p-2 text-[#c1272d] transition hover:border-[#c1272d]/30 hover:bg-[#c1272d]/5'
														aria-label={`Delete ${partner.company_name}`}
													>
														<Trash2 className='h-4 w-4' />
													</button>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			) : null}

			{modalPartner !== undefined ? (
				<PartnersNetworkFormModal
					partner={modalPartner}
					onClose={() => setModalPartner(undefined)}
					onSaved={handleSaved}
				/>
			) : null}
		</div>
	);
}
