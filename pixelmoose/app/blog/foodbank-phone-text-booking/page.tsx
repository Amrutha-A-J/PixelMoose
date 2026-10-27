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
          When the <Link href="/blog/foodbank-booking-app/">booking app</Link> launched in September 2025, it ended the
          phone tag for everyone who could get online. But a food bank serves a lot of people who can’t: no smartphone,
          no internet at home, no data plan. For them, booking still meant leaving a voicemail and waiting for a call
          back. That was the challenge I couldn’t stop thinking about.
        </p>

        <h2>I wasn’t sure it could work</h2>
        <p>
          An automated phone line sounds simple until you look at the rules it has to follow. Our food bank gives each
          client a set number of visits a month, so every booking has to be checked against the real records before it
          is made. Otherwise:
        </p>
        <ul>
          <li>People could book beyond the visits they’re allowed.</li>
          <li>
            Someone could walk all the way to the food bank, only to be told no when they got there. That is the worst
            outcome of all.
          </li>
          <li>People could end up with duplicate appointments, taking spots others need.</li>
        </ul>
        <p>
          The app could check all of this on a screen. Doing the same thing through a phone keypad, with no screen at
          all, was another matter. I honestly wasn’t sure it was possible.
        </p>

        <h2>An idea in the shower</h2>
        <p>
          The idea that it might work came to me in the shower, of all places. I started researching, and what I found
          gave me hope: phone systems can talk to an app’s backend in the middle of a call, look things up,
          and answer the caller based on what they find. That meant the phone line could use exactly the same rules and
          the same live records as the app.
        </p>

        <h2>Finding someone to run the calls</h2>
        <p>
          I wanted to use a Canadian provider, and I was disappointed to find there wasn’t an established one offering
          this kind of service. So I went with Twilio, which handles both phone calls and text messages and is used by
          organizations all over the world.
        </p>

        <h2>Building it</h2>
        <p>
          I built the flows for both calls and texts in Twilio and connected them to the app’s backend. Every important
          step checks the food bank’s live records: who is calling, how many visits they have used this month, whether
          they already have an appointment, and which times are actually open.
        </p>
        <p>
          For the spoken prompts I chose a natural, generative voice rather than a robotic one, so it is easier to
          understand and feels less like talking to a machine.
        </p>
        <p>
          Calls went live in December 2025, and texting followed in January 2026.
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
          If they have already used their visits for the month, the line tells them on the phone, before they make the
          trip, not at the door. Texting works the same way, one message at a time.
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
          for a call back, without a smartphone, and without the risk of a wasted trip. And staff spend far less of their
          day returning voicemails.
        </p>
        <p>And it almost didn’t happen. It started as a “what if” in the shower.</p>
      </div>

      <TechDetails>
        <ul>
          <li>
            <strong>Twilio Studio</strong> runs the voice and SMS flows from one flow definition: the call path gathers
            keypad input with a generative Amazon Polly voice, and the text path uses send-and-wait-for-reply steps with
            a session timeout message.
          </li>
          <li>
            <strong>The app’s API does the deciding.</strong> Studio calls the booking backend over HTTP to look up the
            client, find the best open slots for their preferences, and book, reschedule, cancel or look up an
            appointment. Twilio holds no booking logic of its own.
          </li>
          <li>
            <strong>Usage checked twice.</strong> The client lookup returns this month’s usage and whether they can still
            shop, using the same monthly limit (counted per family) as the app. The limit is checked again for the
            month of the chosen slot at booking time, and duplicate bookings are rejected by the same booking service the
            web app uses.
          </li>
          <li>
            <strong>Short, speakable choices.</strong> Slot searches return at most five options, so they can be read
            aloud and picked with a single key press.
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
