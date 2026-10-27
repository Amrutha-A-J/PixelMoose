import Link from 'next/link'
import { foodBankSeries, hasPost } from '@/lib/posts'

// "More from the food bank project": links to each post that exists, "Story coming soon" for the rest.
export function FoodBankSeries({ current }: { current: string }) {
  return (
    <aside className="series" aria-labelledby="series-title">
      <h2 id="series-title" className="series-heading">More from the Moose Jaw Food Bank project</h2>
      <p className="muted series-intro">
        Everything I’ve built for the Moose Jaw &amp; District Food Bank, one story each.
      </p>
      <ul>
        {foodBankSeries
          .filter((item) => item.slug !== current)
          .map((item) => (
            <li key={item.slug}>
              {hasPost(item.slug) ? (
                <Link href={`/blog/${item.slug}/`} className="series-item">
                  <span className="series-title">{item.title}</span>
                  <span className="muted">{item.body}</span>
                  <span className="mono accent">Read the story →</span>
                </Link>
              ) : (
                <div className="series-item">
                  <span className="series-title">{item.title}</span>
                  <span className="muted">{item.body}</span>
                  <span className="mono muted">Story coming soon</span>
                </div>
              )}
            </li>
          ))}
      </ul>
    </aside>
  )
}
