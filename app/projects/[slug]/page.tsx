import type { Metadata } from 'next';

import RecentWorkDetailContent from '@/components/RecentWorkDetailContent';

export const dynamic = 'force-dynamic';

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
	const numericId = Number(params.slug);

	if (!Number.isInteger(numericId) || numericId <= 0) {
		return { title: 'Project | Vertex Property Services' };
	}

	return {
		title: 'Project | Vertex Property Services',
		description:
			'Explore recently completed work by Vertex Property Services.',
	};
}

export default function PortfolioProjectDetailPage({ params }: Props) {
	return <RecentWorkDetailContent id={params.slug} />;
}
