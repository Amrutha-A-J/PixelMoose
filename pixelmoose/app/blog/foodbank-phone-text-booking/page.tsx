import Link from 'next/link'
import { FoodBankSeries } from '@/components/FoodBankSeries'
import { getPost, PostShell, postMetadata, TechDetails } from '@/components/PostShell'

const post = getPost('foodbank-phone-text-booking')
export const metadata = postMetadata(post)

export default function Post() {
  return (
    <PostShell post={post}>
      <figure className="article-figure">
        <img src="/work/foodbank-ivr/01.webp" alt="Booking a food bank visit by phone call or text message" />
        <figcaption className="muted">Book by calling or texting. No internet needed.</figcaption>
      </figure>

      <div className="prose">
        <p>
          The <Link href="/blog/foodbank-booking-app/">booking app</Link> ended the phone tag for anyone who could get
          online. But a food bank serves people who often can’t: no internet at home, no data plan, or a phone that only
          makes calls and sends texts. For them, booking still meant leaving a voicemail and waiting for a call back.
        </p>
        <p>
          So in December 2025 I built an automated phone line, and in January 2026 added the same thing by text message.
          Anyone with a phone can now book a visit at any time of day, without waiting on staff.
        </p>

        <h2>How a call works</h2>
        <ol>
          <li>The caller enters their food bank client ID.</li>
          <li>
            The line greets them by name and tells them what they need to know: whether they can shop this month, how
            many times they’ve visited, and any appointment they already have.
          </li>
          <li>
            They choose to <strong>book</strong>, <strong>reschedule</strong>, <strong>cancel</strong>, or{' '}
            <strong>hear their appointment time</strong>.
          </li>
          <li>
            To book, they say what works: the earliest time available, or a specific weekday, and morning or afternoon.
          </li>
          <li>The line reads out up to five open times, and they press a number to take one. Done.</li>
        </ol>
        <p>
          Texting works the same way, one message at a time. Text the number, reply with your client ID, and pick from
          the options.
        </p>

        <figure className="article-figure">
          <img src="/work/foodbank-ivr/03.webp" alt="SMS booking confirmation on a phone" />
          <figcaption className="muted">Booking by text, with a confirmation at the end.</figcaption>
        </figure>

        <h2>Small details that save calls</h2>
        <ul>
          <li>
            <strong>Cancelling asks first.</strong> Before cancelling, the line asks if they’re really looking for an
            earlier time, and points them to reschedule instead, so nobody loses their spot by accident.
          </li>
          <li>
            <strong>New clients aren’t left hanging.</strong> Anyone without a client ID is told exactly where to go to
            get one.
          </li>
          <li>
            <strong>Staff can add a temporary message</strong> that every caller hears, like a holiday closure.
          </li>
          <li>
            <strong>Every booking lands in the same schedule</strong> as online bookings, so staff see one list no matter
            how someone booked.
          </li>
        </ul>

        <h2>What changed</h2>
        <p>
          The people with the fewest options now have the same access as everyone else: book any time, without waiting
          for a call back, and without a smartphone. And staff spend far less of their day returning voicemails.
        </p>
      </div>

      <TechDetails>
        <ul>
          <li>
            <strong>Twilio Studio</strong> runs both the voice and SMS flows from one flow definition, with a natural
            generative voice for the spoken prompts and a session timeout message on text.
          </li>
          <li>
            <strong>The booking app’s API does the work.</strong> Twilio calls API endpoints to look up the client,
            find the best open slots for their preferences, and book, reschedule, cancel or look up appointments. The
            same booking rules apply as in the web and mobile apps, because it is the same code.
          </li>
          <li>
            <strong>Secured with signatures.</strong> Every request from Twilio is checked against the{' '}
            <code>X-Twilio-Signature</code> header; plain API tokens are not accepted on the phone routes.
          </li>
          <li>
            <strong>Careful input handling.</strong> Client IDs are trimmed and validated, unknown IDs and blocked
            clients get clear spoken answers, and any failure ends with a way to reach staff by email.
          </li>
        </ul>
      </TechDetails>

      <div className="prose">
        <p>
          If some of the people you serve can’t get online, <Link href="/#contact">get in touch</Link>. A phone line can
          reach them.
        </p>
        <p className="signoff">— Ami</p>
      </div>

      <FoodBankSeries current={post.slug} />
    </PostShell>
  )
}
