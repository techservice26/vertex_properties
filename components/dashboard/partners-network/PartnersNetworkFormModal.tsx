'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

import {
	createPartnersNetworkPartner,
	updatePartnersNetworkPartner,
} from '@/lib/partners-network-api';
import {
	getFrontendPartnersNetworkLogoUrl,
	getPartnersNetworkLogoUrl,
	isUsingFrontendPartnersNetworkLogo,
} from '@/lib/partners-network-utils';
import type { PartnersNetworkPartner } from '@/types/partners-network';

type PartnersNetworkFormModalProps = {
	partner?: PartnersNetworkPartner | null;
	onClose: () => void;
	onSaved: (partner: PartnersNetworkPartner) => void;
};

const inputClassName =
	'w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#c1272d] focus:ring-2 focus:ring-[#c1272d]/10';

export function PartnersNetworkFormModal({
	partner,
	onClose,
	onSaved,
}: PartnersNetworkFormModalProps) {
	const isEditing = Boolean(partner);

	const [companyName, setCompanyName] = useState(partner?.company_name ?? '');
	const [partnerLogo, setPartnerLogo] = useState<File | null>(null);
	const [error, setError] = useState('');
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [onClose]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError('');

		if (!companyName.trim()) {
			setError('Company name is required.');
			return;
		}

		if (
			!isEditing &&
			!partnerLogo &&
			!getFrontendPartnersNetworkLogoUrl(companyName)
		) {
			setError(
				'Partner logo is required unless a frontend fallback exists for this company name.',
			);
			return;
		}

		setSaving(true);

		try {
			const payload = {
				company_name: companyName.trim(),
				partner_logo: partnerLogo,
			};

			const saved = isEditing
				? await updatePartnersNetworkPartner(partner!.id, payload)
				: await createPartnersNetworkPartner(payload);

			onSaved(saved);
			onClose();
		} catch (submitError) {
			setError(
				submitError instanceof Error
					? submitError.message
					: 'Failed to save network partner.',
			);
		} finally {
			setSaving(false);
		}
	};

	const existingLogoUrl = partner ? getPartnersNetworkLogoUrl(partner) : '';
	const usingFrontendFallback = partner
		? isUsingFrontendPartnersNetworkLogo(partner)
		: Boolean(getFrontendPartnersNetworkLogoUrl(companyName));

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4'>
			<div className='max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl'>
				<div className='flex items-center justify-between border-b border-slate-200 px-6 py-4'>
					<h2 className='text-lg font-semibold text-slate-900'>
						{isEditing ? 'Edit network partner' : 'Add network partner'}
					</h2>
					<button
						type='button'
						onClick={onClose}
						className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'
						aria-label='Close'
					>
						<X className='h-5 w-5' />
					</button>
				</div>

				<form onSubmit={handleSubmit} className='space-y-5 px-6 py-5'>
					<div>
						<label
							htmlFor='network_company_name'
							className='mb-1 block text-sm font-medium text-slate-700'
						>
							Company name
						</label>
						<input
							id='network_company_name'
							type='text'
							className={inputClassName}
							value={companyName}
							onChange={(event) => setCompanyName(event.target.value)}
							placeholder='The Home Depot Pro'
							required
						/>
					</div>

					<div>
						<label
							htmlFor='network_partner_logo'
							className='mb-1 block text-sm font-medium text-slate-700'
						>
							Partner logo
						</label>
						<label className='flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600 transition hover:border-[#c1272d]/40 hover:bg-[#c1272d]/5'>
							<Upload className='h-4 w-4' />
							{partnerLogo ? partnerLogo.name : 'Choose logo (PNG, JPG, WebP)'}
							<input
								id='network_partner_logo'
								type='file'
								accept='image/*'
								className='hidden'
								onChange={(event) =>
									setPartnerLogo(event.target.files?.[0] ?? null)
								}
							/>
						</label>
						{existingLogoUrl && !partnerLogo ? (
							<div className='mt-3 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3'>
								<div className='relative h-10 w-28'>
									<Image
										src={existingLogoUrl}
										alt={partner?.company_name ?? companyName}
										fill
										className='object-contain object-left'
										sizes='112px'
									/>
								</div>
								<p className='text-xs text-slate-500'>
									{usingFrontendFallback
										? 'Using frontend fallback logo. Upload a file to store one in the backend.'
										: 'Current logo. Choose a new file to replace it.'}
								</p>
							</div>
						) : null}
					</div>

					{error ? (
						<div className='rounded-lg border border-[#c1272d]/20 bg-[#c1272d]/5 px-3 py-2 text-sm text-[#c1272d]'>
							{error}
						</div>
					) : null}

					<div className='flex items-center justify-end gap-3 border-t border-slate-200 pt-4'>
						<button
							type='button'
							onClick={onClose}
							className='rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50'
						>
							Cancel
						</button>
						<button
							type='submit'
							disabled={saving}
							className='rounded-lg bg-[#c1272d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a01f24] disabled:cursor-not-allowed disabled:opacity-60'
						>
							{saving
								? 'Saving...'
								: isEditing
									? 'Save changes'
									: 'Add partner'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
