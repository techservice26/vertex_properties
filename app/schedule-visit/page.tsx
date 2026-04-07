import type { Metadata } from 'next';
import ScheduleVisitForm from '@/components/ScheduleVisitForm';

export const metadata: Metadata = {
	title: 'Schedule Your Site Visit / Deposit | Vertex Property Services',
	description:
		'Book an on-site visit with Vertex Property Services. Secure your appointment with a $100 site visit deposit.',
};

export default function ScheduleVisitPage() {
	return (
		<div className='bg-white max-w-5xl mx-auto'>
			<ScheduleVisitForm />
		</div>
	);
}
