import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import PreFooterCtaSection from '@/components/PreFooterCtaSection';
import { whyChooseUsPageFeatures } from '@/data/whyChooseUsPageContent';

export const metadata: Metadata = {
	title: 'Why Choose Us | Vertex Property Services',
	description:
		'Discover why property managers and owners choose Vertex Property Maintenance—in-house technicians, transparent pricing, software expertise, and reliable service.',
};

export default function WhyChooseUsPage() {
	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title='Why Choose Vertex Property Maintenance'
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Why Choose Us' },
				]}
			/>

			<section
				className='px-4 py-12 sm:px-6 sm:py-14 lg:py-16'
				aria-labelledby='why-choose-intro'
			>
				<div className='mx-auto max-w-5xl'>
					<p
						id='why-choose-intro'
						className='text-center text-xs font-bold uppercase tracking-[0.2em] text-[#c1272d] sm:text-sm'
					>
						Why choose us
					</p>

					<ul className='mt-8 grid list-none gap-6 sm:mt-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
						{whyChooseUsPageFeatures.map((f) => (
							<li key={f.title}>
								<article className='flex h-full flex-col rounded-2xl bg-white p-6 text-center shadow-[0_4px_24px_rgba(15,23,42,0.08)] ring-1 ring-[#f1f5f9] sm:p-7'>
									<div className='mb-5 flex min-h-[120px] items-center justify-center'>
										<Image
											src={f.imageSrc}
											alt={f.imageAlt}
											width={160}
											height={160}
											className='h-[80px] w-auto max-w-full object-contain'
											sizes='(max-width: 768px) 200px, 180px'
										/>
									</div>
									<h3 className='font-sans text-lg font-bold text-[#0f172a] sm:text-xl'>
										{f.title}
									</h3>
									<p className='mt-3 font-sans text-sm leading-relaxed text-[#64748b]'>
										{f.description}
									</p>
								</article>
							</li>
						))}
					</ul>
				</div>
			</section>

			<div className='bg-white'>
				<PreFooterCtaSection />
			</div>
		</div>
	);
}
