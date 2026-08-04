import { Briefcase } from 'lucide-react';

import { DashboardSectionPage } from '@/components/dashboard/DashboardSectionPage';

export default function RecentWorksDashboardPage() {
	return (
		<DashboardSectionPage
			title='Recent works'
			description='Showcase recently completed property maintenance and management projects.'
			icon={Briefcase}
			apiPath='/api/recent-work/'
		/>
	);
}
