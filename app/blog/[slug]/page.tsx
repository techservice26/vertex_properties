import type { Metadata } from 'next';

import BlogArticleContent from '@/components/BlogArticleContent';

export const dynamic = 'force-dynamic';

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
	return {
		title: 'Article | Vertex Property Services',
		description:
			'News, tips, and articles from Vertex Property Services.',
	};
}

export default function BlogArticlePage({ params }: Props) {
	return <BlogArticleContent slug={params.slug} />;
}
