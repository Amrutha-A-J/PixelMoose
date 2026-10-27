import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter, SiteHeader } from '@/components/SiteHeader'
import { site } from '@/lib/content'
import { formatDate, posts } from '@/lib/posts'

const post = posts.find((p) => p.slug === 'building-bnrescues')!
const url = `/blog/${post.slug}/`

export const metadata: Metadata = {
  title: `${post.title} — Pixel Moose Studio`,
  description: post.description,
  alternates: { canonical: url },
  openGraph: {
    type: 'article',
    url,
    title: post.title,
    description: post.description,
    publishedTime: post.date,
    authors: [site.founder],
    images: [{ url: post.cover.src, width: 1440, height: 900, alt: post.cover.alt }],
  },
  twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [post.cover.src] },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  datePublished: post.date,
  image: `${site.url}${post.cover.src}`,
  url: `${site.url}${url}`,
  author: { '@type': 'Person', name: site.founder },
  publisher: { '@type': 'Organization', name: site.name, url: site.url },
}

const stack = [
  { part: 'Website + backend', tool: 'Next.js on Cloudflare Workers', free: '100,000 requests a day', uses: 'A few hundred a day' },
  { part: 'Database', tool: 'Cloudflare D1', free: '5 GB', uses: 'A few MB' },
  { part: 'Cat photos', tool: 'Cloudflare R2', free: '10 GB, no download fees', uses: 'About 300 KB a photo' },
  { part: 'Page cache', tool: 'Cloudflare KV', free: '1,000 writes a day', uses: 'Refreshes hourly to stay well under' },
  { part: 'Email', tool: 'Brevo', free: '300 emails a day', uses: 'A handful' },
]

