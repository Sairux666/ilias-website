'use client'

import Link from 'next/link'
import { RevealText } from '@/components/ui/RevealText'
import { VimeoEmbed } from '@/components/ui/VimeoEmbed'
import { VideoPlayer } from '@/components/ui/VideoPlayer'
import type { WorkProject, LocalMediaItem } from '@/data/work'

function ArrowLeft() {
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
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  )
}

function ArrowUpRight() {
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
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )
}

function Media({ item, className }: { item: LocalMediaItem; className: string }) {
  return (
    <div className={`rounded-lg lg:rounded-xl overflow-hidden relative ${className}`}>
      {item.kind === 'video' ? (
        <video
          src={item.src}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={item.src} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
    </div>
  )
}

/* /work/[slug] body — mirrors reference/work/<slug>.html: a dark rounded shell
 * with a centered title, a neutral-800 meta panel, and a media gallery. */
export function CaseStudy({ project }: { project: WorkProject }) {
  return (
    <main className="bg-neutral-100 px-2 lg:px-4 pt-[200px] md:pt-[clamp(128px,12vw,500px)]">
      <div
        data-surface="dark"
        className="relative flex flex-col items-center gap-[clamp(64px,6vw,200px)] px-3 lg:px-4 pt-[clamp(64px,10vw,128px)] pb-3 lg:pb-4 rounded-2xl lg:rounded-[20px] bg-neutral-900"
      >
        <Link
          href="/#work"
          className="group absolute top-5 lg:top-8 left-4 lg:left-8 flex items-center gap-1.5 text-xs lg:text-sm text-neutral-400 uppercase font-medium tracking-wider hover:text-neutral-100 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-100 rounded"
        >
          <ArrowLeft />
          Back to work
        </Link>

        <RevealText
          as="h1"
          className="w-full text-neutral-100 text-center text-5xl md:text-[clamp(64px,8vw,180px)] font-bold uppercase leading-[0.85]"
        >
          {project.title}
        </RevealText>

        <div className="w-full flex flex-col gap-12 lg:gap-16 2xl:gap-[clamp(64px,5vw,150px)] px-4 lg:px-5 pt-5 lg:pt-6 pb-4 lg:pb-5 rounded-lg lg:rounded-xl bg-neutral-800">
          {/* Meta grid: Year / Services / Summary */}
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12">
            <div className="flex flex-col gap-3 lg:col-span-2">
              <RevealText className="text-xs lg:text-[clamp(14px,0.8vw,18px)] text-neutral-400 uppercase font-medium tracking-wider">
                Year
              </RevealText>
              <RevealText
                className="text-[clamp(48px,3.5vw,96px)] text-neutral-100 font-semibold tracking-tight leading-[0.8]"
                delay={0.05}
              >
                {project.year}
              </RevealText>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-4">
              <RevealText className="text-xs lg:text-[clamp(14px,0.8vw,18px)] text-neutral-400 uppercase font-medium tracking-wider">
                Services
              </RevealText>
              <ul className="flex gap-1.5 2xl:gap-2 flex-wrap">
                {project.services.map((s) => (
                  <li
                    key={s}
                    className="font-mono text-[10px] lg:text-[clamp(12px,0.7vw,16px)] text-neutral-100 uppercase tracking-[1.1px] bg-neutral-100/10 px-2 3xl:px-3 pt-2 pb-1.5 rounded-md whitespace-nowrap"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:block lg:col-span-1" />

            <div className="flex flex-col gap-3 lg:col-span-5">
              <RevealText className="text-xs lg:text-[clamp(14px,0.8vw,18px)] text-neutral-400 uppercase font-medium tracking-wider">
                Summary
              </RevealText>
              <RevealText
                className="text-[clamp(16px,1.3vw,30px)] text-neutral-100 font-medium leading-[1.3]"
                delay={0.05}
              >
                {project.summary}
              </RevealText>
              {project.visitUrl && (
                <RevealText delay={0.1}>
                  <a
                    href={project.visitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs lg:text-[clamp(14px,0.8vw,18px)] text-neutral-400 uppercase font-medium tracking-wider flex items-center gap-1 hover:underline hover:text-neutral-100 transition-all duration-300"
                  >
                    Visit site
                    <ArrowUpRight />
                  </a>
                </RevealText>
              )}
            </div>
          </div>

          {/* Gallery */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {project.gallery.map((row, i) =>
              row.layout === 'full' ? (
                row.items[0].kind === 'vimeo' ? (
                  <VimeoEmbed
                    key={i}
                    vimeoId={row.items[0].vimeoId}
                    poster={row.items[0].poster}
                    alt={row.items[0].alt}
                  />
                ) : row.items[0].kind === 'hosted-video' ? (
                  <VideoPlayer
                    key={i}
                    src={row.items[0].src}
                    poster={row.items[0].poster}
                    alt={row.items[0].alt}
                  />
                ) : (
                  <Media
                    key={i}
                    item={row.items[0]}
                    className="w-full h-[200px] lg:h-[clamp(600px,57vw,1200px)]"
                  />
                )
              ) : (
                <div key={i} className="flex gap-4 lg:gap-5">
                  <Media
                    item={row.items[0]}
                    className="w-1/2 h-[160px] lg:h-[clamp(600px,40vw,1200px)]"
                  />
                  <Media
                    item={row.items[1]}
                    className="w-1/2 h-[160px] lg:h-[clamp(600px,40vw,1200px)]"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
