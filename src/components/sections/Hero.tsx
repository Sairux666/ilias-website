'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInitialLoad } from '@/components/providers/InitialLoadProvider'

gsap.registerPlugin(ScrollTrigger)

/* Reference entrance easing + timings (no loading screen → "non-initial" delays). */
const EASE = [0.16, 1, 0.3, 1] as const
const VIDEO_SRC = '/videos/hero-video-compressed.mp4'

/* Scroll-scale tuning table, decoded verbatim from the reference build. */
function getScrollConfig(vw: number) {
  const table = [
    { maxWidth: 900, translateY: -95 },
    { maxWidth: 1200, translateY: -105 },
    { maxWidth: 1600, translateY: -118 },
    { maxWidth: 2000, translateY: -110 },
    { maxWidth: 2500, translateY: -115 },
  ]
  for (const bp of table) if (vw <= bp.maxWidth) return { translateY: bp.translateY }
  return { translateY: -125 }
}

function VolumeOffIcon() {
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
      className="w-5 h-5 lg:w-[2vw] lg:h-[2vw] text-neutral-900"
      aria-hidden="true"
    >
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </svg>
  )
}

function VolumeOnIcon() {
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
      className="w-5 h-5 lg:w-[2vw] lg:h-[2vw] text-neutral-900"
      aria-hidden="true"
    >
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
      <path d="M16 9a5 5 0 0 1 0 6" />
      <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
    </svg>
  )
}

function ArrowDownIcon() {
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
      className="w-[clamp(16px,1.3vw,24px)] h-[clamp(16px,1.3vw,24px)] text-neutral-900"
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  )
}

