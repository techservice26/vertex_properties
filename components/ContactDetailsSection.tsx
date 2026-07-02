import Image from 'next/image';
import { HiMapPin, HiPaperAirplane, HiPhone, HiEnvelope } from 'react-icons/hi2';

const PHONE_MAIN = '(213) 444-4151';
const PHONE_RAW = '+12134444151';
const WEBSITE = 'vertexproperties.us';
const EMAIL = 'client@vertexproperties.us';

const ADDRESSES = [
    '9228 195TH PLACE',
    'FLOOR 3 Hollis, NO 11423',
];

function IconCircle({ children }: { children: React.ReactNode }) {
    return (
        <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2b3456] text-white'>
            {children}
        </span>
    );
}

export default function ContactDetailsSection() {
    return (
        <section
            className='px-4 py-12 sm:px-6 sm:py-14 lg:py-16'
            aria-labelledby='contact-location-heading'
        >
            <div className='mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_min(42%,420px)] lg:items-center lg:gap-12'>
                <div>
                    <p className='text-xs font-bold uppercase tracking-[0.2em] text-[#c1272d] sm:text-sm'>
                        Our contact us
                    </p>
                    <h2
                        id='contact-location-heading'
                        className='mt-2 font-sans text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl md:text-4xl'
                    >
                        Our Location And Contact Details
                    </h2>

                    <ul className='mt-8 space-y-4'>
                        <li>
                            <div className='flex items-start gap-4 rounded-2xl bg-white p-4 shadow-[0_4px_24px_rgba(15,23,42,0.08)] ring-1 ring-[#f1f5f9] sm:p-5'>
                                <IconCircle>
                                    <HiPhone className='h-6 w-6' aria-hidden />
                                </IconCircle>
                                <div className='min-w-0 pt-0.5'>
                                    <p className='text-xs font-bold uppercase tracking-wide text-[#64748b]'>
                                        Phone number
                                    </p>
                                    <div className='mt-1 flex flex-col gap-1 text-sm font-semibold text-[#0f172a]'>
                                        <a
                                            href={`tel:${PHONE_RAW}`}
                                            className='transition hover:text-[#c1272d]'
                                        >
                                            {PHONE_MAIN}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='flex items-start gap-4 rounded-2xl bg-white p-4 shadow-[0_4px_24px_rgba(15,23,42,0.08)] ring-1 ring-[#f1f5f9] sm:p-5'>
                                <IconCircle>
                                    <HiEnvelope
                                        className='h-6 w-6'
                                        aria-hidden
                                    />
                                </IconCircle>
                                <div className='min-w-0 pt-0.5'>
                                    <p className='text-xs font-bold uppercase tracking-wide text-[#64748b]'>
                                        Email
                                    </p>
                                    <a
                                        className='mt-1 block break-all text-sm font-semibold text-[#0f172a] transition hover:text-[#c1272d]'
                                    >
                                        {EMAIL}
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='flex items-start gap-4 rounded-2xl bg-white p-4 shadow-[0_4px_24px_rgba(15,23,42,0.08)] ring-1 ring-[#f1f5f9] sm:p-5'>
                                <IconCircle>
                                    <HiPaperAirplane
                                        className='h-6 w-6'
                                        aria-hidden
                                    />
                                </IconCircle>
                                <div className='min-w-0 pt-0.5'>
                                    <p className='text-xs font-bold uppercase tracking-wide text-[#64748b]'>
                                        Website
                                    </p>
                                    <a
                                        href={`https://${WEBSITE}`}
                                        className='mt-1 block break-all text-sm font-semibold text-[#0f172a] transition hover:text-[#c1272d]'
                                    >
                                        {WEBSITE}
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='flex items-start gap-4 rounded-2xl bg-white p-4 shadow-[0_4px_24px_rgba(15,23,42,0.08)] ring-1 ring-[#f1f5f9] sm:p-5'>
                                <IconCircle>
                                    <HiMapPin className='h-6 w-6' aria-hidden />
                                </IconCircle>
                                <div className='min-w-0 pt-0.5'>
                                    <p className='text-xs font-bold uppercase tracking-wide text-[#64748b]'>
                                        Property address
                                    </p>
                                    <p className='mt-1 text-sm font-medium leading-relaxed text-[#0f172a]'>
                                        {ADDRESSES.map((line) => (
                                            <span key={line} className='block'>
                                                {line}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className='relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(15,23,42,0.12)] ring-1 ring-[#e2e8f0] lg:mx-0 lg:max-w-none'>
                    <Image
                        src='/images/contact_us.png'
                        alt='Vertex technician providing in-home service'
                        fill
                        className='object-cover object-center'
                        sizes='(max-width: 1024px) 100vw, 420px'
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
