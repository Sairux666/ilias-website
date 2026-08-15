'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ScrollTarget = string | HTMLElement | number

type LenisContextValue = {
  scrollTo: (target: ScrollTarget, opts?: Record<string, unknown>) => void
  stop: () => void
  start: () => void
}

const LenisContext = createContext<LenisContextValue | null>(null)

/* Access the shared Lenis instance (smooth scroll-to, pause/resume).
   Falls back to native scroll if used outside the provider. */
export function useLenis(): LenisContextValue {
  const ctx = useContext(LenisContext)
  return (
    ctx ?? {
      scrollTo: (target) => {
        if (typeof target === 'number') window.scrollTo(0, target)
        else if (typeof target === 'string') document.querySelector(target)?.scrollIntoView()
        else target?.scrollIntoView()
      },
      stop: () => {},
      start: () => {},
    }
  )
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
    }
  }, [])

  // Lenis persists its scroll position across client-side navigation, so a new
  // page would otherwise open wherever the previous one was scrolled (e.g. the
  // footer). Snap back to the top on every route change — like a fresh load.
  // Skip when navigating to an in-page anchor so hash links still work.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) return
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo(0, 0)
    }
    ScrollTrigger.refresh()
  }, [pathname])

  const scrollTo = useCallback<LenisContextValue['scrollTo']>((target, opts) => {
    lenisRef.current?.scrollTo(target, opts)
  }, [])
  const stop = useCallback(() => lenisRef.current?.stop(), [])
  const start = useCallback(() => lenisRef.current?.start(), [])
  const value = useMemo(() => ({ scrollTo, stop, start }), [scrollTo, stop, start])

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
}
