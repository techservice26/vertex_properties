import { Handshake } from 'lucide-react';

import { DashboardSectionPage } from '@/components/dashboard/DashboardSectionPage';

export default function OurPartnersDashboardPage() {
	return (
		<DashboardSectionPage
			title='Our partners'
			description='Manage property management partner logos and company listings.'
			icon={Handshake}
			apiPath='/api/partners/'
		/>
	);
}
