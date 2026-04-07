import PageHero from '@/components/PageHero';
import PreFooterCtaSection from '@/components/PreFooterCtaSection';
import ServicesAllGridSection from '@/components/ServicesAllGridSection';
import ServicesPageContentSection from '@/components/ServicesPageContentSection';

export default function ServicesPage() {
	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title='Property Maintenance Services'
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Our Services' },
				]}
			/>
			<ServicesPageContentSection />
			<ServicesAllGridSection />
			<PreFooterCtaSection />
		</div>
	);
}
