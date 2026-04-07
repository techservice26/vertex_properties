import type { IconType } from 'react-icons';

export type ServiceCategoryGridItem = {
	label: string;
	Icon: IconType;
};

type Props = {
	items: ServiceCategoryGridItem[];
};

export default function ServiceCategoryGrid({ items }: Props) {
	return (
		<section
			className='bg-white px-4 py-12 sm:px-6 sm:py-14 lg:py-16'
			aria-label='Service specialties'
		>
			<ul className='mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8'>
				{items.map(({ label, Icon }) => (
					<li key={label}>
						<article className='flex h-full flex-col items-center rounded-xl border border-[#e8edf3] bg-white px-4 py-6 text-center shadow-[0_4px_20px_rgba(15,23,42,0.07)] sm:px-5 sm:py-8'>
							<Icon
								className='mb-4 h-10 w-10 shrink-0 text-[#c1272d] sm:h-11 sm:w-11'
								aria-hidden
							/>
							<h2 className='font-sans text-sm font-bold leading-snug text-[#061a2f] sm:text-base'>
								{label}
							</h2>
						</article>
					</li>
				))}
			</ul>
		</section>
	);
}
