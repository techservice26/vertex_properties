export type ContactMessage = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	description: string;
	attachment: string | null;
	created_at: string;
	updated_at: string;
};

export type ContactMessageInput = {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	description: string;
	attachment?: File | null;
};
