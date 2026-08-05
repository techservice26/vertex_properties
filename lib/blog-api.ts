import { apiFetch, apiFetchFormData } from '@/lib/api-client';
import type { Blog, BlogInput } from '@/types/blog';

const BLOGS_PATH = '/blogs/';

export async function fetchBlogs() {
	return apiFetch<Blog[]>(BLOGS_PATH);
}

function buildJsonPayload(input: BlogInput) {
	return {
		title: input.title.trim(),
		description: input.description?.trim() || '',
		show_on_homepage: Boolean(input.show_on_homepage),
	};
}

export async function createBlog(input: BlogInput) {
	if (input.image) {
		return apiFetchFormData<Blog>(BLOGS_PATH, {
			method: 'POST',
			body: buildFormData(input),
		});
	}

	return apiFetch<Blog>(BLOGS_PATH, {
		method: 'POST',
		body: JSON.stringify(buildJsonPayload(input)),
	});
}

export async function updateBlog(id: number, input: BlogInput) {
	if (input.image) {
		return apiFetchFormData<Blog>(`${BLOGS_PATH}${id}/`, {
			method: 'PATCH',
			body: buildFormData(input),
		});
	}

	return apiFetch<Blog>(`${BLOGS_PATH}${id}/`, {
		method: 'PATCH',
		body: JSON.stringify(buildJsonPayload(input)),
	});
}

export async function deleteBlog(id: number) {
	return apiFetch<void>(`${BLOGS_PATH}${id}/`, {
		method: 'DELETE',
	});
}

export async function toggleBlogHomepage(id: number, showOnHomepage: boolean) {
	return apiFetch<Blog>(`${BLOGS_PATH}${id}/`, {
		method: 'PATCH',
		body: JSON.stringify({ show_on_homepage: showOnHomepage }),
	});
}

function buildFormData(input: BlogInput) {
	const formData = new FormData();
	formData.append('title', input.title.trim());
	formData.append('show_on_homepage', String(Boolean(input.show_on_homepage)));

	if (input.description?.trim()) {
		formData.append('description', input.description.trim());
	}

	if (input.image) {
		formData.append('image', input.image);
	}

	return formData;
}
