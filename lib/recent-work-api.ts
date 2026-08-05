import { apiFetch, apiFetchFormData } from '@/lib/api-client';
import type { RecentWork, RecentWorkInput } from '@/types/recent-work';

const RECENT_WORKS_PATH = '/recent-work/';

export async function fetchRecentWorks() {
	return apiFetch<RecentWork[]>(RECENT_WORKS_PATH);
}

function buildJsonPayload(input: RecentWorkInput) {
	return {
		project_title: input.project_title.trim(),
		done_date: input.done_date,
		description: input.description?.trim() || '',
	};
}

export async function createRecentWork(input: RecentWorkInput) {
	if (input.project_image) {
		return apiFetchFormData<RecentWork>(RECENT_WORKS_PATH, {
			method: 'POST',
			body: buildFormData(input),
		});
	}

	return apiFetch<RecentWork>(RECENT_WORKS_PATH, {
		method: 'POST',
		body: JSON.stringify(buildJsonPayload(input)),
	});
}

export async function updateRecentWork(id: number, input: RecentWorkInput) {
	if (input.project_image) {
		return apiFetchFormData<RecentWork>(`${RECENT_WORKS_PATH}${id}/`, {
			method: 'PATCH',
			body: buildFormData(input),
		});
	}

	return apiFetch<RecentWork>(`${RECENT_WORKS_PATH}${id}/`, {
		method: 'PATCH',
		body: JSON.stringify(buildJsonPayload(input)),
	});
}

export async function deleteRecentWork(id: number) {
	return apiFetch<void>(`${RECENT_WORKS_PATH}${id}/`, {
		method: 'DELETE',
	});
}

function buildFormData(input: RecentWorkInput) {
	const formData = new FormData();
	formData.append('project_title', input.project_title.trim());
	formData.append('done_date', input.done_date);

	if (input.description?.trim()) {
		formData.append('description', input.description.trim());
	}

	if (input.project_image) {
		formData.append('project_image', input.project_image);
	}

	return formData;
}
