'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

type Service = {
  title: string
  description: string
  keywords: string[]
}

const services: Service[] = [
  {
    title: 'Campaign Design',
    description:
      'The key visual everything else hangs off, plus every adaptation that follows it, in every format the campaign needs.',
    keywords: [
      'Key Visuals',
      'Campaign Design',
      'Adaptations',
      'Social Creative',
      'OOH & DOOH',
      'Pitch Design',
    ],
  },
  {
    title: 'Motion',
    description:
      'Making it move. From six second social cutdowns to brand films, built to hold the idea at any length.',
    keywords: [
      'Motion Graphics',
      'Video Ads',
      'Brand Films',
      'Social Cutdowns',
      'Storyboards',
      'Kinetic Type',
    ],
  },
  {
    title: 'AI Production',
    description:
      "Generative image and video, used where it makes something better or possible. Not because it's fast.",
    keywords: [
      'AI Video',
      'Image-to-Video',
      'Character Animation',
      'Compositing',
      'Retouching',
      'Concept Visuals',
    ],
  },
]

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

/* Clipped slide-up reveal. Mobile gets a shorter throw and duration so scroll
   stays responsive; reduced-motion renders the text with no transform at all. */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion() ?? false
  const isMobile = useMedia('(max-width: 639px)')

  if (reduceMotion) {
    return <span className={`block ${className ?? ''}`}>{children}</span>
  }

  return (
    <span className={`block overflow-hidden ${className ?? ''}`}>
      <motion.span
        initial={{ y: '100%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: isMobile ? 0.5 : 0.8, delay, ease: EASE }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  )
}

function ServiceItem({ service, index }: { service: Service; index: number }) {
  const chipsRef = useRef<HTMLUListElement>(null)
  const chipsInView = useInView(chipsRef, { once: true, margin: '0px 0px -15% 0px' })
  const reduceMotion = useReducedMotion() ?? false
  const isMobile = useMedia('(max-width: 639px)')

  const chipHidden = reduceMotion
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 0, y: isMobile ? 10 : 24, scale: isMobile ? 1 : 0.9 }
  const chipShown = { opacity: 1, y: 0, scale: 1 }

  return (
    // Uniform vertical padding on every row (rather than a special last-child
    // value) keeps the rhythm between all three pillars identical.
    <li className="grid gap-y-[clamp(16px,2.2vw,28px)] py-[clamp(32px,4vw,56px)] lg:grid-cols-12 lg:gap-x-[clamp(20px,2vw,32px)] lg:gap-y-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral-700">
      {/* Number + title: stacked on mobile, inline from sm, and released into
          the 12-col grid at lg via `contents` so both align to their own tracks. */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-5 lg:contents">
        <Reveal className="text-[clamp(11px,0.8vw,14px)] text-neutral-300 uppercase font-medium tracking-wider shrink-0 lg:col-span-1">
          {`0${index + 1}`}
        </Reveal>
        <h3 className="lg:col-span-5 min-w-0">
          <Reveal
            className="text-[clamp(28px,5.5vw,44px)] lg:text-[clamp(32px,3.4vw,52px)] text-neutral-100 font-medium leading-[1.05] tracking-tight"
            delay={reduceMotion ? 0 : 0.04}
          >
            {service.title}
          </Reveal>
        </h3>
      </div>

      <div className="flex flex-col gap-[clamp(16px,1.6vw,24px)] lg:col-span-6 min-w-0">
        {/* ~55-70 characters per line at every width. */}
        <Reveal
          className="text-[clamp(15px,1.15vw,19px)] text-neutral-100 font-medium leading-[1.45] max-w-[62ch]"
          delay={reduceMotion ? 0 : 0.08}
        >
          {service.description}
        </Reveal>
        {/* Tighter gap/padding below sm: at 375 the wider values pack 6 pills as
            5+1 or 3+2+1, stranding a lone pill on its own line. */}
        <ul ref={chipsRef} className="flex flex-wrap gap-1 sm:gap-1.5">
          {service.keywords.map((kw, i) => (
            <motion.li
              key={kw}
              initial={chipHidden}
              animate={chipsInView ? chipShown : chipHidden}
              transition={{
                duration: reduceMotion ? 0 : isMobile ? 0.45 : 0.9,
                delay: reduceMotion ? 0 : (isMobile ? 0.015 : 0.03) * i,
                ease: EASE,
              }}
              className="font-mono text-[clamp(10px,0.68vw,12px)] text-neutral-100 uppercase tracking-[0.06em] bg-neutral-100/10 px-1.5 sm:px-2 pt-2 pb-1.5 rounded-md whitespace-nowrap"
            >
              {kw}
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export function Services() {
  return (
    <section className="px-2 lg:px-4 py-16 lg:py-24">
      <div
        data-surface="dark"
        className="bg-neutral-900 rounded-2xl lg:rounded-[20px] px-4 lg:px-6 pt-16 lg:pt-24 pb-4 lg:pb-6"
      >
        {/* Caps the measure so the section does not stretch on very wide displays. */}
        <div className="mx-auto w-full max-w-[1600px] flex flex-col gap-[clamp(48px,6vw,96px)]">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-[clamp(20px,2vw,32px)]">
            {/* Starts at col 2 so the intro aligns with the pillar titles below. */}
            <div className="flex flex-col lg:col-start-2 lg:col-span-11">
              <h2 className="text-[clamp(11px,0.8vw,14px)] text-neutral-400 uppercase font-medium tracking-wider mb-3">
                Services
              </h2>
              <p className="text-neutral-100 text-[clamp(22px,3vw,52px)] font-medium leading-[1.15] lg:leading-[1.08] max-w-[26ch] lg:max-w-[22ch] xl:max-w-none">
                Some of this ran on a billboard in Casablanca. Some of it lasted six seconds on a
                phone. It all started as one idea.
              </p>
            </div>
          </div>

          <div className="bg-neutral-800 rounded-xl lg:rounded-2xl px-[clamp(16px,1.6vw,28px)]">
            <ul className="flex flex-col">
              {services.map((s, i) => (
                <ServiceItem key={s.title} service={s} index={i} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
