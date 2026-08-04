'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/contexts/AuthContext';

const inputClassName =
	'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-[#c1272d] focus:outline-none focus:ring-2 focus:ring-[#c1272d]/10';

export default function LoginPage() {
	const router = useRouter();
	const { login, isAuthenticated, isLoading } = useAuth();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [authError, setAuthError] = useState('');
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			router.replace('/dashboard');
		}
	}, [isAuthenticated, isLoading, router]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAuthError('');
		setSubmitting(true);

		try {
			await login(username.trim(), password);
			router.push('/dashboard');
			router.refresh();
		} catch (error) {
			setAuthError(
				error instanceof Error
					? error.message
					: 'Invalid username or password',
			);
		} finally {
			setSubmitting(false);
		}
	};

	if (isLoading || isAuthenticated) {
		return (
			<div className='flex min-h-screen items-center justify-center bg-[#efefef] text-sm text-slate-600'>
				Checking session...
			</div>
		);
	}

	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-[#efefef] px-4 py-12'>
			<div className='mb-8 text-center'>
				<Link href='/' className='inline-block'>
					<Image
						src='/images/logo.png'
						alt='Vertex Property Services'
						width={180}
						height={48}
						className='mx-auto h-12 w-auto object-contain'
						priority
					/>
				</Link>
			</div>

			<form
				className='w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
				onSubmit={handleSubmit}
				noValidate
			>
				<h2 className='mb-6 text-center text-lg font-semibold text-slate-800'>
					Admin Login
				</h2>

				<div className='space-y-5'>
					<div>
						<label
							htmlFor='username'
							className='mb-1 block text-sm font-medium text-slate-700'
						>
							Username
						</label>
						<input
							id='username'
							type='text'
							autoComplete='username'
							className={inputClassName}
							placeholder='Enter username'
							value={username}
							onChange={(event) => setUsername(event.target.value)}
							required
						/>
					</div>

					<div>
						<label
							htmlFor='password'
							className='mb-1 block text-sm font-medium text-slate-700'
						>
							Password
						</label>
						<div className='relative'>
							<input
								id='password'
								type={showPassword ? 'text' : 'password'}
								autoComplete='current-password'
								className={`${inputClassName} pr-16`}
								placeholder='Enter password'
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
								minLength={4}
							/>
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								className='absolute top-1/2 right-3 -translate-y-1/2 text-sm font-medium text-slate-500 transition hover:text-[#c1272d]'
							>
								{showPassword ? 'Hide' : 'Show'}
							</button>
						</div>
					</div>

					{authError ? (
						<div className='rounded-lg border border-[#c1272d]/20 bg-[#c1272d]/5 px-3 py-2 text-center text-sm text-[#c1272d]'>
							{authError}
						</div>
					) : null}

					<button
						type='submit'
						disabled={submitting}
						className='w-full rounded-lg bg-[#c1272d] py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(193,39,45,0.35)] transition hover:bg-[#a01f24] disabled:cursor-not-allowed disabled:opacity-50'
					>
						{submitting ? 'Logging in...' : 'Sign in'}
					</button>
				</div>
			</form>

			<Link
				href='/'
				className='mt-8 text-sm font-medium text-slate-600 transition hover:text-[#c1272d]'
			>
				← Back to website
			</Link>
		</div>
	);
}
