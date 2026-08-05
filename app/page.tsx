import AboutUsSection from '@/components/AboutUsSection';
import AreasWeServeSection from '@/components/AreasWeServeSection';
import BlogInsightsSection from '@/components/BlogInsightsSection';
import BrandMarquee from '@/components/BrandMarquee';
import CustomerReviewsSection from '@/components/CustomerReviewsSection';
import FaqAndStatsSection from '@/components/FaqAndStatsSection';
import PreFooterCtaSection from '@/components/PreFooterCtaSection';
import ProfessionalCtaSection from '@/components/ProfessionalCtaSection';
import RecentlyCompletedWorksSection from '@/components/RecentlyCompletedWorksSection';
import SafetyAndProfessionalismSection from '@/components/SafetyAndProfessionalismSection';
import GeneralMaintenanceTutorialSection from '@/components/GeneralMaintenanceTutorialSection';
import HeroSection from '@/components/HeroSection';
import PropertyManagementPartnersSection from '@/components/PropertyManagementPartnersSection';
import PropertyMaintenanceServicesSection from '@/components/PropertyMaintenanceServicesSection';
import TrustedPartnersNetworkSection from '@/components/TrustedPartnersNetworkSection';
import TrustedPropertyExpertsSection from '@/components/TrustedPropertyExpertsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import { fetchPublicMaintenanceTutorials } from '@/lib/public-maintenance-api';

export default async function Home() {
	const maintenanceTutorials = await fetchPublicMaintenanceTutorials().catch(
		() => [],
	);

	return (
		<div className='min-h-screen bg-white'>
			<HeroSection />
			<TrustedPropertyExpertsSection />
			<AboutUsSection />
			<PropertyMaintenanceServicesSection />
			<BrandMarquee />
			<GeneralMaintenanceTutorialSection tutorials={maintenanceTutorials} />
			<CustomerReviewsSection />
			<FaqAndStatsSection />
			<ProfessionalCtaSection />
			<RecentlyCompletedWorksSection />
			<PropertyManagementPartnersSection />
			<WhyChooseUsSection />
			<AreasWeServeSection />
			<BlogInsightsSection />
			<SafetyAndProfessionalismSection />
			<TrustedPartnersNetworkSection />
			<PreFooterCtaSection />
		</div>
	);
}
