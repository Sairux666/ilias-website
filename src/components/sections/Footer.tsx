'use client'

import { useEffect, useState } from 'react'
import { PhysicsButtons } from '@/components/contact/PhysicsButtons'
import { useContact } from '@/components/providers/ContactProvider'

const EMAIL = 'iliasmchakri@gmail.com'
const YEAR = '2026'

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ilias-chakri' },
  { label: 'Instagram', href: 'https://www.instagram.com/iliaschakri/' },
  { label: 'Behance', href: 'https://www.behance.net/IliasChakri' },
]

/* True at the `lg` breakpoint (1024px) and up. Used to mount the Matter.js
   physics only on desktop — mobile + tablet get the clean static version. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isDesktop
}

export function Footer() {
  const { openContact } = useContact()
  const isDesktop = useIsDesktop()

  return (
    <footer id="footer" data-surface="dark" className="bg-neutral-900 text-neutral-100">
      {/* ───────── DESKTOP (lg+): physics drag-and-throw version ───────── */}
      <div className="hidden lg:block">
        <div className="px-4 lg:px-8 pt-20 lg:pt-28">
          <div className="flex flex-col gap-3 mb-6 lg:mb-8">
            <h2 className="text-[clamp(48px,9vw,160px)] font-bold uppercase tracking-tight leading-[0.85]">
              Get in touch
            </h2>
            <p className="text-neutral-400 text-[clamp(14px,1.2vw,18px)] max-w-md">
              Got something that needs to move?
            </p>
          </div>

          {/* Matter.js mounts only on desktop (never on mobile/tablet). */}
          {isDesktop && <PhysicsButtons onSelect={openContact} />}
        </div>

        <div className="px-4 lg:px-8 py-8 lg:py-10 border-t border-neutral-800 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <nav className="flex flex-wrap items-center gap-x-8 lg:gap-x-12 gap-y-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[clamp(20px,2.4vw,36px)] font-semibold tracking-tight text-neutral-300 visited:text-neutral-300 hover:text-neutral-100 transition-colors duration-300"
              >
                {s.label}
              </a>
            ))}
            <a
              href={`mailto:${EMAIL}`}
              className="text-[clamp(20px,2.4vw,36px)] font-semibold tracking-tight text-neutral-300 visited:text-neutral-300 hover:text-neutral-100 transition-colors duration-300"
            >
              {EMAIL}
            </a>
          </nav>
          <p className="text-neutral-400 text-[clamp(16px,1.4vw,22px)] font-medium shrink-0">©{YEAR}</p>
        </div>
      </div>

      {/* ───────── MOBILE + TABLET (below lg): clean static version ───────── */}
      <div className="lg:hidden flex flex-col items-center text-center px-5 md:px-8 pt-24 md:pt-32 pb-10">
        <h2 className="text-[clamp(44px,10vw,96px)] font-bold uppercase tracking-tight leading-[0.95]">
          Let&apos;s work together!
        </h2>

        <div className="mt-12 md:mt-16 flex flex-col items-center gap-2">
          <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">Email me</span>
          <a
            href={`mailto:${EMAIL}`}
            className="text-[clamp(20px,4.5vw,34px)] font-semibold tracking-tight text-neutral-100 hover:text-neutral-400 transition-colors duration-300 break-all"
          >
            {EMAIL}
          </a>
        </div>

        <button
          type="button"
          onClick={openContact}
          aria-haspopup="dialog"
          className="mt-10 md:mt-14 rounded-full bg-neutral-100 text-neutral-900 font-semibold text-lg md:text-2xl px-10 md:px-14 py-4 md:py-6 hover:bg-neutral-300 transition-colors duration-300 cursor-pointer"
        >
          Send me a message
        </button>

        <div className="mt-16 md:mt-24 w-full border-t border-neutral-800 pt-8 flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 gap-y-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base md:text-xl font-medium text-neutral-300 visited:text-neutral-300 hover:text-neutral-100 transition-colors duration-300"
            >
              {s.label}
            </a>
          ))}
          <span className="text-base md:text-xl font-medium text-neutral-500">©{YEAR}</span>
        </div>
      </div>
    </footer>
  )
}
