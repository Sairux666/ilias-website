'use client'

/* Single credits line. Previously rendered twice (a leftover from a marquee that
   no longer animates) and hard-clipped at the container edge; now one line that
   fades out through a mask, so long lists trail off cleanly instead of being cut. */
export function TagMarquee({ tags }: { tags: string[] }) {
  return (
    <p
      className="font-mono text-[10px] md:text-xs tracking-widest text-neutral-300 uppercase whitespace-nowrap overflow-hidden w-full [mask-image:linear-gradient(to_right,black_0,black_calc(100%-2.5rem),transparent_100%)]"
      title={tags.join(', ')}
    >
      {tags.join(', ')}
    </p>
  )
}
