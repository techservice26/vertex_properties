export type RecentWork = {
	id: number;
	project_title: string;
	done_date: string;
	project_image: string | null;
	description: string | null;
};

export type RecentWorkInput = {
	project_title: string;
	done_date: string;
	description?: string;
	project_image?: File | null;
};
