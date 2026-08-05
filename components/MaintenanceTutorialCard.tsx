'use client';

import Image from 'next/image';
import { useState } from 'react';
import { HiPlay } from 'react-icons/hi2';

import { MaintenanceVideoPlayerModal } from '@/components/MaintenanceVideoPlayerModal';
import type { MaintenanceTutorialDisplay } from '@/lib/maintenance-video-utils';

type MaintenanceTutorialCardProps = {
	tutorial: MaintenanceTutorialDisplay;
	variant?: 'home' | 'grid';
};

export function MaintenanceTutorialCard({
	tutorial,
	variant = 'grid',
}: MaintenanceTutorialCardProps) {
	const [playerOpen, setPlayerOpen] = useState(false);
	const isHome = variant === 'home';

	return (
		<>
			<article>
				<button
					type='button'
					onClick={() => setPlayerOpen(true)}
					className={
						isHome
							? 'group relative block aspect-video w-full overflow-hidden rounded-2xl bg-slate-200 ring-2 ring-[#c1272d] shadow-[0_0_16px_-4px_rgba(193,39,45,0.55)] transition hover:opacity-[0.98]'
							: 'group relative block aspect-video w-full overflow-hidden rounded-2xl bg-[#0f172a] shadow-md ring-1 ring-black/5'
					}
					aria-label={`Play video: ${tutorial.title}`}
				>
					<Image
						src={tutorial.thumbnailSrc}
						alt=''
						fill
						className={`object-cover transition duration-300 ${
							isHome ? 'group-hover:scale-[1.02]' : 'group-hover:scale-[1.03]'
						}`}
						sizes='(max-width: 640px) 100vw, 50vw'
					/>
					<div
						className={
							isHome
								? 'absolute inset-0 bg-[#0f172a]/10 transition group-hover:bg-[#0f172a]/15'
								: 'absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent'
						}
						aria-hidden
					/>
					<span className='pointer-events-none absolute inset-0 flex items-center justify-center'>
						<span
							className={
								isHome
									? 'flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white/95 text-[#0f172a] shadow-lg sm:h-16 sm:w-16'
									: 'flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#0f172a] shadow-lg ring-2 ring-white/40'
							}
						>
							<HiPlay
								className={
									isHome ? 'ml-1 h-7 w-7 sm:h-8 sm:w-8' : 'ml-0.5 h-7 w-7'
								}
								aria-hidden
							/>
						</span>
					</span>
				</button>
				<h3
					className={
						isHome
							? 'mt-3 text-center font-sans text-sm font-semibold leading-snug text-[#1e293b] sm:text-[0.95rem]'
							: 'mt-4 text-center font-sans text-sm font-bold leading-snug text-[#0f172a] sm:text-base'
					}
				>
					{tutorial.title}
				</h3>
			</article>

			{playerOpen ? (
				<MaintenanceVideoPlayerModal
					tutorial={tutorial}
					onClose={() => setPlayerOpen(false)}
				/>
			) : null}
		</>
	);
}
