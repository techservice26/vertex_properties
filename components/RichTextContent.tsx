import { isRichTextEmpty, normalizeRichTextContent } from '@/lib/rich-text-utils';

type RichTextContentProps = {
	content: string | null | undefined;
	className?: string;
	fallback?: string;
};

export function RichTextContent({
	content,
	className = '',
	fallback,
}: RichTextContentProps) {
	const normalizedContent = normalizeRichTextContent(content);

	if (isRichTextEmpty(normalizedContent)) {
		return fallback ? <p className={className}>{fallback}</p> : null;
	}

	return (
		<div
			className={`rich-text-content text-inherit [&_a]:text-[#c1272d] [&_em]:italic [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:my-1 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 ${className}`}
			dangerouslySetInnerHTML={{ __html: normalizedContent }}
		/>
	);
}
