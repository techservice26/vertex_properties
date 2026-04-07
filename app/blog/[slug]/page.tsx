import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { NEWS_ARTICLES } from '@/data/newsArticles';

type Props = { params: { slug: string } };

export function generateStaticParams() {
	return NEWS_ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
	const article = NEWS_ARTICLES.find((a) => a.slug === params.slug);
	if (!article) return { title: 'Article | Vertex Property Services' };
	return {
		title: `${article.title} | Vertex Property Services`,
		description: article.excerpt,
	};
}

export default function BlogArticlePage({ params }: Props) {
	const article = NEWS_ARTICLES.find((a) => a.slug === params.slug);
	if (!article) notFound();

	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title={article.title}
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'News and Articles', emphasize: false, href: '/blog' },
					{ label: article.title },
				]}
			/>
			<article className='mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14'>
				<p className='text-sm text-[#94a3b8]'>By admin – {article.date}</p>
				<p className='mt-6 text-base leading-relaxed text-[#475569]'>
					{article.excerpt}
				</p>
				<p className='mt-8 text-sm text-[#64748b]'>
					Full article content can be added here or connected to your CMS.
				</p>
				<Link
					href='/blog'
					className='mt-10 inline-block font-semibold text-[#c1272d] transition hover:text-[#a61f29]'
				>
					← Back to News and Articles
				</Link>
			</article>
		</div>
	);
}
