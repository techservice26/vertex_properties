import type { LucideIcon } from 'lucide-react';

type DashboardSectionPageProps = {
	title: string;
	description: string;
	icon: LucideIcon;
	apiPath: string;
};

export function DashboardSectionPage({
	title,
	description,
	icon: Icon,
	apiPath,
}: DashboardSectionPageProps) {
	return (
		<div className='space-y-6'>
			<div className='flex items-start gap-4'>
				<div className='rounded-2xl bg-[#c1272d]/10 p-4 text-[#c1272d]'>
					<Icon className='h-6 w-6' strokeWidth={1.75} />
				</div>
				<div>
					<h1 className='text-2xl font-bold tracking-wide text-slate-900'>
						{title}
					</h1>
					<p className='mt-1 max-w-2xl text-sm text-slate-600'>
						{description}
					</p>
				</div>
			</div>

			<div className='rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm'>
				<p className='text-sm font-medium text-slate-700'>
					Content management for this section is ready to connect.
				</p>
				<p className='mt-2 text-sm text-slate-500'>
					Backend endpoint:{' '}
					<code className='rounded bg-slate-100 px-2 py-1 text-xs text-slate-700'>
						{apiPath}
					</code>
				</p>
			</div>
		</div>
	);
}
