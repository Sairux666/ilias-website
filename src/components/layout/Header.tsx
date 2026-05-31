'use client'

import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const EMAIL = 'jzubiate.dev@gmail.com'

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

function RevealLine({
  children,
  delay,
  className,
}: {
  children: React.ReactNode
  delay: number
  className?: string
}) {
  return (
    <span className="block overflow-hidden">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1, delay, ease: EASE }}
        className={`block font-medium text-[clamp(16px,1.2vw,20px)] ${className ?? ''}`}
      >
        {children}
      </motion.div>
    </span>
  )
}

export function Header() {
  return (
    <header>
      <div className="overflow-hidden fixed left-4 lg:left-8 right-4 lg:right-8 top-4.5 lg:top-6 grid grid-cols-12 gap-4 lg:gap-8 z-50">
        <div className="hidden lg:block col-span-3">
          <RevealLine delay={3}>US Based</RevealLine>
          <RevealLine delay={3.1} className="text-neutral-400">
            Working globally
          </RevealLine>
        </div>

        <div className="col-span-3">
          <RevealLine delay={3}>Building at</RevealLine>
          <RevealLine delay={3.1}>
            <a
              href="https://www.hightouch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <HoverSwap
                text="Hightouch"
                className="text-[clamp(16px,1.2vw,20px)] text-neutral-400 font-medium"
              />
            </a>
          </RevealLine>
        </div>

        <div className="hidden lg:block col-span-3">
          <RevealLine delay={3}>Freelance availability</RevealLine>
          <RevealLine delay={3.1} className="text-neutral-400">
            September 2025
          </RevealLine>
        </div>

        <motion.a
          href={`mailto:${EMAIL}`}
          aria-label="Send me an email"
          role="button"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 3.2, ease: EASE }}
          className="fixed right-4 lg:right-8 top-4 lg:top-6 group cursor-pointer"
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
      </div>
    </header>
  )
}
