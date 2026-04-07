import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import PreFooterCtaSection from '@/components/PreFooterCtaSection';
import ServiceCategoryGrid from '@/components/ServiceCategoryGrid';
import {
	getServiceCategory,
	serviceCategorySlugs,
} from '@/data/serviceCategories';

type Props = { params: { slug: string } };

export function generateStaticParams() {
	return serviceCategorySlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
	const cat = getServiceCategory(params.slug);
	if (!cat) return { title: 'Service' };
	return {
		title: `${cat.heroTitle} | Vertex Property Services`,
		description: `${cat.heroTitle} for property managers, owners, and residents. Request a quote from Vertex Property Services.`,
	};
}

export default function ServiceCategoryPage({ params }: Props) {
	const cat = getServiceCategory(params.slug);
	if (!cat) notFound();

	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title={cat.heroTitle}
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{
						label: 'Our Services',
						href: '/services',
						emphasize: false,
					},
				]}
			/>
			<ServiceCategoryGrid items={cat.items} />
			<PreFooterCtaSection />
		</div>
	);
}
