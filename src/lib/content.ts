import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Drafts live in the repo and render in `pnpm dev`, but are never built for
 * production — not in listings, not in feeds, not as their own page.
 *
 * Every page must read content through these helpers rather than calling
 * getCollection directly, or a draft leaks into whichever surface forgot.
 */
const includeDrafts = import.meta.env.DEV;

export async function getVisiblePosts(): Promise<CollectionEntry<'blog'>[]> {
	return getCollection('blog', ({ data }) => includeDrafts || !data.draft);
}

export async function getVisibleSeries(): Promise<CollectionEntry<'series'>[]> {
	return getCollection('series', ({ data }) => includeDrafts || !data.draft);
}
