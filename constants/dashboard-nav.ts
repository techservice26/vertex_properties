import {
	BookOpen,
	Briefcase,
	Handshake,
	LayoutGrid,
	Mail,
	MessageSquareQuote,
	Network,
	Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type DashboardNavItem = {
	label: string;
	href: string;
	icon: LucideIcon;
	description: string;
	alsoActiveOn?: string[];
};

export type DashboardNavSection = {
	title: string;
	items: DashboardNavItem[];
};

export function getDashboardNavSections(): DashboardNavSection[] {
	return [
		{
			title: 'Content',
			items: [
				{
					label: 'Maintenance',
					href: '/dashboard/maintenance',
					icon: Wrench,
					description: 'Manage maintenance tutorials shown on the public site.',
				},
				{
					label: 'Testimonial',
					href: '/dashboard/testimonial',
					icon: MessageSquareQuote,
					description: 'Review and publish customer testimonials.',
				},
				{
					label: 'Recent works',
					href: '/dashboard/recent-works',
					icon: Briefcase,
					description: 'Showcase recently completed property work.',
				},
				{
					label: 'Our partners',
					href: '/dashboard/our-partners',
					icon: Handshake,
					description: 'Manage property management partner logos.',
				},
				{
					label: 'Blogs',
					href: '/dashboard/blogs',
					icon: LayoutGrid,
					description: 'Publish and edit blog posts and insights.',
				},
				{
					label: 'Partners network',
					href: '/dashboard/partners-network',
					icon: Network,
					description: 'Update trusted network partner listings.',
				},
				{
					label: 'Contact us',
					href: '/dashboard/contact-us',
					icon: Mail,
					description: 'View and manage contact form submissions.',
				},
			],
		},
	];
}

export function isDashboardNavItemActive(
	pathname: string,
	item: DashboardNavItem,
): boolean {
	if (pathname === item.href) {
		return true;
	}

	if (item.alsoActiveOn?.includes(pathname)) {
		return true;
	}

	return pathname.startsWith(`${item.href}/`);
}
