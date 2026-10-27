export const site = {
  name: 'Pixel Moose Studio',
  url: 'https://pixelmoose.ca',
  email: 'pixelmoose.development@gmail.com',
  founder: 'Ami',
  city: 'Moose Jaw',
  region: 'SK',
  country: 'CA',
  title: 'Pixel Moose Studio — Custom software for small businesses in Moose Jaw',
  description:
    'A woman-owned, local studio in Moose Jaw, Saskatchewan. Custom web apps, Android and iOS apps, and phone systems for small businesses and non-profits — hand-coded by Ami.',
}

export type Slide = { src: string; alt: string; caption: string }

export type Project = {
  slug: string
  title: string
  kind: string
  description: string
  link?: { label: string; href: string }
  slides: Slide[]
}

export const projects: Project[] = [
  {
    slug: 'bnrescues',
    title: 'Brittany Niemi Rescues',
    kind: 'Website + admin',
    description:
      'A cat rescue in the Regina area. Adopters browse and filter cats by age and needs, read each cat’s story, and apply to adopt or foster. The rescue manages its listings from its own login.',
    link: { label: 'bnrescues.com', href: 'https://bnrescues.com' },
    slides: [
      { src: '/work/bnrescues/01.webp', alt: 'Brittany Niemi Rescues homepage in dark mode', caption: 'Homepage for a cat rescue near Regina, in dark mode.' },
      { src: '/work/bnrescues/02.webp', alt: 'Brittany Niemi Rescues homepage in light mode', caption: 'The same homepage in light mode — it follows each visitor’s setting.' },
      { src: '/work/bnrescues/03.webp', alt: 'Homepage on a phone in light and dark mode', caption: 'On a phone, in light and dark.' },
      { src: '/work/bnrescues/04.webp', alt: 'Adoptable cats listing with filters', caption: 'Adoptable cats, filterable by age group, sex and status.' },
      { src: '/work/bnrescues/05.webp', alt: 'Cat profile page with photo gallery', caption: 'Each cat gets a profile with photos, personality and bonded-pair notes.' },
      { src: '/work/bnrescues/06.webp', alt: 'Cat listing and profile on a phone', caption: 'Browsing and cat profiles on a phone.' },
      { src: '/work/bnrescues/07.webp', alt: 'Foster application form', caption: 'Foster applications go straight to the rescue.' },
    ],
  },
  {
    slug: 'mjfoodbank-site',
    title: 'Moose Jaw Food Bank Website',
    kind: 'Website',
    description:
      'The public website for the Moose Jaw & District Food Bank: booking a visit, volunteering, donating and finding community resources, in light and dark mode and multiple languages.',
    link: { label: 'mjfoodbank.org', href: 'https://mjfoodbank.org' },
    slides: [
      { src: '/work/mjfoodbank-site/01.webp', alt: 'Moose Jaw Food Bank homepage in light mode', caption: 'Homepage, in light mode.' },
      { src: '/work/mjfoodbank-site/02.webp', alt: 'Moose Jaw Food Bank homepage in dark mode', caption: 'The same homepage in dark mode.' },
      { src: '/work/mjfoodbank-site/03.webp', alt: 'Food bank homepage on a phone in light and dark mode', caption: 'On a phone, in light and dark.' },
      { src: '/work/mjfoodbank-site/04.webp', alt: 'Get food page', caption: 'Get food: book a visit, what to bring and how the pantry works.' },
      { src: '/work/mjfoodbank-site/05.webp', alt: 'Volunteer page', caption: 'Volunteer sign-up, linked to the volunteer portal.' },
      { src: '/work/mjfoodbank-site/06.webp', alt: 'Get food and volunteer pages on a phone', caption: 'Get food and volunteer pages on a phone.' },
      { src: '/work/mjfoodbank-site/07.webp', alt: 'Community resources page', caption: 'Community resources: meals, housing, health and urgent help in Moose Jaw.' },
    ],
  },
  {
    slug: 'foodbank-web',
    title: 'Food Bank Booking + Admin',
    kind: 'Web app',
    description:
      'Clients and volunteers book visits online. Staff run visits, food distribution, donations, timesheets, leave and demand trends from one dashboard.',
    link: { label: 'Live app', href: 'https://app.mjfoodbank.org' },
    slides: [
      { src: '/work/foodbank-web/01.webp', alt: 'Moose Jaw Food Bank web app overview', caption: 'Booking and admin platform for the Moose Jaw Food Bank.' },
      { src: '/work/foodbank-web/02.webp', alt: 'Mobile client booking view', caption: 'Client booking view, built for quick check-ins on a phone.' },
      { src: '/work/foodbank-web/03.webp', alt: 'Visit trends dashboard', caption: 'Visit trends showing seasonal demand and appointment volume.' },
      { src: '/work/foodbank-web/04.webp', alt: 'Warehouse operations dashboard', caption: 'Warehouse dashboard for inventory, pickups and distribution.' },
    ],
  },
  {
    slug: 'foodbank-android',
    title: 'Food Bank Mobile App',
    kind: 'Android + iOS',
    description:
      'Booking and visit history in the pocket of every client and volunteer, on both Android and iOS.',
    link: {
      label: 'Google Play',
      href: 'https://play.google.com/store/apps/details?id=org.mjfoodbank.app.twa',
    },
    slides: [
      { src: '/work/foodbank-android/01.webp', alt: 'Moose Jaw Food Bank mobile app overview', caption: 'The food bank app, available on Android and iOS.' },
      { src: '/work/foodbank-android/02.webp', alt: 'Android app home screen', caption: 'Home screen with quick actions for bookings and visit history.' },
      { src: '/work/foodbank-android/03.webp', alt: 'Android booking calendar', caption: 'Pick a date and confirm an appointment time.' },
      { src: '/work/foodbank-android/04.webp', alt: 'Android visit details screen', caption: 'Visit details and volunteer tools for on-site work.' },
      { src: '/work/foodbank-android/05.webp', alt: 'Android appointment workflow screen', caption: 'Supporting screens for the appointment workflow.' },
    ],
  },
  {
    slug: 'foodbank-ivr',
    title: 'Phone + Text Booking Line',
    kind: 'IVR / SMS',
    description:
      'Automated voice and SMS booking so clients without internet access can still get an appointment.',
    slides: [
      { src: '/work/foodbank-ivr/01.webp', alt: 'Phone and text booking system overview', caption: 'Book by phone call or text message — no internet needed.' },
      { src: '/work/foodbank-ivr/02.webp', alt: 'IVR call flow', caption: 'Call flow that guides callers through booking prompts.' },
      { src: '/work/foodbank-ivr/03.webp', alt: 'SMS booking confirmation', caption: 'SMS confirmations and reminders for appointments.' },
      { src: '/work/foodbank-ivr/04.webp', alt: 'IVR admin tools', caption: 'Admin tools for scripts, routing and call outcomes.' },
    ],
  },
]

