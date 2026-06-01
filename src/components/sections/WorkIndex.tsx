'use client'

import { WorkCard } from '@/components/ui/WorkCard'
import { RevealText } from '@/components/ui/RevealText'
import { workProjects } from '@/data/work'

/* /work index — mirrors reference/work.html: a revealed header followed by a
 * neutral-200 container holding a 2-up grid of the shared WorkCard. */
export function WorkIndex() {
  return (
    <main className="bg-neutral-100">
      <div className="px-4 lg:px-8 pt-[200px] md:pt-[clamp(128px,12vw,500px)]">
        <RevealText className="text-[clamp(14px,1.2vw,24px)] font-medium" delay={0}>
          [2022—2025]
        </RevealText>
        <div className="mt-3 lg:mt-5">
          <RevealText
            className="text-[clamp(48px,7.5vw,200px)] font-bold uppercase leading-[0.8] tracking-tight"
            delay={0.05}
          >
            Selected Work
          </RevealText>
        </div>
      </div>

      <div className="px-2 lg:px-4 py-4 lg:py-6">
        <div className="w-full bg-neutral-200 rounded-2xl lg:rounded-[20px] p-3 lg:p-4">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            {workProjects.map((p) => (
              <WorkCard
                key={p.slug}
                className="w-full"
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
        </div>
      </div>
    </main>
  )
}
