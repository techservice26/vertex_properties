import Link from 'next/link';
import type { IconType } from 'react-icons';
import { HiArrowRight } from 'react-icons/hi2';
import {
	MdOutlineBathtub,
	MdOutlineBolt,
	MdOutlineChair,
	MdOutlineCleaningServices,
	MdOutlineConstruction,
	MdOutlineCountertops,
	MdOutlineDeck,
	MdOutlineDeleteSweep,
	MdOutlineDeviceThermostat,
	MdOutlineDoorFront,
	MdOutlineFactCheck,
	MdOutlineFence,
	MdOutlineFireplace,
	MdOutlineFormatPaint,
	MdOutlineGarage,
	MdOutlineGridView,
	MdOutlineHandyman,
	MdOutlineHomeRepairService,
	MdOutlineHomeWork,
	MdOutlineKitchen,
	MdOutlineLayers,
	MdOutlineLocalFireDepartment,
	MdOutlinePark,
	MdOutlinePestControl,
	MdOutlinePlumbing,
	MdOutlineRoofing,
	MdOutlineSecurity,
	MdOutlineSquareFoot,
	MdOutlineTv,
	MdOutlineWaterDrop,
	MdOutlineWbSunny,
} from 'react-icons/md';
import { TbHammer, TbSnowflake } from 'react-icons/tb';

const iconClass = 'h-12 w-12 shrink-0 text-[#061a2f]';

const services: { title: string; description: string; Icon: IconType }[] = [
	{
		title: 'Property Preservation',
		description:
			'Field services that protect asset condition, meet investor guidelines, and keep vacant and occupied properties compliant.',
		Icon: MdOutlineHomeWork,
	},
	{
		title: 'Home Repair Services',
		description:
			'Drywall, trim, fixtures, and general fixes that keep interiors safe, functional, and ready for residents or showings.',
		Icon: TbHammer,
	},
	{
		title: 'Painting Services',
		description:
			'Interior and exterior painting, prep, and touch-ups to refresh units, common areas, and exteriors on schedule.',
		Icon: MdOutlineFormatPaint,
	},
	{
		title: 'Plumbing Services',
		description:
			'Leak repairs, drain clearing, fixture installs, and line work coordinated with clear photo documentation.',
		Icon: MdOutlinePlumbing,
	},
	{
		title: 'HVAC Services',
		description:
			'Seasonal service, repairs, and change-outs that protect comfort, efficiency, and equipment life.',
		Icon: MdOutlineDeviceThermostat,
	},
	{
		title: 'Electrical Services',
		description:
			'Lighting, outlets, panels, and troubleshooting performed with safety and code awareness top of mind.',
		Icon: MdOutlineBolt,
	},
	{
		title: 'Flooring Services',
		description:
			'Repairs and installs for hardwood, vinyl, laminate, and tile—ideal for turnovers and damage remediation.',
		Icon: MdOutlineGridView,
	},
	{
		title: 'Carpentry / Handyman',
		description:
			'Custom repairs, shelving, trim, and small builds handled by skilled carpenters and versatile technicians.',
		Icon: MdOutlineHandyman,
	},
	{
		title: 'Landscaping & Exterior',
		description:
			'Grounds care, beds, mulch, seasonal cleanups, and curb-appeal work that supports inspections and marketing.',
		Icon: MdOutlinePark,
	},
	{
		title: 'Appliance Repair',
		description:
			'Diagnosis and repair for refrigerators, ranges, laundry, and built-ins so units are move-in ready.',
		Icon: MdOutlineKitchen,
	},
	{
		title: 'Roofing & Gutters',
		description:
			'Flashing, shingle patches, gutter cleaning, and minor repairs to stop water intrusion before it spreads.',
		Icon: MdOutlineRoofing,
	},
	{
		title: 'Cleaning & Turnover',
		description:
			'Deep cleans, move-out resets, and punch-list detailing aligned with your make-ready standards.',
		Icon: MdOutlineCleaningServices,
	},
	{
		title: 'Bathroom Repair Refresh',
		description:
			'Vanities, caulking, hardware, fans, and fixture swaps that refresh baths without a full gut.',
		Icon: MdOutlineBathtub,
	},
	{
		title: 'Kitchen Repair Services',
		description:
			'Cabinet adjustments, backsplashes, sinks, and hardware so kitchens stay durable and tenant-ready.',
		Icon: MdOutlineCountertops,
	},
	{
		title: 'Doors, Windows, Garage',
		description:
			'Adjustments, weatherstripping, glass, operators, and hardware for secure, smooth operation.',
		Icon: MdOutlineDoorFront,
	},
	{
		title: 'Lawn mowing services',
		description:
			'Recurring mowing, edging, and bagging to keep lawns neat for HOA, marketing, and seasonal compliance.',
		Icon: MdOutlineWbSunny,
	},
	{
		title: 'Fence / Gate Service',
		description:
			'Post resets, panel replacement, latches, and gate operators for perimeter security and aesthetics.',
		Icon: MdOutlineFence,
	},
	{
		title: 'Pest Control Services',
		description:
			'Treatment coordination and minor exclusion work aligned with your vendor and lease requirements.',
		Icon: MdOutlinePestControl,
	},
	{
		title: 'Restoration & Emergency',
		description:
			'Fast response after water, fire, or storm damage to stabilize the property and support your carrier process.',
		Icon: MdOutlineLocalFireDepartment,
	},
	{
		title: 'Water Heater Services',
		description:
			'Repairs, flushes, element swaps, and replacements to restore hot water with minimal downtime.',
		Icon: MdOutlineWaterDrop,
	},
	{
		title: 'TV Mounting Services',
		description:
			'Secure mounting, cable concealment, and bracket installs for common areas and model units.',
		Icon: MdOutlineTv,
	},
	{
		title: 'Garage Door Services',
		description:
			'Spring, opener, track, and sensor service so garages open reliably and pass safety checks.',
		Icon: MdOutlineGarage,
	},
	{
		title: 'Remodeling / Renovation',
		description:
			'Planned upgrades and reconfigurations managed with schedules, budgets, and clear owner communication.',
		Icon: MdOutlineConstruction,
	},
	{
		title: 'Inspections & compliance',
		description:
			'Pre- and post-inspection punch lists, code-related repairs, and documentation for lenders and municipalities.',
		Icon: MdOutlineFactCheck,
	},
	{
		title: 'Downspout Repair',
		description:
			'Reattachment, extensions, and drainage fixes to steer water away from foundations and walkouts.',
		Icon: MdOutlinePlumbing,
	},
	{
		title: 'Siding Services',
		description:
			'Patching, section replacement, and sealing to protect envelopes and maintain exterior appearance.',
		Icon: MdOutlineHomeRepairService,
	},
	{
		title: 'Snow Removal Service',
		description:
			'Walks, drives, and priority paths cleared per your snow plan so access and safety stay consistent.',
		Icon: TbSnowflake,
	},
	{
		title: 'Bathroom Remodel',
		description:
			'Full bath updates including finishes, waterproofing, and fixture packages tailored to your scope.',
		Icon: MdOutlineBathtub,
	},
	{
		title: 'Deck building & repairs',
		description:
			'Structural repairs, board replacement, railings, and new builds designed for code and longevity.',
		Icon: MdOutlineDeck,
	},
	{
		title: 'Home Security',
		description:
			'Lock changes, rekeys, smart hardware, and basic device installs that tighten access control.',
		Icon: MdOutlineSecurity,
	},
	{
		title: 'Carpentry Services',
		description:
			'Custom woodwork, built-ins, stairs, and trim crafted to match existing details and finishes.',
		Icon: TbHammer,
	},
	{
		title: 'Tile Installation & Repair',
		description:
			'Floor and wall tile, grout, and waterproofing for kitchens, baths, and high-traffic areas.',
		Icon: MdOutlineSquareFoot,
	},
	{
		title: 'Cleanouts & junk removal',
		description:
			'Debris, abandoned goods, and bulk item removal to clear units and yards for the next phase.',
		Icon: MdOutlineDeleteSweep,
	},
	{
		title: 'Furniture Assembly',
		description:
			'On-site assembly for office, model, and furnished units so everything is level, safe, and complete.',
		Icon: MdOutlineChair,
	},
	{
		title: 'Insulation Services',
		description:
			'Attic and cavity upgrades that support energy performance and comfort for residents and owners.',
		Icon: MdOutlineLayers,
	},
	{
		title: 'Fire Place Services',
		description:
			'Surround repair, door and screen service, and basic maintenance for safe seasonal use.',
		Icon: MdOutlineFireplace,
	},
];

