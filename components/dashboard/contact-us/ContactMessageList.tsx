'use client';

import { useCallback, useEffect, useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';

import { ContactMessageDetailModal } from '@/components/dashboard/contact-us/ContactMessageDetailModal';
import { ContactMessageAttachmentPreview } from '@/components/dashboard/contact-us/ContactMessageAttachmentPreview';
import {
	deleteContactMessage,
	fetchContactMessages,
} from '@/lib/contact-message-api';
import {
	formatContactMessageDate,
	getContactMessageFullName,
	sortContactMessages,
} from '@/lib/contact-message-utils';
import { getRichTextPlainText } from '@/lib/rich-text-utils';
import type { ContactMessage } from '@/types/contact-message';

export function ContactMessageList() {
	const [messages, setMessages] = useState<ContactMessage[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
		null,
	);

	const loadMessages = useCallback(async () => {
		setLoading(true);
		setError('');

		try {
			const data = await fetchContactMessages();
			setMessages(sortContactMessages(data));
		} catch (loadError) {
			setError(
				loadError instanceof Error
					? loadError.message
					: 'Failed to load contact messages.',
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void loadMessages();
	}, [loadMessages]);

	const handleDelete = async (message: ContactMessage) => {
		const confirmed = window.confirm(
			`Delete message from "${getContactMessageFullName(message)}"? This cannot be undone.`,
		);

		if (!confirmed) {
			return;
		}

		try {
			await deleteContactMessage(message.id);
			setMessages((current) =>
				current.filter((item) => item.id !== message.id),
			);

			if (selectedMessage?.id === message.id) {
				setSelectedMessage(null);
			}
		} catch (deleteError) {
			window.alert(
				deleteError instanceof Error
					? deleteError.message
					: 'Failed to delete contact message.',
			);
		}
	};

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-2xl font-bold text-slate-900'>Contact us</h1>
				<p className='mt-1 text-sm text-slate-600'>
					View and manage messages submitted from the public contact form.
				</p>
			</div>

			{loading ? (
				<p className='text-sm text-slate-500'>Loading contact messages...</p>
			) : null}

			{error ? (
				<div className='rounded-lg border border-[#c1272d]/20 bg-[#c1272d]/5 px-4 py-3 text-sm text-[#c1272d]'>
					{error}
				</div>
			) : null}

			{!loading && !error && messages.length === 0 ? (
				<div className='rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center'>
					<p className='text-sm text-slate-600'>
						No contact messages yet. Submissions from `/contact` will appear
						here.
					</p>
				</div>
			) : null}

			{messages.length > 0 ? (
				<div className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm'>
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-slate-200 text-sm'>
							<thead className='bg-slate-50'>
								<tr>
									<th className='px-4 py-3 text-left font-semibold text-slate-700'>
										Name
									</th>
									<th className='px-4 py-3 text-left font-semibold text-slate-700'>
										Contact
									</th>
									<th className='px-4 py-3 text-left font-semibold text-slate-700'>
										Location
									</th>
									<th className='px-4 py-3 text-left font-semibold text-slate-700'>
										Message
									</th>
									<th className='px-4 py-3 text-left font-semibold text-slate-700'>
										Attachment
									</th>
									<th className='px-4 py-3 text-left font-semibold text-slate-700'>
										Received
									</th>
									<th className='px-4 py-3 text-right font-semibold text-slate-700'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-slate-100'>
								{messages.map((message) => (
									<tr key={message.id} className='hover:bg-slate-50/80'>
										<td className='px-4 py-3 font-medium text-slate-900'>
											{getContactMessageFullName(message)}
										</td>
										<td className='px-4 py-3'>
											<div className='space-y-1 text-slate-600'>
												<p>{message.email}</p>
												<p>{message.phone}</p>
											</div>
										</td>
										<td className='px-4 py-3 text-slate-600'>
											<p>{message.city}</p>
											<p className='mt-1 line-clamp-2 text-xs text-slate-500'>
												{message.address}
											</p>
										</td>
										<td className='max-w-xs px-4 py-3 text-slate-600'>
											<p className='line-clamp-2'>
												{getRichTextPlainText(message.description, 160)}
											</p>
										</td>
										<td className='px-4 py-3'>
											<ContactMessageAttachmentPreview
												message={message}
												variant='table'
											/>
										</td>
										<td className='whitespace-nowrap px-4 py-3 text-slate-600'>
											{formatContactMessageDate(message.created_at)}
										</td>
										<td className='px-4 py-3'>
											<div className='flex items-center justify-end gap-2'>
												<button
													type='button'
													onClick={() => setSelectedMessage(message)}
													className='rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-slate-300 hover:text-slate-900'
													aria-label={`View message from ${getContactMessageFullName(message)}`}
												>
													<Eye className='h-4 w-4' />
												</button>
												<button
													type='button'
													onClick={() => void handleDelete(message)}
													className='rounded-lg border border-slate-200 p-2 text-[#c1272d] transition hover:border-[#c1272d]/30 hover:bg-[#c1272d]/5'
													aria-label={`Delete message from ${getContactMessageFullName(message)}`}
												>
													<Trash2 className='h-4 w-4' />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			) : null}

			{selectedMessage ? (
				<ContactMessageDetailModal
					message={selectedMessage}
					onClose={() => setSelectedMessage(null)}
				/>
			) : null}
		</div>
	);
}
