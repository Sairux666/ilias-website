'use client'

import { useEffect, useRef, useState } from 'react'

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 lg:w-6 lg:h-6 translate-x-[1px]"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

type VimeoEmbedProps = {
  vimeoId: string
  poster: string
  alt: string
  className?: string
}

/* Facade pattern: only a poster + play button load up front, so the Vimeo
   iframe (and its script) never touches the page until the user clicks.
   Fixed at 16:9 so the space it occupies never changes between the poster
   and the loaded player, matching the corner radius used by the other
   gallery media on the case study pages (rounded-lg lg:rounded-xl). */
export function VimeoEmbed({ vimeoId, poster, alt, className = '' }: VimeoEmbedProps) {
  const [playing, setPlaying] = useState(false)
  const [posterMissing, setPosterMissing] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // The poster request can 404 before React hydrates and attaches onError
  // (the browser fires it the instant the SSR-rendered <img> parses), which
  // would otherwise miss the failure. This catches that race on mount.
  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) {
      setPosterMissing(true)
    }
  }, [])

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden rounded-lg lg:rounded-xl bg-neutral-800 ${className}`}
    >
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&dnt=1&title=0&byline=0&portrait=0&badge=0&autopause=0`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          title={alt}
        />
      ) : (
        <>
          {posterMissing ? (
            <div className="absolute inset-0 bg-neutral-700" aria-hidden="true" />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              ref={imgRef}
              src={poster}
              alt={alt}
              onError={() => setPosterMissing(true)}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          )}
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${alt}`}
            className="absolute inset-0 m-auto w-14 h-14 lg:w-16 lg:h-16 min-w-[44px] min-h-[44px] rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center hover:bg-neutral-300 transition-colors duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-100"
          >
            <PlayIcon />
          </button>
        </>
      )}
    </div>
  )
}
