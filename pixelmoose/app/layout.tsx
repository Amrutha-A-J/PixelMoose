import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { site } from '@/lib/content'
import './globals.css'

const sans = Geist({ subsets: ['latin'], variable: '--font-sans' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: '/' },
  keywords: [
    'Moose Jaw web developer',
    'custom software Saskatchewan',
    'small business app development',
    'Android app developer Moose Jaw',
    'iOS app developer Saskatchewan',
    'woman-owned business Moose Jaw',
    'non-profit booking system',
  ],
  authors: [{ name: site.founder }],
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: 'en_CA',
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf8f4' },
    { media: '(prefers-color-scheme: dark)', color: '#13100d' },
  ],
}

// Runs before paint so a saved theme never flashes the wrong colours.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  url: site.url,
  email: site.email,
  logo: `${site.url}/images/Logo/PixelMoose_Logo.png`,
  description: site.description,
  founder: { '@type': 'Person', name: site.founder },
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  areaServed: [{ '@type': 'City', name: 'Moose Jaw' }, { '@type': 'AdministrativeArea', name: 'Saskatchewan' }],
  knowsAbout: ['Web application development', 'Android apps', 'iOS apps', 'IVR phone systems', 'Business workflow digitization'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
