'use client'

import Link from 'next/link'
import { content } from '@/data/content'
import type { WorkProject } from '@/data/work'

type NavTarget = Pick<WorkProject, 'slug' | 'title' | 'category'> | null

/* Prev/next project navigation, restyled into the neutral palette to match the
 * home page (the reference itself has none — this is an intentional extra). */
function NavLink({ project, direction }: { project: NavTarget; direction: 'prev' | 'next' }) {
  if (!project) return <div />
  const isNext = direction === 'next'
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group flex flex-col gap-2 p-6 lg:p-8 rounded-xl lg:rounded-2xl bg-neutral-900 hover:bg-neutral-800 transition-colors duration-500 ${
        isNext ? 'items-end text-right' : 'items-start'
      }`}
    >
      <span className="flex items-center gap-1.5 text-xs lg:text-sm text-neutral-400 uppercase font-medium tracking-wider">
        {!isNext && <Arrow direction="left" />}
        {isNext ? content.caseStudy.nextProjectLabel : content.caseStudy.previousProjectLabel}
        {isNext && <Arrow direction="right" />}
      </span>
      <span className="text-[clamp(24px,3vw,56px)] font-semibold uppercase tracking-tight leading-none text-neutral-100 group-hover:opacity-80 transition-opacity duration-300">
        {project.title}
      </span>
      <span className="text-xs lg:text-sm text-neutral-400 uppercase tracking-wide">
        {project.category}
      </span>
    </Link>
  )
}

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-4 h-4 ${direction === 'left' ? '' : ''}`}
      aria-hidden="true"
    >
      {direction === 'left' ? (
        <>
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      )}
    </svg>
  )
}

export function CaseStudyNav({ prev, next }: { prev: NavTarget; next: NavTarget }) {
  return (
    <section className="bg-neutral-100 px-2 lg:px-4 pt-2 lg:pt-4 pb-8 lg:pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
        <NavLink project={prev} direction="prev" />
        <NavLink project={next} direction="next" />
      </div>
    </section>
  )
}
