'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useFooter } from '@/components/providers/FooterProvider'

const TILE =
  'flex items-end p-4 lg:p-6 bg-neutral-300/50 backdrop-blur-sm rounded-lg lg:rounded-xl text-[clamp(16px,1.4vw,24px)] font-medium leading-tight cursor-pointer hover:backdrop-blur-md transition-all duration-500'

export function Footer() {
  const { footerRef } = useFooter()
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-20vh', '10vh'])

  return (
    <footer id="footer" ref={footerRef} className="bg-neutral-100">
      <div className="px-2 lg:px-4 pt-8 lg:pt-16 pb-8 lg:pb-4 grid grid-cols-12 gap-2 lg:gap-4 relative">
        <motion.h2
          style={{ y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-[clamp(100px,14vw,250px)] tracking-tight pointer-events-none"
        >
          itsjay.us
        </motion.h2>

        <a
          href="https://github.com/jasonzubiate"
          target="_blank"
          rel="noopener noreferrer"
          className={`col-span-12 lg:col-span-4 h-[200px] lg:h-[350px] ${TILE}`}
        >
          Github
        </a>
        <a
          href="https://www.instagram.com/itsjay.us/"
          target="_blank"
          rel="noopener noreferrer"
          className={`col-span-6 lg:col-span-4 h-[200px] lg:h-[350px] ${TILE}`}
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/in/jasonzubiate/"
          target="_blank"
          rel="noopener noreferrer"
          className={`col-span-6 lg:col-span-4 h-[200px] lg:h-[350px] ${TILE}`}
        >
          LinkedIn
        </a>
      </div>
    </footer>
  )
}
