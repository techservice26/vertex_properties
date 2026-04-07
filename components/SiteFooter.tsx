import Image from 'next/image';
import Link from 'next/link';
import FooterNavLink from '@/components/FooterNavLink';
import {
	FaFacebookF,
	FaInstagram,
	FaXTwitter,
	FaYoutube,
} from 'react-icons/fa6';
import { HiEnvelope, HiMapPin, HiPhone } from 'react-icons/hi2';

const PHONE_MAIN = '(833) 763-5687';
const PHONE_RAW = '+18337635687';
const PHONE_ALT = '(718) 555-0192';

/** Hollow stroked headline (same pattern as Areas We Serve / Trusted Partners). */
const OUTLINE_NAVY =
	'-1px -1px 0 #0f172a, 1px -1px 0 #0f172a, -1px 1px 0 #0f172a, 1px 1px 0 #0f172a';

const MARQUEE_REPEAT = 10;

function MarqueeStrip({ suffix }: { suffix: string }) {
	return (
		<>
			{Array.from({ length: MARQUEE_REPEAT }, (_, i) => (
				<span
					key={`${suffix}-${i}`}
					className='inline-flex shrink-0 items-center px-8 sm:px-12'
				>
					<span
						className='whitespace-nowrap font-sans text-[clamp(1.5rem,5vw,3.25rem)] font-black uppercase leading-none tracking-tight text-white'
						style={{ textShadow: OUTLINE_NAVY }}
					>
						Vertex Property Services Inc <span aria-hidden>*</span>
					</span>
				</span>
			))}
		</>
	);
}

