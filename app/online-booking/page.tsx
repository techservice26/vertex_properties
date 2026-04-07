import type { Metadata } from 'next';
import OnlineBookingHub from '@/components/OnlineBookingHub';

export const metadata: Metadata = {
	title: 'Online Booking | Vertex Property Services',
	description:
		'Schedule a site visit, request a free video walk-through, or complete a payment with Vertex Property Services.',
};

export default function OnlineBookingPage() {
	return <OnlineBookingHub />;
}
