'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Download, FileText } from 'lucide-react';

import {
	getContactMessageAttachmentName,
	getContactMessageAttachmentUrl,
	isContactMessageImageAttachment,
	isContactMessagePdfAttachment,
} from '@/lib/contact-message-utils';
import type { ContactMessage } from '@/types/contact-message';

type ContactMessageAttachmentPreviewProps = {
	message: ContactMessage;
	variant?: 'table' | 'detail';
};

export function ContactMessageAttachmentPreview({
	message,
	variant = 'detail',
}: ContactMessageAttachmentPreviewProps) {
	const attachmentUrl = getContactMessageAttachmentUrl(message);

	if (!attachmentUrl) {
		return variant === 'table' ? (
			<span className='text-slate-400'>—</span>
		) : null;
	}

	const fileName = getContactMessageAttachmentName(message);
	const isImage = isContactMessageImageAttachment(message);
	const isPdf = isContactMessagePdfAttachment(message);

	if (variant === 'table') {
		if (isImage) {
			return (
				<Link
					href={attachmentUrl}
					target='_blank'
					rel='noopener noreferrer'
					className='block'
					title={fileName}
				>
					<div className='relative h-14 w-20 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200'>
						<Image
							src={attachmentUrl}
							alt={fileName}
							fill
							className='object-cover'
							sizes='80px'
						/>
					</div>
				</Link>
			);
		}

		return (
			<a
				href={attachmentUrl}
				target='_blank'
				rel='noopener noreferrer'
				className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white'
				title={fileName}
			>
				<FileText className='h-4 w-4 shrink-0 text-[#c1272d]' />
				<span className='max-w-[120px] truncate'>{fileName}</span>
			</a>
		);
	}

	return (
		<div className='space-y-3'>
			{isImage ? (
				<Link
					href={attachmentUrl}
					target='_blank'
					rel='noopener noreferrer'
					className='block overflow-hidden rounded-xl border border-slate-200 bg-slate-50'
				>
					<div className='relative aspect-[4/3] w-full max-w-md'>
						<Image
							src={attachmentUrl}
							alt={fileName}
							fill
							className='object-contain'
							sizes='(max-width: 768px) 100vw, 448px'
						/>
					</div>
				</Link>
			) : isPdf ? (
				<div className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
					<div className='flex items-center gap-3'>
						<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200'>
							<FileText className='h-6 w-6 text-[#c1272d]' />
						</div>
						<div className='min-w-0'>
							<p className='truncate text-sm font-medium text-slate-900'>
								{fileName}
							</p>
							<p className='text-xs text-slate-500'>PDF attachment</p>
						</div>
					</div>
				</div>
			) : null}

			<a
				href={attachmentUrl}
				target='_blank'
				rel='noopener noreferrer'
				className='inline-flex items-center gap-2 text-sm font-medium text-[#c1272d] transition hover:text-[#a01f24]'
			>
				<Download className='h-4 w-4' />
				Download {fileName}
			</a>
		</div>
	);
}
