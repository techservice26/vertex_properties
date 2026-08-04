export type MaintenanceTutorial = {
	id: number;
	title: string;
	video_file: string | null;
	video_url: string | null;
	description: string | null;
	show_on_homepage: boolean;
};

export type MaintenanceTutorialInput = {
	title: string;
	video_url?: string;
	description?: string;
	video_file?: File | null;
	show_on_homepage?: boolean;
};
