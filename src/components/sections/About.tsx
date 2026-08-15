'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

const ABOUT_TEXT = content.statement.text

function CopyReveal({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: '100%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  )
}

export function About() {
  const textRef = useRef<HTMLParagraphElement>(null)

  // Smooth word-by-word opacity reveal, scrubbed to scroll (desktop only).
  useEffect(() => {
    if (window.innerWidth < 1024) return
    const el = textRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const text = el.textContent ?? ''
      el.innerHTML = text
        .split(' ')
        .map((w) => `<span class="about-word">${w}</span>`)
        .join(' ')
      const words = el.querySelectorAll('.about-word')
      gsap.set(words, { opacity: 0.12 })
      gsap.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.5,
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: 1 },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    // Top padding is deliberately much tighter than the reference's pt-56: with
    // the companion video gone there is nothing to fill the gap the hero's
    // scroll-scaled preview leaves behind, so the copy starts sooner.
    <section
      id="about"
      className="grid grid-cols-12 gap-4 lg:gap-8 pt-16 md:pt-24 lg:pt-28 pb-20 lg:pb-28 px-4 lg:px-8"
    >
      <div className="flex flex-col col-span-12 lg:col-span-10">
        <CopyReveal>
          <h4 className="font-semibold uppercase mb-4 lg:mb-6">Myself</h4>
        </CopyReveal>

        <p
          ref={textRef}
          className="about-text hidden lg:block text-[clamp(28px,3.5vw,96px)] font-semibold tracking-tight leading-none"
        >
          {ABOUT_TEXT}
        </p>
        <p className="lg:hidden text-[clamp(28px,3.5vw,96px)] font-semibold tracking-tight leading-none">
          {ABOUT_TEXT}
        </p>
      </div>
    </section>
  )
}
