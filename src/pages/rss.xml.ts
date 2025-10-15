import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const blog = await getCollection('blog');
  
  // Filter out drafts and sort by date
  const publishedPosts = blog
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Luis Bonilla - Software Engineer Blog',
    description: 'Insights on software engineering, technical leadership, and digital transformation from Luis Bonilla',
    site: context.site || 'https://luisbonilla90.github.io',
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      author: post.data.author,
      categories: post.data.tags,
    })),
    customData: `<language>${'en'}</language>`,
    stylesheet: '/rss-styles.xsl',
  });
};
