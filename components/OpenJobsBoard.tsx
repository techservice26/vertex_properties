'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
	HiChevronLeft,
	HiChevronRight,
	HiMagnifyingGlass,
	HiMapPin,
} from 'react-icons/hi2';
import {
	OPEN_JOBS,
	OPEN_JOBS_UNIQUE_STATES,
	type OpenJob,
} from '@/data/openJobs';

const SIDEBAR = '#1e3a5f';
const RED = '#c1272d';
const PER_PAGE = 6;

const chevronRed = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23c1272d'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`;

const selectClass =
	'w-full cursor-pointer appearance-none rounded-xl border-0 bg-white px-4 py-3 pr-10 text-sm font-medium text-[#1e293b] shadow-sm outline-none';

function jobMatches(
	job: OpenJob,
	keyword: string,
	loc: string,
	state: string,
	city: string,
): boolean {
	const k = keyword.trim().toLowerCase();
	const l = loc.trim().toLowerCase();
	if (k && !job.title.toLowerCase().includes(k)) return false;
	if (l) {
		const blob = `${job.city} ${job.state} ${job.location}`.toLowerCase();
		if (!blob.includes(l)) return false;
	}
	if (state && job.state !== state) return false;
	if (city && job.city !== city) return false;
	return true;
}

export default function OpenJobsBoard() {
	const [draftKeyword, setDraftKeyword] = useState('');
	const [draftLocation, setDraftLocation] = useState('');
	const [draftState, setDraftState] = useState('');
	const [draftCity, setDraftCity] = useState('');

	const [keyword, setKeyword] = useState('');
	const [location, setLocation] = useState('');
	const [filterState, setFilterState] = useState('');
	const [filterCity, setFilterCity] = useState('');

	const [page, setPage] = useState(1);

	const filtered = useMemo(
		() =>
			OPEN_JOBS.filter((j) =>
				jobMatches(j, keyword, location, filterState, filterCity),
			),
		[keyword, location, filterState, filterCity],
	);

	const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

	useEffect(() => {
		if (page > totalPages) setPage(totalPages);
	}, [page, totalPages]);

	const safePage = Math.min(page, totalPages);
	const slice = useMemo(() => {
		const p = Math.min(page, totalPages);
		const start = (p - 1) * PER_PAGE;
		return filtered.slice(start, start + PER_PAGE);
	}, [filtered, page, totalPages]);

	const startIdx =
		filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1;
	const endIdx =
		filtered.length === 0 ? 0 : Math.min(safePage * PER_PAGE, filtered.length);

	function runSearch() {
		setKeyword(draftKeyword);
		setLocation(draftLocation);
		setFilterState(draftState);
		setFilterCity(draftCity);
		setPage(1);
	}

	function clearFilters() {
		setDraftKeyword('');
		setDraftLocation('');
		setDraftState('');
		setDraftCity('');
		setKeyword('');
		setLocation('');
		setFilterState('');
		setFilterCity('');
		setPage(1);
	}

	return (
		<div className='bg-white px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8'>
			<div className='mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:gap-10'>
				<aside
					className='shrink-0 rounded-2xl p-5 text-white shadow-lg sm:p-6 lg:w-[min(100%,320px)]'
					style={{ backgroundColor: SIDEBAR }}
					aria-label='Job search'
				>
					<div>
						<h2 className='font-sans text-base font-bold text-white'>
							Keyword Search
						</h2>
						<div className='mt-4 space-y-3'>
							<div className='relative'>
								<HiMagnifyingGlass
									className='pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748b]'
									aria-hidden
								/>
								<input
									type='search'
									value={draftKeyword}
									onChange={(e) => setDraftKeyword(e.target.value)}
									placeholder='Type to search: e.g Repair'
									className='w-full rounded-xl border-0 bg-white py-3 pl-10 pr-3 text-sm text-[#1e293b] shadow-sm outline-none placeholder:text-[#94a3b8]'
								/>
							</div>
							<div className='relative'>
								<HiMapPin
									className='pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748b]'
									aria-hidden
								/>
								<input
									type='text'
									value={draftLocation}
									onChange={(e) => setDraftLocation(e.target.value)}
									placeholder='Zip Code or City, State'
									className='w-full rounded-xl border-0 bg-white py-3 pl-10 pr-3 text-sm text-[#1e293b] shadow-sm outline-none placeholder:text-[#94a3b8]'
								/>
							</div>
							<button
								type='button'
								onClick={runSearch}
								className='w-full rounded-xl bg-[#c1272d] py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-[#a61f29]'
							>
								Search
							</button>
						</div>
					</div>

					<div className='mt-8 border-t border-white/20 pt-6'>
						<h2 className='font-sans text-base font-bold text-white'>
							Search filters
						</h2>
						<div className='mt-4 space-y-3'>
							<select
								value={draftState}
								onChange={(e) => {
									setDraftState(e.target.value);
									setDraftCity('');
								}}
								className={selectClass}
								style={{
									backgroundImage: chevronRed,
									backgroundSize: '1rem',
									backgroundPosition: 'right 0.75rem center',
									backgroundRepeat: 'no-repeat',
								}}
							>
								<option value=''>State</option>
								{OPEN_JOBS_UNIQUE_STATES.map((s) => (
									<option key={s} value={s}>
										{s}
									</option>
								))}
							</select>
							<select
								value={draftCity}
								onChange={(e) => setDraftCity(e.target.value)}
								className={selectClass}
								style={{
									backgroundImage: chevronRed,
									backgroundSize: '1rem',
									backgroundPosition: 'right 0.75rem center',
									backgroundRepeat: 'no-repeat',
								}}
							>
								<option value=''>City</option>
								{(draftState
									? OPEN_JOBS.filter((j) => j.state === draftState)
									: OPEN_JOBS
								)
									.filter(
										(j, idx, arr) =>
											arr.findIndex((x) => x.city === j.city) === idx,
									)
									.sort((a, b) => a.city.localeCompare(b.city))
									.map((j) => (
										<option
											key={`${j.state}-${j.city}`}
											value={j.city}
										>
											{j.city}
										</option>
									))}
							</select>
						</div>
						<button
							type='button'
							onClick={clearFilters}
							className='mt-4 text-sm font-semibold text-white/90 underline-offset-2 transition hover:text-white hover:underline'
						>
							Clear Filter
						</button>
					</div>
				</aside>

				<div className='min-w-0 flex-1'>
					<p className='font-sans text-sm font-bold text-[#c1272d] sm:text-base'>
						Showing {startIdx}-{endIdx} of {filtered.length} jobs
					</p>

					<ul className='mt-6 divide-y divide-[#e8edf3]'>
						{slice.map((job) => (
							<li key={job.id} className='py-6 first:pt-2'>
								<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6'>
									<div className='min-w-0 flex-1'>
										<h3 className='font-sans text-base font-bold leading-snug text-[#1e3a5f] sm:text-lg'>
											{job.title}
										</h3>
										<p className='mt-2 flex items-center gap-1.5 text-sm text-[#64748b]'>
											<HiMapPin
												className='h-4 w-4 shrink-0 text-[#94a3b8]'
												aria-hidden
											/>
											{job.location}
										</p>
									</div>
									<Link
										href={`/contact?job=${encodeURIComponent(job.id)}`}
										className='inline-flex shrink-0 items-center justify-center rounded-xl bg-[#c1272d] px-6 py-2.5 text-center text-sm font-bold text-white shadow-sm transition hover:bg-[#a61f29] sm:px-8'
									>
										Apply Now
									</Link>
								</div>
							</li>
						))}
					</ul>

					{filtered.length === 0 ? (
						<p className='py-10 text-center text-[#64748b]'>
							No jobs match your filters. Try adjusting keywords or clear filters.
						</p>
					) : null}

					{filtered.length > 0 ? (
						<nav
							className='mt-10 flex flex-wrap items-center justify-center gap-2'
							aria-label='Pagination'
						>
							<button
								type='button'
								onClick={() => setPage((p) => Math.max(1, p - 1))}
								disabled={safePage <= 1}
								className='flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#c1272d] text-[#c1272d] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-35'
								aria-label='Previous page'
							>
								<HiChevronLeft className='h-5 w-5' aria-hidden />
							</button>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
								<button
									key={n}
									type='button'
									onClick={() => setPage(n)}
									className={`flex h-11 min-w-[2.75rem] items-center justify-center rounded-full border-2 bg-white px-3 font-sans text-sm font-semibold transition ${
										safePage === n
											? 'border-[#1e293b] text-[#1e293b] ring-2 ring-[#1e293b]/20'
											: 'border-[#cbd5e1] text-[#64748b] hover:border-[#94a3b8]'
									}`}
									aria-current={safePage === n ? 'page' : undefined}
								>
									{String(n).padStart(2, '0')}
								</button>
							))}
							<button
								type='button'
								onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
								disabled={safePage >= totalPages}
								className='flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#94a3b8] text-[#64748b] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-35'
								aria-label='Next page'
							>
								<HiChevronRight className='h-5 w-5' aria-hidden />
							</button>
						</nav>
					) : null}
				</div>
			</div>
		</div>
	);
}
