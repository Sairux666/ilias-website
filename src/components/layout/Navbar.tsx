'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { personal } from '@/data/personal'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/lab', label: 'Lab' },
]

export function Navbar() {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 60)
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.4 }
    )
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 px-5 lg:px-8 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-neutral-100/80 backdrop-blur-md border-b border-black/5'
            : 'bg-transparent'
        }`}
        style={{ opacity: 0 }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-semibold text-sm tracking-tight text-neutral-900 hover:opacity-70 transition-opacity duration-300"
        >
          {personal.firstName}{' '}
          <span className="text-neutral-400">{personal.lastName}</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                pathname === href
                  ? 'text-neutral-900'
                  : 'text-neutral-400 hover:text-neutral-900'
              }`}
            >
              {pathname === href && (
                <span className="absolute inset-0 rounded-full bg-neutral-900/[0.06] border border-neutral-900/10" />
              )}
              <span className="relative">{label}</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`mailto:${personal.email}`}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-neutral-100 text-sm font-semibold hover:bg-neutral-800 transition-all duration-300"
          >
            <span>Get in touch</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-100 group-hover:scale-125 transition-transform duration-300" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 group"
          aria-label="Menu"
        >
          <span
            className={`block h-px w-6 bg-neutral-900 transition-transform duration-300 ${
              menuOpen ? 'translate-y-2.5 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-px w-4 bg-neutral-900 transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-px w-6 bg-neutral-900 transition-transform duration-300 ${
              menuOpen ? '-translate-y-2.5 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-neutral-100 flex flex-col justify-center px-8 transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-5xl font-semibold text-neutral-900 hover:text-neutral-400 transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
          <a
            href={`mailto:${personal.email}`}
            className="mt-4 text-neutral-400 text-lg font-medium hover:text-neutral-900 transition-colors duration-300"
          >
            {personal.email}
          </a>
        </div>
      </div>
    </>
  )
}
