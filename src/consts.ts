// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'faint signals';
export const SITE_DESCRIPTION = 'Late Discoveries & Probably Wrong Takes: A Personal Signal Feed.';

export const TAGS = {
    'AI & TECH': { label: 'AI & TECH', color: '#1e40af', textColor: '#ffffff' }, // Deep Blue
    'NODE JS': { label: 'NODE JS', color: '#065f46', textColor: '#ffffff' }, // Deep Teal
    'TRAVEL': { label: 'TRAVEL', color: '#f59e0b', textColor: '#000000' }, // Amber (Black text for legibility)
    'DESIGN': { label: 'DESIGN', color: '#6d28d9', textColor: '#ffffff' }, // Deep Violet
    'UX': { label: 'UX', color: '#be185d', textColor: '#ffffff' }, // Deep Pink
    'FASHION': { label: 'FASHION', color: '#000000', textColor: '#ffffff' }, // Pure Black
    'RANT': { label: 'RANT', color: '#991b1b', textColor: '#ffffff' }, // Deep Blood Red
    'PERSONAL BLOG': { label: 'PERSONAL BLOG', color: '#4338ca', textColor: '#ffffff' }, // Deep Indigo
    'DEVLOG': { label: 'DEVLOG', color: '#374151', textColor: '#ffffff' }, // Charcoal
    'SERIES': { label: 'SERIES', color: '#ef4444', textColor: '#ffffff' }, // Live Red
    'CASE STUDY': { label: 'CASE STUDY', color: '#3b82f6', textColor: '#ffffff' }, // Brand Blue
} as const;

export type TagKey = keyof typeof TAGS;
