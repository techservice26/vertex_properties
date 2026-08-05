'use client';

import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
	Bold,
	Heading2,
	Italic,
	List,
	ListOrdered,
	Redo2,
	Undo2,
} from 'lucide-react';

import { normalizeRichTextContent, stripRichText } from '@/lib/rich-text-utils';

type RichTextEditorProps = {
	id?: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	maxLength?: number;
	required?: boolean;
};

function ToolbarButton({
	active,
	disabled,
	label,
	onClick,
	children,
}: {
	active?: boolean;
	disabled?: boolean;
	label: string;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<button
			type='button'
			onClick={onClick}
			disabled={disabled}
			aria-label={label}
			title={label}
			className={`rounded-md p-2 transition ${
				active
					? 'bg-[#c1272d]/10 text-[#c1272d]'
					: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
			} disabled:cursor-not-allowed disabled:opacity-40`}
		>
			{children}
		</button>
	);
}

export function RichTextEditor({
	id,
	label,
	value,
	onChange,
	placeholder,
	maxLength = 4000,
	required = false,
}: RichTextEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [2, 3],
				},
			}),
		],
		content: normalizeRichTextContent(value),
		immediatelyRender: false,
		editorProps: {
			attributes: {
				...(id ? { id } : {}),
				class:
					'rich-text-editor min-h-[140px] px-3 py-2.5 focus:outline-none [&_h2]:mb-2 [&_h2]:mt-3 [&_h2]:text-lg [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-base [&_h3]:font-semibold [&_li]:my-1 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5',
			},
		},
		onUpdate: ({ editor: currentEditor }) => {
			onChange(currentEditor.getHTML());
		},
	});

	useEffect(() => {
		if (!editor) {
			return;
		}

		const normalizedValue = normalizeRichTextContent(value);
		const currentHtml = editor.getHTML();

		if (normalizedValue !== currentHtml) {
			editor.commands.setContent(normalizedValue, { emitUpdate: false });
		}
	}, [editor, value]);

	const plainTextLength = stripRichText(value).length;

	return (
		<div>
			<label
				htmlFor={id}
				className='mb-1 block text-sm font-medium text-slate-700'
			>
				{label}
				{required ? <span className='text-[#c1272d]'> *</span> : null}
			</label>

			<div className='overflow-hidden rounded-lg border border-slate-300 focus-within:border-[#c1272d] focus-within:ring-2 focus-within:ring-[#c1272d]/10'>
				{editor ? (
					<div className='flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1.5'>
						<ToolbarButton
							label='Bold'
							active={editor.isActive('bold')}
							onClick={() => editor.chain().focus().toggleBold().run()}
						>
							<Bold className='h-4 w-4' />
						</ToolbarButton>
						<ToolbarButton
							label='Italic'
							active={editor.isActive('italic')}
							onClick={() => editor.chain().focus().toggleItalic().run()}
						>
							<Italic className='h-4 w-4' />
						</ToolbarButton>
						<ToolbarButton
							label='Heading'
							active={editor.isActive('heading', { level: 2 })}
							onClick={() =>
								editor.chain().focus().toggleHeading({ level: 2 }).run()
							}
						>
							<Heading2 className='h-4 w-4' />
						</ToolbarButton>
						<ToolbarButton
							label='Bullet list'
							active={editor.isActive('bulletList')}
							onClick={() => editor.chain().focus().toggleBulletList().run()}
						>
							<List className='h-4 w-4' />
						</ToolbarButton>
						<ToolbarButton
							label='Numbered list'
							active={editor.isActive('orderedList')}
							onClick={() => editor.chain().focus().toggleOrderedList().run()}
						>
							<ListOrdered className='h-4 w-4' />
						</ToolbarButton>
						<span className='mx-1 h-5 w-px bg-slate-200' aria-hidden />
						<ToolbarButton
							label='Undo'
							disabled={!editor.can().chain().focus().undo().run()}
							onClick={() => editor.chain().focus().undo().run()}
						>
							<Undo2 className='h-4 w-4' />
						</ToolbarButton>
						<ToolbarButton
							label='Redo'
							disabled={!editor.can().chain().focus().redo().run()}
							onClick={() => editor.chain().focus().redo().run()}
						>
							<Redo2 className='h-4 w-4' />
						</ToolbarButton>
					</div>
				) : null}

				<EditorContent editor={editor} />
			</div>

			<p className='mt-1 text-xs text-slate-500'>
				{plainTextLength}/{maxLength} characters
			</p>
		</div>
	);
}
