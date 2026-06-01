'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const EMAIL = 'jzubiate.dev@gmail.com'

const navItems = [
  { label: 'Home', href: '/', imageUrl: '/images/pages/home-icon.png' },
  { label: 'Work', href: '/work', imageUrl: '/images/pages/work-icon.png' },
  { label: 'Lab', href: '/lab', imageUrl: '/images/pages/lab-icon.png' },
]

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

function MenuIcon() {
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
      className="w-5 h-5 lg:w-6 lg:h-6"
      aria-hidden="true"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  )
}

function NavRow({
  label,
  href,
  imageUrl,
  index,
  onNavigate,
}: {
  label: string
  href: string
  imageUrl: string
  index: number
  onNavigate: () => void
}) {
  return (
    <Link href={href} onClick={onNavigate} className="flex items-center gap-5 group cursor-pointer">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.9 }}
        transition={{ duration: 0.5, delay: 0.12 + index * 0.07, ease: EASE }}
        className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-lg md:rounded-xl overflow-hidden relative"
      >
        <Image
          src={imageUrl}
          alt={label}
          fill
          sizes="80px"
          className="object-cover object-center scale-110 group-hover:scale-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
        />
      </motion.div>
      <div className="overflow-hidden h-8">
        <motion.div
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          exit={{ y: '110%' }}
          transition={{ duration: 0.5, delay: 0.18 + index * 0.07, ease: EASE }}
        >
          <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
            <span className="text-lg md:text-xl font-semibold text-neutral-100 mb-1.5">{label}</span>
            <span className="text-lg md:text-xl font-semibold text-neutral-100 mb-1.5">{label}</span>
          </div>
        </motion.div>
      </div>
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const close = () => setOpen(false)

  // Close on Escape + click outside the panel (ignoring the trigger).
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node
      if (panelRef.current?.contains(t)) return
      if (triggerRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
    }
  }, [open])

  return (
    <header>
      {/* ── Top bar: menu trigger (left) + Get in touch (right), always visible ── */}
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open menu"
        aria-expanded={open}
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 3.1, ease: EASE }}
        className="fixed left-4 lg:left-8 top-4 lg:top-6 z-50 group flex items-center justify-center w-12 3xl:w-14 h-12 lg:h-14 rounded-full bg-neutral-900 text-neutral-100 border border-neutral-800 hover:bg-neutral-800 transition-colors duration-300 cursor-pointer"
      >
        <MenuIcon />
      </motion.button>

      <motion.a
        href={`mailto:${EMAIL}`}
        aria-label="Send me an email"
        role="button"
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 3.2, ease: EASE }}
        className="fixed right-4 lg:right-8 top-4 lg:top-6 z-50 group cursor-pointer"
      >
        <div className="relative">
          <div className="absolute left-0 top-0 w-12 3xl:w-14 h-12 3xl:h-14 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center rotate-180 scale-95 group-hover:scale-100 group-hover:rotate-0 group-hover:-translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] -z-10">
            <span className="text-lg lg:text-xl 3xl:text-2xl">🤙🏼</span>
          </div>
          <div className="flex items-center relative px-5 lg:px-6 h-12 lg:h-14 rounded-full bg-neutral-900 text-neutral-100 font-semibold text-[clamp(16px,1.2vw,20px)] border border-neutral-800 z-10">
            <HoverSwap
              text="Get in touch"
              className="text-[clamp(16px,1.2vw,20px)] text-neutral-100 font-semibold"
            />
          </div>
        </div>
      </motion.a>

      {/* ── Menu panel: anchored to the TOP-LEFT, opening below the trigger ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed left-4 lg:left-8 top-[72px] lg:top-[92px] w-[300px] md:w-[360px] z-[60] p-3 rounded-2xl md:rounded-[20px] bg-neutral-900 border border-neutral-800 overflow-hidden origin-top-left"
            role="dialog"
            aria-label="Site menu"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item, i) => (
                <NavRow key={item.label} {...item} index={i} onNavigate={close} />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
