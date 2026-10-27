export type Post = {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  cover: { src: string; alt: string }
}

// Newest first. Each post's body lives in app/blog/<slug>/page.tsx.
export const posts: Post[] = [
  {
    slug: 'building-bnrescues',
    title: 'Building a home online for Brittany Niemi Rescues',
    description:
      'How I built bnrescues.com for a cat rescue near Regina that runs on one woman’s own money and donations — and why the only bill she’ll ever get is for the domain.',
    date: '2026-10-27',
    readingTime: '7 min read',
    cover: { src: '/work/bnrescues/05.webp', alt: 'Tony’s adoption page on bnrescues.com' },
  },
  {
    slug: 'rebuilding-mjfoodbank-org',
    title: 'Moving the Moose Jaw Food Bank off WordPress',
    description:
      'Why I replaced mjfoodbank.org’s WordPress site with a custom one that works on every screen, is easy to read, and connects straight into the food bank’s booking app.',
    date: '2026-10-27',
    readingTime: '7 min read',
    cover: { src: '/work/mjfoodbank-site/01.webp', alt: 'The new mjfoodbank.org homepage' },
  },
]

// Everything built for the Moose Jaw Food Bank. An entry links to its post once a post with that slug exists.
export const foodBankSeries = [
  { slug: 'rebuilding-mjfoodbank-org', title: 'The public website', body: 'mjfoodbank.org, moved off WordPress.' },
  { slug: 'foodbank-booking-app', title: 'The booking and operations app', body: 'Online bookings for clients, and visits, volunteers, deliveries and donations for staff.' },
  { slug: 'foodbank-mobile-apps', title: 'The Android and iOS apps', body: 'Booking and visit history on clients’ and volunteers’ phones.' },
  { slug: 'foodbank-phone-text-booking', title: 'The phone and text booking line', body: 'Booking by voice call or SMS for people without internet.' },
]

export const hasPost = (slug: string) => posts.some((p) => p.slug === slug)

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
