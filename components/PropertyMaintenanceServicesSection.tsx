import Link from 'next/link';
import type { IconType } from 'react-icons';
import { HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import {
	MdOutlineBolt,
	MdOutlineCleaningServices,
	MdOutlineConstruction,
	MdOutlineDeviceThermostat,
	MdOutlineFormatPaint,
	MdOutlineGridView,
	MdOutlineHandyman,
	MdOutlineKitchen,
	MdOutlinePark,
	MdOutlinePlumbing,
	MdOutlineRoofing,
} from 'react-icons/md';
import { TbHammer } from 'react-icons/tb';

const iconClass = 'h-12 w-12 shrink-0 text-[#061a2f]';

const services: {
	title: string;
	description: string;
	Icon: IconType;
}[] = [
	{
		title: 'Remodeling / Renovation',
		description:
			'Kitchen and bathroom renovations, basement finishing & comprehensive home remodeling projects.',
		Icon: MdOutlineConstruction,
	},
	{
		title: 'Home Repair Services',
		description:
			'Drywall repair, fixture replacement, and routine gutter maintenance to keep your home in top shape.',
		Icon: TbHammer,
	},
	{
		title: 'Painting Services',
		description:
			'Interior and exterior painting, detailed trim and molding work & surface preparation and priming.',
		Icon: MdOutlineFormatPaint,
	},
	{
		title: 'Plumbing Services',
		description:
			'Repairing leaky sinks and faucets, unclogging toilets and drains and installing various plumbing fixtures.',
		Icon: MdOutlinePlumbing,
	},
	{
		title: 'HVAC Services',
		description:
			'Installing, repairing, maintaining & optimizing heating, ventilation and air conditioning systems for reliable.',
		Icon: MdOutlineDeviceThermostat,
	},
	{
		title: 'Electrical Services',
		description:
			'Installing & repairing lighting fixtures, electrical panel upgrades & electrical issues troubleshooting.',
		Icon: MdOutlineBolt,
	},
	{
		title: 'Flooring Services',
		description:
			'Expert installation of hardwood, tile, laminate, & vinyl flooring, along with floor repairs & refinishing.',
		Icon: MdOutlineGridView,
	},
	{
		title: 'Carpentry / Handyman',
		description:
			'Bathroom and kitchen tile installations, grout cleaning and replacement, and tile professional repairs.',
		Icon: MdOutlineHandyman,
	},
	{
		title: 'Landscaping & Exterior',
		description:
			'Maintaining outdoor areas of residential properties including lawn care, landscaping, tree trimming, and yard maintenance.',
		Icon: MdOutlinePark,
	},
	{
		title: 'Appliance Repair',
		description:
			'Installing refrigerators, washers, dryers, & kitchen appliances, ensuring proper connections.',
		Icon: MdOutlineKitchen,
	},
	{
		title: 'Roofing & Gutters',
		description:
			'Repairing damaged roofing materials to stop leaks and protect the property from water damage.',
		Icon: MdOutlineRoofing,
	},
	{
		title: 'Cleaning & Turnover',
		description:
			'Deep cleaning, move-in and move-out cleaning, trash removal and preparing the property for the next tenant.',
		Icon: MdOutlineCleaningServices,
	},
];

export default function PropertyMaintenanceServicesSection() {
	return (
		<section className='relative mx-auto max-w-7xl'>
			<div
				className='absolute inset-0 rounded-3xl bg-[#f4f5f7] shadow-[inset_0_2px_24px_rgba(15,23,42,0.07),inset_0_-4px_20px_rgba(15,23,42,0.04)]'
				aria-hidden
			/>
			<div
				className='absolute inset-0 rounded-3xl bg-cover bg-center bg-no-repeat'
				style={{ backgroundImage: 'url(/images/all_service_bg.png)' }}
				aria-hidden
			/>

			<div className='relative z-10 mx-auto max-w-5xl rounded-3xl px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-12 lg:px-8'>
				<header className='mx-auto max-w-3xl text-center'>
					<p className='text-xs font-bold uppercase tracking-widest text-[#c1272d] sm:text-sm'>
						Our All Services
					</p>
					<h2 className='mt-3 font-sans text-3xl font-bold tracking-tight text-[#061a2f] md:text-4xl'>
						Property Maintenance Services
					</h2>
					<p className='mt-4 font-sans text-base leading-relaxed text-[#64748b] md:text-lg'>
						We provide comprehensive property maintenance and
						preservation services designed to support occupancy,
						compliance, curb appeal, turnover timelines, and
						long-term asset care.
					</p>
				</header>

				<ul className='mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4'>
					{services.map(({ title, description, Icon }) => (
						<li key={title}>
							<article className='flex h-full flex-col'>
								<Icon
									className={`${iconClass} mb-4`}
									aria-hidden
								/>
								<h3 className='font-sans text-lg font-bold text-[#061a2f]'>
									{title}
								</h3>
								<p className='mt-2 flex-1 font-sans text-sm leading-relaxed text-[#64748b]'>
									{description}
								</p>
								<Link
									href='/services'
									className='mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#c1272d] transition hover:text-[#a61f29]'
								>
									EXPLORE SERVICE
									<HiArrowRight
										className='h-4 w-4'
										aria-hidden
									/>
								</Link>
							</article>
						</li>
					))}
				</ul>

				<div className='relative mt-12 border-t border-[#dce3ec] pt-8 sm:mt-14 lg:mt-16'>
					<div className='flex flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:justify-between'>
						<Link
							href='/services'
							className='inline-flex items-center gap-2 font-sans text-base font-bold text-[#061a2f] transition hover:text-[#c1272d]'
						>
							View All Services
							<HiArrowRight className='h-5 w-5' aria-hidden />
						</Link>

						<div
							className='inline-flex items-center gap-0 self-start rounded-full border border-[#e8edf3] bg-white/95 p-1 shadow-sm sm:self-auto'
							role='group'
							aria-label='Service carousel'
						>
							<button
								type='button'
								className='flex h-9 w-9 items-center justify-center rounded-full text-[#c1272d] transition hover:bg-[#fef2f2]'
								aria-label='Previous'
							>
								<HiChevronLeft className='h-5 w-5' />
							</button>
							<span className='min-w-[2rem] px-2 text-center text-sm font-semibold text-[#9ca3af]'>
								1
							</span>
							<button
								type='button'
								className='flex h-9 w-9 items-center justify-center rounded-full text-[#c1272d] transition hover:bg-[#fef2f2]'
								aria-label='Next'
							>
								<HiChevronRight className='h-5 w-5' />
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
