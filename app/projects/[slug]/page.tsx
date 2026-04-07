import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import {
	getPortfolioProjectBySlug,
	PORTFOLIO_PROJECTS,
} from '@/data/portfolioProjects';

type Props = { params: { slug: string } };

export function generateStaticParams() {
	return PORTFOLIO_PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
	const project = getPortfolioProjectBySlug(params.slug);
	if (!project) {
		return { title: 'Project | Vertex Property Services' };
	}
	return {
		title: `${project.title} | Vertex Property Services`,
		description: project.description,
	};
}

export default function PortfolioProjectDetailPage({ params }: Props) {
	const project = getPortfolioProjectBySlug(params.slug);
	if (!project) notFound();

	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title={project.title}
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{
						label: 'Projects / Portfolio',
						emphasize: false,
						href: '/projects',
					},
					{ label: project.title },
				]}
			/>
			<article className='mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14'>
				<div className='relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#f1f5f9] ring-1 ring-[#e2e8f0]'>
					<Image
						src={project.image}
						alt=''
						fill
						className='object-cover'
						sizes='(max-width: 768px) 100vw, 768px'
						priority
					/>
					<span className='absolute right-3 top-3 rounded-full border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0f172a] shadow-sm'>
						{project.tag}
					</span>
				</div>
				<p className='mt-6 text-sm text-[#94a3b8]'>
					<time dateTime={project.date}>{project.date}</time>
				</p>
				<p className='mt-4 text-base leading-relaxed text-[#475569]'>
					{project.description}
				</p>
				<p className='mt-8 text-sm text-[#64748b]'>
					Interested in a similar project? We&apos;d love to hear about your
					space—reach out for a free estimate.
				</p>
				<div className='mt-10 flex flex-wrap gap-4'>
					<Link
						href='/projects'
						className='font-semibold text-[#c1272d] transition hover:text-[#a61f29]'
					>
						← Back to Projects / Portfolio
					</Link>
					<Link
						href='/contact'
						className='font-semibold text-[#1e3a5f] underline-offset-2 transition hover:text-[#c1272d] hover:underline'
					>
						Contact us
					</Link>
				</div>
			</article>
		</div>
	);
}
