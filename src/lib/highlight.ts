/** A title split around the fragment the author asked to be marked. */
export type TitleParts =
	| { marked: false; before: string; match: ''; after: '' }
	| { marked: true; before: string; match: string; after: string };

/**
 * Split `title` around the first case-insensitive occurrence of `fragment`, so
 * a renderer can wrap the middle in a marker span.
 *
 * A fragment that isn't present returns `marked: false` with the whole title in
 * `before` — the title always renders in full, whatever happens. The build
 * catches the mismatch separately, in `scripts/validate-posts.ts`.
 */
export function splitOnHighlight(
	title: string,
	fragment?: string,
): TitleParts {
	if (!fragment) return { marked: false, before: title, match: '', after: '' };

	const at = title.toLowerCase().indexOf(fragment.toLowerCase());
	if (at === -1) return { marked: false, before: title, match: '', after: '' };

	return {
		marked: true,
		before: title.slice(0, at),
		match: title.slice(at, at + fragment.length),
		after: title.slice(at + fragment.length),
	};
}

/** The inks a highlight can use. Each renders as a different colour per theme. */
export const MARK_INKS = ['orange', 'yellow', 'lime', 'sky', 'pink', 'violet'] as const;
export type MarkInk = (typeof MARK_INKS)[number];

/**
 * Ink name to utility class.
 *
 * Spelled out rather than built as `mark-${ink}`, because Tailwind extracts
 * class names by scanning source text: an interpolated name is invisible to it
 * and the utility would never be generated.
 */
const INK_CLASS: Record<MarkInk, string> = {
	orange: 'mark-signal',
	yellow: 'mark-yellow',
	lime: 'mark-lime',
	sky: 'mark-sky',
	pink: 'mark-pink',
	violet: 'mark-violet',
};

/** Class for a highlight ink, falling back to the site accent. */
export function markInkClass(ink?: string): string {
	return INK_CLASS[ink as MarkInk] ?? INK_CLASS.orange;
}
