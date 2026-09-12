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
