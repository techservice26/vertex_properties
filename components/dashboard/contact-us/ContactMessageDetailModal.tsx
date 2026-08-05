'use client';

import { X } from 'lucide-react';

import { ContactMessageAttachmentPreview } from '@/components/dashboard/contact-us/ContactMessageAttachmentPreview';
import {
	formatContactMessageDate,
	getContactMessageAttachmentUrl,
	getContactMessageFullName,
} from '@/lib/contact-message-utils';
import type { ContactMessage } from '@/types/contact-message';

type ContactMessageDetailModalProps = {
	message: ContactMessage;
	onClose: () => void;
};

function DetailField({
	label,
	value,
}: {
	label: string;
	value: React.ReactNode;
}) {
	return (
		<div>
			<p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
				{label}
			</p>
			<div className='mt-1 text-sm text-slate-900'>{value}</div>
		</div>
	);
}

export function ContactMessageDetailModal({
	message,
	onClose,
}: ContactMessageDetailModalProps) {
	const attachmentUrl = getContactMessageAttachmentUrl(message);

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4'>
			<div className='max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl'>
				<div className='flex items-center justify-between border-b border-slate-200 px-6 py-4'>
					<div>
						<h2 className='text-lg font-semibold text-slate-900'>
							{getContactMessageFullName(message)}
						</h2>
						<p className='mt-1 text-xs text-slate-500'>
							Received {formatContactMessageDate(message.created_at)}
						</p>
					</div>
					<button
						type='button'
						onClick={onClose}
						className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'
						aria-label='Close'
					>
						<X className='h-5 w-5' />
					</button>
				</div>

				<div className='space-y-5 px-6 py-5'>
					<div className='grid gap-4 sm:grid-cols-2'>
						<DetailField label='Email' value={message.email} />
						<DetailField label='Phone' value={message.phone} />
						<DetailField label='City' value={message.city} />
						<DetailField label='Address' value={message.address} />
					</div>

					<DetailField
						label='Message'
						value={
							<p className='whitespace-pre-wrap leading-relaxed text-slate-700'>
								{message.description}
							</p>
						}
					/>

					{attachmentUrl ? (
						<DetailField
							label='Attachment'
							value={<ContactMessageAttachmentPreview message={message} />}
						/>
					) : null}
				</div>

				<div className='flex justify-end border-t border-slate-200 px-6 py-4'>
					<button
						type='button'
						onClick={onClose}
						className='rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50'
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
