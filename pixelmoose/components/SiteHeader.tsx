import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import logoMark from '@/public/images/Logo/Logo_mark.png'

export function SiteHeader() {
  return (
    <header className="nav">
      <Link href="/" className="brand" aria-label="Pixel Moose Studio home">
        <Image src={logoMark} alt="" width={64} height={40} priority />
        <span className="brand-text">
          <span className="brand-name">Pixel Moose</span>
          <span className="brand-sub">Studio</span>
        </span>
      </Link>
      <nav aria-label="Primary" className="nav-links">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#services">Services</Link>
        <Link href="/blog/">Blog</Link>
        <Link href="/#contact">Contact</Link>
        <ThemeToggle />
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="footer mono muted">
      <span>© {new Date().getFullYear()} Pixel Moose Studio</span>
      <span>Hand-coded by Ami in Moose Jaw, SK</span>
    </footer>
  )
}
