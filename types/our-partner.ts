export type OurPartner = {
	id: number;
	company_name: string;
	partner_logo: string | null;
};

export type OurPartnerInput = {
	company_name: string;
	partner_logo?: File | null;
};
