// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'faint signals';
export const SITE_DESCRIPTION = 'Late Discoveries & Probably Wrong Takes: A Personal Signal Feed.';

export const TAGS = {
	// One muted family rather than ten unrelated saturated colours. Each tag
	// stays identifiable by hue, but as a small dot beside the label — a row of
	// filled colour chips was the loudest thing on the page and said nothing.
	// `color` carries white text at AA wherever a solid chip is still used.
	'AI & TECH': { label: 'AI & TECH', color: '#38617F', textColor: '#ffffff' }, // Dusty blue
	'NODE JS': { label: 'NODE JS', color: '#3F6B51', textColor: '#ffffff' }, // Sage
	'DESIGN': { label: 'DESIGN', color: '#6B4F80', textColor: '#ffffff' }, // Dusty violet
	'UX': { label: 'UX', color: '#94465C', textColor: '#ffffff' }, // Dusty rose
	'FASHION': { label: 'FASHION', color: '#443E37', textColor: '#ffffff' }, // Warm charcoal
	'RANT': { label: 'RANT', color: '#A33F26', textColor: '#ffffff' }, // Brick
	'PERSONAL BLOG': { label: 'PERSONAL BLOG', color: '#53527F', textColor: '#ffffff' }, // Dusty indigo
	'DEVLOG': { label: 'DEVLOG', color: '#5E564B', textColor: '#ffffff' }, // Warm grey
	'SERIES': { label: 'SERIES', color: '#B23F10', textColor: '#ffffff' }, // The accent
	'CASE STUDY': { label: 'CASE STUDY', color: '#2A605C', textColor: '#ffffff' }, // Teal
} as const;

export type TagKey = keyof typeof TAGS;
