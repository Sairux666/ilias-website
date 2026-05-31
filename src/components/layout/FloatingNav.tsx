'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { useInitialLoad } from '@/components/providers/InitialLoadProvider'
import { useFooter } from '@/components/providers/FooterProvider'

const EASE = [0.16, 1, 0.3, 1] as const
const MARQUEE = 'Creative Design Engineer, Awwwards Stalker, Product Builder, Next.js Enthusiast,'

const navItems = [
  { title: 'Home', href: '/', imageUrl: '/images/pages/home-icon.png' },
  { title: 'Work', href: '/work', imageUrl: '/images/pages/work-icon.png' },
  { title: 'Lab', href: '/lab', imageUrl: '/images/pages/lab-icon.png' },
]

function Marquee() {
  return (
    <div className="flex justify-center items-center h-4 md:h-4.5 overflow-hidden relative w-full">
      <div className="absolute left-0 h-full w-10 bg-linear-to-r from-neutral-900/95 to-neutral-900/0 z-10" />
      <div className="absolute right-0 h-full w-10 bg-linear-to-l from-neutral-900/95 to-neutral-900/0 z-10" />
      <div className="flex overflow-hidden">
        {[0, 1].map((i) => (
          <motion.p
            key={i}
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
            className="font-mono text-[10px] md:text-xs tracking-widest text-neutral-300 uppercase whitespace-nowrap pr-1.5"
          >
            {MARQUEE}
          </motion.p>
        ))}
      </div>
    </div>
  )
}

function NavItem({
  title,
  href,
  imageUrl,
  index,
  isOpen,
  onNavigate,
}: {
  title: string
  href: string
  imageUrl: string
  index: number
  isOpen: boolean
  onNavigate: () => void
}) {
  return (
    <Link href={href} onClick={onNavigate} className="flex items-center gap-5 group cursor-pointer">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.9, y: isOpen ? 0 : 24 }}
        transition={{ duration: 0.5, delay: 0.4 - 0.075 * index, ease: EASE }}
        className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-lg md:rounded-xl overflow-hidden relative"
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover object-center scale-110 group-hover:scale-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
        />
      </motion.div>
      <div className="overflow-hidden h-8">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: isOpen ? '0%' : '100%' }}
          transition={{ duration: 0.5, delay: 0.2 - 0.075 * index, ease: EASE }}
          className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2"
        >
          <span className="text-lg md:text-xl font-semibold text-neutral-100 mb-1.5">{title}</span>
          <span className="text-lg md:text-xl font-semibold text-neutral-100 mb-1.5">{title}</span>
        </motion.div>
      </div>
    </Link>
  )
}

export function FloatingNav() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const { isInitialLoad } = useInitialLoad()
  const { footerRef } = useFooter()
  const pathname = usePathname()
  const footerInView = useInView(footerRef, { amount: 0.4 })
  const hideForFooter = pathname !== '/lab' && footerInView

  // Click outside to close.
  useEffect(() => {
    if (!open) return
    const handle = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    document.addEventListener('touchstart', handle)
    return () => {
      document.removeEventListener('mousedown', handle)
      document.removeEventListener('touchstart', handle)
    }
  }, [open])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      animate={
        hideForFooter
          ? { y: 200, scale: 0.95, opacity: 1 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={{
        duration: 1,
        delay: isInitialLoad ? 3 : 0,
        ease: EASE,
        opacity: { duration: 1, delay: 3, ease: EASE },
      }}
      className="py-2 pl-2 pr-4 md:pr-8 rounded-2xl md:rounded-[20px] bg-neutral-900 border border-neutral-800 fixed left-4 md:left-1/2 right-4 md:right-auto md:-translate-x-1/2 bottom-4 md:bottom-6 md:w-[700px] z-50 overflow-hidden"
    >
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="overflow-hidden"
      >
        <nav className="flex flex-col gap-4 mb-4">
          {navItems.map((item, i) => (
            <NavItem
              key={item.title}
              {...item}
              index={i}
              isOpen={open}
              onNavigate={() => setOpen(false)}
            />
          ))}
        </nav>
        <div className="pb-4">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: open ? '100%' : '0%' }}
            transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
            className="h-px rounded bg-neutral-800"
          />
        </div>
      </motion.div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-5">
          <div className="h-[60px] w-[60px] md:h-[80px] md:w-[80px] rounded-lg md:rounded-xl bg-neutral-100 overflow-hidden relative">
            <video
              src="/videos/emoji.mov"
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-[52%] left-[47%] -translate-x-1/2 -translate-y-1/2 h-full w-full scale-140"
            />
          </div>
          <div className="flex flex-col gap-1.5 md:gap-2 w-[250px] sm:w-[500px] relative">
            <Link href="/" className="md:text-lg font-semibold text-neutral-100 uppercase">
              Jason Zubiate
            </Link>
            <Marquee />
          </div>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="text-neutral-100 hover:text-neutral-400 transition-all duration-300 cursor-pointer"
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M4 12h16" />
              <path d="M4 18h16" />
              <path d="M4 6h16" />
            </svg>
          )}
        </button>
      </div>
    </motion.div>
  )
}
