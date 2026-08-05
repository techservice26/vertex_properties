export type Testimonial = {
	id: number;
	client_name: string;
	designation: string | null;
	company_name: string | null;
	client_image: string | null;
	testimonial_text: string;
	service_quality: number;
	communication: number;
	professionalism: number;
	punctuality: number;
	value_for_money: number;
	overall_rating: number;
	is_featured: boolean;
	display_order: number;
};

export type TestimonialInput = {
	client_name: string;
	designation?: string;
	company_name?: string;
	client_image?: File | null;
	testimonial_text: string;
	service_quality: number;
	communication: number;
	professionalism: number;
	punctuality: number;
	value_for_money: number;
	is_featured?: boolean;
	display_order?: number;
};
