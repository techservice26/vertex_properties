import { getApiBaseUrl } from '@/lib/api-client';
import { sortBlogs } from '@/lib/blog-utils';
import type { Blog } from '@/types/blog';

async function fetchBlogsFromApi() {
	const response = await fetch(`${getApiBaseUrl()}/blogs/`, {
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to load blogs.');
	}

	const blogs = (await response.json()) as Blog[];
	return sortBlogs(blogs);
}

export async function fetchClientBlogs() {
	return fetchBlogsFromApi();
}

export async function fetchClientBlog(id: number) {
	const response = await fetch(`${getApiBaseUrl()}/blogs/${id}/`, {
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to load blog post.');
	}

	return response.json() as Promise<Blog>;
}
