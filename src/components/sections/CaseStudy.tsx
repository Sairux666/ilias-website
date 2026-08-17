'use client'

import Link from 'next/link'
import { RevealText } from '@/components/ui/RevealText'
import { VimeoEmbed } from '@/components/ui/VimeoEmbed'
import { VideoPlayer } from '@/components/ui/VideoPlayer'
import { useLenis } from '@/components/providers/LenisProvider'
import { content } from '@/data/content'
import type { WorkProject, LocalMediaItem, MediaItem, SpineSection, AddonSection } from '@/data/work'

const FILM_ANCHOR_ID = 'case-study-film'

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
    <div className={`rounded-2xl overflow-hidden relative ${className}`}>
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
        <img
          src={item.src}
          alt={item.kind === 'image' ? item.alt ?? '' : ''}
          className="absolute inset-0 w-full h-full object-cover"
        />
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

function WatchFilmLink({ label }: { label: string }) {
  const { scrollTo } = useLenis()
  return (
    <button
      type="button"
      onClick={() => scrollTo(`#${FILM_ANCHOR_ID}`, { offset: -40 })}
      className="text-xs lg:text-[clamp(14px,0.8vw,18px)] text-neutral-400 uppercase font-medium tracking-wider flex items-center gap-1 hover:underline hover:text-neutral-100 transition-all duration-300 text-left"
    >
      {label}
    </button>
  )
}

/* 3-column metadata card below the title: Client & Year, Role (pills), and
 * Summary with an optional action link (Visit site, or Watch film when the
 * project has a hosted-video film further down the page). Client & Year
 * only renders when the project supplies spec.client, so portfolio-style
 * projects without a client still get a clean 2-column card. */
function MetaCard({ project, hasFilm }: { project: WorkProject; hasFilm: boolean }) {
  const labels = content.caseStudy.metaCard
  const spec = project.spec
  const agency = spec?.agency
    ? spec.agencyVia
      ? `${spec.agency} ${content.caseStudy.viaConnector} ${spec.agencyVia}`
      : spec.agency
    : undefined
  const clientSubtext = agency ? `${project.year} / ${content.caseStudy.viaConnector} ${agency}` : project.year

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 px-6 lg:px-10 py-8 lg:py-10 rounded-2xl bg-neutral-800">
      {spec?.client && (
        <div className="flex flex-col gap-3 min-w-0">
          <RevealText className={eyebrowClass}>{labels.clientLabel}</RevealText>
          <RevealText
            className="text-[clamp(18px,1.3vw,26px)] text-neutral-100 font-semibold tracking-tight leading-[1.15] break-words"
            delay={0.05}
          >
            {spec.client}
          </RevealText>
          <RevealText className="text-sm text-neutral-400 font-medium" delay={0.08}>
            {clientSubtext}
          </RevealText>
        </div>
      )}

      <div className="flex flex-col gap-3 min-w-0">
        <RevealText className={eyebrowClass}>{labels.roleLabel}</RevealText>
        <TagList items={project.services} />
      </div>

      <div className="flex flex-col gap-3 min-w-0">
        <RevealText className={eyebrowClass}>{labels.summaryLabel}</RevealText>
        <RevealText
          className="text-sm lg:text-base text-neutral-300 font-medium leading-[1.5]"
          delay={0.05}
        >
          {project.summary}
        </RevealText>
        {project.visitUrl ? (
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
        ) : hasFilm ? (
          <RevealText delay={0.1}>
            <WatchFilmLink label={labels.watchFilmLabel} />
          </RevealText>
        ) : null}
      </div>
    </div>
  )
}

const spineMediaClass = 'w-full h-[200px] lg:h-[clamp(400px,45vw,900px)]'

/* One part of the case study spine (Brief, Challenge, Approach, Work), laid
 * out as a WPP-style 2-column editorial block: heading on the left, story
 * copy (and optional media) on the right. Collapses when the project
 * supplies no heading, body or media for it. anchorId lets the metadata
 * card's "Watch film" link scroll straight to the part carrying the film. */
