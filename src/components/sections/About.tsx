'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ABOUT_TEXT =
  'Passionate about merging design and engineering, I craft smooth, interactive experiences with purpose. With a focus on motion, performance, and detail, I help bring digital products to life for forward-thinking brands around the world.'

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
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoInView = useInView(videoRef, { once: false, margin: '0px 0px -30% 0px' })

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
    <section id="about" className="grid grid-cols-12 gap-4 lg:gap-8 pt-56 pb-28 p-4 lg:px-8">
      <div className="flex flex-col col-span-12 lg:col-span-7">
        <CopyReveal>
          <h4 className="font-semibold uppercase mb-4">Myself</h4>
        </CopyReveal>

        <div className="lg:hidden col-span-12 aspect-video rounded-lg overflow-hidden mb-4">
          <motion.video
            ref={videoRef}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={videoInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            src="/videos/about-video-compressed.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="pointer-events-none w-full h-full object-cover"
          />
        </div>

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

      <div className="hidden lg:block h-full col-span-5">
        <div className="sticky top-[calc(100vh-20vw-172px)] w-full aspect-video rounded-lg lg:rounded-xl overflow-hidden">
          <video
            src="/videos/about-video-compressed.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="pointer-events-none w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
