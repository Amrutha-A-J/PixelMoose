import Image from 'next/image'
import { Carousel } from '@/components/Carousel'
import { CopyEmail } from '@/components/CopyEmail'
import { ThemeToggle } from '@/components/ThemeToggle'
import { about, budget, projects, services, site, steps } from '@/lib/content'
import logoMark from '@/public/images/Logo/Logo_mark.png'

const pad = (n: number) => String(n).padStart(2, '0')

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="wrap">
        <header className="nav">
          <a href="#top" className="brand" aria-label="Pixel Moose Studio home">
            <Image src={logoMark} alt="" width={64} height={40} priority />
            <span className="brand-text">
              <span className="brand-name">Pixel Moose</span>
              <span className="brand-sub">Studio</span>
            </span>
          </a>
          <nav aria-label="Primary" className="nav-links">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
            <ThemeToggle />
          </nav>
        </header>

        <main id="main">
          <section id="top" className="hero">
            <svg className="pixels" aria-hidden="true" width="260" height="200" viewBox="0 0 26 20">
              <rect x="22" y="0" width="3" height="3" className="px-accent" />
              <rect x="17" y="2" width="2" height="2" className="px-ink" />
              <rect x="20" y="5" width="2" height="2" className="px-soft" />
              <rect x="13" y="6" width="3" height="3" className="px-accent" />
              <rect x="24" y="8" width="1" height="1" className="px-ink" />
              <rect x="9" y="10" width="2" height="2" className="px-soft" />
              <rect x="17" y="11" width="2" height="2" className="px-ink" />
              <rect x="5" y="14" width="1" height="1" className="px-accent" />
              <rect x="12" y="15" width="1" height="1" className="px-ink" />
              <rect x="21" y="16" width="1" height="1" className="px-soft" />
            </svg>
            <p className="eyebrow mono muted">
              <span className="dot" aria-hidden="true" />
              Woman-owned · Hand-coded by Ami · Moose Jaw, Saskatchewan
            </p>
            <h1>Custom software for small businesses.</h1>
            <div className="hero-foot">
              <p className="lede muted">
                A small, local studio building web apps, Android and iOS apps, and phone systems that replace paper
                forms and spreadsheets — for small businesses and non-profits that want tools shaped around how they
                actually work.
              </p>
              <div className="actions">
                <a className="btn btn-solid" href="#contact">
                  Start a project <span aria-hidden="true">→</span>
                </a>
                <a className="btn btn-line" href="#work">See the work</a>
              </div>
            </div>
          </section>

          <section id="work" className="section" aria-labelledby="work-title">
            <div className="section-head">
              <h2 id="work-title">Selected work</h2>
              <span className="mono muted">{pad(projects.length)} projects</span>
            </div>
            {projects.map((p, i) => (
              <article className="project" key={p.slug}>
                <div className="project-info">
                  <span className="mono accent">{pad(i + 1)}</span>
                  <h3>{p.title}</h3>
                  <span className="tag mono muted">{p.kind}</span>
                  <p className="muted">{p.description}</p>
                  {p.link && (
                    <a className="text-link" href={p.link.href} target="_blank" rel="noopener">
                      {p.link.label} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
                <Carousel slides={p.slides} label={`${p.title} screenshots`} />
              </article>
            ))}
          </section>

          <section id="about" className="section section-roomy" aria-labelledby="about-title">
            <h2 id="about-title" className="statement">
              A small business, building for small businesses.{' '}
              <span className="muted">We know what a tight budget and a long to-do list feel like.</span>
            </h2>
            <div className="cols">
              {about.map((a) => (
                <div className="col col-rule" key={a.title}>
                  <h3>{a.title}</h3>
                  <p className="muted">{a.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="services" className="section" aria-labelledby="services-title">
            <h2 id="services-title" className="label">What we build</h2>
            <div className="cols cols-3">
              {services.map((s, i) => (
                <div className="col" key={s.title}>
                  <span className="mono accent">{pad(i + 1)}</span>
                  <h3>{s.title}</h3>
                  <p className="muted">{s.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="process" className="section" aria-labelledby="process-title">
            <h2 id="process-title" className="label">How a project runs</h2>
            <ol className="cols steps">
              {steps.map((s, i) => (
                <li className="col step" key={s.title}>
                  <span className="mono accent">Step {i + 1}</span>
                  <h3>{s.title}</h3>
                  <p className="muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="budget" className="section" aria-labelledby="budget-title">
            <h2 id="budget-title" className="label">Working within your budget</h2>
            <div className="cols">
              {budget.map((b) => (
                <div className="col col-rule" key={b.title}>
                  <h3>{b.title}</h3>
                  <p className="muted">{b.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="section section-roomy" aria-labelledby="contact-title">
            <p id="contact-title" className="mono muted">Have a process that runs on paper?</p>
            <a className="email" href={`mailto:${site.email}?subject=${encodeURIComponent('New project')}`}>
              pixelmoose.development<wbr />@gmail.com
            </a>
            <div className="actions contact-actions">
              <CopyEmail email={site.email} />
              <a
                className="btn btn-line"
                href={`https://mail.google.com/mail/?view=cm&to=${site.email}&su=${encodeURIComponent('New project')}`}
                target="_blank"
                rel="noopener"
              >
                Open in Gmail <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="muted contact-note">
              Tell us what slows your team down. We reply within two business days with questions, not a sales pitch.
            </p>
          </section>
        </main>

        <footer className="footer mono muted">
          <span>© {new Date().getFullYear()} Pixel Moose Studio</span>
          <span>Hand-coded by Ami in Moose Jaw, SK</span>
        </footer>
      </div>
    </>
  )
}
