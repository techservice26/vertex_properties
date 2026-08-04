import { resolveMediaUrl } from '@/lib/media-url';
import type { MaintenanceTutorial } from '@/types/maintenance';

export const DEFAULT_MAINTENANCE_THUMB =
	'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=960&auto=format&fit=crop';

export type MaintenanceTutorialDisplay = {
	id: number;
	title: string;
	href: string;
	thumbnailSrc: string;
	description: string | null;
	playerType: 'youtube' | 'html5' | 'external';
	playSrc: string;
};

export function getYoutubeVideoId(url: string): string | null {
	try {
		const parsed = new URL(url);

		if (
			parsed.hostname.includes('youtube.com') ||
			parsed.hostname.includes('youtube-nocookie.com')
		) {
			return parsed.searchParams.get('v');
		}

		if (parsed.hostname.includes('youtu.be')) {
			return parsed.pathname.replace('/', '') || null;
		}
	} catch {
		return null;
	}

	return null;
}

function isDirectVideoUrl(url: string) {
	return /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(url);
}

function getTutorialPlayerInfo(tutorial: MaintenanceTutorial): {
	playerType: MaintenanceTutorialDisplay['playerType'];
	playSrc: string;
} | null {
	if (tutorial.video_url?.trim()) {
		const videoUrl = tutorial.video_url.trim();
		const youtubeId = getYoutubeVideoId(videoUrl);

		if (youtubeId) {
			return {
				playerType: 'youtube',
				playSrc: `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`,
			};
		}

		if (isDirectVideoUrl(videoUrl)) {
			return {
				playerType: 'html5',
				playSrc: videoUrl,
			};
		}

		return {
			playerType: 'external',
			playSrc: videoUrl,
		};
	}

	if (tutorial.video_file) {
		return {
			playerType: 'html5',
			playSrc: resolveMediaUrl(tutorial.video_file),
		};
	}

	return null;
}

export function getTutorialPlayUrl(tutorial: MaintenanceTutorial): string | null {
	if (tutorial.video_url?.trim()) {
		return tutorial.video_url.trim();
	}

	if (tutorial.video_file) {
		return resolveMediaUrl(tutorial.video_file);
	}

	return null;
}

export function getTutorialThumbnail(tutorial: MaintenanceTutorial): string {
	if (tutorial.video_url) {
		const videoId = getYoutubeVideoId(tutorial.video_url);

		if (videoId) {
			return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
		}
	}

	return DEFAULT_MAINTENANCE_THUMB;
}

export function mapMaintenanceTutorialToDisplay(
	tutorial: MaintenanceTutorial,
): MaintenanceTutorialDisplay | null {
	const player = getTutorialPlayerInfo(tutorial);

	if (!player) {
		return null;
	}

	return {
		id: tutorial.id,
		title: tutorial.title,
		href: player.playSrc,
		thumbnailSrc: getTutorialThumbnail(tutorial),
		description: tutorial.description,
		playerType: player.playerType,
		playSrc: player.playSrc,
	};
}

export function mapMaintenanceTutorialsToDisplay(
	tutorials: MaintenanceTutorial[],
): MaintenanceTutorialDisplay[] {
	return tutorials
		.map(mapMaintenanceTutorialToDisplay)
		.filter((tutorial): tutorial is MaintenanceTutorialDisplay => tutorial !== null);
}
