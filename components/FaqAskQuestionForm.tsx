'use client';

import Link from 'next/link';
import { useId, useState } from 'react';

export default function FaqAskQuestionForm() {
	const id = useId();
	const [smsOptIn, setSmsOptIn] = useState(false);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
		<section
			className='bg-white px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8'
			aria-labelledby='faq-ask-heading'
		>
			<div className='mx-auto max-w-3xl rounded-2xl bg-[#f1f5f9] p-6 shadow-sm ring-1 ring-[#e2e8f0] sm:p-8'>
				<h2
					id='faq-ask-heading'
					className='font-sans text-lg font-bold text-[#c1272d] sm:text-xl'
				>
					Ask a Question
				</h2>
				<p className='mt-1 text-sm text-[#0f172a]'>
					Please ask your question below <span className='text-[#c1272d]'>*</span>
				</p>

				<form className='mt-6 space-y-4' onSubmit={handleSubmit}>
					<label className='block'>
						<span className='sr-only'>Your question</span>
						<textarea
							name='question'
							required
							rows={5}
							placeholder='Enter your question here'
							className='w-full resize-y rounded-xl border-0 bg-white px-4 py-3 text-sm text-[#0f172a] shadow-sm outline-none ring-1 ring-[#e2e8f0] placeholder:text-[#94a3b8]'
						/>
					</label>

					<div className='grid gap-4 sm:grid-cols-2'>
						<label className='block'>
							<span className='mb-1 block text-xs font-semibold text-[#334155]'>
								First Name <span className='text-[#c1272d]'>*</span>
							</span>
							<input
								name='firstName'
								required
								autoComplete='given-name'
								className='w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-[#0f172a] shadow-sm outline-none ring-1 ring-[#e2e8f0]'
							/>
						</label>
						<label className='block'>
							<span className='mb-1 block text-xs font-semibold text-[#334155]'>
								Last Name <span className='text-[#c1272d]'>*</span>
							</span>
							<input
								name='lastName'
								required
								autoComplete='family-name'
								className='w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-[#0f172a] shadow-sm outline-none ring-1 ring-[#e2e8f0]'
							/>
						</label>
						<label className='block'>
							<span className='mb-1 block text-xs font-semibold text-[#334155]'>
								Email Address <span className='text-[#c1272d]'>*</span>
							</span>
							<input
								name='email'
								type='email'
								required
								autoComplete='email'
								className='w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-[#0f172a] shadow-sm outline-none ring-1 ring-[#e2e8f0]'
							/>
						</label>
						<label className='block'>
							<span className='mb-1 block text-xs font-semibold text-[#334155]'>
								Phone Number <span className='text-[#c1272d]'>*</span>
							</span>
							<input
								name='phone'
								type='tel'
								required
								autoComplete='tel'
								className='w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-[#0f172a] shadow-sm outline-none ring-1 ring-[#e2e8f0]'
							/>
						</label>
					</div>

					<label className='block sm:max-w-[50%]'>
						<span className='mb-1 block text-xs font-semibold text-[#334155]'>
							Zip Code or City, State <span className='text-[#c1272d]'>*</span>
						</span>
						<input
							name='location'
							required
							autoComplete='postal-code'
							className='w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-[#0f172a] shadow-sm outline-none ring-1 ring-[#e2e8f0]'
						/>
					</label>

					<div className='rounded-xl bg-white/80 p-4 ring-1 ring-[#e2e8f0]'>
						<label className='flex cursor-pointer items-start gap-3'>
							<input
								id={`${id}-sms`}
								type='checkbox'
								checked={smsOptIn}
								onChange={(e) => setSmsOptIn(e.target.checked)}
								className='mt-1 h-4 w-4 shrink-0 accent-[#c1272d]'
							/>
							<span className='text-sm leading-relaxed text-[#475569]'>
								Yes! You can text me service reminders and other messages.
							</span>
						</label>
						<p className='mt-3 text-xs leading-relaxed text-[#64748b]'>
							By submitting this form, you agree to our{' '}
							<Link
								href='/contact'
								className='font-medium text-[#c1272d] underline-offset-2 hover:underline'
							>
								Terms of Service
							</Link>{' '}
							and acknowledge our{' '}
							<Link
								href='/contact'
								className='font-medium text-[#c1272d] underline-offset-2 hover:underline'
							>
								Privacy Policy
							</Link>
							. Message frequency varies. Message and data rates may apply.
							Reply STOP to opt out or HELP for help.
						</p>
						<p className='mt-2 text-xs leading-relaxed text-[#64748b]'>
							We use the information you provide only to respond to your
							question and deliver the services you request. See our{' '}
							<Link
								href='/contact'
								className='font-medium text-[#c1272d] underline-offset-2 hover:underline'
							>
								privacy practices
							</Link>{' '}
							for details.
						</p>
					</div>

					<button
						type='submit'
						className='rounded-full bg-[#c1272d] px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#a61f29]'
					>
						Send message
					</button>
				</form>
			</div>
		</section>
	);
}
