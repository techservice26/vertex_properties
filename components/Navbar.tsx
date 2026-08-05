'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { ReactNode } from 'react';
import {
	FaFacebookF,
	FaInstagram,
	FaXTwitter,
	FaYoutube,
} from 'react-icons/fa6';
import { HiEnvelope, HiMapPin, HiPhone } from 'react-icons/hi2';

const navLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'About Us', href: '/about' },
	{ label: 'Services', href: '/services' },
	{ label: 'Testimonials', href: '/testimonials' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Contact Us', href: '/contact' },
] as const;

function NavLink({
	href,
	children,
	onNavigate,
}: {
	href: string;
	children: ReactNode;
	onNavigate?: () => void;
}) {
	const pathname = usePathname();
	const active = pathname === href;

	return (
		<Link
			href={href}
			onClick={onNavigate}
			className={`text-sm font-semibold transition-colors ${
				active
					? 'text-[#c1272d]'
					: 'text-[#1e293b] hover:text-[#c1272d]'
			}`}
		>
			{children}
		</Link>
	);
}

// function OnlineBookingLink({
//     className = '',
//     onNavigate,
// }: {
//     className?: string;
//     onNavigate?: () => void;
// }) {
//     return (
//         <Link
//             href='/online-booking'
//             onClick={onNavigate}
//             className={`relative inline-flex items-center justify-center rounded-full bg-[#061a2f] px-6 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white ${className}`}
//         >
//             <span
//                 className='pointer-events-none absolute inset-[-6px] rounded-full border-2 border-dotted border-[#e11d48]'
//                 aria-hidden
//             />
//             Online Booking
//         </Link>
//     );
// }

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className='sticky top-0 z-50 w-full border-b border-[#e8edf3] bg-white font-sans shadow-sm'>
			<div className='border-b border-[#e8edf3] bg-white/95'>
				<div className='mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-2 text-xs text-[#334155] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8'>
					<div className='flex flex-wrap items-center gap-x-4 gap-y-1.5'>
						<div className='inline-flex items-center gap-1.5'>
							<HiMapPin className='h-3.5 w-3.5 text-[#64748b]' />
							<span>
								9228 195TH PLACE FLOOR 3 Hollis, NY 11423
							</span>
						</div>
						<div className='inline-flex items-center gap-1.5'>
							<HiEnvelope className='h-3.5 w-3.5 text-[#64748b]' />
							<a className='transition hover:text-[#c1272d]'>
								client@vertexproperties.us
							</a>
						</div>
						<div className='inline-flex items-center gap-1.5'>
							<HiPhone className='h-3.5 w-3.5 text-[#64748b]' />
							<a
								href='tel:+12134444151'
								className='font-semibold text-[#334155] transition hover:text-[#c1272d]'
							>
								(213) 444-4151
							</a>
						</div>
					</div>
					<div className='flex items-center gap-2 text-[#0f172a]'>
						<span className='font-medium'>Follow Us In Here :</span>
						<div className='flex items-center gap-2'>
							<a
								href='https://facebook.com'
								aria-label='Facebook'
								className='transition hover:text-[#c1272d]'
							>
								<FaFacebookF className='h-3.5 w-3.5' />
							</a>
							<a
								href='https://x.com'
								aria-label='X'
								className='transition hover:text-[#c1272d]'
							>
								<FaXTwitter className='h-3.5 w-3.5' />
							</a>
							<a
								href='https://youtube.com'
								aria-label='YouTube'
								className='transition hover:text-[#c1272d]'
							>
								<FaYoutube className='h-3.5 w-3.5' />
							</a>
							<a
								href='https://instagram.com'
								aria-label='Instagram'
								className='transition hover:text-[#c1272d]'
							>
								<FaInstagram className='h-3.5 w-3.5' />
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className='mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8'>
				<Link
					href='/'
					className='relative block h-9 w-[140px] shrink-0 sm:h-10 sm:w-[160px]'
					onClick={() => setMenuOpen(false)}
				>
					<Image
						src='/images/logo.png'
						alt='Vertex Property Services'
						fill
						className='object-contain object-left'
						sizes='160px'
						priority
					/>
				</Link>

				<nav
					className='hidden items-center gap-6 lg:gap-8 md:flex'
					aria-label='Main navigation'
				>
					{navLinks.map((item) => (
						<NavLink key={item.href} href={item.href}>
							{item.label}
						</NavLink>
					))}
				</nav>

				{/* <div className='hidden shrink-0 md:block'>
                    <OnlineBookingLink />
                </div> */}

				<button
					type='button'
					className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#e8edf3] text-[#061a2f] md:hidden'
					onClick={() => setMenuOpen((o) => !o)}
					aria-expanded={menuOpen}
					aria-controls='mobile-nav'
					aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				>
					{menuOpen ? (
						<svg
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}
						>
							<path d='M6 18L18 6M6 6l12 12' />
						</svg>
					) : (
						<svg
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}
						>
							<path d='M4 6h16M4 12h16M4 18h16' />
						</svg>
					)}
				</button>
			</div>

			{menuOpen ? (
				<div
					id='mobile-nav'
					className='border-t border-[#e8edf3] bg-white md:hidden'
				>
					<nav
						className='mx-auto flex max-w-[1400px] flex-col gap-1 px-4 py-4 sm:px-6'
						aria-label='Mobile navigation'
					>
						{navLinks.map((item) => (
							<NavLink
								key={item.href}
								href={item.href}
								onNavigate={() => setMenuOpen(false)}
							>
								<span className='block py-2'>{item.label}</span>
							</NavLink>
						))}
						{/* <div className='pt-3'>
							<OnlineBookingLink
								className='w-full'
								onNavigate={() => setMenuOpen(false)}
							/>
						</div> */}
					</nav>
				</div>
			) : null}
		</header>
	);
}
