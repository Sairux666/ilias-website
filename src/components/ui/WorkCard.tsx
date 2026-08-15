'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { TagMarquee } from '@/components/ui/TagMarquee'

const EASE = [0.16, 1, 0.3, 1] as const

/* Shape the card needs to render. Both the home "Selected Work" section and the
   /work grid feed this same shape so styling/animation stay identical. */
export type WorkCardProject = {
  title: string
  href: string
  video: string
  cover: string
  icon: string
  category: string
  year: string
  tags: string[]
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

/* `className` controls the outer width: both grids pass `w-full` and let the
   CSS grid size it. `index` drives the in-row reveal stagger. */
export function WorkCard({
  project,
  className = 'w-full',
  index = 0,
}: {
  project: WorkCardProject
  className?: string
  index?: number
}) {
  const cardRef = useRef<HTMLLIElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const isMobile = useMedia('(max-width: 639px)')
  // The preview only ever becomes visible via a hover clip-path reveal, so it is
  // pointless weight on touch and small screens — they keep the cover/poster.
  const canHover = useMedia('(hover: hover) and (min-width: 640px)')
  const reduceMotion = useReducedMotion() ?? false
  const showVideo = canHover && !reduceMotion

  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-15%', '5%'])
  const staticY = useTransform(scrollYProgress, [0, 1], ['0%', '0%'])
  // Parallax is a scroll-linked repaint per card; skip it where it costs most.
  const y = isMobile || reduceMotion ? staticY : parallaxY

  // The preview is clipped to zero height until the card is hovered, so playing
  // it merely because it scrolled into view streams a file nobody can see —
  // several MB per card. Require in-viewport *and* hovered; anything else pauses.
  const [hovered, setHovered] = useState(false)
  const nearViewport = useInView(cardRef, { margin: '200px 0px 200px 0px' })
  const shouldPlay = showVideo && nearViewport && hovered
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (shouldPlay) v.play().catch(() => {})
    else v.pause()
  }, [shouldPlay])

  return (
    <motion.li
      ref={cardRef}
      initial={{ opacity: 0, y: isMobile ? 12 : 24, scale: isMobile ? 1 : 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: isMobile ? 0.5 : 1,
        delay: isMobile ? 0 : (index % 2) * 0.08,
        ease: EASE,
      }}
      className={className}
    >
      <Link
        href={project.href}
        onPointerEnter={(e) => e.pointerType !== 'touch' && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        data-surface="dark"
        className="flex flex-col gap-4 lg:gap-5 px-3 lg:px-4 pt-3 lg:pt-4 pb-5 lg:pb-6 rounded-xl lg:rounded-2xl bg-neutral-900 cursor-pointer group relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-100"
      >
        {/* Fixed ratio at every breakpoint so media never stretches or squashes.
            Matches the 1470x1200 card thumbnail's native ratio so covers crop less. */}
        <div className="relative rounded-lg lg:rounded-xl overflow-hidden w-full aspect-[1.225/1]">
          <div className="absolute inset-0 bg-neutral-900/30 backdrop-blur-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
          {showVideo && (
            <video
              ref={videoRef}
              src={project.video}
              poster={project.cover}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute top-1/2 -translate-y-[8.333%] left-1/2 -translate-x-1/2 w-[clamp(300px,65%,600px)] h-auto rounded-lg object-cover z-20 [clip-path:polygon(30%_50%,70%_50%,70%_50%,30%_50%)] group-hover:[clip-path:polygon(0_100%,100%_100%,100%_0,0_0)] group-hover:-translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
            />
          )}
          <div className="w-full h-full">
            <motion.div className="absolute inset-0 w-full h-[120%] -top-[10%] lg:-top-[15%]" style={{ y }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.cover}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center scale-100 transition-transform duration-500 group-hover:scale-105 ease-in-out"
              />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:gap-5 px-1 sm:px-2 lg:px-4">
          {/* Stacks below sm so the title can never collide with category/year. */}
          <div className="flex flex-col gap-1.5 sm:flex-row sm:justify-between sm:items-center w-full relative">
            <div className="flex items-center gap-2 lg:gap-3 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.icon}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="w-6 h-6 lg:w-8 lg:h-8 rounded-full shrink-0 object-contain bg-neutral-800"
              />
              <p className="text-[clamp(13px,1.2vw,18px)] uppercase font-semibold text-neutral-100 tracking-wide truncate">
                {project.title}
              </p>
            </div>
            <div className="flex gap-3 lg:gap-5 shrink-0">
              <p className="text-[clamp(13px,1.2vw,18px)] uppercase font-semibold text-neutral-300 tracking-wide whitespace-nowrap">
                {project.category}
              </p>
              <p className="text-[clamp(13px,1.2vw,18px)] uppercase font-semibold text-neutral-300 tracking-wide whitespace-nowrap">
                {project.year}
              </p>
            </div>
          </div>
          <TagMarquee tags={project.tags} />
        </div>
      </Link>
    </motion.li>
  )
}
