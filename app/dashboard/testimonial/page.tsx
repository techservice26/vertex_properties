import { MessageSquareQuote } from 'lucide-react';

import { DashboardSectionPage } from '@/components/dashboard/DashboardSectionPage';

export default function TestimonialDashboardPage() {
	return (
		<DashboardSectionPage
			title='Testimonial'
			description='Review, publish, and manage customer testimonials.'
			icon={MessageSquareQuote}
			apiPath='/api/testimonial/'
		/>
	);
}
