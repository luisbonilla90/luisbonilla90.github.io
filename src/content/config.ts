import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Luis Bonilla'),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'es']).default('en'),
    draft: z.boolean().default(false),
    // JSON-LD structured data
    jsonLd: z.object({
      type: z.string().default('BlogPosting'),
      headline: z.string(),
      description: z.string(),
      author: z.object({
        type: z.string().default('Person'),
        name: z.string(),
      }),
      datePublished: z.string(),
      dateModified: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  blog,
};
