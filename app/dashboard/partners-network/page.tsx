import { Network } from 'lucide-react';

import { DashboardSectionPage } from '@/components/dashboard/DashboardSectionPage';

export default function PartnersNetworkDashboardPage() {
	return (
		<DashboardSectionPage
			title='Partners network'
			description='Update trusted network partners shown across the website.'
			icon={Network}
			apiPath='/api/partners-network/'
		/>
	);
}
