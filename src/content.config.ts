import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		author: z.string().default('Vajahath Ahmed'),
		tags: z.array(z.string()).default(['PERSONAL BLOG']),
		isSpotlight: z.boolean().optional().default(false),
		isFocus: z.boolean().optional().default(false),
		hotTakes: z.array(z.string()).optional(),
		toc: z.union([z.literal('show'), z.boolean()]).optional(),
		seriesId: z.string().optional(),
		seriesOrder: z.number().int().positive().optional(),
	}),
});

const series = defineCollection({
	loader: glob({ base: './src/content/series', pattern: '**/*.{yaml,yml}' }),
	// `image()` resolves relative paths against the YAML file and hands back
	// real ImageMetadata; a plain string is still allowed for remote covers.
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			coverImage: z.union([image(), z.url()]).optional(),
			startedAt: z.coerce.date().optional(),
		}),
});

export const collections = { blog, series };
