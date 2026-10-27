import type { MetadataRoute } from 'next'
import { site } from '@/lib/content'
import { posts } from '@/lib/posts'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/blog/`, lastModified: new Date(posts[0].date), changeFrequency: 'weekly', priority: 0.7 },
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: new Date(p.date), priority: 0.6 })),
  ]
}
