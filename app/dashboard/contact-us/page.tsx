import { Mail } from 'lucide-react';

import { DashboardSectionPage } from '@/components/dashboard/DashboardSectionPage';

export default function ContactUsDashboardPage() {
	return (
		<DashboardSectionPage
			title='Contact us'
			description='View and respond to contact form submissions from the public site.'
			icon={Mail}
			apiPath='/api/contact-messages/'
		/>
	);
}
