import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter, SiteHeader } from '@/components/SiteHeader'
import { site } from '@/lib/content'
import { formatDate, type Post, posts } from '@/lib/posts'

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)!

export function postMetadata(post: Post): Metadata {
  const url = `/blog/${post.slug}/`
  return {
    title: `${post.title} — Pixel Moose Studio`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.founder],
      images: [{ url: post.cover.src, alt: post.cover.alt }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [post.cover.src] },
  }
}

// Page frame for a blog post: header, title block, structured data and footer.
export function PostShell({ post, children }: { post: Post; children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    image: `${site.url}${post.cover.src}`,
    url: `${site.url}/blog/${post.slug}/`,
    author: { '@type': 'Person', name: site.founder },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
  }

  return (
    <div className="wrap">
      <SiteHeader />
      <main id="main">
        <article className="article">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <header className="article-head">
            <p className="mono muted">
              <Link href="/blog/">Blog</Link> · <time dateTime={post.date}>{formatDate(post.date)}</time> ·{' '}
              {post.readingTime}
              {post.updated && (
                <>
                  <br />
                  Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </>
              )}
            </p>
            <h1 className="page-title">{post.title}</h1>
            <p className="lede muted">{post.description}</p>
          </header>
          {children}
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}

export function TechDetails({ children }: { children: React.ReactNode }) {
  return (
    <details className="tech">
      <summary>
        <span>For the technically curious: how it’s built</span>
        <span className="tech-hint mono muted" aria-hidden="true">Show</span>
      </summary>
      <div className="tech-body prose">{children}</div>
    </details>
  )
}
