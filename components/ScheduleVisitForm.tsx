'use client';

import { useId, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiBuildingLibrary, HiCreditCard } from 'react-icons/hi2';
import { MdOutlinePolicy } from 'react-icons/md';
import { US_STATES } from '@/data/usStates';

const BG = '#f1f1f1f1';
const NAVY = '#2d3748';
const NAVY_DEEP = '#061a2f';
const RED = '#d20a2d';
const ASTERISK = '#fbb03b';

const inputBase =
	'w-full rounded-xl border-0 bg-white px-4 py-3 text-sm font-medium text-[#2d3748] shadow-[0_1px_3px_rgba(0,0,0,0.06)] outline-none transition placeholder:text-[#94a3b8] focus:ring-2 focus:ring-[#061a2f]/20';

const selectBase = `${inputBase} cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`;

function ReqMark() {
	return <span style={{ color: ASTERISK }}>*</span>;
}

function SectionTitle({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<p
			className={`text-sm font-bold text-[#1e293b] sm:text-base ${className}`}
		>
			{children}
		</p>
	);
}

function RadioYesNo({
	name,
	label,
	required,
}: {
	name: string;
	label: React.ReactNode;
	required?: boolean;
}) {
	return (
		<fieldset className='border-0 p-0'>
			<legend className='mb-2 text-sm font-bold text-[#1e293b]'>
				{label}
				{required ? <ReqMark /> : null}
			</legend>
			<div className='flex flex-wrap gap-6'>
				{(['yes', 'no'] as const).map((v) => (
					<label
						key={v}
						className='inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[#334155]'
					>
						<input
							type='radio'
							name={name}
							value={v}
							required={required}
							className='h-4 w-4 shrink-0 accent-[#061a2f]'
						/>
						{v === 'yes' ? 'Yes' : 'No'}
					</label>
				))}
			</div>
		</fieldset>
	);
}

