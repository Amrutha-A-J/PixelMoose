import type { Metadata } from 'next'
import Link from 'next/link'
import { FoodBankSeries } from '@/components/FoodBankSeries'
import { SiteFooter, SiteHeader } from '@/components/SiteHeader'
import { site } from '@/lib/content'
import { formatDate, posts } from '@/lib/posts'

const post = posts.find((p) => p.slug === 'rebuilding-mjfoodbank-org')!
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
  { part: 'Website', tool: 'Next.js 16 (App Router), pages rendered ahead of time and refreshed hourly' },
  { part: 'Look and feel', tool: 'Mantine 9, in a theme package shared with the booking app; Golos Text font' },
  { part: 'Booking app + API', tool: 'React and Vite; Hono API with Zod schemas, Kysely on PostgreSQL' },
  { part: 'Code layout', tool: 'One pnpm + Turborepo monorepo for the website, app, API and shared code' },
  { part: 'Hosting', tool: 'Docker images on AWS Lightsail behind Caddy (HTTPS), deployed by GitHub Actions' },
  { part: 'Testing', tool: 'Vitest, Playwright in Chromium and WebKit on desktop and phone, axe accessibility checks' },
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
            <img src="/work/mjfoodbank-site/03.webp" alt="mjfoodbank.org on two phones, in light and dark mode" />
            <figcaption className="muted">The new mjfoodbank.org on a phone, in light and dark mode.</figcaption>
          </figure>

          <div className="prose">
            <p>
              The Moose Jaw &amp; District Food Bank has been feeding neighbours since 1984. By the time I started on
              their public website, I had already built the app their clients use to book visits and their staff use to
              run the place, along with the Android and iOS app and a phone and text line for people without internet.
              The website was the last piece, and the one most people see first.
            </p>

            <h2>What wasn’t working</h2>
            <p>The old mjfoodbank.org was a WordPress site, and it was showing its limits:</p>
            <ul>
              <li>
                <strong>It didn’t adapt well to different screens.</strong> Most people looking for food help find the
                food bank on their phone, and that is exactly where the old site struggled.
              </li>
              <li>
                <strong>It was hard to read.</strong> The fonts were heavy and chunky, which made longer text tiring,
                especially for older visitors or anyone reading in a second language.
              </li>
              <li>
                <strong>It was more than the food bank needed.</strong> The site only needed a handful of
                customizations. Carrying a full WordPress install with a theme, plugins, plugin updates and the costs
                that come with them didn’t make sense for that.
              </li>
            </ul>

            <h2>Why custom instead of another template</h2>
            <p>
              The deciding reason was the app. The food bank already had its own system where people log in to book
              appointments and staff manage visits, volunteers, deliveries and donations. A custom website could be
              part of that system instead of sitting next to it:
            </p>
            <ul>
              <li>
                <strong>“Book a visit” goes straight into the booking app</strong>, and volunteers can log in from the
                Volunteer page.
              </li>
              <li>
                <strong>Staff update the website from the app they already use.</strong> For example, the homepage
                picture changes with the seasons, and staff can preview it or swap in their own.
              </li>
              <li>
                <strong>Forms feed the same system.</strong> The delivery application suggests real Saskatchewan
                addresses as people type, so fewer mistakes reach staff.
              </li>
              <li>
                <strong>The website and app look and feel like one place</strong>, because they share the same design.
              </li>
            </ul>
            <p>
              It also costs nothing extra to run. The booking app already lives on AWS Lightsail, which charges a fixed
              monthly price for the server no matter how much runs on it. The new website sits on that same server, next
              to the app.
            </p>
            <p className="callout">
              Hosting the new website costs <strong>$0 extra</strong>: no new server, no theme, and no plugin licences.
            </p>

            <figure className="article-figure">
              <img src="/work/mjfoodbank-site/04.webp" alt="The Get food page on mjfoodbank.org" />
              <figcaption className="muted">Get food: book a visit, what to expect on a first visit, and what to bring.</figcaption>
            </figure>

            <h2>What the new site does</h2>
            <ul>
              <li>
                <strong>Works on any screen</strong>, from a small phone to a wide desktop, in light or dark mode.
              </li>
              <li>
                <strong>Easy to read</strong>, with a clean, open font (Golos Text) and plenty of space.
              </li>
              <li>
                <strong>Speaks many languages.</strong> A language picker translates every page, including
                right-to-left languages like Arabic, and English readers never load the translator at all.
              </li>
              <li>
                <strong>Get food, volunteer and give</strong> pages that each lead to one clear next step.
              </li>
              <li>
                <strong>A community resources finder</strong> that lists free and low-cost help near Moose Jaw (meals,
                housing, health, child care and more) from 211 Saskatchewan, plus urgent contacts.
              </li>
              <li>
                <strong>Help finding a food bank</strong> for people outside Moose Jaw, plus pages for eligibility
                reviews, deliveries, news, FAQs, governance and accessibility.
              </li>
              <li>
                <strong>Watercolour artwork of the real food bank</strong>, drawn from photos of the building and
                community events like the Better Together Food Drive at Hillcrest Church. The homepage picture
                changes through the year.
              </li>
            </ul>

            <h2>How I built it</h2>
            <ol>
              <li>
                <strong>Started from what people actually do.</strong> Most visitors come to get food, volunteer or
                give, so those became the main paths, each one simple page with one clear next step.
              </li>
              <li>
                <strong>Designed it to match the app.</strong> Same colours, same type, same components, so moving
                from the website into the booking app doesn’t feel like changing places.
              </li>
              <li>
                <strong>Built it page by page.</strong> I started on October 16, 2026 with the homepage, then Ways to
                give, Volunteer and Contact, and kept going from there.
              </li>
              <li>
                <strong>Tested everything, every time.</strong> Every page is checked automatically on desktop and
                phone, in two browser engines, in light and dark mode, including accessibility checks and what happens
                when an image fails to load.
              </li>
              <li>
                <strong>Kept old links working.</strong> Addresses from the WordPress site redirect to their new pages,
                so bookmarks and search results still land in the right place.
              </li>
            </ol>
            <p>
              The new mjfoodbank.org went live on <time dateTime="2026-10-22">October 22, 2026</time>, six days after
              I started.
            </p>
          </div>

          <details className="tech">
            <summary>
              <span>For the technically curious: how it’s built</span>
              <span className="tech-hint mono muted" aria-hidden="true">Show</span>
            </summary>
            <div className="tech-body prose">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Part</th>
                      <th scope="col">What it uses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stack.map((row) => (
                      <tr key={row.part}>
                        <td>{row.part}</td>
                        <td>{row.tool}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul>
                <li>
                  <strong>Static pages that still change.</strong> Pages are rendered ahead of time and refreshed every
                  hour. When staff change website content in the app, the API calls the site’s revalidate endpoint so
                  the change shows right away.
                </li>
                <li>
                  <strong>One codebase, shared pieces.</strong> The website, booking app and API live in one monorepo.
                  The UI theme and components come from a shared package, and Zod schemas in a shared package keep the
                  website, app and API agreeing on the shape of every piece of data.
                </li>
                <li>
                  <strong>Translation without slowing anyone down.</strong> Google’s website translator only loads after
                  someone picks a language other than English, so English pages stay fully static and make no
                  third-party requests. The page’s <code>lang</code> and text direction follow the choice.
                </li>
                <li>
                  <strong>Community resources</strong> come from the 211 Saskatchewan API through the food bank’s own
                  API, filtered to Moose Jaw within 25 km, so no keys reach the browser.
                </li>
                <li>
                  <strong>Images</strong> are served as responsive AVIF and WebP with JPEG fallback, with reserved sizes
                  so the page doesn’t jump while they load.
                </li>
                <li>
                  <strong>Deploys at no extra cost.</strong> GitHub Actions builds Docker images, publishes them to
                  GitHub’s container registry, and runs them on the existing AWS Lightsail instance next to the API and
                  booking app, with Caddy handling HTTPS. Lightsail is billed at a fixed monthly price per instance, so
                  adding the website container added nothing to the bill.
                </li>
              </ul>
            </div>
          </details>

          <div className="prose">
            <h2>What changed for the food bank</h2>
            <p>
              The food bank now has a website that is easy to read on any phone, speaks the languages of the people it
              serves, and leads straight into the system staff already use every day. There are no plugins to update,
              no theme to fight, and nothing that breaks when someone opens it on a small screen.
            </p>
            <p>
              Visit it at{' '}
              <a href="https://mjfoodbank.org" target="_blank" rel="noopener">
                mjfoodbank.org
              </a>
              . If you are in Moose Jaw and can spare a few hours, food or money, the Volunteer and Ways to give pages
              will show you how.
            </p>
            <p>
              If your organization is on a WordPress site that feels like more than you need, or doesn’t work well on
              phones, <Link href="/#contact">get in touch</Link>. Often a small, custom site is simpler and cheaper to
              look after.
            </p>
            <p className="signoff">— Ami</p>
          </div>

          <FoodBankSeries current={post.slug} />
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
