'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi2';
import { X } from 'lucide-react';

type ToastProps = {
	message: string;
	visible: boolean;
	variant?: 'success' | 'error';
	onClose: () => void;
	durationMs?: number;
};

export function Toast({
	message,
	visible,
	variant = 'success',
	onClose,
	durationMs = 5000,
}: ToastProps) {
	useEffect(() => {
		if (!visible) {
			return;
		}

		const timer = window.setTimeout(onClose, durationMs);
		return () => window.clearTimeout(timer);
	}, [visible, onClose, durationMs]);

	if (!visible || typeof document === 'undefined') {
		return null;
	}

	const isSuccess = variant === 'success';

	return createPortal(
		<div
			role='status'
			aria-live='polite'
			className='fixed left-1/2 top-24 z-[100] w-[min(92vw,420px)] -translate-x-1/2'
		>
			<div
				className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${
					isSuccess
						? 'border-emerald-200 bg-white text-emerald-950'
						: 'border-[#c1272d]/20 bg-white text-[#7f1d1d]'
				}`}
			>
				{isSuccess ? (
					<HiCheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-emerald-600' />
				) : (
					<HiXCircle className='mt-0.5 h-5 w-5 shrink-0 text-[#c1272d]' />
				)}
				<p className='flex-1 text-sm font-medium leading-relaxed'>{message}</p>
				<button
					type='button'
					onClick={onClose}
					className='rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700'
					aria-label='Dismiss notification'
				>
					<X className='h-4 w-4' />
				</button>
			</div>
		</div>,
		document.body,
	);
}
