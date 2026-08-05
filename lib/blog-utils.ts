import { NEWS_ARTICLES } from '@/data/newsArticles';
import { resolveMediaUrl } from '@/lib/media-url';
import { getRichTextPlainText } from '@/lib/rich-text-utils';
import type { Blog, BlogPost } from '@/types/blog';

export const DEFAULT_BLOG_IMAGE =
	'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=900&auto=format&fit=crop';

export function formatBlogDate(value: string) {
	const parsed = new Date(value);

	if (Number.isNaN(parsed.getTime())) {
		return value;
	}

	return parsed.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
}

function getStaticImageForTitle(title: string) {
	const match = NEWS_ARTICLES.find(
		(article) => article.title.trim().toLowerCase() === title.trim().toLowerCase(),
	);

	return match?.imageSrc ?? DEFAULT_BLOG_IMAGE;
}

export function getBlogImageUrl(blog: Blog) {
	if (blog.image) {
		return resolveMediaUrl(blog.image);
	}

	return getStaticImageForTitle(blog.title);
}

export function mapApiBlogToPost(blog: Blog): BlogPost {
	return {
		id: String(blog.id),
		slug: String(blog.id),
		title: blog.title,
		date: formatBlogDate(blog.created_at),
		excerpt: blog.description?.trim()
			? getRichTextPlainText(blog.description)
			: 'Read the latest insights from Vertex Property Services.',
		imageSrc: getBlogImageUrl(blog),
		source: 'api',
	};
}

export function getStaticBlogPosts(): BlogPost[] {
	return NEWS_ARTICLES.map((article) => ({
		id: article.id,
		slug: article.slug,
		title: article.title,
		date: article.date,
		excerpt: article.excerpt,
		imageSrc: article.imageSrc,
		source: 'static',
	}));
}

export function resolveBlogPosts(apiBlogs: Blog[]) {
	if (apiBlogs.length === 0) {
		return getStaticBlogPosts();
	}

	return apiBlogs.map(mapApiBlogToPost);
}

export function getHomepageBlogPosts(apiBlogs: Blog[], limit = 3) {
	if (apiBlogs.length === 0) {
		return getStaticBlogPosts().slice(0, limit);
	}

	const homepagePosts = apiBlogs
		.filter((blog) => blog.show_on_homepage)
		.map(mapApiBlogToPost);

	if (homepagePosts.length > 0) {
		return homepagePosts.slice(0, limit);
	}

	return apiBlogs.map(mapApiBlogToPost).slice(0, limit);
}

export function findStaticBlogPost(slug: string) {
	return getStaticBlogPosts().find((post) => post.slug === slug) ?? null;
}

export function sortBlogs(blogs: Blog[]) {
	return [...blogs].sort((a, b) => b.id - a.id);
}
