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

type VideoPlayerProps = {
  src: string
  poster: string
  alt: string
  className?: string
}

type Phase = 'idle' | 'playing' | 'ended'

/* Self-hosted counterpart to VimeoEmbed: same 16:9 facade and corner radius,
   but a real <video> instead of an iframe. The <video> is mounted from the
   start (preload="metadata" only) so almost nothing downloads until the
   poster button is clicked, then it plays with sound and native controls. */
export function VideoPlayer({ src, poster, alt, className = '' }: VideoPlayerProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [posterMissing, setPosterMissing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
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

  function handlePlay() {
    const video = videoRef.current
    if (video) {
      video.currentTime = 0
      video.volume = 1
      video.muted = false
      video.play()
    }
    setPhase('playing')
  }

  const showOverlay = phase !== 'playing'

  return (
    <div
      className={`relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-800 ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        controls={phase === 'playing'}
        onEnded={() => setPhase('ended')}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {showOverlay && (
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
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0)_60%)]"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={handlePlay}
            aria-label={phase === 'ended' ? `Replay video: ${alt}` : `Play video: ${alt}`}
            className="absolute inset-0 m-auto w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center hover:bg-neutral-300 hover:scale-105 motion-reduce:hover:scale-100 transition-[background-color,transform] duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-100"
          >
            <PlayIcon />
          </button>
        </>
      )}
    </div>
  )
}
