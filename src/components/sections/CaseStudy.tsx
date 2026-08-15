'use client'

import Link from 'next/link'
import { RevealText } from '@/components/ui/RevealText'
import { VimeoEmbed } from '@/components/ui/VimeoEmbed'
import { VideoPlayer } from '@/components/ui/VideoPlayer'
import { content } from '@/data/content'
import type { WorkProject, LocalMediaItem, MediaItem, SpineSection, AddonSection } from '@/data/work'

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

/* Any MediaItem (image, local video, vimeo, or self-hosted video) rendered
 * with one shared sizing className. Used by the hero slot, gallery, spine
 * parts and add-ons so each media kind only has one rendering path. */
function MediaRenderer({ item, className }: { item: MediaItem; className: string }) {
  if (item.kind === 'vimeo') {
    return <VimeoEmbed vimeoId={item.vimeoId} poster={item.poster} alt={item.alt} className={className} />
  }
  if (item.kind === 'hosted-video') {
    return <VideoPlayer src={item.src} poster={item.poster} alt={item.alt} className={className} />
  }
  return <Media item={item} className={className} />
}

const eyebrowClass =
  'text-xs lg:text-[clamp(14px,0.8vw,18px)] text-neutral-400 uppercase font-medium tracking-wider'

/* Top 4-column spec header: Client / Role / Agency / Year / Market. Collapses
 * entirely when the project has no spec data, and each column only appears
 * when its own field is filled in, so partial data never leaves a gap. */
function SpecHeader({ project }: { project: WorkProject }) {
  const spec = project.spec
  if (!spec || !(spec.client || spec.role || spec.agency || spec.market)) return null

  const labels = content.caseStudy.specLabels
  const agency = spec.agency
    ? spec.agencyVia
      ? `${spec.agency} ${content.caseStudy.viaConnector} ${spec.agencyVia}`
      : spec.agency
    : undefined
  const period = [project.year, spec.market].filter(Boolean).join(' / ')

  const columns = [
    { label: labels.client, value: spec.client },
    { label: labels.role, value: spec.role },
    { label: labels.agency, value: agency },
    { label: labels.period, value: period || undefined },
  ].filter((c): c is { label: string; value: string } => Boolean(c.value))

  if (columns.length === 0) return null

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-5 px-4 lg:px-5">
      {columns.map((c) => (
        <div key={c.label} className="flex flex-col gap-3 min-w-0">
          <RevealText className={eyebrowClass}>{c.label}</RevealText>
          <RevealText
            className="text-[clamp(18px,1.4vw,32px)] text-neutral-100 font-semibold tracking-tight leading-[1.1] break-words"
            delay={0.05}
          >
            {c.value}
          </RevealText>
        </div>
      ))}
    </div>
  )
}

const heroMediaClass = 'w-full h-[220px] lg:h-[clamp(500px,55vw,1100px)]'
const spineMediaClass = 'w-full h-[200px] lg:h-[clamp(400px,45vw,900px)]'

/* One part of the 4-part spine (Brief, Challenge, Approach, Work/Ecosystem).
 * Collapses when the project supplies no heading, body or media for it. */
function SpinePart({ label, section }: { label: string; section?: SpineSection }) {
  if (!section || !(section.heading || section.body || section.media)) return null
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <RevealText className={eyebrowClass}>{label}</RevealText>
      {section.heading && (
        <RevealText
          as="h3"
          className="text-[clamp(28px,3vw,64px)] text-neutral-100 font-semibold tracking-tight leading-[1.05]"
          delay={0.05}
        >
          {section.heading}
        </RevealText>
      )}
      {section.body && (
        <RevealText
          className="text-[clamp(16px,1.3vw,26px)] text-neutral-300 font-medium leading-[1.4] max-w-[65ch]"
          delay={0.1}
        >
          {section.body}
        </RevealText>
      )}
      {section.media && <MediaRenderer item={section.media} className={spineMediaClass} />}
    </div>
  )
}

/* One modular add-on slot (AI Pipeline, Storyboards, Ratio Rebuilds, OOH In
 * Market, Payoff). Collapses when the project supplies none of it. */
function AddonBlock({ label, section }: { label: string; section?: AddonSection }) {
  const hasMedia = Boolean(section?.media && section.media.length > 0)
  if (!section || !(section.heading || section.body || hasMedia)) return null
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <RevealText className={eyebrowClass}>{label}</RevealText>
      {section.heading && (
        <RevealText
          as="h3"
          className="text-[clamp(24px,2.4vw,48px)] text-neutral-100 font-semibold tracking-tight leading-[1.1]"
          delay={0.05}
        >
          {section.heading}
        </RevealText>
      )}
      {section.body && (
        <RevealText
          className="text-[clamp(16px,1.3vw,26px)] text-neutral-300 font-medium leading-[1.4] max-w-[65ch]"
          delay={0.1}
        >
          {section.body}
        </RevealText>
      )}
      {hasMedia && (
        <div className="flex flex-col gap-4 lg:gap-5">
          {section.media!.map((m, i) => (
            <MediaRenderer key={i} item={m} className={spineMediaClass} />
          ))}
        </div>
      )}
    </div>
  )
}

