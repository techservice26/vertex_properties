import type { Metadata } from 'next';
import FreeVideoWalkThroughForm from '@/components/FreeVideoWalkThroughForm';

export const metadata: Metadata = {
	title: 'FREE Video Walk-Through | Vertex Property Services',
	description:
		'Request a complimentary video walk-through with Vertex Property Services. Confirm your location to get started.',
};

export default function FreeVideoWalkThroughPage() {
	return (
		<div className='min-h-screen bg-white'>
			<FreeVideoWalkThroughForm />
		</div>
	);
}
