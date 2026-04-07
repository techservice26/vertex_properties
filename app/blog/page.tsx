import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import NewsArticlesGrid from '@/components/NewsArticlesGrid';

export const metadata: Metadata = {
	title: 'News & Articles | Vertex Property Services',
	description:
		'News, tips, and articles from Vertex Property Services—home repair, maintenance, plumbing, and property management insights.',
};

export default function BlogPage() {
	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title='News and Articles'
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'News and Articles' },
				]}
			/>
			<NewsArticlesGrid />
		</div>
	);
}
