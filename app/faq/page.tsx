import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FaqAccordion from '@/components/FaqAccordion';
import FaqAskQuestionForm from '@/components/FaqAskQuestionForm';
import { FAQ_ITEMS } from '@/data/faqContent';
import PreFooterCtaSection from '@/components/PreFooterCtaSection';

export const metadata: Metadata = {
	title: "FAQ's | Vertex Property Services",
	description:
		'Answers to common questions about Vertex Property Services—maintenance, repairs, property managers, scheduling, and more.',
};

export default function FaqPage() {
	return (
		<div className='min-h-screen bg-white'>
			<PageHero
				title='Frequently Asked Questions'
				breadcrumbs={[{ label: 'Home', href: '/' }, { label: "Faq's" }]}
			/>

			<section
				className='px-4 py-12 sm:px-6 sm:py-14 lg:py-16'
				aria-label='FAQ list'
			>
				<div className='mx-auto max-w-3xl'>
					<FaqAccordion items={FAQ_ITEMS} defaultOpenIndex={1} />
				</div>
			</section>

			<FaqAskQuestionForm />
			<PreFooterCtaSection />
		</div>
	);
}
