import Link from 'next/link'
import { FoodBankSeries } from '@/components/FoodBankSeries'
import { getPost, PostShell, postMetadata, TechDetails } from '@/components/PostShell'

const post = getPost('foodbank-mobile-apps')
export const metadata = postMetadata(post)

const options = [
  {
    name: 'Installable web app (PWA)',
    good: 'Free, and the same code as the website.',
    bad: 'Not in the app stores, and installing one from a browser menu is something most people don’t know to do.',
  },
  {
    name: 'Trusted Web Activity (Bubblewrap)',
    good: 'The quickest way onto Google Play, wrapping the website as an Android app.',
    bad: 'Android only, and little more than the website in a frame, with no real access to the phone’s features.',
  },
  {
    name: 'Rewrite as a native app',
    good: 'Full access to everything the phone can do.',
    bad: 'A second, separate app to build and maintain for every feature, on two platforms.',
  },
  {
    name: 'Capacitor',
    good: 'Real Android and iOS apps built from the same code as the web app, with access to native features like fingerprint and face sign-in, secure storage and push notifications.',
    bad: 'Some native setup and platform quirks to learn, especially on iOS.',
  },
]

export default function Post() {
  return (
    <PostShell post={post}>
      <figure className="article-figure">
        <img src="/work/foodbank-android/01.webp" alt="The Moose Jaw Food Bank app on a phone" />
        <figcaption className="muted">The food bank app, on Android and iOS.</figcaption>
      </figure>

      <div className="prose">
        <p>
          Once clients could book their own visits in the{' '}
          <Link href="/blog/foodbank-booking-app/">food bank’s booking app</Link>, the next question was where they
          would open it. For most of them, the answer was their phone. And when people look for an app, they look in the
          app store.
        </p>

        <h2>Android first, because of the cost</h2>
        <p>
          The app started as an installable web app, which cost nothing. To get into an actual store, Android was the
          obvious first step: a Google Play developer account is a one-time fee of $25 USD, and that’s it. For a food
          bank counting every dollar, that settled it.
        </p>

        <h2>Google’s 28-day wait</h2>
        <p>
          New developer accounts can’t just publish on Google Play. Google requires a closed test first: at least 10
          testers using the app actively for 14 days in a row. I managed to find our testers, but their activity wasn’t
          high enough, so Google extended the testing period.
        </p>
        <p>
          After 28 days, they approved it, and in December 2025 the Moose Jaw Food Bank app became available on the
          Google Play Store.
        </p>

        <figure className="article-figure">
          <img src="/work/foodbank-android/03.webp" alt="Booking a volunteer shift in the mobile app" />
          <figcaption className="muted">Volunteers pick a day and book a shift right from their phone.</figcaption>
        </figure>

        <h2>Choosing how to build it: why Capacitor</h2>
        <p>
          To reach iPhones too, I had to rethink how the apps were built. These were the options I weighed:
        </p>
        <div className="option-grid">
          {options.map((o) => (
            <div className="option" key={o.name}>
              <h3>{o.name}</h3>
              <p>
                <span className="mono accent">Good</span> {o.good}
              </p>
              <p>
                <span className="mono muted">Catch</span> {o.bad}
              </p>
            </div>
          ))}
        </div>
        <p>
          The first Android version was a Trusted Web Activity, because it was the fastest way onto Google Play. But it
          couldn’t reach iOS, and it couldn’t use the phone’s own features. In December 2025 I moved both platforms to
          Capacitor, and once real store apps existed on Android and iOS, we retired the installable web app.
        </p>
        <p>For a small organization, that choice matters more than it sounds:</p>
        <ul>
          <li>
            <strong>Every feature reaches everyone at once.</strong> A fix or a new feature in the web app goes out to
            Android and iOS in the same release.
          </li>
          <li>
            <strong>One thing to maintain</strong>, with no separate mobile codebase and no mobile developer to hire.
          </li>
          <li>
            <strong>Real phone features</strong>, like{' '}
            <Link href="/blog/foodbank-booking-app/">fingerprint and face sign-in</Link> so nobody has to remember a
            password.
          </li>
          <li>
            <strong>It’s the app people already know.</strong> The screens and steps match the website, so staff can help
            anyone, whatever device they’re on.
          </li>
        </ul>

        <h2>Apple: the expensive one</h2>
        <p>Apple was a much bigger challenge, mostly because of cost:</p>
        <ul>
          <li>
            Keeping apps in the App Store costs <strong>$99 USD every year</strong>, not once.
          </li>
          <li>
            Building an iOS app requires <strong>a Mac</strong>, and Macs are ridiculously expensive for a small
            non-profit.
          </li>
        </ul>
        <p>
          This is where our executive director, Jason Moore, used his super powers. He found the budget for both, and I
          got to work.
        </p>
        <p>
          Apple doesn’t make you run a testing program like Google does. Instead, their own reviewers manually test every
          app before it is published. That meant we had to add many things to meet their criteria before the app could
          pass. In March 2026, the iOS app went live on the App Store.
        </p>
        <p>
          Later, I applied for Apple’s non-profit fee waiver, and the food bank was approved. The $99 yearly fee is now
          waived.
        </p>

        <h2>What people do with it</h2>
        <ul>
          <li>Clients book, reschedule and cancel pantry visits, and see their upcoming appointments and history.</li>
          <li>Volunteers book shifts and see what they have coming up.</li>
          <li>Staff can check the schedule and record work on the go.</li>
        </ul>
        <p>
          For people who don’t have a smartphone at all, there is also a{' '}
          <Link href="/blog/foodbank-phone-text-booking/">phone and text booking line</Link>.
        </p>
      </div>

      <TechDetails>
        <ul>
          <li>
            <strong>Capacitor shells.</strong> The <code>android/</code> and <code>ios/</code> projects are Capacitor
            wrappers that load the built React app. They replaced the earlier Bubblewrap Trusted Web Activity in December
            2025.
          </li>
          <li>
            <strong>Same store listing.</strong> The Android app kept its original application ID, so it updated the
            existing Google Play listing instead of starting a new one. iOS has its own bundle ID, restored automatically
            by the sync scripts.
          </li>
          <li>
            <strong>Native features.</strong> Credentials sit in the device’s secure storage behind the biometric
            prompt, push notifications go through Firebase, and the API can require a minimum app version so old installs
            are asked to update.
          </li>
          <li>
            <strong>iOS quirks.</strong> Getting the iOS build right meant fixes to the web view’s touch and keyboard
            input, and to how sign-in and CSRF protection work for requests coming from a native app.
          </li>
          <li>
            <strong>Safe builds.</strong> The mobile build always points at the production API and fails if a localhost
            address slips into the bundle; the native code also replaces any insecure API setting at runtime.
          </li>
          <li>
            <strong>Releases.</strong> Android and iOS versions are bumped together, with a changelog grouped by who the
            change affects: clients, staff, volunteers and agencies.
          </li>
        </ul>
      </TechDetails>

      <div className="prose">
        <p>
          If you want your web app in the app stores without building it twice, <Link href="/#contact">get in touch</Link>.
          And if you’re a non-profit, ask about the fee waivers. They exist.
        </p>
        <p className="signoff">— Ami</p>
      </div>

      <FoodBankSeries current={post.slug} />
    </PostShell>
  )
}
