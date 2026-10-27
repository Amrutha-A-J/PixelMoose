import Link from 'next/link'
import { FoodBankSeries } from '@/components/FoodBankSeries'
import { getPost, PostShell, postMetadata, TechDetails } from '@/components/PostShell'

const post = getPost('foodbank-mobile-apps')
export const metadata = postMetadata(post)

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
          would open it. For most of them, the answer was their phone.
        </p>

        <h2>Step one: an installable web app</h2>
        <p>
          The booking app started out as a progressive web app (PWA): a website you can add to your home screen so it
          opens like an app. It worked, and it cost nothing extra to run. But installing a website from a browser menu
          is not something most people know to do, and when people look for an app, they look in the app store.
        </p>

        <h2>Step two: Google Play</h2>
        <p>
          Soon after the app launched in September 2025, it went onto Google Play. Clients and volunteers could now find “Moose Jaw Food Bank” in
          the store, install it like any other app, and get straight to booking.
        </p>

        <h2>Step three: Android and iOS from the same code</h2>
        <p>
          In December 2025 I moved both apps onto one shared setup, so the same code that runs the website also ships to
          Android and iOS. With proper store apps on both platforms, the PWA was no longer needed, so we retired it.
        </p>
        <p>This matters more than it sounds for a small organization:</p>
        <ul>
          <li>
            <strong>Every feature reaches everyone at once.</strong> A fix or a new feature in the web app goes out to
            Android and iOS in the same release, with no second app to keep in sync.
          </li>
          <li>
            <strong>One thing to maintain.</strong> There is no separate mobile codebase, and no mobile developer to hire.
          </li>
          <li>
            <strong>It’s the app people already know.</strong> The screens, wording and steps are the same as on the
            website, so staff can help anyone, whatever device they’re on.
          </li>
        </ul>

        <figure className="article-figure">
          <img src="/work/foodbank-android/03.webp" alt="Booking calendar in the mobile app" />
          <figcaption className="muted">Picking a day and time for a visit.</figcaption>
        </figure>

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
            wrappers that load the built React app. They replaced an earlier Bubblewrap Trusted Web Activity, which only
            covered Android.
          </li>
          <li>
            <strong>Same store listing.</strong> The Android app keeps its original application ID so it updates the
            existing Google Play listing instead of starting a new one; iOS has its own bundle ID, restored automatically
            by the sync scripts.
          </li>
          <li>
            <strong>Safe builds.</strong> The mobile build always points at the production API and fails if a localhost
            address slips into the bundle. The native code also replaces any insecure API setting at runtime as a final
            safety net.
          </li>
          <li>
            <strong>Releases.</strong> Android and iOS versions are bumped together, with a changelog grouped by who the
            change affects: clients, staff, volunteers and agencies. Icons and splash screens are generated from one
            source image.
          </li>
        </ul>
      </TechDetails>

      <div className="prose">
        <p>
          If you want your web app in the app stores without building it twice, <Link href="/#contact">get in touch</Link>.
        </p>
        <p className="signoff">— Ami</p>
      </div>

      <FoodBankSeries current={post.slug} />
    </PostShell>
  )
}