export default function Post() {
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
            </p>
            <h1 className="page-title">{post.title}</h1>
            <p className="lede muted">{post.description}</p>
          </header>

          <figure className="article-figure">
            <img src="/work/bnrescues/03.webp" alt="bnrescues.com on two phones, in light and dark mode" />
            <figcaption className="muted">bnrescues.com went live on October 27, 2026.</figcaption>
          </figure>

          <div className="prose">
            <p>
              Brittany Niemi runs a cat rescue near Regina with more than thirty cats in her care. Food, litter and vet
              bills are paid out of her own pocket, along with donations from people who believe in what she does. She
              deserves a lot more attention than she gets, so
              this first post on our blog is about her.
            </p>

            <h2>How I found her</h2>
            <p>
              I came across Brittany Niemi Rescues while I was looking to foster cats myself. Her available cats were
              listed on Facebook, scrolling past between everything else in people’s feeds. If you wanted to adopt or
              foster, you had to dig through posts and send messages to find out who was still looking for a home.
            </p>
            <p>
              My husband and I drove out to meet her and her kittens. We were surprised to find she rescues pigeons
              too. She takes in cats and kittens of every age and condition: bottle babies, seniors, and the ones who need
              extra care. She is completely overrun, and she still never says no to a cat in winter, because on the
              prairies in winter, no means death.
            </p>

            <h2>Why I had to help</h2>
            <p>
              I have been in her position. Back home in India, my husband and I took in cats, had them fixed, and either
              adopted them out or released them, in a country where a lot of people see cats as pests rather than pets.
              I know how much of yourself that takes, and how little time it leaves for anything else, like building a
              website.
            </p>
            <p>
              Brittany had already bought her own domain, bnrescues.com. What she needed was a site that made it easy
              for adopters and fosters to find the right cat and reach her, without adding a single new bill.
            </p>

            <h2>What the site does</h2>
            <p>For adopters and fosters:</p>
            <ul>
              <li>
                <strong>Every adoptable cat in one place</strong>, filterable by age group (kittens to seniors and special
                needs), sex and status, with search and sorting.
              </li>
              <li>
                <strong>A page for each cat</strong> with a photo gallery, their story, personality tags, and whether
                they are good with kids and other cats.
              </li>
              <li>
                <strong>Bonded pairs</strong> are marked, so cats who have to go home together do, and one application
                covers both.
              </li>
              <li>
                <strong>Adoption and foster applications</strong> online. Adopters can apply for several cats at once;
                fosters can pick a cat or say they are open to any cat that needs them.
              </li>
              <li>Light and dark mode, and it works well on a phone, which is where most people will find it.</li>
            </ul>
            <p>And a private admin for the rescue, so Brittany never has to ask me to update anything:</p>
            <ul>
              <li>Add and edit cats and upload their photos.</li>
              <li>Review adoption and foster applications, and choose which inbox they go to.</li>
              <li>Schedule meet &amp; greets, with calendar invites that open in Outlook.</li>
              <li>Record adoptions, and keep a roster of fosters with every cat they have cared for.</li>
              <li>Edit the home page headline and intro herself.</li>
            </ul>

            <figure className="article-figure">
              <img src="/work/bnrescues/05.webp" alt="A cat profile page on bnrescues.com with photos and personality tags" />
              <figcaption className="muted">Tony’s page, with his photos, personality and a note that he goes home with Rony.</figcaption>
            </figure>
            <p>
              The two kittens listed on the site right now, Tony and Rony, are my own foster kittens from Brittany. So
              when I tested the adoption pages, I was writing about two little troublemakers who were wrestling on my
              couch at the time, and I wanted their pages to do them justice.
            </p>

            <h2>Built to be fast</h2>
            <p>
              Most adopters will open the site from a Facebook or Instagram link on their phone, maybe on patchy mobile
              data, and a slow page is a page people close. I built it with Next.js, a modern way of building websites,
              so that:
            </p>
            <ul>
              <li>
                <strong>Pages load almost instantly.</strong> They are prepared ahead of time instead of being built
                from scratch every time someone visits.
              </li>
              <li>
                <strong>They stay up to date anyway.</strong> When Brittany edits a cat or one gets adopted, the site
                updates right away, with nothing extra for her to do.
              </li>
              <li>
                <strong>It works well on any phone.</strong> Visitors download very little, so it is quick even on a weak
                signal.
              </li>
              <li>
                <strong>People can find it on Google.</strong> Every page is set up so a search for cat adoption near
                Regina can lead to her, and links shared on social media show a proper preview.
              </li>
              <li>
                <strong>She can run it herself.</strong> Adding cats, uploading photos and handling applications all
                happen in her own admin, so she never has to wait on me.
              </li>
            </ul>

            <h2>The hardest part: where it lives</h2>
            <p>
              Building the site was the fun part. The real challenge was finding a home for it. A site like this is more
              than pages: it needs somewhere to keep the cats and applications, somewhere for photos to go, and a way to
              send email. Most hosting for that comes with a monthly bill, and every dollar of Brittany’s money or her
              donors’ that goes to hosting is a dollar that cannot go to food or a vet visit.
            </p>
            <p>
              So I set everything up on free plans from Cloudflare and Brevo, two well-established services:
            </p>
            <ul>
              <li>the website and the rescue’s private admin</li>
              <li>the records of every cat, application, foster and adoption</li>
              <li>every cat photo</li>
              <li>emails, sent from her own bnrescues.com address</li>
            </ul>
            <p>
              A small rescue uses only a tiny fraction of what those free plans allow, so there is plenty of room to grow
              before anything would ever cost money.
            </p>

            <p className="callout">
              The only thing Brittany pays for is her domain. Everything else costs <strong>$0 a month</strong>.
            </p>

            <details className="tech">
              <summary>
                <span>For the technically curious: how it’s built</span>
                <span className="tech-hint mono muted" aria-hidden="true">Show</span>
              </summary>
              <div className="tech-body">
                <p>
                  The site is a single Next.js app (App Router, React Server Components) that serves both the public
                  pages and the rescue’s admin. It runs on <strong>Cloudflare Workers</strong> through OpenNext, and the
                  whole Worker fits in about 2.3 MiB, under the free plan’s 3 MiB limit.
                </p>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Part</th>
                        <th scope="col">Runs on</th>
                        <th scope="col">Free allowance</th>
                        <th scope="col">What the rescue uses</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stack.map((row) => (
                        <tr key={row.part}>
                          <td>{row.part}</td>
                          <td>{row.tool}</td>
                          <td>{row.free}</td>
                          <td>{row.uses}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul>
                  <li>
                    <strong>Supabase to D1.</strong> The first version used Supabase (Postgres, Auth and Storage). On
                    launch day I moved it to Cloudflare so every piece sits on one free plan: D1 (SQLite) with the same
                    tables, R2 for photos, and KV for the page cache.
                  </li>
                  <li>
                    <strong>Fast pages that stay fresh.</strong> Public pages use incremental static regeneration: cached
                    in KV, refreshed hourly, and invalidated immediately through a D1-backed tag cache when the rescue edits
                    a cat. Refreshing hourly keeps cache writes well under KV’s 1,000 free writes a day.
                  </li>
                  <li>
                    <strong>Logins without a paid auth service.</strong> Admin sign-in uses cookie sessions with PBKDF2
                    password hashes, and session and password-reset tokens are stored hashed.
                  </li>
                  <li>
                    <strong>Photos.</strong> The admin uploads straight to R2, and photos are served from the site’s own
                    domain with long-term caching, so there are no download fees.
                  </li>
                  <li>
                    <strong>Email.</strong> Brevo sends from a verified bnrescues.com sender with the domain authenticated
                    in Cloudflare DNS: application notifications and password resets.
                  </li>
                  <li>
                    <strong>Deploys.</strong> A deploy script builds against an empty local database, so no sample data is
                    ever baked into the pages, then marks them stale so the first visit renders from the live database.
                  </li>
                </ul>
                <p>
                  If the site ever outgrows the free plan, Cloudflare’s paid Workers plan is $5 a month. For a rescue
                  this size, that day is a long way off.
                </p>
              </div>
            </details>

            <h2>Launch day</h2>
            <p>
              I started building on October 14, 2026, and bnrescues.com went live on October 27, thirteen days and thirty
              commits later. Launch day itself was busy: moving everything onto the free hosting, connecting her
              domain and email, adding dark mode and bonded pairs, and fixing the last few things you only find on a live site.
            </p>
            <p>
              I am so proud, as a developer, to be able to make a difference with what I know how to do. I cannot take in
              thirty cats. But I can make sure the people who want to adopt or foster one of Brittany’s cats can find them
              in a few taps, and that the rescue never pays a cent for it.
            </p>

            <h2>How you can help</h2>
            <ul>
              <li>
                Meet the cats at{' '}
                <a href="https://bnrescues.com" target="_blank" rel="noopener">
                  bnrescues.com
                </a>
                , and adopt or foster if you are near Regina.
              </li>
              <li>
                Follow{' '}
                <a href="https://www.facebook.com/p/Brittany-Niemi-Rescues-61560757773145/" target="_blank" rel="noopener">
                  Brittany Niemi Rescues on Facebook
                </a>{' '}
                and share her posts.
              </li>
              <li>
                Donate if you can. The rescue runs on Brittany’s own money and donations, and every bit goes to food,
                litter and vet care.
              </li>
              <li>Share this story with someone who loves cats.</li>
            </ul>
            <p>
              If you run a rescue, a non-profit or a small business and the cost of software has been holding you back,{' '}
              <Link href="/#contact">get in touch</Link>. Budget is something we can work around together.
            </p>
            <p className="signoff">— Ami</p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
