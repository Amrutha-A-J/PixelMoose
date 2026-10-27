'use client'

import { useEffect, useRef, useState } from 'react'
import type { Slide } from '@/lib/content'

export function Carousel({ slides, label }: { slides: Slide[]; label: string }) {
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  // Keep the counter in sync with swipes and scroll-snap, not just button clicks.
  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth))
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const go = (i: number) => {
    const el = track.current
    if (!el) return
    const next = (i + slides.length) % slides.length
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        className="carousel-track"
        ref={track}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1) }
        }}
      >
        {slides.map((s, i) => (
          <figure
            className="carousel-slide"
            key={s.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <div className="carousel-frame">
              <img src={s.src} alt={s.alt} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
            </div>
          </figure>
        ))}
      </div>
      <div className="carousel-bar">
        <p className="carousel-caption" aria-live="polite">{slides[index]?.caption}</p>
        <div className="carousel-controls">
          <span className="mono muted">
            {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous image">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next image">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
