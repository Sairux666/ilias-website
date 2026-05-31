import Link from 'next/link'
import type { Project } from '@/data/projects'

type Props = {
  prev: Project | null
  next: Project | null
}

export function ProjectNav({ prev, next }: Props) {
  return (
    <div className="border-t border-white/5 grid grid-cols-2">
      {prev ? (
        <Link
          href={`/work/${prev.slug}`}
          className="group flex flex-col gap-2 px-5 lg:px-8 py-8 lg:py-10 border-r border-white/5 hover:bg-[#111] transition-colors duration-300"
        >
          <span className="text-[#888] text-xs font-medium tracking-wide uppercase">
            ← Previous
          </span>
          <span className="text-[#f5f5f5] font-semibold text-base lg:text-lg group-hover:opacity-70 transition-opacity duration-300">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col gap-2 px-5 lg:px-8 py-8 lg:py-10 text-right hover:bg-[#111] transition-colors duration-300"
        >
          <span className="text-[#888] text-xs font-medium tracking-wide uppercase">
            Next →
          </span>
          <span className="text-[#f5f5f5] font-semibold text-base lg:text-lg group-hover:opacity-70 transition-opacity duration-300">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