export default function ScheduleVisitForm() {
	const formRef = useRef<HTMLFormElement>(null);
	const id = useId();
	const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');

	function handleStartOver() {
		formRef.current?.reset();
		setPaymentMethod('card');
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
		<div
			className='font-sans my-10 rounded-b-2xl'
			style={{ backgroundColor: BG }}
		>
			<div className='mx-auto max-w-5xl'>
				<header
					className='border-b border-white/10 py-5 sm:py-6 rounded-t-2xl'
					style={{ backgroundColor: NAVY_DEEP }}
				>
					<div className='mx-auto flex justify-center px-4'>
						<Link
							href='/'
							className='relative block h-11 w-[180px] sm:h-12 sm:w-[200px]'
						>
							<Image
								src='/images/logo.png'
								alt='Vertex Property home'
								fill
								className='object-contain object-center'
								sizes='200px'
								priority
							/>
						</Link>
					</div>
				</header>

				<main className='mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8  rounded-2xl'>
					<h1 className='font-sans text-2xl font-bold leading-tight tracking-tight text-[#1e293b] sm:text-[1.65rem] md:text-3xl'>
						Schedule Your Site Visit / Deposit
					</h1>

					<div className='mt-5 space-y-4 text-sm leading-relaxed text-[#475569] sm:text-[15px]'>
						<p>
							To reserve your on-site visit, we collect a{' '}
							<strong>$100.00</strong> non-refundable deposit.
							This holds your appointment window and covers
							scheduling and routing for a qualified technician.
						</p>
						<p>
							Cancellations made within <strong>48 hours</strong>{' '}
							of the scheduled visit are subject to our
							cancellation policy. By submitting this form, you
							acknowledge these terms and authorize the deposit
							amount below.
						</p>
					</div>

					<form
						ref={formRef}
						className='mt-10 space-y-10'
						onSubmit={handleSubmit}
					>
						<section className='space-y-3'>
							<SectionTitle>
								Where are you located? <ReqMark />
							</SectionTitle>
							<div className='flex flex-col gap-3 rounded-xl border border-dashed border-[#b0b0b0] bg-white/60 p-4 sm:flex-row sm:flex-wrap sm:items-end'>
								<div className='min-w-0 flex-1 sm:max-w-[min(100%,280px)] sm:flex-1'>
									<select
										name='customerState'
										required
										className={selectBase}
										style={{
											backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
										}}
										defaultValue=''
									>
										<option value='' disabled>
											All Usa State List
										</option>
										{US_STATES.map((s) => (
											<option key={s} value={s}>
												{s}
											</option>
										))}
									</select>
								</div>
								<span className='py-1 text-center text-sm font-semibold text-[#64748b] sm:shrink-0 sm:self-center sm:px-2 sm:py-0'>
									Or
								</span>
								<div className='min-w-0 flex-1 sm:max-w-[min(100%,220px)] sm:flex-1'>
									<input
										name='zipCode'
										type='text'
										inputMode='numeric'
										pattern='[0-9]*'
										maxLength={10}
										required
										placeholder='Enter Zip Code'
										className={inputBase}
									/>
								</div>
							</div>
						</section>

						<section className='space-y-6'>
							<RadioYesNo
								name='wantAppointment'
								required
								label='Would you like to schedule an appointment?'
							/>

							<div className='grid gap-4 sm:grid-cols-2 sm:gap-5'>
								<div>
									<label
										htmlFor={`${id}-fn`}
										className='mb-1.5 block text-sm font-bold text-[#1e293b]'
									>
										First Name <ReqMark />
									</label>
									<input
										id={`${id}-fn`}
										name='firstName'
										required
										autoComplete='given-name'
										className={inputBase}
									/>
								</div>
								<div>
									<label
										htmlFor={`${id}-ln`}
										className='mb-1.5 block text-sm font-bold text-[#1e293b]'
									>
										Last Name <ReqMark />
									</label>
									<input
										id={`${id}-ln`}
										name='lastName'
										required
										autoComplete='family-name'
										className={inputBase}
									/>
								</div>
								<div>
									<label
										htmlFor={`${id}-em`}
										className='mb-1.5 block text-sm font-bold text-[#1e293b]'
									>
										Email Address <ReqMark />
									</label>
									<input
										id={`${id}-em`}
										name='email'
										type='email'
										required
										autoComplete='email'
										className={inputBase}
									/>
								</div>
								<div>
									<label
										htmlFor={`${id}-ph`}
										className='mb-1.5 block text-sm font-bold text-[#1e293b]'
									>
										Phone Number <ReqMark />
									</label>
									<input
										id={`${id}-ph`}
										name='phone'
										type='tel'
										required
										autoComplete='tel'
										className={inputBase}
									/>
								</div>
							</div>
						</section>

						<section className='space-y-4'>
							<div>
								<label
									htmlFor={`${id}-bill1`}
									className='mb-1.5 block text-sm font-bold text-[#1e293b]'
								>
									Billing Address <ReqMark />
								</label>
								<input
									id={`${id}-bill1`}
									name='billingAddress1'
									required
									autoComplete='street-address'
									className={inputBase}
								/>
							</div>
							<input
								name='billingAddress2'
								autoComplete='address-line2'
								className={inputBase}
								placeholder='Apartment, suite, etc. (optional)'
							/>
							<div className='grid gap-4 sm:grid-cols-3 sm:gap-3'>
								<div className='sm:col-span-1'>
									<label
										htmlFor={`${id}-bst`}
										className='sr-only'
									>
										State / Province
									</label>
									<select
										id={`${id}-bst`}
										name='billingState'
										required
										className={selectBase}
										style={{
											backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
										}}
										defaultValue=''
									>
										<option value='' disabled>
											State/Province
										</option>
										{US_STATES.map((s) => (
											<option key={s} value={s}>
												{s}
											</option>
										))}
									</select>
								</div>
								<div>
									<label
										htmlFor={`${id}-city`}
										className='sr-only'
									>
										City
									</label>
									<input
										id={`${id}-city`}
										name='billingCity'
										required
										autoComplete='address-level2'
										placeholder='City'
										className={inputBase}
									/>
								</div>
								<div>
									<label
										htmlFor={`${id}-zip`}
										className='sr-only'
									>
										Zip / Postal
									</label>
									<input
										id={`${id}-zip`}
										name='billingZip'
										required
										autoComplete='postal-code'
										placeholder='Zip/Postal'
										className={inputBase}
									/>
								</div>
							</div>

							<RadioYesNo
								name='jobSameAsBilling'
								required
								label='Is Job Address same as Billing Address?'
							/>
						</section>

						<section>
							<label
								htmlFor={`${id}-project`}
								className='mb-1.5 block text-sm font-bold text-[#1e293b]'
							>
								Tell us about your project
							</label>
							<textarea
								id={`${id}-project`}
								name='projectDetails'
								rows={6}
								className={`${inputBase} resize-y`}
								placeholder='Scope, access notes, preferred timing…'
							/>
						</section>

						<section
							id='schedule-payment'
							className='scroll-mt-24 space-y-5 rounded-2xl bg-white/80 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] ring-1 ring-[#e8e8e8] sm:p-6 sm:scroll-mt-28'
							aria-label='Payment details'
						>
							<div>
								<label
									htmlFor={`${id}-service`}
									className='mb-1.5 block text-sm font-bold text-[#1e293b]'
								>
									Service Charge
								</label>
								<select
									id={`${id}-service`}
									name='serviceCharge'
									className={selectBase}
									style={{
										backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
									}}
									defaultValue='site-visit-deposit'
								>
									<option value='site-visit-deposit'>
										Site Visit Deposit
									</option>
								</select>
							</div>

							<div className='grid grid-cols-3 gap-3 border-y border-[#e8e8e8] py-4 text-center sm:gap-4'>
								<div>
									<p className='text-[11px] font-semibold uppercase tracking-wide text-[#64748b] sm:text-xs'>
										Payment Amount
									</p>
									<p className='mt-1 font-sans text-lg font-bold text-[#1e293b] sm:text-xl'>
										$100.00
									</p>
								</div>
								<div>
									<p className='text-[11px] font-semibold uppercase tracking-wide text-[#64748b] sm:text-xs'>
										Transaction Fee 2.5%
									</p>
									<p className='mt-1 font-sans text-lg font-bold text-[#1e293b] sm:text-xl'>
										$2.50
									</p>
								</div>
								<div>
									<p className='text-[11px] font-semibold uppercase tracking-wide text-[#64748b] sm:text-xs'>
										Total
									</p>
									<p
										className='mt-1 font-sans text-lg font-bold sm:text-xl'
										style={{ color: RED }}
									>
										$102.50
									</p>
								</div>
							</div>

							<div>
								<p className='mb-2 text-sm font-bold text-[#1e293b]'>
									Payment method
								</p>
								<div className='flex gap-2 rounded-full bg-white p-1 shadow-inner ring-1 ring-[#e8e8e8] sm:inline-flex'>
									<button
										type='button'
										onClick={() => setPaymentMethod('card')}
										className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition sm:flex-initial ${
											paymentMethod === 'card'
												? 'text-white shadow-sm'
												: 'bg-transparent text-[#1e293b]'
										}`}
										style={
											paymentMethod === 'card'
												? { backgroundColor: NAVY }
												: undefined
										}
										aria-pressed={paymentMethod === 'card'}
									>
										<HiCreditCard
											className={`h-5 w-5 ${paymentMethod === 'card' ? 'text-white' : ''}`}
											style={
												paymentMethod !== 'card'
													? { color: NAVY }
													: undefined
											}
											aria-hidden
										/>
										Card
									</button>
									<button
										type='button'
										onClick={() => setPaymentMethod('bank')}
										className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition sm:flex-initial ${
											paymentMethod === 'bank'
												? 'text-white shadow-sm'
												: 'bg-transparent text-[#1e293b]'
										}`}
										style={
											paymentMethod === 'bank'
												? { backgroundColor: NAVY }
												: undefined
										}
										aria-pressed={paymentMethod === 'bank'}
									>
										<HiBuildingLibrary
											className={`h-5 w-5 ${paymentMethod === 'bank' ? 'text-white' : ''}`}
											style={
												paymentMethod !== 'bank'
													? { color: NAVY }
													: undefined
											}
											aria-hidden
										/>
										Bank
									</button>
								</div>
								<input
									type='hidden'
									name='paymentMethod'
									value={paymentMethod}
								/>
							</div>

							{paymentMethod === 'card' ? (
								<div className='space-y-4 border-t border-[#e8e8e8] pt-5'>
									<div>
										<label
											htmlFor={`${id}-cc`}
											className='mb-1.5 block text-xs font-semibold text-[#64748b]'
										>
											Card number
										</label>
										<input
											id={`${id}-cc`}
											name='cardNumber'
											inputMode='numeric'
											autoComplete='cc-number'
											placeholder='1234 1234 1234 1234'
											required={paymentMethod === 'card'}
											className={inputBase}
										/>
									</div>
									<div className='grid gap-4 sm:grid-cols-2'>
										<div>
											<label
												htmlFor={`${id}-exp`}
												className='mb-1.5 block text-xs font-semibold text-[#64748b]'
											>
												Expiration date
											</label>
											<input
												id={`${id}-exp`}
												name='cardExp'
												autoComplete='cc-exp'
												placeholder='MM / YY'
												required={
													paymentMethod === 'card'
												}
												className={inputBase}
											/>
										</div>
										<div>
											<label
												htmlFor={`${id}-cvc`}
												className='mb-1.5 block text-xs font-semibold text-[#64748b]'
											>
												Security code
											</label>
											<input
												id={`${id}-cvc`}
												name='cardCvc'
												autoComplete='cc-csc'
												placeholder='CVC'
												required={
													paymentMethod === 'card'
												}
												className={inputBase}
											/>
										</div>
									</div>
									<div>
										<label
											htmlFor={`${id}-country`}
											className='mb-1.5 block text-xs font-semibold text-[#64748b]'
										>
											Country
										</label>
										<select
											id={`${id}-country`}
											name='cardCountry'
											className={selectBase}
											style={{
												backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
											}}
											defaultValue='US'
										>
											<option value='US'>
												United States / USA
											</option>
											<option value='PR'>
												Puerto Rico
											</option>
										</select>
									</div>
								</div>
							) : (
								<p className='border-t border-[#e8e8e8] pt-5 text-sm text-[#64748b]'>
									Bank transfer instructions will be sent
									after you submit this request.
								</p>
							)}

							<p className='text-xs leading-relaxed text-[#64748b]'>
								You authorize Vertex Property Services Inc to
								charge the payment method above for the deposit
								total shown, and for any future charges
								associated with completed work, in accordance
								with our estimate and your written approval.
							</p>

							<div>
								<label
									htmlFor={`${id}-auth`}
									className='sr-only'
								>
									Additional authorization notes
								</label>
								<textarea
									id={`${id}-auth`}
									name='authorizationNotes'
									rows={4}
									className={`${inputBase} resize-y`}
									placeholder='Optional notes for your records…'
								/>
							</div>

							<label className='flex cursor-pointer items-start gap-3 text-sm font-medium text-[#334155]'>
								<input
									type='checkbox'
									name='termsAccepted'
									required
									className='mt-1 h-4 w-4 shrink-0 accent-[#061a2f]'
								/>
								<span>
									I agree to the{' '}
									<Link
										href='/contact'
										className='font-semibold underline underline-offset-2'
										style={{ color: RED }}
									>
										terms and conditions
									</Link>
								</span>
							</label>
						</section>

						<div className='flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-8'>
							<button
								type='submit'
								className='rounded-full px-10 py-4 text-center text-sm font-bold uppercase tracking-[0.15em] text-white shadow-md transition hover:brightness-95 sm:flex-1'
								style={{ backgroundColor: RED }}
							>
								Submit now
							</button>
							<button
								type='button'
								onClick={handleStartOver}
								className='text-center text-sm font-bold uppercase tracking-[0.12em] transition hover:opacity-80 sm:text-left'
								style={{ color: RED }}
							>
								Start Over
							</button>
						</div>
					</form>

					<footer className='mt-14 border-t border-[#e2e2e2] pt-10'>
						<div className='flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4'>
							<MdOutlinePolicy
								className='h-12 w-12 shrink-0 sm:h-14 sm:w-14'
								style={{ color: NAVY }}
								aria-hidden
							/>
							<p
								className='text-base font-bold uppercase tracking-wide sm:text-lg'
								style={{ color: RED }}
							>
								Licensed &amp; Insured
							</p>
						</div>
						<p className='mx-auto mt-6 max-w-xl text-center text-xs leading-relaxed text-[#64748b] sm:text-sm'>
							Final quotes are based on time and materials
							observed on site. Your deposit is applied toward
							approved work. Vertex Property Services Inc is not
							liable for pre-existing conditions discovered after
							inspection.
						</p>
					</footer>
				</main>
			</div>
		</div>
	);
}
