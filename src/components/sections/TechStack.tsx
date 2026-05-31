'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Logo = { name: string; href: string; src: string; w: number }

const logos: Logo[] = [
  { name: 'React', href: 'https://reactjs.org', src: '/images/svg/react-logo.svg', w: 90 },
  { name: 'Next.js', href: 'https://nextjs.org', src: '/images/svg/nextjs-logotype-light-background.svg', w: 150 },
  { name: 'TypeScript', href: 'https://www.typescriptlang.org', src: '/images/svg/typescript-logo.svg', w: 70 },
  { name: 'GSAP', href: 'https://gsap.com/', src: '/images/svg/gsap-black.svg', w: 80 },
  { name: 'Motion', href: 'https://motion.dev/', src: '/images/svg/motion.svg', w: 80 },
  { name: 'TailwindCSS', href: 'https://tailwindcss.com/', src: '/images/svg/tailwindcss-logo.svg', w: 70 },
  { name: 'Contentful', href: 'https://www.contentful.com/', src: '/images/svg/contentful-logo.svg', w: 50 },
  { name: 'Supabase', href: 'https://supabase.com/', src: '/images/svg/supabase-logo.svg', w: 50 },
  { name: 'Vercel', href: 'https://vercel.com/', src: '/images/svg/vercel-logotype-light.svg', w: 90 },
  { name: 'Figma', href: 'https://www.figma.com/', src: '/images/svg/figma-logo.svg', w: 60 },
]

function Letter({ char, className }: { char: string; className?: string }) {
  return (
    <span className={`letter relative inline-block ${className ?? ''}`}>
      <span>{char}</span>
      <span className="absolute bottom-full left-0">{char}</span>
    </span>
  )
}

function LetterScroll() {
  const ulRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!ulRef.current) return
    const ctx = gsap.context(() => {
      gsap.to('.letter', {
        yPercent: 100,
        ease: 'power1.inOut',
        scrollTrigger: { trigger: ulRef.current, start: '40% 95%', end: '100% 80%', scrub: 1 },
        stagger: { each: 0.05, from: 'random' },
      })
    }, ulRef)
    return () => ctx.revert()
  }, [])

  return (
    <ul
      ref={ulRef}
      className="letter-scroll flex flex-col justify-center items-center h-[500px] lg:h-[800px] py-24"
    >
      <li className="text-[clamp(48px,14vw,250px)] font-bold tracking-tight leading-[0.85] overflow-hidden flex">
        {'MODERN'.split('').map((c, i) => (
          <Letter key={i} char={c} />
        ))}
      </li>
      <li className="text-[clamp(48px,14vw,250px)] font-bold tracking-tight leading-[0.9] lg:leading-[0.85] overflow-hidden flex">
        {'TECH'.split('').map((c, i) => (
          <Letter key={i} char={c} className={i === 3 ? 'mr-[clamp(16px,4.5vw,72px)]' : ''} />
        ))}
        {'STACK'.split('').map((c, i) => (
          <Letter key={`s${i}`} char={c} />
        ))}
      </li>
    </ul>
  )
}

function LogoLink({ logo, className }: { logo: Logo; className: string }) {
  return (
    <a
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${logo.name} website`}
      className={`grid-item flex items-center justify-center group cursor-pointer ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.name}
        style={{ width: logo.w }}
        className="z-10 transition-all duration-300"
      />
    </a>
  )
}

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const highlight = highlightRef.current
    if (!container || !highlight) return

    const moveTo = (item: Element) => {
      const r = item.getBoundingClientRect()
      const c = container.getBoundingClientRect()
      highlight.style.transform = `translate(${r.left - c.left}px, ${r.top - c.top}px)`
      highlight.style.width = `${r.width}px`
      highlight.style.height = `${r.height}px`
      container.querySelectorAll('img').forEach((img) => img.classList.remove('invert'))
      const img = item.querySelector('img')
      if (img) img.classList.add('invert')
    }

    const onMove = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (el?.classList.contains('grid-item')) moveTo(el)
      else if (el?.parentElement?.classList.contains('grid-item')) moveTo(el.parentElement)
    }

    const first = container.querySelector('.grid-item')
    if (first) moveTo(first)
    container.addEventListener('mousemove', onMove)
    return () => container.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="pb-24 px-4 lg:px-8">
      <LetterScroll />
      <h4 className="font-semibold uppercase mb-4">Professional at</h4>
      <div ref={containerRef} className="relative">
        {/* Desktop: 3 + 7 grid */}
        <div className="hidden lg:grid grid-rows-2">
          <div className="grid grid-cols-3 border-b border-neutral-300 h-[clamp(200px,20vw,400px)]">
            {logos.slice(0, 3).map((logo, i) => (
              <LogoLink key={logo.name} logo={logo} className={i < 2 ? 'border-r border-neutral-300' : ''} />
            ))}
          </div>
          <div className="grid grid-cols-7 h-[clamp(200px,15vw,400px)]">
            {logos.slice(3).map((logo, i) => (
              <LogoLink key={logo.name} logo={logo} className={i < 6 ? 'border-r border-neutral-300' : ''} />
            ))}
          </div>
        </div>

        {/* Mobile/tablet: 2-col grid */}
        <div className="grid grid-cols-2 lg:hidden">
          {logos.map((logo, i) => (
            <LogoLink
              key={logo.name}
              logo={logo}
              className={`h-[clamp(200px,20vw,400px)] ${i % 2 === 0 ? 'border-r' : ''} ${i < logos.length - 1 ? 'border-b' : ''} border-neutral-300`}
            />
          ))}
        </div>

        <div
          ref={highlightRef}
          className="highlight hidden sm:block absolute top-0 left-0 bg-neutral-900 pointer-events-none transition-all duration-300"
        />
      </div>
    </section>
  )
}
