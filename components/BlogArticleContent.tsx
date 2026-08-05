'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageHero from '@/components/PageHero';
import { RichTextContent } from '@/components/RichTextContent';
import { fetchClientBlog } from '@/lib/public-blog-api';
import {
	findStaticBlogPost,
	mapApiBlogToPost,
} from '@/lib/blog-utils';
import type { BlogPost } from '@/types/blog';

type Props = {
	slug: string;
};

export default function BlogArticleContent({ slug }: Props) {
	const [post, setPost] = useState<BlogPost | null>(null);
	const [bodyContent, setBodyContent] = useState('');
	const [loading, setLoading] = useState(true);
	const [notFoundState, setNotFoundState] = useState(false);

	useEffect(() => {
		const numericId = Number(slug);

		if (Number.isInteger(numericId) && numericId > 0) {
			let cancelled = false;

			const loadBlog = async () => {
				setLoading(true);

				try {
					const blog = await fetchClientBlog(numericId);

					if (!cancelled) {
						setPost(mapApiBlogToPost(blog));
						setBodyContent(blog.description ?? '');
					}
				} catch {
					if (!cancelled) {
						setNotFoundState(true);
					}
				} finally {
					if (!cancelled) {
						setLoading(false);
					}
				}
			};

			void loadBlog();

			return () => {
				cancelled = true;
			};
		}

		const staticPost = findStaticBlogPost(slug);

		if (staticPost) {
			setPost(staticPost);
			setBodyContent(staticPost.excerpt);
		} else {
			setNotFoundState(true);
		}

		setLoading(false);
	}, [slug]);

	if (loading) {
		return (
			<div className='min-h-screen bg-white'>
				<div className='mx-auto max-w-3xl px-4 py-20 text-center text-sm text-[#64748b]'>
					Loading article...
				</div>
			</div>
		);
	}

	if (notFoundState || !post) {
		notFound();
	}

	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title={post.title}
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'News and Articles', emphasize: false, href: '/blog' },
					{ label: post.title },
				]}
			/>
			<article className='mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14'>
				<div className='relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#f1f5f9] ring-1 ring-[#e2e8f0]'>
					<Image
						src={post.imageSrc}
						alt=''
						fill
						className='object-cover'
						sizes='(max-width: 768px) 100vw, 768px'
						priority
					/>
				</div>
				<p className='mt-6 text-sm text-[#94a3b8]'>By admin – {post.date}</p>
				<RichTextContent
					content={bodyContent}
					className='mt-6 text-base leading-relaxed text-[#475569]'
				/>
				{post.source === 'static' ? (
					<p className='mt-8 text-sm text-[#64748b]'>
						Full article content can be added here or connected to your CMS.
					</p>
				) : null}
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
