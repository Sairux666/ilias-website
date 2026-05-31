'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', 'Brand Identity', 'Motion Design', 'Digital & Print']

export function WorkGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-page-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const cards = document.querySelectorAll('.grid-card')
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      }
    )
  }, [activeCategory])

  return (
    <section ref={sectionRef} className="px-5 lg:px-8 pb-24 lg:pb-32">
      <div className="max-w-[1400px] mx-auto">
        {/* Page header */}
        <div className="work-page-header mb-12 lg:mb-16 opacity-0">
          <h1
            className="font-display uppercase text-[#f5f5f5] leading-none mb-4"
            style={{ fontSize: 'clamp(48px,8vw,130px)' }}
          >
            Work
          </h1>
          <p className="text-[#888] text-base max-w-[400px]">
            Selected projects across brand identity, motion design, and digital/print.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#f5f5f5] text-[#0a0a0a]'
                  : 'border border-white/10 text-[#888] hover:text-[#f5f5f5] hover:border-white/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filtered.map((project, i) => (
            <div key={project.slug} className="grid-card">
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-[#888] text-center py-20">No projects in this category yet.</p>
        )}
      </div>
    </section>
  )
}
