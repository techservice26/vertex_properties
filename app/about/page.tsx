import AboutUsSection from '@/components/AboutUsSection';
import BrandMarquee from '@/components/BrandMarquee';
import PageHero from '@/components/PageHero';
import PreFooterCtaSection from '@/components/PreFooterCtaSection';
import PropertyMaintenanceServicesSection from '@/components/PropertyMaintenanceServicesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';

export default function AboutPage() {
	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title='About Us'
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'About Us' },
				]}
			/>
			<AboutUsSection />
			<PropertyMaintenanceServicesSection />
			<BrandMarquee />
			<WhyChooseUsSection />
			<PreFooterCtaSection />
		</div>
	);
}
