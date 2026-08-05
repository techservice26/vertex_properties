'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import { BlogFormModal } from '@/components/dashboard/blogs/BlogFormModal';
import { DashboardToggle } from '@/components/dashboard/DashboardToggle';
import {
	deleteBlog,
	fetchBlogs,
	toggleBlogHomepage,
} from '@/lib/blog-api';
import { formatBlogDate, getBlogImageUrl, sortBlogs } from '@/lib/blog-utils';
import { getRichTextPlainText } from '@/lib/rich-text-utils';
import type { Blog } from '@/types/blog';

export function BlogList() {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [formBlog, setFormBlog] = useState<Blog | null | undefined>(undefined);
	const [togglingId, setTogglingId] = useState<number | null>(null);

	const loadBlogs = useCallback(async () => {
		setLoading(true);
		setError('');

		try {
			const data = await fetchBlogs();
			setBlogs(sortBlogs(data));
		} catch (loadError) {
			setError(
				loadError instanceof Error
					? loadError.message
					: 'Failed to load blog posts.',
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void loadBlogs();
	}, [loadBlogs]);

	const handleDelete = async (blog: Blog) => {
		const confirmed = window.confirm(
			`Delete "${blog.title}"? This cannot be undone.`,
		);

		if (!confirmed) {
			return;
		}

		try {
			await deleteBlog(blog.id);
			setBlogs((current) => current.filter((item) => item.id !== blog.id));
		} catch (deleteError) {
			window.alert(
				deleteError instanceof Error
					? deleteError.message
					: 'Failed to delete blog post.',
			);
		}
	};

	const handleToggleHomepage = async (blog: Blog, showOnHomepage: boolean) => {
		setTogglingId(blog.id);

		try {
			const updated = await toggleBlogHomepage(blog.id, showOnHomepage);
			setBlogs((current) =>
				current.map((item) => (item.id === updated.id ? updated : item)),
			);
		} catch (toggleError) {
			window.alert(
				toggleError instanceof Error
					? toggleError.message
					: 'Failed to update homepage visibility.',
			);
		} finally {
			setTogglingId(null);
		}
	};

	const handleSaved = (saved: Blog) => {
		setBlogs((current) => {
			const existingIndex = current.findIndex((item) => item.id === saved.id);

			if (existingIndex === -1) {
				return sortBlogs([saved, ...current]);
			}

			const next = [...current];
			next[existingIndex] = saved;
			return sortBlogs(next);
		});
	};

	return (
		<div className='space-y-6'>
			<div className='flex flex-wrap items-center justify-between gap-3'>
				<div>
					<h1 className='text-2xl font-bold text-slate-900'>Blogs</h1>
					<p className='mt-1 text-sm text-slate-600'>
						Manage Vertex Insights &amp; Articles posts shown on the homepage
						and `/blog` page.
					</p>
				</div>
				<button
					type='button'
					onClick={() => setFormBlog(null)}
					className='inline-flex items-center gap-2 rounded-lg bg-[#c1272d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a01f24]'
				>
					<Plus className='h-4 w-4' />
					Add blog post
				</button>
			</div>

			{loading ? (
				<p className='text-sm text-slate-500'>Loading blog posts...</p>
			) : null}

			{error ? (
				<div className='rounded-lg border border-[#c1272d]/20 bg-[#c1272d]/5 px-4 py-3 text-sm text-[#c1272d]'>
					{error}
				</div>
			) : null}

			{!loading && !error && blogs.length === 0 ? (
				<div className='rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center'>
					<p className='text-sm text-slate-600'>
						No blog posts yet. The public site will use static articles until
						you add posts here.
					</p>
				</div>
			) : null}

			{blogs.length > 0 ? (
				<div className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm'>
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-slate-200 text-sm'>
							<thead className='bg-slate-50'>
								<tr>
									<th className='px-4 py-3 text-left font-semibold text-slate-700'>
										Post
									</th>
									<th className='px-4 py-3 text-left font-semibold text-slate-700'>
										Published
									</th>
									<th className='px-4 py-3 text-left font-semibold text-slate-700'>
										Homepage
									</th>
									<th className='px-4 py-3 text-right font-semibold text-slate-700'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-slate-100'>
								{blogs.map((blog) => (
									<tr key={blog.id} className='hover:bg-slate-50/80'>
										<td className='px-4 py-3'>
											<div className='flex items-center gap-3'>
												<div className='relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100'>
													<Image
														src={getBlogImageUrl(blog)}
														alt=''
														fill
														className='object-cover'
														sizes='80px'
													/>
												</div>
												<div className='min-w-0'>
													<p className='line-clamp-1 font-medium text-slate-900'>
														{blog.title}
													</p>
													<p className='mt-1 line-clamp-2 text-xs text-slate-500'>
														{blog.description
															? getRichTextPlainText(blog.description, 160)
															: '—'}
													</p>
												</div>
											</div>
										</td>
										<td className='whitespace-nowrap px-4 py-3 text-slate-600'>
											{formatBlogDate(blog.created_at)}
										</td>
										<td className='px-4 py-3'>
											<DashboardToggle
												checked={blog.show_on_homepage}
												disabled={togglingId === blog.id}
												onChange={(checked) =>
													void handleToggleHomepage(blog, checked)
												}
												label={`Show ${blog.title} on homepage`}
											/>
										</td>
										<td className='px-4 py-3'>
											<div className='flex items-center justify-end gap-2'>
												<button
													type='button'
													onClick={() => setFormBlog(blog)}
													className='rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-slate-300 hover:text-slate-900'
													aria-label={`Edit ${blog.title}`}
												>
													<Pencil className='h-4 w-4' />
												</button>
												<button
													type='button'
													onClick={() => void handleDelete(blog)}
													className='rounded-lg border border-slate-200 p-2 text-[#c1272d] transition hover:border-[#c1272d]/30 hover:bg-[#c1272d]/5'
													aria-label={`Delete ${blog.title}`}
												>
													<Trash2 className='h-4 w-4' />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			) : null}

			{formBlog !== undefined ? (
				<BlogFormModal
					blog={formBlog}
					onClose={() => setFormBlog(undefined)}
					onSaved={handleSaved}
				/>
			) : null}
		</div>
	);
}
