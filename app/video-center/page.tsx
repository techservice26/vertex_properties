import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import VideoCenterContent from '@/components/VideoCenterContent';
import PreFooterCtaSection from '@/components/PreFooterCtaSection';
import { fetchPublicMaintenanceTutorials } from '@/lib/public-maintenance-api';

export const metadata: Metadata = {
	title: 'Video Center | Vertex Property Services',
	description:
		'Browse Vertex Property Services video tutorials: home repair, plumbing, electrical, painting, maintenance, and safety tips.',
};

export default async function VideoCenterPage() {
	const maintenanceTutorials = await fetchPublicMaintenanceTutorials().catch(
		() => [],
	);

	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title='Video Center'
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Video Center' },
				]}
			/>
			<VideoCenterContent maintenanceTutorials={maintenanceTutorials} />
			<PreFooterCtaSection />
		</div>
	);
}
