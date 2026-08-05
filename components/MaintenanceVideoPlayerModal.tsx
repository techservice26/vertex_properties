'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

import type { MaintenanceTutorialDisplay } from '@/lib/maintenance-video-utils';

type MaintenanceVideoPlayerModalProps = {
	tutorial: MaintenanceTutorialDisplay;
	onClose: () => void;
};

export function MaintenanceVideoPlayerModal({
	tutorial,
	onClose,
}: MaintenanceVideoPlayerModalProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleEscape);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', handleEscape);
		};
	}, [onClose]);

	if (!mounted) {
		return null;
	}

	return createPortal(
		<div
			className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4'
			role='dialog'
			aria-modal='true'
			aria-labelledby='maintenance-video-title'
			onClick={onClose}
		>
			<div
				className='relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-[#0f172a] shadow-2xl'
				onClick={(event) => event.stopPropagation()}
			>
				<div className='flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6'>
					<h3
						id='maintenance-video-title'
						className='min-w-0 font-sans text-lg font-bold text-white sm:text-xl'
					>
						{tutorial.title}
					</h3>
					<button
						type='button'
						onClick={onClose}
						className='shrink-0 rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white'
						aria-label='Close video player'
					>
						<X className='h-5 w-5' />
					</button>
				</div>

				<div className='aspect-video w-full shrink-0 bg-black'>
					{tutorial.playerType === 'youtube' ? (
						<iframe
							src={tutorial.playSrc}
							title={tutorial.title}
							className='h-full w-full'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							referrerPolicy='strict-origin-when-cross-origin'
							allowFullScreen
						/>
					) : tutorial.playerType === 'html5' ? (
						<video
							src={tutorial.playSrc}
							controls
							autoPlay
							playsInline
							className='h-full w-full'
						>
							<track kind='captions' />
						</video>
					) : (
						<div className='flex h-full flex-col items-center justify-center gap-4 px-6 text-center'>
							<p className='text-sm text-slate-300'>
								This video opens on an external website and cannot be embedded
								here.
							</p>
							<a
								href={tutorial.playSrc}
								target='_blank'
								rel='noopener noreferrer'
								className='rounded-full bg-[#c1272d] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a01f24]'
							>
								Open video
							</a>
						</div>
					)}
				</div>

				{tutorial.description ? (
					<div className='min-h-0 shrink border-t border-white/10 bg-[#111827] px-5 py-4 sm:px-6'>
						<p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
							Description
						</p>
						<div className='mt-2 max-h-40 overflow-y-auto pr-1 text-sm leading-relaxed text-slate-300'>
							<p className='whitespace-pre-wrap break-words'>
								{tutorial.description}
							</p>
						</div>
					</div>
				) : null}
			</div>
		</div>,
		document.body,
	);
}
