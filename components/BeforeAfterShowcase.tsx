'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const NAVY = '#1e3a5f';

const IMG_BEFORE = '/images/before.png';
const IMG_AFTER = '/images/after.png';

export default function BeforeAfterShowcase() {
	const [pct, setPct] = useState(50);
	const dragging = useRef(false);
	const trackRef = useRef<HTMLDivElement>(null);

	const setFromClientX = useCallback((clientX: number) => {
		const el = trackRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		const x = Math.min(Math.max(clientX - r.left, 0), r.width);
		setPct(Math.round((x / r.width) * 100));
	}, []);

	return (
		<section
			className='bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-20'
			aria-labelledby='before-after-heading'
		>
			<div className='mx-auto max-w-5xl'>
				<h2
					id='before-after-heading'
					className='text-center font-sans text-2xl font-bold tracking-tight text-[#1e3a5f] sm:text-3xl md:text-4xl'
				>
					Before &amp; After Showcase
				</h2>

				<div
					ref={trackRef}
					className='relative mx-auto mt-10 aspect-[16/10] max-w-4xl cursor-ew-resize select-none overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(15,23,42,0.12)] ring-1 ring-[#e8edf3] sm:mt-12'
					onPointerDown={(e) => {
						(e.target as HTMLElement).setPointerCapture(e.pointerId);
						dragging.current = true;
						setFromClientX(e.clientX);
					}}
					onPointerMove={(e) => {
						if (!dragging.current) return;
						setFromClientX(e.clientX);
					}}
					onPointerUp={(e) => {
						dragging.current = false;
						try {
							(e.target as HTMLElement).releasePointerCapture(e.pointerId);
						} catch {
							/* noop */
						}
					}}
					onPointerCancel={() => {
						dragging.current = false;
					}}
					role='group'
					aria-label='Before and after comparison. Drag horizontally to compare.'
				>
					<Image
						src={IMG_AFTER}
						alt='After — completed work'
						fill
						className='object-cover'
						sizes='(max-width: 1024px) 100vw, 896px'
						priority
					/>
					<div
						className='absolute inset-0 overflow-hidden'
						style={{
							clipPath: `inset(0 ${100 - pct}% 0 0)`,
						}}
					>
						<Image
							src={IMG_BEFORE}
							alt='Before — original condition'
							fill
							className='object-cover'
							sizes='(max-width: 1024px) 100vw, 896px'
						/>
					</div>

					<div
						className='pointer-events-none absolute bottom-0 top-0 z-10 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]'
						style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
						aria-hidden
					/>
					<div
						className='absolute top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white/95 text-[#1e293b] shadow-lg'
						style={{ left: `${pct}%` }}
						aria-hidden
					>
						<span className='flex items-center gap-0'>
							<HiChevronLeft className='-mr-1 h-5 w-5' />
							<HiChevronRight className='-ml-1 h-5 w-5' />
						</span>
					</div>

					<span
						className='pointer-events-none absolute bottom-4 left-4 z-10 rounded-full px-4 py-2 text-xs font-bold text-white shadow-md sm:text-sm'
						style={{ backgroundColor: NAVY }}
					>
						Before
					</span>
					<span
						className='pointer-events-none absolute bottom-4 right-4 z-10 rounded-full px-4 py-2 text-xs font-bold text-white shadow-md sm:text-sm'
						style={{ backgroundColor: NAVY }}
					>
						After
					</span>
				</div>
			</div>
		</section>
	);
}
