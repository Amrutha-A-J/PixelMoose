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
      'How I built bnrescues.com for a Regina cat rescue run out of one woman’s pocket — and why the only bill she’ll ever get is for the domain.',
    date: '2026-10-27',
    readingTime: '7 min read',
    cover: { src: '/work/bnrescues/05.webp', alt: 'Tony’s adoption page on bnrescues.com' },
  },
]

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
