'use client'

import { WorkCard } from '@/components/ui/WorkCard'
import { workProjects } from '@/data/work'

/* Home "Work" section. Reads the same `workProjects` source as the /work index
   so project info is only ever edited in one place. */
export function SelectedWork() {
  return (
    <section className="flex flex-col items-center py-20 sm:py-24 lg:py-28 px-4 lg:px-8">
      <h2 className="flex w-full mb-6 lg:mb-8">
        <span className="text-[clamp(32px,7.5vw,200px)] font-bold tracking-tight leading-[0.8] uppercase">
          Selected Work
        </span>
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 w-full">
        {workProjects.map((p, i) => (
          <WorkCard
            key={p.slug}
            className="w-full"
            index={i}
            project={{
              title: p.title,
              href: `/work/${p.slug}`,
              video: p.previewVideo,
              cover: p.cover,
              icon: p.icon,
              category: p.category,
              year: p.year,
              tags: p.services,
            }}
          />
        ))}
      </ul>
    </section>
  )
}