export function Hero() {
  const [muted, setMuted] = useState(true)
  const { isInitialLoad } = useInitialLoad()
  // Reveal delays gate on the loading screen (initial load) vs. client nav.
  const d1 = isInitialLoad ? 2.5 : 0.5 // "A Seriously Good"
  const d2 = isInitialLoad ? 2.6 : 0.6 // big wordmarks + video clip
  const d3 = isInitialLoad ? 3 : 1 // scroll indicators

  const previewRef = useRef<HTMLDivElement>(null)
  const previewVideoRef = useRef<HTMLVideoElement>(null)
  const mobileVideoRef = useRef<HTMLVideoElement>(null)
  const mobileInView = useInView(mobileVideoRef, { once: false })

  /* Mobile inline hero video: play while on-screen. */
  useEffect(() => {
    const v = mobileVideoRef.current
    if (!v) return
    if (mobileInView) v.play().catch(() => {})
    else v.pause()
  }, [mobileInView])

  /* Desktop ".intro" video-preview: cursor-follow translateX + scroll-driven
     translateY/scale, recreated exactly from the reference build. */
  useEffect(() => {
    const init = () => {
      const el = previewRef.current
      if (!el) return () => {}
      const vw = window.innerWidth
      if (vw < 768) return () => {}

      const cfg = getScrollConfig(vw)
      const state = {
        scrollProgress: 0,
        initialTranslateY: cfg.translateY,
        currentTranslateY: cfg.translateY,
        scale: 0.35,
        targetMouseX: 0,
        currentMouseX: 0,
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.intro',
          start: 'top bottom',
          end: 'top 10%',
          scrub: true,
          onUpdate: (self) => {
            state.scrollProgress = self.progress
            state.currentTranslateY = gsap.utils.interpolate(
              state.initialTranslateY,
              0,
              state.scrollProgress
            )
            state.scale = gsap.utils.interpolate(0.35, 1, state.scrollProgress)
          },
        },
      })

      const onMouseMove = (e: MouseEvent) => {
        state.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
      }
      document.addEventListener('mousemove', onMouseMove)

      let rafId = 0
      const render = () => {
        const liveVw = window.innerWidth
        const { scale, targetMouseX, currentMouseX, currentTranslateY } = state
        const maxTravel = (liveVw - 64 - el.offsetWidth * scale) / 2
        let target = targetMouseX * maxTravel
        target = Math.max(Math.min(target, maxTravel), -maxTravel)
        state.currentMouseX = gsap.utils.interpolate(currentMouseX, target, 0.15)
        el.style.transform = `translateY(${currentTranslateY}vh) translateX(${state.currentMouseX}px) scale(${scale})`
        rafId = requestAnimationFrame(render)
      }
      render()

      return () => {
        cancelAnimationFrame(rafId)
        document.removeEventListener('mousemove', onMouseMove)
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    }

    let cleanup = init()
    const onResize = () => {
      cleanup()
      cleanup = init()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cleanup()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      {/* ── Screen 1 (mobile): "A Seriously Good" + inline video + big text ── */}
      <section className="h-[100svh] relative px-4 lg:px-8 overflow-x-hidden">
        <div className="flex flex-col justify-between h-full py-32 lg:hidden">
          <div className="flex flex-col gap-1">
            <div className="overflow-hidden mb-1 w-full relative">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: d1, ease: EASE }}
                className="flex justify-between w-full"
              >
                <p className="text-[clamp(14px,1.2vw,20px)] uppercase font-semibold">A</p>
                <p className="text-[clamp(14px,1.2vw,20px)] uppercase font-semibold absolute left-1/2 -translate-x-1/2">
                  Seriously
                </p>
                <p className="text-[clamp(14px,1.2vw,20px)] uppercase font-semibold">Good</p>
              </motion.div>
            </div>

            <div className="relative md:hidden">
              <motion.video
                ref={mobileVideoRef}
                src={VIDEO_SRC}
                muted={muted}
                loop
                playsInline
                preload="metadata"
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={mobileInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
                transition={{ duration: 1.2, ease: EASE }}
                className="w-full h-full pointer-events-none aspect-video rounded-xl overflow-hidden"
              />
              <button
                onClick={() => setMuted((m) => !m)}
                className="absolute bottom-2 right-2 z-10"
                aria-label={muted ? 'Unmute video' : 'Mute video'}
              >
                <div className="bg-neutral-100/50 shadow-2xl backdrop-blur-2xl w-10 h-10 rounded-full flex items-center justify-center">
                  {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-2 lg:gap-0">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: d2, ease: EASE }}
                className="w-full pointer-events-none lg:pr-[4vw]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/other/design.png"
                  alt="Design"
                  className="h-[15vw] md:h-[16vw] lg:h-[17vw]"
                />
              </motion.div>
            </div>
            <div className="overflow-hidden w-full">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: d2, ease: EASE }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/other/engineer.png"
                  alt="Engineer"
                  className="w-full pointer-events-none"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Screen 1 (desktop): absolutely-positioned big text + scroll hints ── */}
      <section className="hidden lg:block">
        <div className="flex flex-col uppercase font-semibold absolute bottom-[15vh] lg:bottom-[20vh] left-8 right-8">
          <div className="overflow-hidden mb-2 lg:mb-0 lg:w-full relative mx-auto lg:mx-0">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: d1, ease: EASE }}
              className="flex justify-between w-full"
            >
              <p className="text-[clamp(14px,1.2vw,20px)] uppercase block">A</p>
              <p className="text-[clamp(14px,1.2vw,20px)] uppercase absolute left-1/2 -translate-x-1/2">
                Seriously
              </p>
              <p className="text-[clamp(14px,1.2vw,20px)] uppercase block">Good</p>
            </motion.div>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-2 lg:gap-0">
            <div className="overflow-hidden mr-[4vw]">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: d2, ease: EASE }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/other/design.png"
                  alt="Design"
                  className="h-[10vw] w-auto object-contain pointer-events-none"
                />
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: d2, ease: EASE }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/other/engineer.png"
                  alt="Engineer"
                  className="h-[10vw] w-auto object-contain pointer-events-none"
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden absolute left-8 bottom-6">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, delay: d3, ease: EASE }}
            className="flex items-center gap-1"
          >
            <ArrowDownIcon />
            <p className="text-[clamp(12px,1.2vw,20px)] font-medium">Scroll for</p>
          </motion.div>
        </div>
        <div className="overflow-hidden absolute right-8 bottom-6">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, delay: d3, ease: EASE }}
            className="flex items-center gap-1"
          >
            <p className="text-[clamp(12px,1.2vw,20px)] font-medium">cool sh*t</p>
            <ArrowDownIcon />
          </motion.div>
        </div>
      </section>

      {/* ── Screen 2: cursor-following, scroll-scaling video preview ── */}
      <section className="hidden md:block intro h-[100svh] px-8">
        <motion.div
          ref={previewRef}
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          transition={{ duration: 1.2, delay: d2, ease: EASE }}
          onClick={() => setMuted((m) => !m)}
          className="video-preview group relative w-full aspect-video overflow-hidden rounded-3xl will-change-transform cursor-pointer"
        >
          <div className="video-wrapper absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl">
            <video
              ref={previewVideoRef}
              src={VIDEO_SRC}
              autoPlay
              muted={muted}
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none object-cover"
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setMuted((m) => !m)
            }}
            className="absolute bottom-8 right-8 z-10 scale-0 group-hover:scale-100 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
            aria-label={muted ? 'Unmute video' : 'Mute video'}
          >
            <div className="bg-neutral-100/50 shadow-2xl backdrop-blur-2xl w-[4vw] h-[4vw] rounded-full flex items-center justify-center">
              {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
            </div>
          </button>
        </motion.div>
      </section>
    </>
  )
}
