'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EASE = [0.16, 1, 0.3, 1] as const

type ClientLogo = { name: string; src: string }

/* Single source for the logo wall. Add or remove entries and the grid reflows
   on its own, including the orphan-row correction computed below. */
const clientLogos: ClientLogo[] = [
  { name: 'Coca-Cola', src: '/clients/coca-logo.png' },
  { name: 'Fanta', src: '/clients/fanta-logo.png' },
  { name: 'Spotify', src: '/clients/spotify-logo.png' },
  { name: 'Milka', src: '/clients/milka-logo.png' },
  { name: 'Dacia', src: '/clients/dacia-logo.png' },
  { name: 'Renault', src: '/clients/renault-logo.png' },
  { name: 'OCP', src: '/clients/ocp-logo.png' },
  { name: 'Tefal', src: '/clients/tefal-logo.png' },
  { name: 'British Council', src: '/clients/british-council-logo.png' },
  { name: 'Isabel Marant', src: '/clients/isabel-logo.png' },
]

/* A final row holding exactly one logo reads as an orphan, so centre it in the
   track instead. Computed per breakpoint from the array length; class strings
   stay literal so Tailwind's compiler can see them. */
function orphanFix(count: number) {
  return [
    count % 3 === 1 ? 'sm:col-start-2' : 'sm:col-start-auto',
    count % 4 === 1 ? 'lg:col-start-2' : 'lg:col-start-auto',
    count % 5 === 1 ? 'xl:col-start-3' : 'xl:col-start-auto',
  ].join(' ')
}

function useMedia(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return matches
}

function Letter({ char, className }: { char: string; className?: string }) {
  return (
    <span className={`letter relative inline-block ${className ?? ''}`}>
      <span>{char}</span>
      <span className="absolute bottom-full left-0">{char}</span>
    </span>
  )
}

function LetterScroll() {
  const ulRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!ulRef.current) return
    // Scrubbed letter roll is decorative; skip it entirely for reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.to('.letter', {
        yPercent: 100,
        ease: 'power1.inOut',
        scrollTrigger: { trigger: ulRef.current, start: '40% 95%', end: '100% 80%', scrub: 1 },
        stagger: { each: 0.05, from: 'random' },
      })
    }, ulRef)
    return () => ctx.revert()
  }, [])

  return (
    // The old fixed 500/800px height is what pushed the headline miles above the
    // logos; fluid padding lets the two read as one block.
    <ul
      ref={ulRef}
      className="letter-scroll flex flex-col justify-center items-center py-[clamp(24px,4vw,64px)]"
    >
      <li className="text-[clamp(48px,14vw,250px)] font-bold tracking-tight leading-[0.85] overflow-hidden flex">
        {'WORKED'.split('').map((c, i) => (
          <Letter key={i} char={c} />
        ))}
      </li>
      <li className="text-[clamp(48px,14vw,250px)] font-bold tracking-tight leading-[0.9] lg:leading-[0.85] overflow-hidden flex">
        {'WITH'.split('').map((c, i) => (
          <Letter key={i} char={c} />
        ))}
      </li>
    </ul>
  )
}

export function TechStack() {
  const reduceMotion = useReducedMotion() ?? false
  const isMobile = useMedia('(max-width: 639px)')
  const lastIndex = clientLogos.length - 1
  const lastClass = orphanFix(clientLogos.length)

  return (
    <section className="px-4 lg:px-8 pt-[clamp(32px,5vw,64px)] pb-[clamp(48px,7vw,96px)]">
      <div className="mx-auto w-full max-w-[1400px]">
        <LetterScroll />

        {/* Tight gap: the headline and the wall are one group. */}
        <ul className="mt-[clamp(8px,2vw,28px)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr gap-x-[clamp(16px,3vw,48px)] gap-y-[clamp(20px,3vw,40px)]">
          {clientLogos.map((logo, i) => (
            <motion.li
              key={logo.name}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 8 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{
                duration: reduceMotion ? 0 : isMobile ? 0.4 : 0.7,
                delay: reduceMotion ? 0 : (isMobile ? 0.03 : 0.06) * i,
                ease: EASE,
              }}
              className={`flex items-center justify-center ${i === lastIndex ? lastClass : ''}`}
            >
              {/* Display only: no anchor, no pointer, not focusable. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                decoding="async"
                className="w-auto h-auto max-w-[clamp(84px,10vw,128px)] max-h-[clamp(120px,14vw,180px)] object-contain select-none pointer-events-none"
              />
            </motion.li>
          ))}
        </ul>

        <p className="mt-[clamp(20px,3vw,40px)] text-[clamp(12px,0.9vw,14px)] text-neutral-500">
          Work delivered via VML (WPP) and previous agencies.
        </p>
      </div>
    </section>
  )
}
