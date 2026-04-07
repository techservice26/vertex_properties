import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import BeforeAfterShowcase from '@/components/BeforeAfterShowcase';
import PortfolioProjectsGrid from '@/components/PortfolioProjectsGrid';
import ProjectsPageCtaBar from '@/components/ProjectsPageCtaBar';
import PreFooterCtaSection from '@/components/PreFooterCtaSection';

export const metadata: Metadata = {
	title: 'Projects / Portfolio | Vertex Property Services',
	description:
		'Explore recently completed work by Vertex Property Services—remodels, plumbing, outdoor projects, and more.',
};

export default function ProjectsPage() {
	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title='Projects / Portfolio'
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Projects / Portfolio' },
				]}
			/>
			<PortfolioProjectsGrid />
			<BeforeAfterShowcase />
			<ProjectsPageCtaBar />
			<PreFooterCtaSection />
		</div>
	);
}
