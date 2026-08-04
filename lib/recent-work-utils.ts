import { resolveMediaUrl } from '@/lib/media-url';
import type { RecentWork } from '@/types/recent-work';

export const DEFAULT_RECENT_WORK_IMAGE =
	'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=900&auto=format&fit=crop';

export function getRecentWorkImageUrl(work: RecentWork) {
	if (work.project_image) {
		return resolveMediaUrl(work.project_image);
	}

	return DEFAULT_RECENT_WORK_IMAGE;
}

export function formatDoneDate(doneDate: string) {
	const parsed = new Date(`${doneDate}T00:00:00`);

	if (Number.isNaN(parsed.getTime())) {
		return doneDate;
	}

	return parsed.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
}

export function sortRecentWorks(works: RecentWork[]) {
	return [...works].sort((a, b) => {
		const dateCompare = b.done_date.localeCompare(a.done_date);

		if (dateCompare !== 0) {
			return dateCompare;
		}

		return b.id - a.id;
	});
}
