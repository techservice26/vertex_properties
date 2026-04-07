'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlinePolicy } from 'react-icons/md';
import { US_STATES } from '@/data/usStates';

const CARD_BODY = '#f1f1f1';
const NAVY_DEEP = '#061a2f';
const RED = '#d20a2d';
const ASTERISK = '#c1272d';

const inputBase =
	'w-full rounded-xl border-0 bg-white px-4 py-3 text-sm font-medium text-[#2d3748] shadow-[0_1px_3px_rgba(0,0,0,0.06)] outline-none transition placeholder:text-[#94a3b8] focus:outline-none';

const chevronRed = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23c1272d'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`;

const selectBase = `${inputBase} cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`;

export default function FreeVideoWalkThroughForm() {
	const formRef = useRef<HTMLFormElement>(null);

	function handleStartOver() {
		formRef.current?.reset();
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
		<div className='bg-white px-4 py-8 sm:px-6 sm:py-12 lg:py-14'>
			<div className='mx-auto w-full max-w-5xl overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(15,23,42,0.1)] ring-1 ring-black/[0.06]'>
				<header
					className='border-b border-white/10 py-5 sm:py-6'
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

				<div style={{ backgroundColor: CARD_BODY }}>
					<main className='mx-auto w-full max-w-3xl px-4 py-8 sm:px-8 sm:py-10'>
						<h1 className='font-sans text-2xl font-bold leading-tight tracking-tight text-[#0f172a] sm:text-[1.65rem] md:text-3xl'>
							FREE Video Walk-Through
						</h1>

						<p className='mt-5 text-sm leading-relaxed text-[#64748b] sm:text-[15px]'>
							After you submit this request, we&apos;ll send you a text
							message to confirm your appointment time. Please have your scope
							of work ready and keep a measuring tape nearby so we can review
							dimensions together during the video walk-through.
						</p>

						<form
							ref={formRef}
							className='mt-8 space-y-8'
							onSubmit={handleSubmit}
						>
							<section className='space-y-3'>
								<p className='text-sm font-bold text-[#1e293b] sm:text-base'>
									Where are you located?{' '}
									<span style={{ color: ASTERISK }}>*</span>
								</p>
								<div className='flex flex-col gap-3 rounded-xl border border-dashed border-[#b0b0b0] bg-white/80 p-4 sm:flex-row sm:flex-wrap sm:items-end'>
									<div className='min-w-0 flex-1 sm:flex-1'>
										<select
											name='customerState'
											required
											className={selectBase}
											style={{ backgroundImage: chevronRed }}
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
									<span className='py-1 text-center text-sm font-semibold text-[#64748b] sm:shrink-0 sm:self-center sm:px-2'>
										Or
									</span>
									<div className='min-w-0 flex-1 sm:max-w-[min(100%,220px)]'>
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

							<div className='flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-8'>
								<button
									type='submit'
									className='rounded-full px-10 py-4 text-center text-sm font-bold uppercase tracking-[0.15em] text-white shadow-md transition hover:brightness-95 sm:flex-1'
									style={{ backgroundColor: RED }}
								>
									SUBMIT NOW
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

						<footer className='mt-12 border-t border-[#d9d9d9] pt-10'>
							<div className='flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4'>
								<MdOutlinePolicy
									className='h-12 w-12 shrink-0 text-[#2d3748] sm:h-14 sm:w-14'
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
								We provide you with a quote based on time and materials. Our
								pricing for services is competitive and clear – just pay for
								what you need.
							</p>
						</footer>
					</main>
				</div>
			</div>
		</div>
	);
}
