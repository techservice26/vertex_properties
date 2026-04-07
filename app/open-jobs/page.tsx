import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import OpenJobsBoard from '@/components/OpenJobsBoard';
import PreFooterCtaSection from '@/components/PreFooterCtaSection';

export const metadata: Metadata = {
	title: 'Open Jobs | Vertex Property Services',
	description:
		'Browse open roles at Vertex Property Services. Search by keyword, location, state, and city.',
};

export default function OpenJobsPage() {
	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title='Open Jobs'
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Open Jobs' },
				]}
			/>
			<OpenJobsBoard />
			<PreFooterCtaSection />
		</div>
	);
}
