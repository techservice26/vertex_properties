'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
	HiChatBubbleLeftRight,
	HiCheck,
	HiEnvelope,
	HiPhone,
} from 'react-icons/hi2';

import { Toast } from '@/components/Toast';
import { submitContactMessage } from '@/lib/public-contact-api';

const NAVY = '#2b345b';
const RED = '#e60012';
const ASTERISK = '#fbb03b';
const FORM_BG = '#f2f2f2';
const PHONE_DISPLAY = '(213) 444-4151';
const PHONE_RAW = '+12134444151';

type Preferred = 'phone' | 'message' | 'email';

const preferredOptions: {
	id: Preferred;
	label: string;
	Icon: typeof HiPhone;
}[] = [
	{ id: 'phone', label: 'Phone Call', Icon: HiPhone },
	{ id: 'message', label: 'Message', Icon: HiChatBubbleLeftRight },
	{ id: 'email', label: 'Email', Icon: HiEnvelope },
];

function PillInput({
	id,
	name,
	type = 'text',
	autoComplete,
	required,
	label,
}: {
	id: string;
	name: string;
	type?: string;
	autoComplete?: string;
	required?: boolean;
	label: string;
}) {
	return (
		<div className='relative'>
			<input
				id={id}
				name={name}
				type={type}
				autoComplete={autoComplete}
				required={required}
				placeholder=' '
				className='peer w-full rounded-full border-0 bg-white px-5 pb-2.5 pt-6 text-sm font-medium text-[#0f172a] shadow-sm outline-none transition placeholder:text-transparent focus:outline-none'
			/>
			<label
				htmlFor={id}
				className='pointer-events-none absolute left-5 top-1/2 z-[1] origin-[0] -translate-y-1/2 text-sm text-[#9ca3af] transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:leading-tight peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:leading-tight'
			>
				{label}
				<span style={{ color: ASTERISK }}>*</span>
			</label>
		</div>
	);
}

function MessageTextarea({ id, name }: { id: string; name: string }) {
	return (
		<div className='relative'>
			<textarea
				id={id}
				name={name}
				required
				rows={5}
				placeholder=' '
				className='peer w-full resize-y rounded-[1.25rem] border-0 bg-white px-5 pb-3 pt-7 text-sm font-medium text-[#0f172a] shadow-sm outline-none transition placeholder:text-transparent focus:outline-none'
			/>
			<label
				htmlFor={id}
				className='pointer-events-none absolute left-5 top-5 z-[1] text-sm text-[#9ca3af] transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-[11px] peer-focus:leading-tight peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:leading-tight'
			>
				How can we help?{' '}
				<span style={{ color: ASTERISK }}>*</span>
			</label>
		</div>
	);
}

