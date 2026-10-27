import Link from 'next/link'
import { FoodBankSeries } from '@/components/FoodBankSeries'
import { getPost, PostShell, postMetadata, TechDetails } from '@/components/PostShell'

const post = getPost('foodbank-booking-app')
export const metadata = postMetadata(post)

const timeline = [
  { when: 'First', what: 'An Excel sheet: I logged calls, staff logged visits, and it added up adults, children and weights by itself.' },
  { when: 'August 2025', what: 'Building the first client booking portal, showing staff who had booked, and the pantry schedule around it, along with volunteer shift booking, warehouse records and deliveries.' },
  { when: 'September 2, 2025', what: 'The app goes live.' },
  { when: 'September 2025', what: 'Staff timesheets and Sunshine bag tracking.' },
  { when: 'December 2025', what: 'The Android app on Google Play, and phone booking for people without internet, with text booking added in January 2026.' },
  { when: 'March 2026', what: 'The iOS app on the App Store, and eligibility reviews.' },
]

export default function Post() {
  return (
    <PostShell post={post}>
      <figure className="article-figure">
        <img src="/work/foodbank-web/02.webp" alt="The client booking screen on a phone" />
        <figcaption className="muted">Clients book their own visits now, on whatever device they have.</figcaption>
      </figure>

      <div className="prose">
        <p>
          The booking app was the first thing I built for the Moose Jaw &amp; District Food Bank, and everything else
          grew out of it. It started because of the job I was hired to do.
        </p>

        <h2>Phone tag, all day</h2>
        <p>
          Every part of the food bank’s process was manual. People called to make an appointment and left a voicemail.
          Staff called every one of them back to book a time. If someone didn’t pick up, they had to be called again,
          and again. Every reschedule or cancellation meant more calls. It was phone tag, all day, every day.
        </p>
        <p>
          That was what I was hired for, and I quickly came to hate the system. Not the people, the system. It took up
          hours that should have gone to the people walking through the door.
        </p>
        <p>
          I also saw the monthly reporting numbers being written down on paper, and my sweet coworkers sitting down to
          count large numbers by hand: visits, adults, children, pounds of food. They stressed about getting every one of
          them right.
        </p>

        <h2>It started with a spreadsheet</h2>
        <p>
          The first fix wasn’t an app at all. I made an Excel sheet where I could record calls, and staff could record
          visit details, and it added up the counts of adults, children, weights and everything else automatically. No
          more counting by hand at the end of the month.
        </p>
        <p>
          That small win showed what was possible. The next step was to stop the phone tag itself, by letting people
          book their own visits.
        </p>

        <h2>From a booking portal to the whole food bank</h2>
        <p>
          I built the first version of a client booking portal. Clients could pick a time themselves, and staff could see
          who had booked. The pantry schedule took shape around it. Then, one by one, the other paper and phone
          processes moved in:
        </p>
        <ul className="timeline">
          {timeline.map((t) => (
            <li key={t.when + t.what}>
              <span className="mono accent">{t.when}</span>
              <span>{t.what}</span>
            </li>
          ))}
        </ul>

        <figure className="article-figure">
          <img src="/work/foodbank-web/03.webp" alt="Visit trends dashboard" />
          <figcaption className="muted">The monthly numbers my coworkers used to count by hand, now added up as visits happen.</figcaption>
        </figure>

        <h2>What it does today</h2>
        <p>For clients:</p>
        <ul>
          <li>Book, reschedule or cancel a pantry visit online, by phone or by text, any time of day.</li>
          <li>See upcoming appointments and visit history.</li>
          <li>Use it in their own language.</li>
        </ul>
        <p>For volunteers:</p>
        <ul>
          <li>Book and manage their own shifts, and see their shift history.</li>
        </ul>
        <p>For staff, all in one place:</p>
        <ul>
          <li>The pantry schedule, visits, and the counts and weights for every visit, added up automatically.</li>
          <li>Eligibility reviews.</li>
          <li>Sunshine bag tracking.</li>
          <li>Volunteer scheduling.</li>
          <li>Warehouse food records and donations.</li>
          <li>Food deliveries.</li>
          <li>Staff timesheets and leave requests.</li>
          <li>Reports and trends, with tables that export straight to Excel.</li>
        </ul>

        <figure className="article-figure">
          <img src="/work/foodbank-web/04.webp" alt="Warehouse operations dashboard" />
          <figcaption className="muted">The warehouse side: inventory, pickups and distribution.</figcaption>
        </figure>

        <h2>The hard parts</h2>
        <h3>Building for people who aren’t technical at all</h3>
        <p>
          Most of the people using this app are not “tech people”. Some clients had never booked anything online. Some
          volunteers and staff were more comfortable with paper than with screens. If the app confused anyone, they would
          go straight back to calling, and the phone tag would start again. So a lot of the work went into small things
          that stop people getting stuck:
        </p>
        <ul>
          <li>
            <strong>Sign in with whatever you remember.</strong> Clients can use their client ID or their email address.
          </li>
          <li>
            <strong>Helpful wrong-password messages.</strong> Instead of just “incorrect”, the app reminds people that
            passwords are case-sensitive, to check Caps Lock and stray spaces, and links straight to a reset. After a few
            failed tries, it suggests resetting rather than guessing.
          </li>
          <li>
            <strong>Resets that don’t backfire.</strong> Reset emails remind people to check their spam folder, and their
            old password keeps working until the new one is set, so nobody locks themselves out halfway.
          </li>
          <li>
            <strong>No lost forms.</strong> Pop-up windows only close with their X button, so a stray tap outside doesn’t
            throw away something half filled in.
          </li>
          <li>
            <strong>Help written for each person</strong>, with separate guides for clients, volunteers, staff and
            agencies, and the app available in other languages.
          </li>
          <li>
            <strong>Getting online without starting over.</strong> Existing clients can ask for online access with their
            client ID, and staff approve it and email them a secure setup link.
          </li>
          <li>
            <strong>And a way out of the app entirely:</strong> anyone who can’t or won’t use it can{' '}
            <Link href="/blog/foodbank-phone-text-booking/">book by phone or text</Link>.
          </li>
        </ul>

        <h3>Nobody should have to remember a password</h3>
        <p>
          A forgotten password is one of the easiest ways to lose someone who is new to apps, and every lost user meant
          another phone call. So from the first month after launch, I worked on taking passwords out of the picture:
        </p>
        <ul>
          <li>
            <strong>Fingerprint and face sign-in</strong> in the{' '}
            <Link href="/blog/foodbank-mobile-apps/">Android and iOS apps</Link>. Sign in once with a password, and after
            that a touch or a glance opens the app, with the phone’s PIN as a backup.
          </li>
          <li>
            <strong>Passkeys in the browser</strong>, so people on a computer or phone browser can sign in with their
            device’s fingerprint, face or screen lock instead of typing a password. They work for clients, volunteers,
            staff and agencies.
          </li>
          <li>
            <strong>Safe on shared phones.</strong> Fingerprint sign-in is tied to one account per device. If someone else
            in the household signs in on the same phone, the app asks before switching, and never swaps accounts
            silently.
          </li>
        </ul>

        <h2>What it costs to run</h2>
        <p>
          A food bank can’t take on a hosting bill that jumps around from month to month. So the app runs on AWS
          Lightsail, which charges a fixed monthly price:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">What</th>
                <th scope="col">Per month</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Managed PostgreSQL database (40 GB)</td>
                <td>$15</td>
              </tr>
              <tr>
                <td>Server that runs the app (2 GB memory)</td>
                <td>$12</td>
              </tr>
              <tr>
                <td>Storage bucket for uploaded files (250 GB)</td>
                <td>$5</td>
              </tr>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>$32 USD</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          That same fixed price covers the booking app, the API behind the Android and iOS apps and the phone line, and
          since October 2026 the <Link href="/blog/rebuilding-mjfoodbank-org/">public website</Link> too, at no extra
          cost.
        </p>

        <h2>What changed</h2>
        <p>
          The app went live on <time dateTime="2025-09-02">September 2, 2025</time>. The voicemail inbox stopped being the centre of the day. Clients book themselves, the schedule fills itself, and
          the numbers that used to take an afternoon of careful counting are just there. Staff get to spend that time on
          the people in front of them.
        </p>
        <p>
          Building this from the inside, as someone who did the phone calls and saw the paper, is why it fits the way the
          food bank actually works. Every feature started as a real frustration someone had on a real day.
        </p>
      </div>

      <TechDetails>
        <ul>
          <li>
            <strong>The app</strong> is a React single-page app backed by a Node.js and Express API and a PostgreSQL
            database, running on an AWS Lightsail server at app.mjfoodbank.org.
          </li>
          <li>
            <strong>One backend for everything.</strong> The web app, the Android and iOS apps, and the phone and text
            line all talk to the same API, so a booking made by phone shows up in the staff schedule instantly, and the
            same booking rules apply everywhere.
          </li>
          <li>
            <strong>Passwordless sign-in.</strong> Browser passkeys use WebAuthn and go through the same inactive-account
            and staff password-expiry checks as password login. In the mobile apps, credentials sit in the device’s
            secure storage and are unlocked by the biometric prompt, which allows the device PIN or passcode as a
            fallback.
          </li>
          <li>
            <strong>Sessions that don’t trip people up.</strong> Short-lived access tokens with refresh tokens keep
            returning users signed in; refresh and login requests are serialized so an old refresh can’t wipe a newer
            login, and the login rate limit only counts rejected credentials, so a server hiccup never eats into
            someone’s attempts.
          </li>
          <li>
            <strong>Exports</strong> use a reusable Excel table export, so any staff table can go straight into the
            spreadsheets funders and the board expect.
          </li>
          <li>
            <strong>Built to be maintained.</strong> The repo carries feature and bug trackers, setup and architecture
            guides, and onboarding docs for volunteer programmers, plus a critical test suite for the booking paths.
          </li>
          <li>
            <strong>What’s next.</strong> A rebuilt version is under way in a monorepo shared with the new public
            website: React 19, Vite and Mantine on the front, Hono with Zod and Kysely on PostgreSQL behind it, deployed
            as Docker images to the same Lightsail server.
          </li>
        </ul>
      </TechDetails>

      <div className="prose">
        <p>
          If your organization still runs on voicemails, paper and end-of-month counting,{' '}
          <Link href="/#contact">get in touch</Link>. It might start with a spreadsheet too.
        </p>
        <p className="signoff">— Ami</p>
      </div>

      <FoodBankSeries current={post.slug} />
    </PostShell>
  )
}
