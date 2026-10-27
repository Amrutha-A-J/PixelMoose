import Link from 'next/link'
import { getPost, PostShell, postMetadata } from '@/components/PostShell'

const post = getPost('app-or-website')
export const metadata = postMetadata(post)

const kinds = [
  {
    name: 'A good website',
    what: 'Pages anyone can open in a browser: who you are, what you offer, hours, location, a contact or booking form.',
    when: 'People need to find you, trust you, and get in touch.',
    cost: 'A domain, plus hosting that can be free for a small site.',
  },
  {
    name: 'A web app',
    what: 'A website people sign in to, that remembers things: bookings, orders, records, schedules, staff tools.',
    when: 'The same people come back to do something, or your staff need a system, not just pages.',
    cost: 'More to build, plus hosting for a database. Still opens in any browser, no app store.',
  },
  {
    name: 'A store app',
    what: 'An Android or iOS app installed from Google Play or the App Store.',
    when: 'People use it often, and it needs the phone itself: fingerprint sign-in, notifications, the camera.',
    cost: 'Store fees, review processes, and updates for two platforms on top of everything else.',
  },
]

const questions = [
  { q: 'Do people mostly need to find you and contact you?', a: 'A website is enough.' },
  { q: 'Do the same people come back to book, order or check something?', a: 'A web app, which can live on your website.' },
  { q: 'Do your staff run things on paper, spreadsheets or voicemail?', a: 'A web app for staff, even if customers only see a website.' },
  { q: 'Will people open it every week, and want it on their home screen?', a: 'A store app might be worth it.' },
  { q: 'Do you need fingerprint sign-in, notifications or the camera?', a: 'A store app.' },
  { q: 'Do some of the people you serve not have a smartphone?', a: 'Don’t forget a phone line.' },
]

export default function Post() {
  return (
    <PostShell post={post}>
      <div className="prose">
        <p>
          “We need an app” is one of the first things I hear from small businesses and non-profits. Sometimes that’s
          true. More often, what they need is a good website, or a website with a few smart features. The difference
          matters, because an app costs more to build, more to publish and more to keep running.
        </p>
        <p>Here is how I help people work out which one they actually need.</p>

        <h2>The three things people mean by “an app”</h2>
        <div className="option-grid">
          {kinds.map((k) => (
            <div className="option" key={k.name}>
              <h3>{k.name}</h3>
              <p>{k.what}</p>
              <p>
                <span className="mono accent">Right when</span> {k.when}
              </p>
              <p>
                <span className="mono muted">Costs</span> {k.cost}
              </p>
            </div>
          ))}
        </div>
        <p>
          The middle one is the one most people don’t know exists. A web app gives you logins, bookings and records
          without going anywhere near an app store, and it works on every phone and computer the day it launches.
        </p>

        <h2>Start with what your customers need to do</h2>
        <p>
          Forget the technology for a minute. Write down the three things people most often call or message you about.
          That list usually answers the question:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">If the answer is yes…</th>
                <th scope="col">You probably need</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((row) => (
                <tr key={row.q}>
                  <td>{row.q}</td>
                  <td>{row.a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Two real examples</h2>
        <h3>A cat rescue that needed a website, not an app</h3>
        <p>
          <Link href="/blog/building-bnrescues/">Brittany Niemi Rescues</Link> wanted adopters and fosters to find her
          cats more easily. People visit, browse cats, read their stories and apply. Most visitors come once or twice,
          when they’re ready to adopt. Nobody needs that on their home screen.
        </p>
        <p>
          So she got a fast website with a private admin behind it for managing cats and applications. It works on every
          phone, it’s on Google, and it costs her nothing but the domain. An app would have added cost and done nothing
          extra for her adopters.
        </p>

        <h3>A food bank that needed all of it, eventually</h3>
        <p>
          The <Link href="/blog/foodbank-booking-app/">Moose Jaw Food Bank</Link> was different. Clients book visits
          every month, volunteers book shifts every week, and staff run the whole operation from it every day. That
          started as a web app, and only became store apps once people were using it often enough to want it on their
          phone, and once fingerprint and face sign-in were worth having.
        </p>
        <p>
          And because some clients don’t have a smartphone at all, the most important “app” for them turned out to be a{' '}
          <Link href="/blog/foodbank-phone-text-booking/">phone line they can call or text</Link>.
        </p>

        <h2>What a store app really costs</h2>
        <p>The build is only part of it. Before you commit, know about:</p>
        <ul>
          <li>
            <strong>Store fees.</strong> Google Play is a one-time $25 USD. Apple is $99 USD every year, though
            non-profits can apply to have it waived.
          </li>
          <li>
            <strong>Equipment.</strong> Building for iPhone requires a Mac.
          </li>
          <li>
            <strong>Getting approved.</strong> New Google Play accounts need a closed test with real testers for at least
            14 days; for the food bank it took 28. Apple has reviewers test every app by hand, and can send it back.
          </li>
          <li>
            <strong>Updates, forever.</strong> Phones update their systems every year, and apps have to keep up.
          </li>
          <li>
            <strong>Getting people to install it.</strong> A website is one tap from a link. An app asks people to go to
            a store, download and sign in before they get anything.
          </li>
        </ul>
        <p>
          The full story of getting the food bank’s apps into both stores is{' '}
          <Link href="/blog/foodbank-mobile-apps/">here</Link>.
        </p>

        <h2>Website first, app when it’s earned</h2>
        <p>My advice for almost every small business and non-profit:</p>
        <ol>
          <li>
            <strong>Start with a good website</strong> that is fast, easy to read on a phone, and easy to find on Google.
          </li>
          <li>
            <strong>Add web app features when you need them</strong>, like online booking, sign-ins or staff tools.
            They live on the same website.
          </li>
          <li>
            <strong>Go to the app stores only once people are using it often</strong>, or you need something only a
            phone app can do.
          </li>
        </ol>
        <p>
          Built this way, nothing is wasted. The food bank’s Android and iOS apps are built from the same code as their
          web app, so moving into the stores didn’t mean starting again.
        </p>

        <h2>Not sure which you need?</h2>
        <p>
          That’s exactly the conversation I like to have before anyone writes any code.{' '}
          <Link href="/#contact">Get in touch</Link> and tell me what your customers call you about most. We’ll work out
          the simplest thing that solves it, and if that’s just a good website, I’ll tell you.
        </p>
        <p className="signoff">— Ami</p>
      </div>
    </PostShell>
  )
}
