import { RECENT_WORKS } from '@/data/recentWorks';
import { resolveMediaUrl } from '@/lib/media-url';
import type { RecentWork } from '@/types/recent-work';

export const DEFAULT_RECENT_WORK_IMAGE =
	'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=900&auto=format&fit=crop';

const STATIC_RECENT_WORK_IMAGES = Object.fromEntries(
	RECENT_WORKS.map((work) => [work.id, work.imageSrc]),
) as Record<number, string>;

export function getRecentWorkImageUrl(work: RecentWork) {
	if (work.project_image) {
		return resolveMediaUrl(work.project_image);
	}

	return STATIC_RECENT_WORK_IMAGES[work.id] ?? DEFAULT_RECENT_WORK_IMAGE;
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

export function getStaticRecentWorks(): RecentWork[] {
	return RECENT_WORKS.map((work) => ({
		id: work.id,
		project_title: work.project_title,
		done_date: work.done_date,
		project_image: null,
		description: work.description,
	}));
}

export function resolveRecentWorks(apiWorks: RecentWork[]) {
	if (apiWorks.length === 0) {
		return getStaticRecentWorks();
	}

	return apiWorks;
}

export function findStaticRecentWork(id: number) {
	const match = RECENT_WORKS.find((work) => work.id === id);

	if (!match) {
		return null;
	}

	return {
		id: match.id,
		project_title: match.project_title,
		done_date: match.done_date,
		project_image: null,
		description: match.description,
	} satisfies RecentWork;
}
