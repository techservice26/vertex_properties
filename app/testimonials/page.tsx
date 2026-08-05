import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PreFooterCtaSection from '@/components/PreFooterCtaSection';
import TestimonialsContent from '@/components/TestimonialsContent';

export const metadata: Metadata = {
	title: 'Testimonials | Vertex Property Services',
	description:
		'Read customer reviews and testimonials for Vertex Property Services maintenance, repairs, and property management support.',
};

export const dynamic = 'force-dynamic';

export default function TestimonialsPage() {
	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title='Testimonials'
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Testimonials' },
				]}
			/>
			<TestimonialsContent />
			<PreFooterCtaSection />
		</div>
	);
}
