'use client'

import Link from 'next/link'
import { WorkCard, type WorkCardProject } from '@/components/ui/WorkCard'

const projects: WorkCardProject[] = [
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