/** Order must match `services` — used for `/services/[slug]` routes. */
const serviceSlugs = [
	'property-preservation',
	'home-repair-services',
	'painting-services',
	'plumbing-services',
	'hvac-services',
	'electrical-services',
	'flooring-services',
	'carpentry-handyman',
	'landscaping-exterior',
	'appliance-repair',
	'roofing-gutters',
	'cleaning-turnover',
	'bathroom-repair-refresh',
	'kitchen-repair-services',
	'doors-windows-garage',
	'lawn-mowing-services',
	'fence-gate-service',
	'pest-control-services',
	'restoration-emergency',
	'water-heater-services',
	'tv-mounting-services',
	'garage-door-services',
	'remodeling-renovation',
	'inspections-compliance',
	'downspout-repair',
	'siding-services',
	'snow-removal-service',
	'bathroom-remodel',
	'deck-building-repairs',
	'home-security',
	'carpentry-services',
	'tile-installation-repair',
	'cleanouts-junk-removal',
	'furniture-assembly',
	'insulation-services',
	'fireplace-services',
] as const;

export default function ServicesAllGridSection() {
	return (
		<section
			className='bg-white py-14 sm:py-16 lg:py-20'
			aria-labelledby='all-services-heading'
		>
			<div className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
				<header className='mx-auto max-w-3xl text-center'>
					<p className='text-xs font-bold uppercase tracking-widest text-[#c1272d] sm:text-sm'>
						Our All Services
					</p>
					<h2
						id='all-services-heading'
						className='mt-3 font-sans text-3xl font-bold tracking-tight text-[#061a2f] md:text-4xl'
					>
						Property Maintenance Services
					</h2>
					<p className='mt-4 font-sans text-base leading-relaxed text-[#64748b] md:text-lg'>
						We provide comprehensive property maintenance and
						preservation services designed to support occupancy,
						compliance, curb appeal, turnover timelines, and
						long-term asset care.
					</p>
				</header>

				<ul className='mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-10'>
					{services.map(({ title, description, Icon }, i) => (
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
									href={`/services/${serviceSlugs[i]}`}
									className='mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#c1272d] transition hover:text-[#a61f29]'
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
			</div>
		</section>
	);
}
