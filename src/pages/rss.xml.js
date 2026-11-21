import { getVisiblePosts } from '../lib/content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getVisiblePosts();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts
			.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
			.map((post) => ({
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.pubDate,
				categories: post.data.tags,
				author: post.data.author,
				link: `/blog/${post.id}/`,
			})),
	});
}
