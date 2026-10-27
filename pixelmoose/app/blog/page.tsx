import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter, SiteHeader } from '@/components/SiteHeader'
import { formatDate, posts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog — Pixel Moose Studio',
  description: 'Notes from building software for small businesses, rescues and non-profits in Saskatchewan.',
  alternates: { canonical: '/blog/' },
  openGraph: { url: '/blog/', title: 'Blog — Pixel Moose Studio' },
}

export default function Blog() {
  return (
    <div className="wrap">
      <SiteHeader />
      <main id="main" className="blog">
        <header className="blog-head">
          <p className="mono muted">Blog</p>
          <h1 className="page-title">Notes from the studio.</h1>
          <p className="lede muted">
            Stories about the people we build for, and how the software behind them works.
          </p>
        </header>
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}/`} className="post-card">
                <div className="post-card-image">
                  <img src={post.cover.src} alt={post.cover.alt} loading="lazy" />
                </div>
                <div className="post-card-text">
                  <p className="mono muted">
                    <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
                  </p>
                  <h2>{post.title}</h2>
                  <p className="muted">{post.description}</p>
                  <span className="text-link">Read the story <span aria-hidden="true">→</span></span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  )
}
