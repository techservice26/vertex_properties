export type PartnersNetworkPartner = {
	id: number;
	company_name: string;
	partner_logo: string | null;
};

export type PartnersNetworkPartnerInput = {
	company_name: string;
	partner_logo?: File | null;
};