/* Credits / Tools block at the bottom of the case study. Collapses entirely
 * when the project has neither. */
function CreditsTools({ project }: { project: WorkProject }) {
  const hasCredits = Boolean(project.credits && project.credits.length > 0)
  const hasTools = Boolean(project.tools && project.tools.length > 0)
  if (!hasCredits && !hasTools) return null

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {hasCredits && (
        <div className="flex flex-col gap-4">
          <RevealText className={eyebrowClass}>{content.caseStudy.creditsHeading}</RevealText>
          <ul className="flex flex-col gap-2">
            {project.credits!.map((c) => (
              <li
                key={`${c.role}-${c.name}`}
                className="flex justify-between gap-4 text-neutral-100 text-sm lg:text-base font-medium"
              >
                <span className="text-neutral-400 uppercase tracking-wide">{c.role}</span>
                <span className="text-right">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {hasTools && (
        <div className="flex flex-col gap-4">
          <RevealText className={eyebrowClass}>{content.caseStudy.toolsHeading}</RevealText>
          <ul className="flex gap-1.5 2xl:gap-2 flex-wrap">
            {project.tools!.map((t) => (
              <li
                key={t}
                className="font-mono text-[10px] lg:text-[clamp(12px,0.7vw,16px)] text-neutral-100 uppercase tracking-[1.1px] bg-neutral-100/10 px-2 3xl:px-3 pt-2 pb-1.5 rounded-md whitespace-nowrap"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/* /work/[slug] body — mirrors reference/work/<slug>.html: a dark rounded shell
 * with a centered title, a neutral-800 meta panel, and a media gallery. */
export function CaseStudy({ project }: { project: WorkProject }) {
  const spine = project.spine
  const hasSpine = Boolean(
    spine && Object.values(spine).some((s) => s && (s.heading || s.body || s.media))
  )
  const spineParts = content.caseStudy.spineParts

  const addons = project.addons
  const hasAddons = Boolean(
    addons &&
      Object.values(addons).some((a) => a && (a.heading || a.body || (a.media && a.media.length > 0)))
  )

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
          {content.caseStudy.backToWorkLabel}
        </Link>

        <RevealText
          as="h1"
          className="w-full text-neutral-100 text-center text-5xl md:text-[clamp(64px,8vw,180px)] font-bold uppercase leading-[0.85]"
        >
          {project.title}
        </RevealText>

        <SpecHeader project={project} />

        {project.heroAsset && <MediaRenderer item={project.heroAsset} className={heroMediaClass} />}

        <div className="w-full flex flex-col gap-12 lg:gap-16 2xl:gap-[clamp(64px,5vw,150px)] px-4 lg:px-5 pt-5 lg:pt-6 pb-4 lg:pb-5 rounded-lg lg:rounded-xl bg-neutral-800">
          {hasSpine && (
            <div className="flex flex-col gap-16 lg:gap-24">
              <SpinePart label={spineParts.brief} section={spine?.brief} />
              <SpinePart label={spineParts.challenge} section={spine?.challenge} />
              <SpinePart label={spineParts.approach} section={spine?.approach} />
              <SpinePart label={spineParts.work} section={spine?.work} />
            </div>
          )}

          {/* Meta grid: Year / Services / Summary */}
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12">
            <div className="flex flex-col gap-3 lg:col-span-2">
              <RevealText className={eyebrowClass}>{content.caseStudy.yearLabel}</RevealText>
              <RevealText
                className="text-[clamp(48px,3.5vw,96px)] text-neutral-100 font-semibold tracking-tight leading-[0.8]"
                delay={0.05}
              >
                {project.year}
              </RevealText>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-4">
              <RevealText className={eyebrowClass}>{content.caseStudy.servicesLabel}</RevealText>
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
              <RevealText className={eyebrowClass}>{content.caseStudy.summaryLabel}</RevealText>
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
                    {content.caseStudy.visitSiteLabel}
                    <ArrowUpRight />
                  </a>
                </RevealText>
              )}
            </div>
          </div>

          {project.gallery.length > 0 && (
            <div className="flex flex-col gap-4 lg:gap-5">
              {project.gallery.map((row, i) =>
                row.layout === 'full' ? (
                  <MediaRenderer
                    key={i}
                    item={row.items[0]}
                    className="w-full h-[200px] lg:h-[clamp(600px,57vw,1200px)]"
                  />
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
          )}

          {hasAddons && (
            <div className="flex flex-col gap-16 lg:gap-24">
              <AddonBlock label={content.caseStudy.addonLabels.aiPipeline} section={addons?.aiPipeline} />
              <AddonBlock label={content.caseStudy.addonLabels.storyboards} section={addons?.storyboards} />
              <AddonBlock label={content.caseStudy.addonLabels.ratioRebuilds} section={addons?.ratioRebuilds} />
              <AddonBlock label={content.caseStudy.addonLabels.oohInMarket} section={addons?.oohInMarket} />
              <AddonBlock label={content.caseStudy.addonLabels.payoff} section={addons?.payoff} />
            </div>
          )}

          <CreditsTools project={project} />
        </div>
      </div>
    </main>
  )
}
