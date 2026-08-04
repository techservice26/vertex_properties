import { LayoutGrid } from 'lucide-react';

import { DashboardSectionPage } from '@/components/dashboard/DashboardSectionPage';

export default function BlogsDashboardPage() {
	return (
		<DashboardSectionPage
			title='Blogs'
			description='Publish and edit blog posts, news, and property insights.'
			icon={LayoutGrid}
			apiPath='/api/blogs/'
		/>
	);
}
