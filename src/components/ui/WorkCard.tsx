'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
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

/* `className` controls the outer width: home uses the flex `w-full lg:w-1/2`
   default; the /work grid passes `w-full` and lets the CSS grid size it. */
export function WorkCard({
  project,
  className = 'w-full lg:w-1/2',
}: {
  project: WorkCardProject
  className?: string
}) {
  const cardRef = useRef<HTMLLIElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '5%'])

  return (
    <motion.li
      ref={cardRef}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease: EASE }}
      className={className}
    >
      <Link
        href={project.href}
        className="flex flex-col gap-4 lg:gap-5 px-3 lg:px-4 pt-3 lg:pt-4 pb-5 lg:pb-6 rounded-xl lg:rounded-2xl bg-neutral-900 cursor-pointer group relative"
      >
        <div className="relative rounded-lg lg:rounded-xl overflow-hidden w-full h-[260px] md:h-[350px] lg:h-[clamp(500px,32vw,800px)]">
          <div className="absolute inset-0 bg-neutral-900/30 backdrop-blur-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 -translate-y-[8.333%] left-1/2 -translate-x-1/2 w-[clamp(300px,65%,600px)] h-auto rounded-lg object-cover z-20 [clip-path:polygon(30%_50%,70%_50%,70%_50%,30%_50%)] group-hover:[clip-path:polygon(0_100%,100%_100%,100%_0,0_0)] group-hover:-translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
          />
          <div className="w-full h-full">
            <motion.div className="absolute inset-0 w-full h-[120%] -top-[10%] lg:-top-[15%]" style={{ y }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.cover}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500 ease-in-out"
              />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:gap-5 px-3 lg:px-4">
          <div className="flex justify-between items-center w-full relative">
            <div className="flex items-center gap-2 lg:gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.icon} alt={project.title} className="w-6 h-6 lg:w-8 lg:h-8 rounded-full" />
              <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-100 tracking-wide">
                {project.title}
              </p>
            </div>
            <div className="flex gap-3 lg:gap-5">
              <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-300 tracking-wide">
                {project.category}
              </p>
              <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-300 tracking-wide">
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
