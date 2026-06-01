'use client'

/* Static tag line with edge fades. Extracted verbatim from SelectedWork so the
   home "Work" cards and the /work grid render identically. */
export function TagMarquee({ tags }: { tags: string[] }) {
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