export default function ContactMessageForm() {
	const formId = useId();
	const containerRef = useRef<HTMLDivElement>(null);
	const [preferred, setPreferred] = useState<Preferred>('phone');
	const [fileLabel, setFileLabel] = useState<string>('');
	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [toast, setToast] = useState<{
		message: string;
		variant: 'success' | 'error';
	} | null>(null);
	const fileInputId = `${formId}-file`;

	const dismissToast = useCallback(() => {
		setToast(null);
	}, []);

	useEffect(() => {
		if (!submitted || !containerRef.current) {
			return;
		}

		const frame = window.requestAnimationFrame(() => {
			containerRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		});

		return () => window.cancelAnimationFrame(frame);
	}, [submitted]);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError('');

		const form = event.currentTarget;
		const formData = new FormData(form);
		const firstName = String(formData.get('firstName') ?? '').trim();
		const lastName = String(formData.get('lastName') ?? '').trim();
		const email = String(formData.get('email') ?? '').trim();
		const phone = String(formData.get('phone') ?? '').trim();
		const address = String(formData.get('address') ?? '').trim();
		const city = String(formData.get('city') ?? '').trim();
		const message = String(formData.get('message') ?? '').trim();
		const attachment = formData.get('attachment');
		const preferredLabel =
			preferredOptions.find((option) => option.id === preferred)?.label ??
			preferred;

		if (
			!firstName ||
			!lastName ||
			!email ||
			!phone ||
			!address ||
			!city ||
			!message
		) {
			setError('Please fill in all required fields.');
			return;
		}

		setSubmitting(true);

		try {
			await submitContactMessage({
				first_name: firstName,
				last_name: lastName,
				email,
				phone,
				address,
				city,
				description: `Preferred contact method: ${preferredLabel}\n\n${message}`,
				attachment:
					attachment instanceof File && attachment.size > 0 ? attachment : null,
			});

			setSubmitted(true);
			form.reset();
			setFileLabel('');
			setToast({
				message: 'Thank you! Your message was sent successfully.',
				variant: 'success',
			});
		} catch (submitError) {
			const message =
				submitError instanceof Error
					? submitError.message
					: 'Failed to submit your message. Please try again.';

			setError(message);
			setToast({
				message,
				variant: 'error',
			});
		} finally {
			setSubmitting(false);
		}
	}

	if (submitted) {
		return (
			<>
				<Toast
					message={toast?.message ?? 'Thank you! Your message was sent successfully.'}
					visible={Boolean(toast)}
					variant={toast?.variant ?? 'success'}
					onClose={dismissToast}
				/>
				<div
					ref={containerRef}
					className='mx-auto max-w-5xl scroll-mt-28 overflow-hidden rounded-[20px] shadow-[0_8px_40px_rgba(43,52,91,0.12)] ring-1 ring-black/[0.06]'
				>
					<div
						className='px-6 py-14 text-center sm:px-10 sm:py-16'
						style={{ backgroundColor: NAVY }}
					>
						<p
							className='text-xs font-bold uppercase tracking-[0.2em]'
							style={{ color: RED }}
						>
							Contact us
						</p>
						<h2 className='mt-3 font-sans text-2xl font-bold text-white sm:text-3xl'>
							Thank you for reaching out
						</h2>
						<p className='mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/80'>
							We received your message and will respond as soon as possible. For
							urgent needs, call{' '}
							<a
								href={`tel:${PHONE_RAW}`}
								className='font-semibold underline-offset-2 hover:underline'
								style={{ color: '#ffb800' }}
							>
								{PHONE_DISPLAY}
							</a>
							.
						</p>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Toast
				message={toast?.message ?? ''}
				visible={Boolean(toast)}
				variant={toast?.variant ?? 'error'}
				onClose={dismissToast}
			/>
			<div
				ref={containerRef}
				className='mx-auto max-w-5xl scroll-mt-28 overflow-hidden rounded-[20px] shadow-[0_8px_40px_rgba(43,52,91,0.12)] ring-1 ring-black/[0.06]'
			>
			{/* Header — navy, top rounded via parent overflow-hidden */}
			<header
				className='px-6 pb-2 pt-10 text-center sm:px-10 sm:pt-12'
				style={{ backgroundColor: NAVY }}
			>
				<p
					className='text-xs font-bold uppercase tracking-[0.2em] sm:text-sm'
					style={{ color: RED }}
				>
					Contact Us
				</p>
				<h2 className='mt-3 font-sans text-[1.65rem] font-bold leading-tight text-white sm:text-3xl md:text-[2rem]'>
					Send Us a Message
				</h2>
				<p className='mx-auto mt-4 max-w-2xl px-1 text-sm leading-relaxed text-white/90 sm:text-[15px]'>
					Submit the form and we&apos;ll respond as quickly as possible. Need
					immediate assistance? Call{' '}
					<a
						href={`tel:${PHONE_RAW}`}
						className='font-semibold text-white underline decoration-white/40 underline-offset-2 transition hover:decoration-white'
					>
						{PHONE_DISPLAY}
					</a>
				</p>
			</header>

			{/* Body — light gray */}
			<div
				className='px-5 pb-10 pt-8 sm:px-9 sm:pb-12 sm:pt-10 lg:px-12 lg:pb-14'
				style={{ backgroundColor: FORM_BG }}
			>
				<form onSubmit={handleSubmit} noValidate>
					<div className='grid gap-4 sm:grid-cols-2 sm:gap-5'>
						<PillInput
							id={`${formId}-first`}
							name='firstName'
							autoComplete='given-name'
							required
							label='First Name'
						/>
						<PillInput
							id={`${formId}-last`}
							name='lastName'
							autoComplete='family-name'
							required
							label='Last Name'
						/>
						<PillInput
							id={`${formId}-email`}
							name='email'
							type='email'
							autoComplete='email'
							required
							label='Email Address'
						/>
						<PillInput
							id={`${formId}-phone`}
							name='phone'
							type='tel'
							autoComplete='tel'
							required
							label='Phone Number'
						/>
						<PillInput
							id={`${formId}-address`}
							name='address'
							autoComplete='street-address'
							required
							label='Your Address'
						/>
						<PillInput
							id={`${formId}-city`}
							name='city'
							autoComplete='address-level2'
							required
							label='Your City'
						/>
					</div>

					<div className='mt-5 sm:mt-6'>
						<MessageTextarea id={`${formId}-msg`} name='message' />
					</div>

					<fieldset className='mt-8 border-0 p-0'>
						<legend className='mb-3 text-sm font-bold text-[#0f172a]'>
							Preferred Contact Method
							<span style={{ color: ASTERISK }}>*</span>
						</legend>
						<div className='flex flex-wrap gap-2.5 sm:gap-3'>
							{preferredOptions.map(({ id, label, Icon }) => {
								const active = preferred === id;
								return (
									<button
										key={id}
										type='button'
										onClick={() => setPreferred(id)}
										aria-pressed={active}
										className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${
											active
												? 'text-white shadow-sm'
												: 'bg-white text-[#0f172a] shadow-sm ring-1 ring-[#e0e0e0] hover:bg-[#fafafa]'
										}`}
										style={
											active
												? { backgroundColor: NAVY }
												: undefined
										}
									>
										<Icon className='h-5 w-5 shrink-0' aria-hidden />
										{label}
									</button>
								);
							})}
						</div>
						<input type='hidden' name='preferredContact' value={preferred} />
					</fieldset>

					<hr className='my-8 border-0 border-t border-[#d9d9d9]' />

					<div>
						<span
							id={`${fileInputId}-label`}
							className='mb-3 block text-sm font-bold text-[#0f172a]'
						>
							Upload Photo &amp; File
						</span>
						<input
							id={fileInputId}
							name='attachment'
							type='file'
							className='sr-only'
							accept='image/*,.pdf'
							aria-labelledby={`${fileInputId}-label`}
							onChange={(ev) => {
								const f = ev.target.files?.[0];
								setFileLabel(f ? f.name : '');
							}}
						/>
						<label
							htmlFor={fileInputId}
							className='inline-flex cursor-pointer items-center justify-center rounded-full border border-dashed border-[#b8b8b8] bg-white px-8 py-2.5 text-sm font-bold text-[#0f172a] shadow-sm transition hover:border-[#9ca3af] hover:bg-[#fafafa]'
						>
							Choose Files
						</label>
						{fileLabel ? (
							<p className='mt-2 text-xs font-medium text-[#525252]'>{fileLabel}</p>
						) : null}
						<p className='mt-3 max-w-xl text-[11px] font-medium uppercase leading-relaxed tracking-wide text-[#737373] sm:text-xs'>
							Have A Reference Video Or Photo Of Your Project? It Can Help To
							Get A Quick Estimate. Click Here To Upload
						</p>
					</div>

					{error ? (
						<p className='mt-6 rounded-xl bg-white px-4 py-3 text-sm font-medium text-[#c1272d] shadow-sm ring-1 ring-[#c1272d]/20'>
							{error}
						</p>
					) : null}

					<button
						type='submit'
						disabled={submitting}
						className='relative mt-10 flex w-full items-center rounded-full py-4 pl-6 pr-4 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-md transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70 sm:py-[1.125rem] sm:text-[15px]'
						style={{ backgroundColor: RED }}
					>
						<span className='flex-1 pr-2 text-center'>
							{submitting ? 'Submitting...' : 'Submit now'}
						</span>
						<span
							className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-inner'
							aria-hidden
						>
							<HiCheck
								className='h-5 w-5'
								style={{ color: RED }}
								strokeWidth={2.5}
							/>
						</span>
					</button>
				</form>
			</div>
		</div>
		</>
	);
}