export default function SiteFooter() {
	return (
		<footer className='relative overflow-hidden font-sans text-[#334155]'>
			<div
				className='pointer-events-none absolute inset-0 bg-cover bg-center '
				style={{
					backgroundImage: 'url(/images/all_service_bg.png)',
				}}
				aria-hidden
			/>
			{/* Inset top shadow lives on its own layer so it isn’t painted under z-10 content. */}
			<div
				className='pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-transparent shadow-[inset_0_14px_28px_-10px_rgba(15,23,42,0.1)] sm:h-28'
				aria-hidden
			/>

			<div className='relative z-10 border-b border-[#e2e8f0]'>
				<div className='mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:justify-between lg:gap-8 lg:px-8'>
					<Link
						href='/'
						className='relative block h-12 w-[160px] shrink-0 sm:h-14 sm:w-[180px] lg:mx-0'
					>
						<Image
							src='/images/logo.png'
							alt='Vertex Property Services Inc'
							fill
							className='object-contain object-center lg:object-left'
							sizes='180px'
						/>
					</Link>

					<div className='max-w-md text-center lg:flex-1 lg:text-center'>
						<p className='text-lg font-bold text-[#0f172a] sm:text-xl'>
							Get Your Free Estimate Today.
						</p>
						<p className='mt-1 text-sm text-[#64748b]'>
							Fast response. Transparent pricing. No commitment.
						</p>
					</div>

					<Link
						href='/contact'
						className='inline-flex shrink-0 items-center justify-center rounded-full bg-[#c1272d] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#a61f29] sm:px-8'
					>
						Get Free Estimate
					</Link>
				</div>
			</div>

			<div className='relative z-10 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8'>
				<div className='grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8'>
					<div>
						<h3 className='text-sm font-bold uppercase tracking-wide text-[#0f172a]'>
							About Company
						</h3>
						<p className='mt-4 text-sm leading-relaxed text-[#64748b]'>
							Vertex Property Services Inc delivers reliable
							maintenance and preservation across residential and
							commercial portfolios, with responsive crews and
							clear reporting you can trust.
						</p>
						<div className='mt-5 flex items-center gap-3 text-[#475569]'>
							<a
								href='https://facebook.com'
								className='flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] bg-white transition hover:border-[#c1272d] hover:text-[#c1272d]'
								aria-label='Facebook'
							>
								<FaFacebookF className='h-3.5 w-3.5' />
							</a>
							<a
								href='https://x.com'
								className='flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] bg-white transition hover:border-[#c1272d] hover:text-[#c1272d]'
								aria-label='X'
							>
								<FaXTwitter className='h-3.5 w-3.5' />
							</a>
							<a
								href='https://youtube.com'
								className='flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] bg-white transition hover:border-[#c1272d] hover:text-[#c1272d]'
								aria-label='YouTube'
							>
								<FaYoutube className='h-4 w-4' />
							</a>
							<a
								href='https://instagram.com'
								className='flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] bg-white transition hover:border-[#c1272d] hover:text-[#c1272d]'
								aria-label='Instagram'
							>
								<FaInstagram className='h-4 w-4' />
							</a>
						</div>
					</div>

					<div>
						<h3 className='text-sm font-bold uppercase tracking-wide text-[#0f172a]'>
							Services
						</h3>
						<ul className='mt-4 space-y-2.5 text-sm'>
							{[
								['Property maintenance', '/services'],
								['Home repair', '/services'],
								['Plumbing', '/services'],
								['Electrical', '/services'],
								['Installation', '/services'],
								['Lawn mowing', '/services'],
								['Renovation', '/services'],
							].map(([label, href]) => (
								<li key={label as string}>
									<FooterNavLink href={href as string}>
										{label as string}
									</FooterNavLink>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='text-sm font-bold uppercase tracking-wide text-[#0f172a]'>
							Useful Links
						</h3>
						<ul className='mt-4 space-y-2.5 text-sm'>
							{[
								['About us', '/about'],
								['Services', '/services'],
								['Projects / portfolio', '/projects'],
								['FAQ', '/faq'],
								['Contact us', '/contact'],
								['Why choose us', '/why-choose-us'],
								['Blog / insights', '/blog'],
							].map(([label, href]) => (
								<li key={label as string}>
									<FooterNavLink href={href as string}>
										{label as string}
									</FooterNavLink>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='text-sm font-bold uppercase tracking-wide text-[#0f172a]'>
							Contact us
						</h3>
						<ul className='mt-4 space-y-4 text-sm'>
							<li className='flex gap-3'>
								<span className='mt-0.5 shrink-0 text-[#c1272d]'>
									<HiMapPin className='h-5 w-5' aria-hidden />
								</span>
								<span className='leading-relaxed text-[#64748b]'>
									200-00 Hollis Ave, Hollis, NY 11423
									<br />
									180-00 Hillside Ave, Hollis, NY 11423
								</span>
							</li>
							<li className='flex gap-3'>
								<span className='mt-0.5 shrink-0 text-[#c1272d]'>
									<HiEnvelope
										className='h-5 w-5'
										aria-hidden
									/>
								</span>
								<span className='flex flex-col gap-1 leading-relaxed'>
									<a
										href='mailto:support@vertexpropertyservices.com'
										className='text-[#64748b] transition hover:text-[#c1272d]'
									>
										support@vertexpropertyservices.com
									</a>
									<a
										href='mailto:info@vertexpropertyservices.com'
										className='text-[#64748b] transition hover:text-[#c1272d]'
									>
										info@vertexpropertyservices.com
									</a>
									<a
										href='mailto:dispatch@vertexpropertyservices.com'
										className='text-[#64748b] transition hover:text-[#c1272d]'
									>
										dispatch@vertexpropertyservices.com
									</a>
								</span>
							</li>
							<li className='flex gap-3'>
								<span className='mt-0.5 shrink-0 text-[#c1272d]'>
									<HiPhone className='h-5 w-5' aria-hidden />
								</span>
								<span className='flex flex-col gap-1'>
									<a
										href={`tel:${PHONE_RAW}`}
										className='font-semibold text-[#0f172a] transition hover:text-[#c1272d]'
									>
										{PHONE_MAIN}
									</a>
									<a
										href='tel:+17185550192'
										className='text-[#64748b] transition hover:text-[#c1272d]'
									>
										{PHONE_ALT}
									</a>
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div
				className='relative z-10 overflow-hidden border-t border-[#e2e8f0] py-6 sm:py-8'
				aria-hidden
			>
				<div className='flex w-max animate-marquee-footer motion-reduce:animate-none will-change-transform'>
					<div className='flex shrink-0'>
						<MarqueeStrip suffix='a' />
					</div>
					<div className='flex shrink-0'>
						<MarqueeStrip suffix='b' />
					</div>
				</div>
			</div>

			<div className='relative z-10 border-t border-[#e2e8f0] px-4 py-4 text-center text-xs text-[#94a3b8] sm:px-6'>
				© {new Date().getFullYear()} Vertex Property Services Inc. All
				rights reserved.
			</div>
		</footer>
	);
}
