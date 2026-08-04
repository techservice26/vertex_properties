import { apiFetch, apiFetchFormData } from '@/lib/api-client';
import type {
	MaintenanceTutorial,
	MaintenanceTutorialInput,
} from '@/types/maintenance';

const TUTORIALS_PATH = '/tutorials/';

export async function fetchMaintenanceTutorials() {
	return apiFetch<MaintenanceTutorial[]>(TUTORIALS_PATH);
}

function buildJsonPayload(input: MaintenanceTutorialInput) {
	return {
		title: input.title,
		video_url: input.video_url || null,
		description: input.description || '',
		show_on_homepage: Boolean(input.show_on_homepage),
	};
}

export async function createMaintenanceTutorial(input: MaintenanceTutorialInput) {
	if (input.video_file) {
		const formData = buildFormData(input);
		return apiFetchFormData<MaintenanceTutorial>(TUTORIALS_PATH, {
			method: 'POST',
			body: formData,
		});
	}

	return apiFetch<MaintenanceTutorial>(TUTORIALS_PATH, {
		method: 'POST',
		body: JSON.stringify(buildJsonPayload(input)),
	});
}

export async function updateMaintenanceTutorial(
	id: number,
	input: MaintenanceTutorialInput,
) {
	if (input.video_file) {
		const formData = buildFormData(input);
		return apiFetchFormData<MaintenanceTutorial>(`${TUTORIALS_PATH}${id}/`, {
			method: 'PATCH',
			body: formData,
		});
	}

	return apiFetch<MaintenanceTutorial>(`${TUTORIALS_PATH}${id}/`, {
		method: 'PATCH',
		body: JSON.stringify(buildJsonPayload(input)),
	});
}

export async function deleteMaintenanceTutorial(id: number) {
	return apiFetch<void>(`${TUTORIALS_PATH}${id}/`, {
		method: 'DELETE',
	});
}

function buildFormData(input: MaintenanceTutorialInput) {
	const formData = new FormData();
	formData.append('title', input.title.trim());
	formData.append('show_on_homepage', String(Boolean(input.show_on_homepage)));

	if (input.video_url?.trim()) {
		formData.append('video_url', input.video_url.trim());
	}

	if (input.description?.trim()) {
		formData.append('description', input.description.trim());
	}

	if (input.video_file) {
		formData.append('video_file', input.video_file);
	}

	return formData;
}
