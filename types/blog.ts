export type Blog = {
	id: number;
	title: string;
	description: string | null;
	image: string | null;
	show_on_homepage: boolean;
	created_at: string;
	updated_at: string;
};

export type BlogInput = {
	title: string;
	description?: string;
	show_on_homepage?: boolean;
	image?: File | null;
};

export type BlogPost = {
	id: string;
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	imageSrc: string;
	source: 'api' | 'static';
};
