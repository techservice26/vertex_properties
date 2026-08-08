import { OUR_PARTNERS } from '@/data/ourPartners';
import { resolveMediaUrl } from '@/lib/media-url';
import type { OurPartner } from '@/types/our-partner';

const FRONTEND_PARTNER_LOGOS: Record<string, string> = {
	appfolio: '/images/propertyManagementPartner/ppfolio.png',
	'maintenance care': '/images/propertyManagementPartner/maintenanceCare.png',
	'property meld': '/images/propertyManagementPartner/propertyMeld.png',
	'rent manager': '/images/propertyManagementPartner/rentManager.png',
	ppw: '/images/propertyManagementPartner/ppw.png',
};

function normalizeCompanyName(companyName: string) {
	return companyName.trim().toLowerCase();
}

export function getFrontendPartnerLogoUrl(companyName: string) {
	return FRONTEND_PARTNER_LOGOS[normalizeCompanyName(companyName)] ?? '';
}

export function getOurPartnerLogoUrl(partner: OurPartner) {
	if (partner.partner_logo) {
		return resolveMediaUrl(partner.partner_logo);
	}

	return getFrontendPartnerLogoUrl(partner.company_name);
}

export function isUsingFrontendPartnerLogo(partner: OurPartner) {
	return !partner.partner_logo && Boolean(getFrontendPartnerLogoUrl(partner.company_name));
}

export function sortOurPartners(partners: OurPartner[]) {
	return [...partners].sort((a, b) => a.id - b.id);
}

export function getStaticOurPartners(): OurPartner[] {
	return OUR_PARTNERS.map((partner) => ({
		id: partner.id,
		company_name: partner.company_name,
		partner_logo: null,
	}));
}

export function resolveOurPartners(apiPartners: OurPartner[]) {
	if (apiPartners.length === 0) {
		return getStaticOurPartners();
	}

	return apiPartners;
}
