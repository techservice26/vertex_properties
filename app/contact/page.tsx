import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactDetailsSection from '@/components/ContactDetailsSection';
import ContactMessageForm from '@/components/ContactMessageForm';
import EmergencyServiceBanner from '@/components/EmergencyServiceBanner';
import AreasWeServeSection from '@/components/AreasWeServeSection';
import PreFooterCtaSection from '@/components/PreFooterCtaSection';

export const metadata: Metadata = {
	title: 'Contact Us | Vertex Property Services',
	description:
		'Reach Vertex Property Services for estimates, scheduling, and emergency support. Call, email, or send us a message.',
};

export default function ContactPage() {
	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title='Contact Us'
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Contact Us' },
				]}
			/>

			<ContactDetailsSection />

			<div className='px-4 pb-10 sm:px-6 sm:pb-12'>
				<ContactMessageForm />
			</div>

			<section className='px-4 pb-12 sm:px-6 sm:pb-14 lg:pb-16'>
				<div className='mx-auto max-w-5xl'>
					<EmergencyServiceBanner requestHref='tel:+12134444151' />
				</div>
			</section>
			<AreasWeServeSection />
			<PreFooterCtaSection />
		</div>
	);
}