export const about = [
  {
    title: 'Woman-owned, hand-coded by Ami',
    body: 'Every project is designed, hand-coded and supported by Ami — no page builders, no outsourcing. You always talk to the person writing the code.',
  },
  {
    title: 'Local to Moose Jaw',
    body: 'We can sit in your office, watch how the work really happens, and be down the road when something needs a tweak.',
  },
  {
    title: 'One small business to another',
    body: 'No enterprise overhead or agency markup. Clear quotes, plain language, and software your staff can learn in an afternoon.',
  },
]

export const services = [
  { title: 'Websites', body: 'Fast, hand-coded websites that are easy to find on Google and look right on every phone — no page builders.' },
  { title: 'Web applications', body: 'Admin portals, booking systems and dashboards built for the exact way your team works.' },
  { title: 'Android + iOS apps', body: 'Mobile apps for staff in the field and customers on the go.' },
  { title: 'Workflow digitization', body: 'We map the paper and spreadsheets, then replace them with something simpler.' },
  { title: 'Integrations', body: 'Phone systems, SMS, payments and the tools you already use, connected.' },
  { title: 'Anything technical', body: 'Domains, email, hosting, fixing an old system, or just a question. If it’s technical, ask — we’ll help or point you to someone who can.' },
]

export const budget = [
  {
    title: 'Low-cost or free hosting',
    body: 'If budget is a concern, we’ll work with you to choose very low-cost or free hosting setups. These may not suit large organizations, but they work well for many small ones.',
  },
  {
    title: 'Flexible payments',
    body: 'Payment can be flexible and is always open to discussion. Tell us what works for you and we’ll find a way.',
  },
]

export const steps = [
  { title: 'Map the workflow', body: 'We sit with your team, document what happens today, and find where software actually helps.' },
  { title: 'Design and build', body: 'Clickable screens first, then working software in short milestones with weekly check-ins.' },
  { title: 'Launch and support', body: 'We ship, train your staff, and keep improving it once real people are using it.' },
]
