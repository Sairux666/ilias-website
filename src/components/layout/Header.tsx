'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLenis } from '@/components/providers/LenisProvider'
import { useContact } from '@/components/providers/ContactProvider'

const EASE = [0.16, 1, 0.3, 1] as const
const LOGO_SRC = '/brand/homepage-logo.svg'

/* Hover-swap text: two stacked copies, the wrapper slides up on group hover. */
function HoverSwap({ text, className }: { text: string; className?: string }) {
  return (
    <div className="overflow-hidden h-6 lg:h-7">
      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
        <span className={`mb-1.5 ${className ?? ''}`}>{text}</span>
        <span className={`mb-1.5 ${className ?? ''}`}>{text}</span>
      </div>
    </div>
  )
}

export function Header() {
  const { scrollTo } = useLenis()
  const { openContact } = useContact()
  const pathname = usePathname()
  const buttonRef = useRef<HTMLButtonElement>(null)
  // Logo height is locked to the "Get in touch" pill's measured height so the
  // two stay a matched pair even if the button ever changes. Null until measured;
  // the `h-12 lg:h-14` fallback classes below already equal the pill height, so
  // there is no first-paint jump before the exact px value lands.
  const [logoHeight, setLogoHeight] = useState<number | null>(null)

  useEffect(() => {
    const btn = buttonRef.current
    if (!btn) return
    // offsetHeight is the layout border-box height (incl. padding + border) and,
    // unlike getBoundingClientRect, ignores the button's entrance scale-in
    // transform — so we lock onto its resting height, not a mid-animation frame.
    // A ResizeObserver re-runs this whenever that box actually changes (viewport
    // breakpoint, font swap), keeping the logo in sync automatically.
    const measure = () => setLogoHeight(btn.offsetHeight)
    const ro = new ResizeObserver(measure)
    ro.observe(btn)
    measure()
    return () => ro.disconnect()
  }, [])

  // On the homepage this is a scroll-to-top; elsewhere it stays a real
  // navigation to "/" (which LenisProvider already lands at the top).
  const onLogoClick = (e: React.MouseEvent) => {
    if (pathname !== '/') return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    scrollTo(0, { duration: 1.4 })
  }

  return (
    <header>
      {/* ── Top bar: logo (left) + Get in touch (right), always visible ── */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 3.1, ease: EASE }}
        className="fixed left-4 lg:left-8 top-4 lg:top-6 z-50"
      >
        <Link
          href="/"
          onClick={onLogoClick}
          aria-label="Ilias Chakri — back to top"
          className="inline-block rounded-full opacity-100 hover:opacity-70 transition-opacity duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_SRC}
            alt="Ilias Chakri"
            width={56}
            height={56}
            className="h-12 lg:h-14 w-auto block"
            style={logoHeight ? { height: `${logoHeight}px` } : undefined}
          />
        </Link>
      </motion.div>

      <motion.button
        ref={buttonRef}
        type="button"
        onClick={openContact}
        aria-label="Get in touch"
        aria-haspopup="dialog"
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 3.2, ease: EASE }}
        className="fixed right-4 lg:right-8 top-4 lg:top-6 z-50 group cursor-pointer"
      >
        <div className="relative">
          <div className="absolute left-0 top-0 w-12 3xl:w-14 h-12 3xl:h-14 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center rotate-180 scale-95 group-hover:scale-100 group-hover:rotate-0 group-hover:-translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] -z-10">
            <span className="text-lg lg:text-xl 3xl:text-2xl">🤙🏼</span>
          </div>
          <div
            data-surface="dark"
            className="flex items-center relative px-5 lg:px-6 h-12 lg:h-14 rounded-full bg-neutral-900 text-neutral-100 font-semibold text-[clamp(16px,1.2vw,20px)] border border-neutral-800 z-10"
          >
            <HoverSwap
              text="Get in touch"
              className="text-[clamp(16px,1.2vw,20px)] text-neutral-100 font-semibold"
            />
          </div>
        </div>
      </motion.button>
    </header>
  )
}
