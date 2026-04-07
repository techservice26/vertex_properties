import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Page Not Found | Vertex Property Services',
};

export default function NotFound() {
	return (
		<main className='flex min-h-[min(85vh,720px)] flex-col items-center justify-center bg-white px-4 py-16'>
			<div className='flex flex-col items-center text-center'>
				<div className='relative mx-auto w-full max-w-lg'>
					<Image
						src='/images/404.png'
						alt='404 — Page not found'
						width={527}
						height={224}
						className='h-auto w-full max-w-[min(100%,527px)] object-contain'
						priority
						sizes='(max-width: 527px) 100vw, 527px'
					/>
				</div>

				<h1 className='mt-8 font-sans text-2xl font-bold tracking-tight text-[#061a2f] sm:mt-10 sm:text-3xl md:text-4xl'>
					This Page Not Found
				</h1>

				<p className='mt-4 max-w-md font-sans text-sm leading-relaxed text-[#64748b] sm:text-base'>
					The page you are looking for doesn&apos;t exist. Please try
					searching for some other page, or return to the
					website&apos;s homepage to find what you&apos;re looking for.
				</p>

				<Link
					href='/'
					className='mt-10 inline-flex items-center justify-center rounded-full bg-[#061a2f] px-10 py-3.5 font-sans text-sm font-bold text-white shadow-sm transition hover:bg-[#0f172a] sm:mt-12 sm:px-12 sm:text-base'
				>
					Back To Home
				</Link>
			</div>
		</main>
	);
}
