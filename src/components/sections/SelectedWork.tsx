'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

type Project = {
  title: string
  href: string
  video: string
  cover: string
  icon: string
  category: string
  year: string
  tags: string[]
}

const projects: Project[] = [
  {
    title: 'Jazmin Wong',
    href: '/work/jazmin-wong',
    video: '/videos/jazmin-wong-preview-compressed.mp4',
    cover: '/images/work/jazmin-wong/cover.jpg',
    icon: '/images/work/jazmin-wong/jazmin-wong-icon.png',
    category: 'Portfolio',
    year: '2025',
    tags: ['Art Direction', 'Voice & Tone', 'UI', 'UX', 'Next.js', 'Tailwind CSS', 'GSAP', 'Motion', 'Matter.js', 'Lenis', 'Vercel'],
  },
  {
    title: 'Trackstack',
    href: '/work/trackstack',
    video: '/videos/trackstack-preview-compressed.mp4',
    cover: '/images/work/trackstack/cover.jpg',
    icon: '/images/work/trackstack/trackstack-icon.png',
    category: 'Product',
    year: '2025',
    tags: ['Art Direction', 'Naming & Copywriting', 'Voice & Tone', 'Brand Design', 'Strategy', 'UX', 'UI', 'Web Design', 'Product Design', 'Media Production'],
  },
]

function TagMarquee({ tags }: { tags: string[] }) {
  const line = tags.map((t) => t + ', ').join('')
  return (
    <div className="flex justify-center items-center h-4 md:h-4.5 overflow-hidden relative w-full">
      <div className="absolute left-0 h-full w-8 lg:w-10 bg-linear-to-r from-neutral-900/95 to-neutral-200/0 z-10" />
      <div className="absolute right-0 h-full w-8 lg:w-10 bg-linear-to-l from-neutral-900/95 to-neutral-200/0 z-10" />
      <div className="flex overflow-hidden">
        {[0, 1].map((i) => (
          <p
            key={i}
            className="font-mono text-[10px] md:text-xs tracking-widest text-neutral-300 uppercase whitespace-nowrap pr-1.5"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

function WorkCard({ project }: { project: Project }) {
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
      className="w-full lg:w-1/2"
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

export function SelectedWork() {
  return (
    <section className="flex flex-col items-center py-28 px-4 lg:px-8">
      <h2 className="flex justify-between w-full mb-6 lg:mb-8">
        <span className="text-[clamp(48px,12vw,200px)] font-bold tracking-tight leading-[0.8] uppercase">Work</span>
        <span className="text-[clamp(48px,12vw,200px)] font-bold tracking-tight leading-[0.8] uppercase">&#x27;25</span>
      </h2>
      <ul className="flex flex-col lg:flex-row gap-3 lg:gap-4 w-full mb-8 lg:mb-16">
        {projects.map((p) => (
          <WorkCard key={p.title} project={p} />
        ))}
      </ul>
      <Link href="/work" className="flex items-center gap-1 group">
        <span className="text-[clamp(20px,1.5vw,32px)] font-medium">See all</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>
    </section>
  )
}
