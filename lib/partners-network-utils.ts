import { PARTNERS_NETWORK } from '@/data/partnersNetwork';
import { resolveMediaUrl } from '@/lib/media-url';
import type { PartnersNetworkPartner } from '@/types/partners-network';

const FRONTEND_PARTNERS_NETWORK_LOGOS: Record<string, string> = {
	'the home depot pro': '/images/trusted_network_partners/home_depot.png',
	'home depot pro': '/images/trusted_network_partners/home_depot.png',
	'home depot': '/images/trusted_network_partners/home_depot.png',
	narpm: '/images/trusted_network_partners/narpm.png',
	"lowe's pro": '/images/trusted_network_partners/lowes.png',
	'lowes pro': '/images/trusted_network_partners/lowes.png',
	"lowe's": '/images/trusted_network_partners/lowes.png',
	lowes: '/images/trusted_network_partners/lowes.png',
	'boma international': '/images/trusted_network_partners/boma.png',
	boma: '/images/trusted_network_partners/boma.png',
};

function normalizeCompanyName(companyName: string) {
	return companyName.trim().toLowerCase();
}

export function getFrontendPartnersNetworkLogoUrl(companyName: string) {
	return FRONTEND_PARTNERS_NETWORK_LOGOS[normalizeCompanyName(companyName)] ?? '';
}

export function getPartnersNetworkLogoUrl(partner: PartnersNetworkPartner) {
	if (partner.partner_logo) {
		return resolveMediaUrl(partner.partner_logo);
	}

	return getFrontendPartnersNetworkLogoUrl(partner.company_name);
}

export function isUsingFrontendPartnersNetworkLogo(partner: PartnersNetworkPartner) {
	return (
		!partner.partner_logo &&
		Boolean(getFrontendPartnersNetworkLogoUrl(partner.company_name))
	);
}

export function sortPartnersNetwork(partners: PartnersNetworkPartner[]) {
	return [...partners].sort((a, b) => a.id - b.id);
}

export function getStaticPartnersNetwork(): PartnersNetworkPartner[] {
	return PARTNERS_NETWORK.map((partner) => ({
		id: partner.id,
		company_name: partner.company_name,
		partner_logo: null,
	}));
}

export function resolvePartnersNetwork(apiPartners: PartnersNetworkPartner[]) {
	if (apiPartners.length === 0) {
		return getStaticPartnersNetwork();
	}

	return apiPartners;
}