function SpinePart({
  section,
  anchorId,
  mediaClassName = spineMediaClass,
}: {
  section?: SpineSection
  anchorId?: string
  mediaClassName?: string
}) {
  if (!section || !(section.heading || section.body || section.media)) return null
  return (
    <div
      id={anchorId}
      className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 border-t border-white/10 first:border-t-0 py-10"
    >
      <div className="md:col-span-4">
        {section.heading && (
          <RevealText
            as="h3"
            className="text-[clamp(24px,2.2vw,40px)] text-neutral-100 font-bold tracking-tight leading-[1.1]"
          >
            {section.heading}
          </RevealText>
        )}
      </div>
      <div className="md:col-span-8 flex flex-col gap-6">
        {section.body && (
          <RevealText
            className="text-[clamp(16px,1.1vw,20px)] text-neutral-300 font-medium leading-[1.6] max-w-[65ch]"
            delay={0.05}
          >
            {section.body}
          </RevealText>
        )}
        {section.media && <MediaRenderer item={section.media} className={mediaClassName} />}
      </div>
    </div>
  )
}

/* One modular add-on slot (AI Pipeline, Storyboards, Ratio Rebuilds, OOH In
 * Market, Payoff). Collapses when the project supplies none of it. */
function AddonBlock({ label, section }: { label: string; section?: AddonSection }) {
  const hasMedia = Boolean(section?.media && section.media.length > 0)
  if (!section || !(section.heading || section.body || hasMedia || section.loopVideo)) return null
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
      {section.loopVideo && (
        <div className="w-full rounded-2xl overflow-hidden">
          <video
            src={section.loopVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto block"
          />
        </div>
      )}
      {hasMedia &&
        (section.layout === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {section.media!.map((m, i) => (
              <MediaRenderer key={i} item={m} className={spineMediaClass} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 lg:gap-5">
            {section.media!.map((m, i) => (
              <MediaRenderer key={i} item={m} className={spineMediaClass} />
            ))}
          </div>
        ))}
    </div>
  )
}

/* Payoff add-on: WPP 2-column layout matching SpinePart (heading left, body
 * copy + self-hosted video player + optional stills right), instead of the
 * generic stacked AddonBlock used by the other add-on slots. Collapses when
 * the project supplies no heading, body, video or stills for it. */
function PayoffSection({
  label,
  section,
}: {
  label: string
  section?: AddonSection
}) {
  const stills = section?.stills ?? []
  if (!section || !(section.heading || section.body || section.video || stills.length > 0)) return null
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
      <div className="md:col-span-4">
        {section.heading && (
          <RevealText
            as="h3"
            className="text-[clamp(24px,2.2vw,40px)] text-neutral-100 font-bold tracking-tight leading-[1.1]"
            delay={0.05}
          >
            {section.heading}
          </RevealText>
        )}
      </div>
      <div className="md:col-span-8 flex flex-col gap-6">
        {section.body && (
          <RevealText
            className="text-[clamp(16px,1.1vw,20px)] text-neutral-300 font-medium leading-[1.6] max-w-[65ch]"
            delay={0.1}
          >
            {section.body}
          </RevealText>
        )}
        {section.video && (
          <VideoPlayer
            src={section.video}
            poster={section.poster ?? ''}
            alt={section.heading ?? label}
            className="aspect-[16/9] w-full rounded-2xl overflow-hidden"
          />
        )}
        {stills.length > 0 && (
          <div className="flex flex-col gap-4 lg:gap-5">
            {stills.map((m, i) => (
              <MediaRenderer key={i} item={m} className={spineMediaClass} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TagList({ items }: { items: string[] }) {
  return (
    <ul className="flex gap-1.5 2xl:gap-2 flex-wrap">
      {items.map((t) => (
        <li
          key={t}
          className="font-mono text-[10px] lg:text-[clamp(12px,0.7vw,16px)] text-neutral-100 uppercase tracking-[1.1px] bg-neutral-100/10 px-2 3xl:px-3 pt-2 pb-1.5 rounded-md whitespace-nowrap"
        >
          {t}
        </li>
      ))}
    </ul>
  )
}

/* /work/[slug] body: a dark rounded shell, centered on wide screens, with a
 * title, a metadata card, a hero asset, and a WPP-style 2-column editorial
 * spine (heading left, story copy right). */
const contentPadding = 'px-4 sm:px-6 md:px-8'

export function CaseStudy({ project }: { project: WorkProject }) {
  const spine = project.spine
  const hasSpine = Boolean(
    spine && Object.values(spine).some((s) => s && (s.heading || s.body || s.media))
  )
  const hasFilm = spine?.work?.media?.kind === 'hosted-video'

  const addons = project.addons
  const hasAddons = Boolean(
    addons &&
      Object.values(addons).some(
        (a) =>
          a &&
          (a.heading ||
            a.body ||
            (a.media && a.media.length > 0) ||
            a.loopVideo ||
            a.video ||
            (a.stills && a.stills.length > 0))
      )
  )
  return (
    <main className="bg-neutral-100 pt-[200px] md:pt-[clamp(128px,12vw,500px)]">
      <div className="w-full px-2 sm:px-4 md:px-6 py-4 mx-auto">
        <div
          data-surface="dark"
          className="relative flex flex-col items-center gap-8 lg:gap-10 px-3 lg:px-4 pt-[clamp(64px,10vw,128px)] pb-3 lg:pb-4 rounded-[28px] lg:rounded-[32px] bg-neutral-900"
        >
          <Link
            href="/#work"
            className="group absolute top-5 lg:top-8 left-4 lg:left-8 flex items-center gap-1.5 text-xs lg:text-sm text-neutral-400 uppercase font-medium tracking-wider hover:text-neutral-100 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-100 rounded"
          >
            <ArrowLeft />
            {content.caseStudy.backToWorkLabel}
          </Link>

          <div className={`w-full flex flex-col items-center gap-3 lg:gap-5 ${contentPadding}`}>
            <RevealText
              as="h1"
              className="w-full text-neutral-100 text-center text-5xl md:text-[clamp(64px,8vw,180px)] font-bold uppercase leading-[0.85]"
            >
              {project.title}
            </RevealText>

            {project.subtitle && (
              <RevealText
                className="w-full text-neutral-400 text-center text-sm lg:text-[clamp(16px,1.2vw,24px)] font-medium tracking-wide"
                delay={0.05}
              >
                {project.subtitle}
              </RevealText>
            )}
          </div>

          <div className={`w-full ${contentPadding}`}>
            <MetaCard project={project} hasFilm={hasFilm} />
          </div>

          {project.heroAsset && (
            <div className={`w-full ${contentPadding}`}>
              <div className="w-full aspect-[16/9] overflow-hidden rounded-2xl">
                {project.heroAsset.kind === 'image' ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.heroAsset.src}
                    alt={project.heroAsset.alt ?? ''}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <MediaRenderer item={project.heroAsset} className="w-full h-full" />
                )}
              </div>
            </div>
          )}

          <div className={`w-full ${contentPadding}`}>
            <div className="w-full flex flex-col gap-12 lg:gap-16 2xl:gap-[clamp(64px,5vw,150px)] p-6 sm:p-8 md:p-10 rounded-2xl bg-neutral-800">
              {hasSpine && (
                <div className="flex flex-col">
                  <SpinePart section={spine?.brief} />
                  <SpinePart section={spine?.challenge} />
                  <SpinePart section={spine?.approach} />
                  <SpinePart
                    section={spine?.work}
                    anchorId={hasFilm ? FILM_ANCHOR_ID : undefined}
                    mediaClassName={hasFilm ? 'w-full' : undefined}
                  />
                </div>
              )}

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
                  <AddonBlock label={content.caseStudy.addonLabels.oohInMarket} section={addons?.oohInMarket} />
                  <AddonBlock label={content.caseStudy.addonLabels.ratioRebuilds} section={addons?.ratioRebuilds} />
                  <PayoffSection
                    label={content.caseStudy.addonLabels.payoff}
                    section={addons?.payoff}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
